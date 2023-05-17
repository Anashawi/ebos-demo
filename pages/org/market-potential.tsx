import { FieldArray, Form, Formik } from "formik";
import IdeasModal from "../../components/app/ideas-modal";
import useModalToggler from "../../hooks/use-modal-toggler";
import { useEffect, useMemo, useState } from "react";
import CompetitorsProduct from "../../components/competitors/product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as clientApi from "../../http-client/products.client";
import { IUserProduct } from "../../models/user-product";
import { useSession } from "next-auth/react";
import { productPagesEnum, videoPropNamesEnum } from "../../models/enums";
import Spinner from "../../components/common/spinner";
import { ICompetitor } from "../../models/types";
import { object, array, string, number } from "yup";
import Header from "../../components/common/header";
import UserInfoHeader from "../../components/common/user-info-header";
import Link from "next/link";
import * as _ from "lodash";
import ZeroProductsWarning from "../../components/common/zero-products-warning";
import { faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ConsultantReview from "../../components/common/consultant-review";
import Modal from "../../components/common/modal";
import SharedVideoForm from "../../components/videos/shared-video-form";
import Video from "../../components/videos/video";

const Competitors = () => {
	let dbProduct: IUserProduct | undefined;

	const { data: session }: any = useSession();

	const emptyUserProduct = {
		id: "",
		userId: session?.user?.id,
		products: [],
	} as IUserProduct;

	const [isIdeasModalOpen, toggleIdeasModal] = useModalToggler();
	const [isEditUrlsModalOn, toggleEditVideoModal] = useModalToggler();
	const [isVideoModalOn, toggleVideoModal] = useModalToggler();

	const [userProduct, setUserProduct] =
		useState<IUserProduct>(emptyUserProduct);

	const queryClient = useQueryClient();

	const { data, isLoading } = useQuery<IUserProduct>({
		queryKey: [clientApi.Keys.All],
		queryFn: clientApi.getAll,
		refetchOnWindowFocus: false,
		enabled: !!session?.user?.id,
	});

	useEffect(() => {
		data?.products?.forEach((prod) => {
			if (
				!prod.competitors ||
				(prod.competitors && prod.competitors.length === 0)
			) {
				prod.competitors = [
					{ ...emptyCompetitor(), name: "Me" },
					{ ...emptyCompetitor(), name: "", isUntapped: true },
					{ ...emptyCompetitor(), name: "" },
				];
			}
		});
		setUserProduct(data ?? emptyUserProduct);
	}, [data]);

	dbProduct = useMemo(() => {
		return _.cloneDeep(data);
	}, [data]);

	const { mutate: updateUserProduct, isLoading: isUpdatingUserProduct } =
		useMutation(
			(userProduct: IUserProduct) => {
				return clientApi.updateOne(
					userProduct,
					productPagesEnum.competitors
				);
			},
			{
				onMutate: (updated) => {
					queryClient.setQueryData(
						[clientApi.Keys.UserProduct, userProduct.id],
						updated
					);
				},
				onSuccess: (updated) => {
					queryClient.invalidateQueries([
						clientApi.Keys.UserProduct,
						userProduct.id,
					]);
					queryClient.invalidateQueries([clientApi.Keys.All]);
				},
			}
		);

	const emptyCompetitor = () => {
		const uuid = crypto.randomUUID();
		return {
			uuid: uuid,
			name: "",
			marketShare: 0,
		} as ICompetitor;
	};

	return (
		<>
			<IdeasModal isOpen={isIdeasModalOpen} toggle={toggleIdeasModal} />

			<div className='min-h-screen products-gradient bg-white'>
				<div className='px-12 mx-0 my-auto md:w-[calc(1300px_-_1.5_*_2)] lg:w-[960px_-_1.5rem_*_2] xl:w-[1300_-_1.5rem_*_2]'>
					<div className='p-12 relative mx-auto max-w-[1920px]'>
						<div className='flex justify-between items-center gap-5 pb-5'>
							<UserInfoHeader className='w-1/2'></UserInfoHeader>
							<Header
								className='w-1/2'
								toggleIdeasModal={toggleIdeasModal}></Header>
						</div>

						<h3 className='text-[2.8rem] text-yellow-green'>
							Market potential
						</h3>
						<Formik
							initialValues={{
								products: userProduct.products,
							}}
							validationSchema={object({
								products: array(
									object({
										competitors: array(
											object({
												name: string().required("required"),
												marketShare: number()
													.required("required")
													.min(
														0,
														"Market share must be 0 or greater"
													),
											})
										)
											.required(
												"Must provide at least one competitor !"
											)
											.min(
												1,
												"Must provide at least one competitor !"
											),
									})
								).required(),
							})}
							onSubmit={async (values, actions) => {
								values.products?.map((product) => {
									if (!product.uuid) {
										product.uuid = crypto.randomUUID();
									}
								});

								if (userProduct?.id) {
									values.products = [...values.products];
									userProduct.products = [...values.products];
									await updateUserProduct({
										...userProduct,
									});
								}
								actions.setSubmitting(false);
							}}
							enableReinitialize
							validateOnMount>
							{({ values, isSubmitting, isValid, errors }) => {
								return (
									<Form>
										<FieldArray name='products'>
											{() => {
												return (
													<div className='flex flex-col gap-3 mt-20'>
														<div className='flex flex-col gap-20'>
															{!userProduct.products?.length &&
																!isLoading && (
																	<ZeroProductsWarning />
																)}
															{!values.products?.length &&
																!!userProduct.products
																	?.length &&
																!isLoading && (
																	<p className='w-max italic py-5'>
																		Select a product to start
																		analyzing its market
																		potential ...
																	</p>
																)}
															{isLoading && (
																<Spinner
																	className='text-2xl items-center'
																	message='Loading Market Potential...'></Spinner>
															)}
															{!!values.products?.length &&
																values.products.map(
																	(product, productIndex) => (
																		<div key={productIndex}>
																			<CompetitorsProduct
																				product={product}
																				index={productIndex}
																				formUtilities={{
																					isSubmitting,
																					isValid,
																					errors,
																				}}
																			/>
																		</div>
																	)
																)}
														</div>
														<div className='flex gap-5 items-center justify-between'>
															<div className='w-1/2 pr-12'>
																<div className='h-10'>
																	{isUpdatingUserProduct && (
																		<Spinner
																			className='flex items-center text-xl'
																			message='Saving Market Potential...'
																		/>
																	)}
																</div>
																<div className='flex gap-5 items-center justify-between'>
																	{!!values.products
																		?.length && (
																		<div className='flex items-center gap-5'>
																			<button
																				type='submit'
																				className={
																					isSubmitting ||
																					!isValid
																						? "btn-rev btn-disabled"
																						: "btn-rev"
																				}
																				disabled={
																					isSubmitting ||
																					!isValid
																				}>
																				Save
																			</button>
																		</div>
																	)}
																	{userProduct?.products
																		?.length > 0 && (
																		<Link href={"/"}>
																			<span className='text-md text-gray-400 italic'>
																				go to next →{" "}
																				<span className='text-gray-500'>
																					Red Ocean Canvas
																				</span>
																			</span>
																		</Link>
																	)}
																</div>
															</div>
															<div className='w-1/2'>
																<div className='h-10'></div>
																<div className='flex flex-wrap justify-start items-center gap-4 pl-10 py-5 mx-auto'>
																	<ConsultantReview
																		pageTitle={
																			"Market potential"
																		}></ConsultantReview>
																	{(session?.user as any)
																		?.role === "admin" && (
																		<button
																			className='p-3 rounded inline-flex gap-5 items-center btn text-black-eerie hover:text-blue-ncs w-max'
																			onClick={
																				toggleEditVideoModal
																			}>
																			<span>
																				Edit video Url
																			</span>
																			<FontAwesomeIcon
																				className='w-7'
																				icon={faEdit}
																			/>
																		</button>
																	)}
																	<button
																		className='p-3 rounded inline-flex gap-5 items-center btn text-black-eerie hover:text-blue-ncs w-max'
																		onClick={
																			toggleVideoModal
																		}>
																		<span>Watch Video</span>
																		<FontAwesomeIcon
																			className='w-7'
																			icon={faEye}
																		/>
																	</button>
																</div>
															</div>
														</div>
													</div>
												);
											}}
										</FieldArray>
									</Form>
								);
							}}
						</Formik>
					</div>
				</div>
			</div>

			{/* video modal */}
			<Modal
				config={{
					isShown: isVideoModalOn,
					closeCallback: toggleVideoModal,
					className:
						"flex flex-col w-[90%] lg:w-2/3 max-w-[1320px] h-[90%] max-h-[600px] rounded-xl overflow-hidden ",
				}}>
				<Video currVideoPropName={videoPropNamesEnum.marketPotential} />
				<div className='flex justify-center p-5 bg-black'>
					<button
						className='btn-diff bg-gray-100 hover:bg-gray-300'
						onClick={toggleVideoModal}>
						close
					</button>
				</div>
			</Modal>

			{/* video url form modal */}
			<Modal
				config={{
					isShown: isEditUrlsModalOn,
					closeCallback: toggleEditVideoModal,
					className:
						"flex flex-col lg:w-1/3 max-w-[1320px] rounded-xl overflow-hidden p-5 lg:p-10",
				}}>
				<SharedVideoForm
					toggleEditVideoModal={toggleEditVideoModal}
					videoPropName={videoPropNamesEnum.marketPotential}
					videoLabel='Market Potential Video'
				/>
			</Modal>
		</>
	);
};

export default Competitors;
