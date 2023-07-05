import IdeasModal from "../../components/app/ideas-modal";
import useModalToggler from "../../hooks/use-modal-toggler";
import { useState } from "react";
import { navbarNodesEnum, videoPropNamesEnum } from "../../models/enums";
import Modal from "../../components/common/modal";
import SharedVideoForm from "../../components/videos/shared-video-form";
import Video from "../../components/videos/video";
import VerticalNavbar from "../../components/common/vertical-navbar";
import Navbar from "../../components/common/navbar";
import RedOceanContent from "../../components/red-ocean/content";
import RedOceanProductChart from "../../components/red-ocean/product-chart";
import { IProduct } from "../../models/types";

const RedOcean = () => {
	const [isIdeasModalOpen, toggleIdeasModal] = useModalToggler();
	const [isEditUrlsModalOn, toggleEditVideoModal] = useModalToggler();
	const [isVideoModalOn, toggleVideoModal] = useModalToggler();

	const [chartProducts, setChartProducts] = useState<IProduct[]>([]);

	return (
		<>
			<div className='bg-gray-100 pt-9'>
				<div className='flex gap-[4.4rem] px-16 m-auto'>
					<div className='py-12'>
						<VerticalNavbar />
					</div>
					<div className='grow max-w-[1920px] flex flex-col py-12 mx-auto'>
						<Navbar selectedNode={navbarNodesEnum.redOceanCanvas} />
						<div className='content-container'>
							<div className='left-content'>
								<RedOceanContent
									dispatchProducts={(products) => {
										setChartProducts(products);
									}}
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
								{!!chartProducts?.length &&
									chartProducts.map((product, index) => (
										<div key={index} className='h-[300px]'>
											<RedOceanProductChart product={product} />
										</div>
									))}
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
				<Video currVideoPropName={videoPropNamesEnum.redOcean} />
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
					videoPropName={videoPropNamesEnum.redOcean}
					videoLabel='Red Ocean Video'
				/>
			</Modal>
		</>
	);
};

export default RedOcean;
