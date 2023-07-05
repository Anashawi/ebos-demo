import { FieldArray, Form, Formik } from "formik";
import Link from "next/link";
import IdeasModal from "../../components/app/ideas-modal";
import useModalToggler from "../../hooks/use-modal-toggler";
import { useEffect, useMemo, useState } from "react";
import FactorsProduct from "../../components/factors/product";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { productPagesEnum, videoPropNamesEnum } from "../../models/enums";
import { IUserProduct } from "../../models/user-product";
import * as clientApi from "../../http-client/products.client";
import { IFactor } from "../../models/types";
import { string, object, array } from "yup";
import UserInfoHeader from "../../components/common/user-info-header";
import Header from "../../components/common/header";
import ConsultantReview from "../../components/common/consultant-review";
import Spinner from "../../components/common/spinner";
import ZeroProductsWarning from "../../components/common/zero-products-warning";
import Modal from "../../components/common/modal";
import SharedVideoForm from "../../components/videos/shared-video-form";
import Video from "../../components/videos/video";
import { faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Factors = () => {
	const { data: session }: any = useSession();

	const [isIdeasModalOpen, toggleIdeasModal] = useModalToggler();
	const [isEditUrlsModalOn, toggleEditVideoModal] = useModalToggler();
	const [isVideoModalOn, toggleVideoModal] = useModalToggler();

	const emptyUserProduct = useMemo(() => {
		return {
			id: "",
			userId: session?.user?.id,
			products: [],
		} as IUserProduct;
	}, []);

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
			emptyFactor.competitors =
				prod.competitors?.map((comp) => {
					return {
						uuid: comp.uuid,
						value: "1",
					};
				}) ?? [];
			if (!prod.factors || (prod.factors && prod.factors.length === 0)) {
				prod.factors = [
					{ ...emptyFactor, name: "" },
					{ ...emptyFactor, name: "" },
					{ ...emptyFactor, name: "" },
				];
			}
		});
		if (data) {
			setUserProduct(data);
		}
	}, [data]);

	const { mutate: updateUserProduct, isLoading: isUpdatingUserProduct } =
		useMutation(
			(userProduct: IUserProduct) => {
				return clientApi.updateOne(userProduct, productPagesEnum.factors);
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

	const emptyFactor = useMemo(() => {
		return {
			name: "",
			competitors: [],
		} as IFactor;
	}, []);

	return (
		<>
			<IdeasModal
				isOpen={isIdeasModalOpen}
				toggle={() => toggleIdeasModal()}
			/>

			<div className='factors-gradient bg-white'>
				<div className='min-h-screen px-12 mx-0 my-auto md:w-[calc(1300px_-_1.5_*_2)] lg:w-[960px_-_1.5rem_*_2] xl:w-[1300_-_1.5rem_*_2]'>
					<div className='flex flex-wrap'>
						<div className='flex flex-col gap-7 w-full p-12 relative'>
							<div className='flex gap-10 items-center'>
								<UserInfoHeader className='w-1/2'></UserInfoHeader>
								<Header
									className='w-1/2'
									toggleIdeasModal={toggleIdeasModal}></Header>
							</div>
							<div className='flex'>
								<div className='w-full mb-5 flex gap-12 items-center justify-between pr-12'>
									<h3 className='w-1/2 text-[2.8rem] text-secondary-300'>
										Red Ocean Canvas
									</h3>
									<div className='w-1/2 pl-10 py-5 mx-auto'>
										<div className='flex flex-wrap justify-start items-center gap-4'>
											<ConsultantReview
												pageTitle={
													"Red Ocean Canvas"
												}></ConsultantReview>
											{(session?.user as any)?.role === "admin" && (
												<button
													className='p-3 rounded inline-flex gap-5 items-center btn text-black-eerie hover:text-blue-ncs w-max'
													onClick={() => toggleEditVideoModal(true)}>
													<span>Edit video Url</span>
													<FontAwesomeIcon
														className='w-7'
														icon={faEdit}
													/>
												</button>
											)}
											<button
												className='p-3 rounded inline-flex gap-5 items-center btn text-black-eerie hover:text-blue-ncs w-max'
												onClick={() => toggleVideoModal(true)}>
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
							<Formik
								initialValues={{
									products: userProduct.products,
								}}
								validationSchema={object({
									products: array(
										object({
											factors: array(
												object({
													name: string().required("required"),
												})
											)
												.required(
													"Must provide at least one factor !"
												)
												.min(
													1,
													"Must provide at least one factor !"
												),
										})
									),
								})}
								onSubmit={async (values, actions) => {
									values.products?.map((product) => {
										if (!product.uuid) {
											product.uuid = crypto.randomUUID();
										}
									});
									if (userProduct?.id) {
										userProduct.products = values.products;
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
												{({ push, remove }) => {
													return (
														<>
															<div className='flex flex-col gap-20'>
																{!userProduct.products
																	?.length &&
																	!isLoading && (
																		<ZeroProductsWarning />
																	)}
																{!values.products?.length &&
																	!!userProduct.products
																		?.length &&
																	!isLoading && (
																		<p className='text-rose-300'>
																			make a selection to
																			view products !
																		</p>
																	)}
																{!!isLoading && (
																	<Spinner
																		className='flex items-center text-2xl'
																		message='Loading Red Ocean...'
																	/>
																)}
																{!!values.products?.length &&
																	values.products.map(
																		(
																			product,
																			productIndex
																		) => (
																			<div
																				key={productIndex}>
																				<FactorsProduct
																					product={product}
																					index={
																						productIndex
																					}
																				/>
																			</div>
																		)
																	)}
															</div>
															<div className='w-1/2 pr-12 mt-10'>
																<div className='h-10'>
																	{isUpdatingUserProduct && (
																		<Spinner
																			className='flex items-center text-xl'
																			message='Saving Red Ocean'
																		/>
																	)}
																</div>
																<div className='flex gap-5 flex-wrap justify-between items-center'>
																	{!!userProduct.products
																		?.length && (
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
																	)}
																	{userProduct?.products
																		?.length > 0 && (
																		<Link href={"/"}>
																			<span className='text-md text-gray-400 italic'>
																				go to next →{" "}
																				<span className='text-gray-500'>
																					Disruption
																				</span>
																			</span>
																		</Link>
																	)}
																</div>
															</div>
														</>
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
			</div>
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

export default Factors;
