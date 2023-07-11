import Spinner from "../../components/common/spinner";
import useModalToggler from "../../hooks/use-modal-toggler";
import Modal from "../../components/common/modal";
import SharedVideoForm from "../../components/disruption/shared-video-form";
import Video from "../../components/disruption/video";
import { navbarNodesEnum, videoPropNamesEnum } from "../../models/enums";
import RoadMapContent from "../../components/roadmap/content";
import { useEffect, useState } from "react";
import { IUserIdeas } from "../../models/user-idea";
import { useSession } from "next-auth/react";
import Navbar from "../../components/common/navbar";
import VerticalNavbar from "../../components/common/vertical-navbar";
import RoadmapChart from "../../components/roadmap/roadmap-chart";
import IdeasModal from "../../components/app/ideas-modal";
import { useQuery } from "@tanstack/react-query";
import * as clientApi from "../../http-client/ideas.client";

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

	return (
		<>
			<div className='bg-gray-100 pt-9'>
				<div className='flex gap-[4.4rem] px-16 m-auto'>
					<div className='py-12'>
						<VerticalNavbar />
					</div>
					<div className='grow max-w-[1920px] flex flex-col py-12 mx-auto gap-5'>
						<Navbar selectedNode={navbarNodesEnum.roadMap} />
						<div className='content-container'>
							<div className='left-content'>
								<RoadMapContent
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
								{!isLoading && !userIdeas.ideas.length && (
									<div className='w-full flex items-center'>
										<p className='text-2xl text-center italic'>
											Start adding your ideas to see roadmap ideas chart...
										</p>
									</div>
								)}
								{isLoading && (
									<Spinner
										className='flex items-center px-1 text-2xl'
										message='Loading roadmap ideas chart...'
									/>
								)}
								{!!userIdeas.ideas.length && !isLoading && (
									<RoadmapChart userIdeas={userIdeas} />
								)}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* ideas modal */}
			<IdeasModal
				isOpen={isIdeasModalOpen}
				toggle={() => toggleIdeasModal()}
			/>

			{/* video modal */}
			<Modal
				config={{
					isShown: isVideoModalOn,
					closeCallback: () => toggleVideoModal(false),
					className:
						"flex flex-col w-[90%] lg:w-2/3 max-w-[1320px] h-[90%] max-h-[600px] rounded-xl overflow-hidden ",
				}}>
				<Video videoPropName={videoPropNamesEnum.roadMap} />
				<div className='flex justify-center p-5 bg-black'>
					<button
						className='btn-diff bg-gray-100 hover:bg-gray-300 text-dark-400'
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
