import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useState, useEffect, useMemo } from "react";
import { IIdea } from "../../models/types";
import { IUserIdeas } from "../../models/user-idea";
import * as clientApi from "../../http-client/ideas.client";
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCirclePlus,
	faEdit,
	faEye,
	faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Chart from "react-google-charts";
import useRoadMapChart from "../../hooks/use-road-map-chart";
import Spinner from "../../components/common/spinner";
import ConsultantReview from "../../components/common/consultant-review";
import Header from "../../components/common/header";
import UserInfoHeader from "../../components/common/user-info-header";
import useModalToggler from "../../hooks/use-modal-toggler";
import Modal from "../../components/common/modal";
import SharedVideoForm from "../../components/disruption/shared-video-form";
import Video from "../../components/disruption/video";
import { videoPropNamesEnum } from "../../models/enums";

const RoadMap = () => {
	const { data: session }: any = useSession();

	const todayDateStr = new Date().toISOString().substring(0, 7); // to get the "yyyy-mm" format

	const emptyUserIdeas: IUserIdeas = {
		id: "",
		startDate: todayDateStr,
		userId: session?.user?.id,
		ideas: [],
	} as IUserIdeas;

	const emptyIdea: IIdea = useMemo(() => {
		return {
			uuid: "",
			name: "",
			startMonth: todayDateStr,
			durationInMonths: 6,
		} as IIdea;
	}, []);

	const [userIdeas, setUserIdeas] = useState<IUserIdeas>(emptyUserIdeas);
	const [isIdeasModalOpen, toggleIdeasModal] = useModalToggler();
	const [isEditUrlsModalOn, toggleEditVideoModal] = useModalToggler();
	const [isVideoModalOn, toggleVideoModal] = useModalToggler();

	const [chart] = useRoadMapChart(userIdeas);

	const { data, isLoading } = useQuery<IUserIdeas>({
		queryKey: [clientApi.Keys.All],
		queryFn: clientApi.getOne,
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		if (data) {
			data.ideas.forEach((idea) => {
				!idea.durationInMonths ? (idea.durationInMonths = 6) : null;
			});
			setUserIdeas(data);
		}
	}, [data]);

	const queryClient = useQueryClient();

	const { mutate: createUserIdeas, isLoading: isCreatingIdeas } = useMutation(
		(userIdeas: IUserIdeas) => {
			return clientApi.insertOne(userIdeas);
		},
		{
			onSuccess: (updated) => {
				queryClient.invalidateQueries([clientApi.Keys.All]);
			},
		}
	);

	const { mutate: updateUserIdeas, isLoading: isUpdatingIdeas } = useMutation(
		(userIdeas: IUserIdeas) => {
			return clientApi.updateOne(userIdeas);
		},
		{
			onSuccess: (updated) => {
				queryClient.invalidateQueries([clientApi.Keys.All]);
			},
		}
	);

	const calcIdeaStartMonth = (idea: any) => {
		if (
			!idea.startMonth ||
			(idea.startMonth &&
				new Date(idea.startMonth) < new Date(userIdeas.startDate || ""))
		) {
			idea.startMonth = userIdeas.startDate || todayDateStr;
			setUserIdeas({ ...userIdeas });
		}
		return idea.startMonth;
	};

	const getMinDateStr = (savedStartDateStr: string | undefined) => {
		if (!savedStartDateStr) {
			return todayDateStr;
		}
		if (new Date(savedStartDateStr) < new Date(todayDateStr)) {
			return savedStartDateStr;
		}
		return todayDateStr;
	};

	return (
		<>
			<div className='min-h-screen flex flex-col'>
				<div className='pane-upper flex flex-col'>
					<div className='px-12 flex flex-col gap-5 mx-auto lg:w-11/12'>
						<div className='flex gap-5 justify-between items-center mt-9'>
							<UserInfoHeader className='gap-10'></UserInfoHeader>
							<Header></Header>
						</div>
						<div className='flex gap-5 mt-7'>
							<h3 className='w-1/2 text-[2.52rem] text-secondary-300'>
								Road Map
							</h3>
							<div className='w-1/2 flex items-center gap-5 justify-end'>
								<ConsultantReview
									pageTitle={"Roads Map Canvas"}></ConsultantReview>
								{(session?.user as any)?.role === "admin" && (
									<button
										type='button'
										className='p-3 rounded inline-flex gap-5 items-center btn text-black-eerie hover:text-blue-ncs w-max'
										onClick={() => toggleEditVideoModal(true)}>
										<span>Edit video Url</span>
										<FontAwesomeIcon className='w-7' icon={faEdit} />
									</button>
								)}
								<button
									type='button'
									className='p-3 rounded inline-flex gap-5 items-center btn text-black-eerie hover:text-blue-ncs w-max'
									onClick={() => toggleVideoModal(true)}>
									<span>Watch Video</span>
									<FontAwesomeIcon className='w-7' icon={faEye} />
								</button>
							</div>
						</div>
						<div className='flex flex-col gap-5'>
							<h4 className='text-[2.1rem]'>
								Create a timeline for your ideas
							</h4>
							<form>
								<div className='flex gap-5 items-center mb-5'>
									<label className='text-xl'>Start date</label>
									<div className='grow'>
										<input
											type='month'
											value={userIdeas.startDate}
											onChange={(e) => {
												userIdeas.startDate = e.target.value;
												setUserIdeas({ ...userIdeas });
											}}
											min={getMinDateStr(userIdeas.startDate)}
											className='w-full md:w-[200px] grow p-2 bg-gray-100 outline-none caret-dark-blue border-none text-lg'
										/>
									</div>
								</div>
								<ul className='flex flex-col'>
									{!userIdeas.ideas.length && !isLoading && (
										<div className='w-full flex items-center'>
											<p className='text-2xl text-center italic'>
												Start adding your ideas...
											</p>
										</div>
									)}
									{isLoading && (
										<Spinner
											className='flex items-center px-1 text-2xl'
											message='Loading ideas...'
										/>
									)}
									{!!userIdeas.ideas?.length &&
										!isLoading &&
										userIdeas.ideas.map((idea, index) => (
											<li
												key={index}
												className='flex gap-5 items-center border-b py-2'>
												<div className='w-[350px]'>
													<label className='text-xl'>Idea</label>
													<input
														value={idea.name}
														onChange={(e) => {
															userIdeas.ideas[index].name =
																e.target.value;
															setUserIdeas({ ...userIdeas });
														}}
														className='w-full grow p-2 bg-gray-100 outline-none caret-dark-blue border-none text-lg'
													/>
												</div>
												<div className='w-[200px]'>
													<label className='text-xl'>
														Start (month)
													</label>
													<input
														type='month'
														value={calcIdeaStartMonth(idea)}
														onChange={(e) => {
															userIdeas.ideas[index].startMonth =
																e.target.value;
															setUserIdeas({ ...userIdeas });
														}}
														min={
															userIdeas.startDate || todayDateStr
														}
														className='w-full grow p-2 bg-gray-100 outline-none caret-dark-blue border-none text-lg'
													/>
												</div>
												<div className='grow'>
													<label className='text-xl'>
														Duration (months)
													</label>
													<input
														type='range'
														min={1}
														max={12}
														value={idea.durationInMonths}
														onChange={(e) => {
															userIdeas.ideas[
																index
															].durationInMonths =
																+e.target.value;
															setUserIdeas({ ...userIdeas });
														}}
														list='duration'
														className='w-full grow bg-gray-100 outline-none caret-dark-blue border-none'
														step={1}
													/>
													<datalist
														id='duration'
														className='flex items-center justify-between text-lg w-full'>
														<option
															value={1}
															label='01'
															className='text-[1.12rem]'></option>
														<option
															value={2}
															label='02'
															className='text-[1.12rem]'></option>
														<option
															value={3}
															label='03'
															className='text-[1.12rem]'></option>
														<option
															value={4}
															label='04'
															className='text-[1.12rem]'></option>
														<option
															value={5}
															label='05'
															className='text-[1.12rem]'></option>
														<option
															value={6}
															label='06'
															className='text-[1.12rem]'></option>
														<option
															value={7}
															label='07'
															className='text-[1.12rem]'></option>
														<option
															value={8}
															label='08'
															className='text-[1.12rem]'></option>
														<option
															value={9}
															label='09'
															className='text-[1.12rem]'></option>
														<option
															value={10}
															label='10'
															className='text-[1.12rem]'></option>
														<option
															value={11}
															label='11'
															className='text-[1.12rem]'></option>
														<option
															value={12}
															label='12'
															className='text-[1.12rem]'></option>
													</datalist>
												</div>
												<div className='col-2/12'>
													<div
														onClick={() => {
															userIdeas.ideas =
																userIdeas.ideas.filter(
																	(idea, ideaIndex) =>
																		ideaIndex !== index
																);
															setUserIdeas({ ...userIdeas });
														}}>
														<FontAwesomeIcon
															icon={faTimes}
															className='w-5 cursor-pointer hover:text-rose-800'
														/>
													</div>
												</div>
											</li>
										))}
								</ul>
								<div className='flex justify-center my-5'>
									<button
										type='button'
										onClick={() => {
											const newIdea = { ...emptyIdea };
											newIdea.name = `Idea ${
												userIdeas.ideas.length + 1
											}`;
											userIdeas.ideas.push(newIdea);
											setUserIdeas({ ...userIdeas });
										}}
										className='inline-flex items-center gap-2 text-xl p-3 mb-7 text-black-eerie hover:text-gray-600'>
										<FontAwesomeIcon
											className='w-6 h-auto cursor-pointer text-black-eerie hover:text-gray-600'
											icon={faCirclePlus}
										/>
										Add idea
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
				<div className='pane-lower-gradient grow'>
					<div className='grow px-12 py-8 mx-auto lg:w-11/12'>
						{isLoading && (
							<Spinner
								className='flex items-center px-1 text-2xl'
								message='Loading ideas chart...'
							/>
						)}
						{!!userIdeas.ideas.length && !isLoading && (
							<Chart {...chart} legendToggle />
						)}
						<div className='h-10 '>
							{(isUpdatingIdeas || isCreatingIdeas) && (
								<Spinner className='' message='Saving Ideas ...' />
							)}
						</div>
						<button
							type='button'
							onClick={() => {
								userIdeas.userId = session?.user?.id;
								userIdeas.ideas?.map((idea) => {
									if (!idea.uuid) {
										idea.uuid = crypto.randomUUID();
									}
								});
								if (userIdeas?.id) {
									updateUserIdeas({
										...userIdeas,
									});
								} else {
									createUserIdeas({
										...userIdeas,
									});
								}
							}}
							className='btn-rev'>
							Save
						</button>
					</div>
				</div>
			</div>

			{/* video modal */}
			<Modal
				config={{
					isShown: isVideoModalOn,
					closeCallback: () => toggleVideoModal(false),
					className:
						"flex flex-col w-[90%] lg:w-2/3 max-w-[1320px] h-[90%] max-h-[600px] rounded-xl overflow-hidden ",
				}}>
				<Video currVideoPropName={videoPropNamesEnum.roadMap} />
				<div className='flex justify-center p-5 bg-black'>
					<button
						className='btn-diff bg-gray-100 hover:bg-gray-300'
						onClick={() => toggleVideoModal(true)}>
						close
					</button>
				</div>
			</Modal>

			{/* video url form modal */}
			<Modal
				config={{
					isShown: isEditUrlsModalOn,
					closeCallback: () => toggleEditVideoModal(false),
					className:
						"flex flex-col lg:w-1/3 max-w-[1320px] rounded-xl overflow-hidden p-5 lg:p-10",
				}}>
				<SharedVideoForm
					toggleEditVideoModal={() => toggleEditVideoModal(false)}
					videoPropName={videoPropNamesEnum.roadMap}
					videoLabel='Road Map Video'
				/>
			</Modal>
		</>
	);
};

export default RoadMap;
