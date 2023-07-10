import IdeasModal from "../../components/app/ideas-modal";
import useModalToggler from "../../hooks/use-modal-toggler";
import { navbarNodesEnum, videoPropNamesEnum } from "../../models/enums";
import { IProduct } from "../../models/types";
import Modal from "../../components/common/modal";
import SharedVideoForm from "../../components/disruption/shared-video-form";
import Video from "../../components/disruption/video";
import BlueOceanContent from "../../components/blue-ocean/content";
import Navbar from "../../components/common/navbar";
import VerticalNavbar from "../../components/common/vertical-navbar";
import BlueOceanProductChart from "../../components/blue-ocean/product-chart";
import Spinner from "../../components/common/spinner";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { IUserProduct } from "../../models/user-product";
import * as clientApi from "../../http-client/products.client";
import { IIdeaFactor } from "../../models/types";

const BlueOceanCanvas = () => {
	const [isIdeasModalOpen, toggleIdeasModal] = useModalToggler();
	const [isEditUrlsModalOn, toggleEditVideoModal] = useModalToggler();
	const [isVideoModalOn, toggleVideoModal] = useModalToggler();

	const { data: session }: any = useSession();

	const emptyFactor = useMemo(() => {
		return {
			name: "",
			competitors: [],
		} as IIdeaFactor;
	}, []);

	const emptyUserProduct = useMemo(() => {
		return {
			id: "",
			userId: session?.user?.id,
			products: [],
		} as IUserProduct;
	}, []);

	const [userProduct, setUserProduct] =
		useState<IUserProduct>(emptyUserProduct);

	const [chartProducts, setChartProducts] = useState<IProduct[]>([]);

	const { data, isLoading } = useQuery<IUserProduct>({
		queryKey: [clientApi.Keys.All],
		queryFn: clientApi.getAll,
		refetchOnWindowFocus: false,
		enabled: !!session?.user?.id,
	});

	useEffect(() => {
		data?.products?.forEach((prod) => {
			emptyFactor.competitors =
				prod.competitors?.map((comp) => {
					return {
						uuid: comp.uuid,
						value: "1",
					};
				}) ?? [];
			if (
				!prod.ideaFactors ||
				(prod.ideaFactors && prod.ideaFactors.length === 0)
			) {
				prod.ideaFactors = [
					{ ...emptyFactor, name: "" },
					{ ...emptyFactor, name: "" },
					{ ...emptyFactor, name: "" },
				];
			}
		});
		if (data) {
			setUserProduct(data);
		}
		setUserProduct(data ?? emptyUserProduct);
	}, [data]);

	return (
		<>
			<div className='bg-gray-100 pt-9'>
				<div className='flex gap-[4.4rem] px-16 m-auto'>
					<div className='py-12'>
						<VerticalNavbar />
					</div>
					<div className='grow max-w-[1920px] flex flex-col py-12 mx-auto'>
						<Navbar selectedNode={navbarNodesEnum.blueOceanCanvas} />
						<div className='content-container'>
							<div className='left-content'>
								<BlueOceanContent
									userProduct={userProduct}
									dispatchProducts={(products) => {
										setChartProducts(products);
									}}
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
								{isLoading && (
									<Spinner
										message='Loading blue ocean charts...'
										className='p-5 items-center text-xl'
									/>
								)}
								{!isLoading &&
									!!chartProducts?.length &&
									chartProducts.map((product, index) => (
										<div key={index} className='h-[300px]'>
											<BlueOceanProductChart product={product} />
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
				<Video currVideoPropName={videoPropNamesEnum.blueOcean} />
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
					videoPropName={videoPropNamesEnum.blueOcean}
					videoLabel='Blue Ocean Video'
				/>
			</Modal>
		</>
	);
};

export default BlueOceanCanvas;
