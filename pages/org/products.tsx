import { FieldArray, Form, Formik } from "formik";
import Link from "next/link";
import IdeasModal from "../../components/app/ideas-modal";
import useModalToggler from "../../hooks/use-modal-toggler";
import Product from "../../components/products/product";
import { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as clientApi from "../../http-client/products.client";
import { useSession } from "next-auth/react";
import { IUserProduct, UserProduct } from "../../models/user-product";
import { IFuture } from "../../models/types";
import Spinner from "../../components/common/spinner";
import { productPagesEnum, videoPropNamesEnum } from "../../models/enums";
import UserInfoHeader from "../../components/common/user-info-header";
import Header from "../../components/common/header";
import { object, array, string, number } from "yup";
import useFuturesChart from "../../hooks/use-futures-chart";
import Chart from "react-google-charts";
import FormikContextChild from "../../components/products/formik-context-child";
import Modal from "../../components/common/modal";
import SharedVideoForm from "../../components/videos/shared-video-form";
import ConsultantReview from "../../components/common/consultant-review";
import Video from "../../components/videos/video";

const Products = () => {
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

	const [chart] = useFuturesChart(userProduct.products);

	const queryClient = useQueryClient();

	const { data, isLoading } = useQuery<IUserProduct>({
		queryKey: [clientApi.Keys.UserProduct, userProduct.id],
		queryFn: clientApi.getAll,
		refetchOnWindowFocus: false,
		enabled: !!session?.user?.id,
	});

	useEffect(() => {
		if (data) {
			setUserProduct(data);
		}
	}, [data]);

	const { mutate: updateUserProduct, isLoading: isUpdatingUserProduct } =
		useMutation(
			(userProduct: IUserProduct) => {
				return clientApi.updateOne(userProduct, productPagesEnum.futures);
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

	const { mutate: createUserProduct, isLoading: isCreatingUserProduct } =
		useMutation(
			(userProduct: IUserProduct) => clientApi.insertOne(userProduct),
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
					queryClient.invalidateQueries([
						clientApi.Keys.UserProduct,
						userProduct.id,
					]);
				},
			}
		);

	const emptyProduct = useMemo(() => {
		return {
			uuid: "",
			name: "",
			futures: [
				{
					year: 2023,
					level: 1,
					sales: 50,
				} as IFuture,
			],
		};
	}, []);

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
						<h3 className='text-[2.8rem] mb-10 text-yellow-green'>
							Pioneer, Migrator, Settler
						</h3>
						<Formik
							initialValues={{
								products: userProduct?.products,
							}}
							validationSchema={object({
								products: array(
									object({
										name: string().required("required"),
										futures: array(
											object({
												year: number()
													.typeError("specify a year")
													.min(
														new Date().getFullYear(),
														`min year is ${new Date().getFullYear()}`
													)
													.required("required"),
												level: number().required("required"),
												sales: number()
													.min(0, "must be greater than 0")
													.required("required"),
											})
										)
											.required("Must provide at least one future!")
											.min(1, "Must provide at least one future!"),
									})
								)
									.required("Start adding your products...")
									.min(1, "Start adding your products..."),
							})}
							onSubmit={async (values, actions) => {
								values.products?.map((product) => {
									if (!product.uuid) {
										product.uuid = crypto.randomUUID();
									}
								});
								userProduct.userId = session?.user?.id;
								if (userProduct?.id) {
									await updateUserProduct({
										...userProduct,
										...values,
									});
								} else {
									await createUserProduct({
										...userProduct,
										...values,
									});
								}
								actions.setSubmitting(false);
							}}
							enableReinitialize
							validateOnMount>
							{({ values, isSubmitting, isValid }) => {
								return (
									<Form>
										<FieldArray name='products'>
											{({ push, remove, form }) => {
												return (
													<div className='flex flex-col gap-5'>
														<div className='flex'>
															<div className='w-1/2 py-5 flex flex-col gap-20'>
																{!!isLoading && (
																	<Spinner
																		className='flex items-center text-2xl'
																		message='Loading Products...'
																	/>
																)}
																{!!values.products?.length &&
																	values.products?.map(
																		(
																			product,
																			productIndex
																		) => (
																			<div
																				key={productIndex}>
																				<Product
																					product={product}
																					index={
																						productIndex
																					}
																					onRemove={() => {
																						remove(
																							productIndex
																						);
																					}}
																				/>
																			</div>
																		)
																	)}
																{!values.products?.length &&
																	!isLoading &&
																	form.errors?.products && (
																		<div className='w-full flex justify-start items-center'>
																			<p className='text-2xl text-center italic'>
																				<>
																					{
																						form.errors
																							.products
																					}
																				</>
																			</p>
																		</div>
																	)}
															</div>
															{!!userProduct.products
																?.length && (
																<div className='md:w-1/2 h-[500px] pl-10'>
																	<Chart
																		{...chart}
																		legendToggle
																	/>
																</div>
															)}
														</div>

														<div className='flex gap-5 items-center justify-between'>
															<div className='w-1/2'>
																<div className='h-10'>
																	{(isUpdatingUserProduct ||
																		isCreatingUserProduct) && (
																		<Spinner
																			className='flex items-center text-lg'
																			message='Saving Products'
																		/>
																	)}
																</div>
																<div className='flex gap-5 items-center justify-between pr-5'>
																	<div className='flex gap-5'>
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
																		<button
																			type='button'
																			onClick={() => {
																				push(emptyProduct);
																			}}
																			className='inline-flex items-center gap-3 btn text-black-eerie'>
																			<FontAwesomeIcon
																				className='w-5 h-auto cursor-pointer'
																				icon={faPlus}
																			/>
																			<span>
																				Add New Product
																			</span>
																		</button>
																	</div>
																	{userProduct?.products
																		?.length > 0 && (
																		<Link href={"/"}>
																			<span className='text-md text-gray-400 italic'>
																				go to next →{" "}
																				<span className='text-gray-500'>
																					market potential
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
																			"Pioneer, Migrator, Settler"
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
										<FormikContextChild
											userProduct={userProduct}
											dispatch={() => {
												setUserProduct({ ...userProduct });
											}}
										/>
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
				<Video currVideoPropName={videoPropNamesEnum.products} />
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
					videoPropName={videoPropNamesEnum.products}
					videoLabel='Products Video'
				/>
			</Modal>
		</>
	);
};

export default Products;
