import IdeasModal from "../../components/app/ideas-modal";
import Modal from "../../components/common/modal";
import useModalToggler from "../../hooks/use-modal-toggler";
import { useMemo, useState } from "react";
import VideosForm from "../../components/disruption/videos-form";
import Video from "../../components/disruption/video";
import { navbarNodesEnum, videoPropNamesEnum } from "../../models/enums";
import VerticalNavbar from "../../components/common/vertical-navbar";
import Navbar from "../../components/common/navbar";
import DisruptionContent from "../../components/disruption/content";
import { IVideos } from "../../models/videos";

const Disruption = () => {
	const emptyVideos: IVideos = useMemo(() => {
		return {
			id: "",
			staffOnDemand: "",
			communityAndCrowd: "",
			algorithms: "",
			leveragedAssets: "",
			Engagement: "",
			interface: "",
			dashboard: "",
			experimentation: "",
			socialPlatforms: "",
			ecoSystems: "",
			autonomy: "",
			infoIsPower: "",
			OTCR: "",
			valueDestruction: "",
			customerJourney: "",
			digitalPlatforms: "",
			buildingCapacity: "",
		} as IVideos;
	}, []);

	const [selectedVideoPropName, setSelectedVideoPropName] =
		useState<videoPropNamesEnum>(videoPropNamesEnum.goalsVideo);
	const [videos, setVideos] = useState<IVideos>(emptyVideos);
	const [isIdeasModalOpen, toggleIdeasModal] = useModalToggler();
	const [isVideoModalOn, toggleVideoModal] = useModalToggler();
	const [isEditUrlsModalOn, toggleEditUrlsModal] = useModalToggler();

	return (
		<>
			<div className='bg-gray-100 pt-9'>
				<div className='flex gap-[4.4rem] px-16 m-auto'>
					<div className='py-12'>
						<VerticalNavbar />
					</div>
					<div className='grow max-w-[1920px] flex flex-col py-12 mx-auto'>
						<Navbar selectedNode={navbarNodesEnum.disruption} />
						<div className='content-container'>
							<div className='left-content'>
								<DisruptionContent
									videos={videos}
									dispatchVideos={setVideos}
									setSelectedVideoPropName={setSelectedVideoPropName}
									toggleEditUrlsModal={toggleEditUrlsModal}
									toggleVideoModal={toggleVideoModal}
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
				<Video currVideoPropName={selectedVideoPropName} />
				<div className='flex justify-center p-5 bg-black'>
					<button
						className='btn-diff bg-gray-100 hover:bg-gray-300'
						onClick={() => toggleVideoModal(false)}>
						close
					</button>
				</div>
			</Modal>

			{/* video urls form modal */}
			<Modal
				config={{
					isShown: isEditUrlsModalOn,
					closeCallback: () => toggleEditUrlsModal(false),
					className:
						"flex flex-col w-[90%] lg:w-2/3 max-w-[1320px] h-[90%] max-h-[750px] rounded-xl overflow-hidden p-5 lg:p-10",
				}}>
				<VideosForm
					videos={videos}
					toggleEditUrlsModal={() => toggleEditUrlsModal(false)}
				/>
			</Modal>
		</>
	);
};

export default Disruption;
