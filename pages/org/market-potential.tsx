import IdeasModal from "../../components/app/ideas-modal";
import useModalToggler from "../../hooks/use-modal-toggler";
import { navbarNodesEnum, videoPropNamesEnum } from "../../models/enums";
import Modal from "../../components/common/modal";
import SharedVideoForm from "../../components/videos/shared-video-form";
import Video from "../../components/videos/video";
import VerticalNavbar from "../../components/common/vertical-navbar";
import Navbar from "../../components/common/navbar";
import MarketPotentialContent from "../../components/market-potential/content";
import * as _ from "lodash";
import { useState } from "react";
import { IUserProduct } from "../../models/user-product";
import { useSession } from "next-auth/react";
import MarketPotentialProductChart from "../../components/market-potential/product-chart";

const Competitors = () => {
	const { data: session }: any = useSession();

	const [isIdeasModalOpen, toggleIdeasModal] = useModalToggler();
	const [isEditUrlsModalOn, toggleEditVideoModal] = useModalToggler();
	const [isVideoModalOn, toggleVideoModal] = useModalToggler();

	const emptyUserProduct = {
		id: "",
		userId: session?.user?.id,
		products: [],
	} as IUserProduct;

	const [userProduct, setUserProduct] =
		useState<IUserProduct>(emptyUserProduct);

	return (
		<>
			<div className='bg-gray-100 pt-9'>
				<div className='flex gap-[4.4rem] px-16 m-auto'>
					<div className='py-10'>
						<VerticalNavbar />
					</div>
					<div className='grow max-w-[1920px] flex flex-col py-12 mx-auto'>
						<Navbar selectedNode={navbarNodesEnum.marketPotential} />
						<div className='content-container'>
							<div className='left-content'>
								<MarketPotentialContent
									userProduct={userProduct}
									dispatchUserProduct={(userProduct) => {
										setUserProduct(userProduct ?? emptyUserProduct);
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
								{!!userProduct.products?.length &&
									userProduct.products.map((product) => (
										<>
											<div className='h-[300px]'>
												<MarketPotentialProductChart
													product={product}
												/>
											</div>
										</>
									))}
							</div>
						</div>

						{/* <div className='w-1/2'>
							<div className='flex flex-wrap justify-start items-center gap-4 pl-10 py-5 mx-auto'>
								<ConsultantReview
									pageTitle={"Market potential"}></ConsultantReview>
								{(session?.user as any)?.role === "admin" && (
									<button
										className='p-3 rounded inline-flex gap-5 items-center btn text-black-eerie hover:text-blue-ncs w-max'
										onClick={() => toggleEditVideoModal(true)}>
										<span>Edit video Url</span>
										<FontAwesomeIcon className='w-7' icon={faEdit} />
									</button>
								)}
								<button
									className='p-3 rounded inline-flex gap-5 items-center btn text-black-eerie hover:text-blue-ncs w-max'
									onClick={() => toggleVideoModal(true)}>
									<span>Watch Video</span>
									<FontAwesomeIcon className='w-7' icon={faEye} />
								</button>
							</div>
						</div> */}
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
				<Video currVideoPropName={videoPropNamesEnum.marketPotential} />
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
					videoPropName={videoPropNamesEnum.marketPotential}
					videoLabel='Market Potential Video'
				/>
			</Modal>
		</>
	);
};

export default Competitors;
