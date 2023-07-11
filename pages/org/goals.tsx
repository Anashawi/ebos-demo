import useModalToggler from "../../hooks/use-modal-toggler";
import IdeasModal from "../../components/app/ideas-modal";
import Modal from "../../components/common/modal";
import SharedVideoForm from "../../components/disruption/shared-video-form";
import { navbarNodesEnum, videoPropNamesEnum } from "../../models/enums";
import Navbar from "../../components/common/navbar";
import VerticalNavbar from "../../components/common/vertical-navbar";
import Video from "../../components/disruption/video";
import GoalsContent from "../../components/goals/goals-content";

const Goals = () => {
	const [isIdeasModalOpen, toggleIdeasModal] = useModalToggler();
	const [isEditUrlModalOn, toggleEditVideoModal] = useModalToggler();
	const [isVideoModalOn, toggleVideoModal] = useModalToggler(false);

	return (
		<>
			<div className='bg-gray-100 pt-9'>
				<div className='flex gap-[4.4rem] px-16 m-auto'>
					<div className='py-12'>
						<VerticalNavbar />
					</div>
					<div className='grow max-w-[1920px] flex flex-col py-12 mx-auto'>
						<Navbar selectedNode={navbarNodesEnum.visualizeSuccess} />
						<div className='content-container'>
							<div className='left-content'>
								<GoalsContent />
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
				toggle={() => toggleIdeasModal(false)}
			/>

			{/* video url form modal */}
			<Modal
				config={{
					isShown: isEditUrlModalOn,
					closeCallback: () => toggleEditVideoModal(false),
					className:
						"flex flex-col lg:w-1/3 max-w-[1320px] rounded-xl overflow-hidden p-5 lg:p-10",
				}}>
				<SharedVideoForm
					toggleEditVideoModal={() => toggleEditVideoModal(false)}
					videoPropName={videoPropNamesEnum.goalsVideo}
					videoLabel='Goals Video'
				/>
			</Modal>

			{/* video modal */}
			<Modal
				config={{
					isShown: isVideoModalOn,
					closeCallback: () => toggleVideoModal(false),
					className:
						"flex flex-col w-[90%] lg:w-2/3 max-w-[1320px] h-[90%] max-h-[600px] rounded-xl overflow-hidden ",
				}}>
				<Video videoPropName={videoPropNamesEnum.goalsVideo} />
				<div className='flex justify-center p-5 bg-black'>
					<button
						className='btn-diff bg-gray-100 hover:bg-gray-300 text-dark-400'
						onClick={() => toggleVideoModal(false)}>
						close
					</button>
				</div>
			</Modal>
		</>
	);
};

export default Goals;
