import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useState, useEffect, useMemo } from "react";
import { IIdea } from "../../models/types";
import { IUserIdeas } from "../../models/user-idea";
import * as clientApi from "../../http-client/ideas.client";
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import Chart from "react-google-charts";
import useRoadMapChart from "../../hooks/use-road-map-chart";
import Spinner from "../../components/common/spinner";
import ConsultantReview from "../../components/common/consultant-review";
import Header from "../../components/common/header";
import UserInfoHeader from "../../components/common/user-info-header";

const RoadMap = () => {
	const { data: session }: any = useSession();

	const minStartDateStr = new Date().toISOString().substring(0, 7); // to get the "yyyy-mm" format

	const emptyUserIdeas: IUserIdeas = {
		id: "",
		startDate: minStartDateStr,
		userId: session?.user?.id,
		ideas: [],
	} as IUserIdeas;

	const emptyIdea: IIdea = useMemo(() => {
		return {
			uuid: "",
			name: "",
			startMonth: minStartDateStr,
			durationInMonths: 6,
		} as IIdea;
	}, []);

	const [userIdeas, setUserIdeas] = useState<IUserIdeas>(emptyUserIdeas);

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

	return (
		<>
			<div className='min-h-screen flex flex-col'>
				<div className='pane-upper flex flex-col'>
					<div className='px-12 py-8 flex flex-col gap-5 mx-auto lg:w-11/12'>
						<div className='flex gap-5 justify-between items-center pb-5'>
							<UserInfoHeader className='gap-10'></UserInfoHeader>
							<Header></Header>
						</div>
						<h3 className='text-[2.52rem] mb-6 text-yellow-green'>
							Road Map
						</h3>
						<div className='flex flex-col gap-5'>
							<h4 className='text-[2.1rem] mb-6'>
								Create a timeline for your ideas
							</h4>
							<form>
								<div className='flex gap-5 items-center mb-10'>
									<label className='text-xl'>Start date</label>
									<div className='grow'>
										<input
											type='month'
											value={userIdeas.startDate}
											onChange={(e) => {
												userIdeas.startDate = e.target.value;
												setUserIdeas({ ...userIdeas });
											}}
											min={minStartDateStr}
											className='w-full md:w-[250px] grow p-4 bg-gray-100 outline-none caret-dark-blue border-none text-xl'
										/>
									</div>
								</div>
								<ul className='flex flex-col gap-3'>
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
												className='flex gap-5 items-center'>
												<div className='w-[250px]'>
													<label className='text-xl'>Idea</label>
													<input
														value={idea.name}
														onChange={(e) => {
															userIdeas.ideas[index].name =
																e.target.value;
															setUserIdeas({ ...userIdeas });
														}}
														className='w-full grow p-4 bg-gray-100 outline-none caret-dark-blue border-none text-xl'
													/>
												</div>
												<div className='w-[250px]'>
													<label className='text-xl'>
														Start (month)
													</label>
													<input
														type='month'
														value={idea.startMonth}
														onChange={(e) => {
															userIdeas.ideas[index].startMonth =
																e.target.value;
															setUserIdeas({ ...userIdeas });
														}}
														min={
															userIdeas.startDate ||
															minStartDateStr
														}
														className='w-full grow p-4 bg-gray-100 outline-none caret-dark-blue border-none text-xl'
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
								<div className='flex justify-center my-10'>
									<button
										type='button'
										onClick={() => {
											const newIdea = { ...emptyIdea };
											newIdea.name = `Idea ${userIdeas.ideas.length + 1
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
								<div className='h-10'>
									{(isUpdatingIdeas || isCreatingIdeas) && (
										<Spinner
											className=''
											message='Saving Ideas ...'
										/>
									)}
								</div>
								<div className='flex gap-5 mb-10'>
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
						<ConsultantReview
							className='mt-10'
							pageTitle='Road Map'></ConsultantReview>
					</div>
				</div>
			</div>
		</>
	);
};

export default RoadMap;
