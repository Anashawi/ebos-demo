import Chart from "react-google-charts";
import Spinner from "../../components/common/spinner";
import useModalToggler from "../../hooks/use-modal-toggler";
import Modal from "../../components/common/modal";
import SharedVideoForm from "../../components/disruption/shared-video-form";
import Video from "../../components/disruption/video";
import { navbarNodesEnum, videoPropNamesEnum } from "../../models/enums";
import RoadMapContent from "../../components/roadmap/content";
import { useEffect, useMemo, useState } from "react";
import { IUserIdeas } from "../../models/user-idea";
import { IIdea } from "../../models/types";
import { useSession } from "next-auth/react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import * as clientApi from "../../http-client/ideas.client";
import Navbar from "../../components/common/navbar";
import VerticalNavbar from "../../components/common/vertical-navbar";
import RoadmapChart from "../../components/roadmap/roadmap-chart";

const RoadMap = () => {
	const { data: session }: any = useSession();

	const [isIdeasModalOpen, toggleIdeasModal] = useModalToggler();
	const [isEditUrlsModalOn, toggleEditVideoModal] = useModalToggler();
	const [isVideoModalOn, toggleVideoModal] = useModalToggler();

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
			<div className='bg-gray-100 pt-9'>
				<div className='flex gap-[4.4rem] px-16 m-auto'>
					<div className='py-12'>
						<VerticalNavbar />
					</div>
					<div className='grow max-w-[1920px] flex flex-col py-12 mx-auto gap-5'>
						<Navbar selectedNode={navbarNodesEnum.visualizeSuccess} />
						<div className='content-container'>
							<div className='left-content'>
								<RoadMapContent
									emptyIdea={emptyIdea}
									userIdeas={userIdeas}
									dispatchUserIdeas={setUserIdeas}
									todayDateStr={todayDateStr}
									isLoading={isLoading}
								/>
							</div>
							<div className='right-content'>
								<div className='flex flex-col gap-2 p-1 bg-white rounded-xl'>
									<button
										type='button'
										onClick={() => {
											toggleIdeasModal(true);
										}}
										className='w-full btn-primary-light rounded-xl'>
										My Ideas
									</button>
								</div>
								<div className='flex flex-col gap-1 p-1 bg-white rounded-xl'>
									<button
										type='button'
										onClick={() => {
											toggleVideoModal(true);
										}}
										className='w-full btn-primary-light rounded-xl'>
										Resource Videos
									</button>
								</div>
							</div>
						</div>
						<div className='grow p-5 rounded-2xl bg-white'>
							<div className='grow px-12 py-8 mx-auto'>
								{isLoading && (
									<Spinner
										className='flex items-center px-1 text-2xl'
										message='Loading ideas chart...'
									/>
								)}
								{!!userIdeas.ideas.length && !isLoading && (
									<RoadmapChart userIdeas={userIdeas} />
								)}
								<div className='h-10 '>
									{(isUpdatingIdeas || isCreatingIdeas) && (
										<Spinner
											className=''
											message='Saving Ideas ...'
										/>
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
