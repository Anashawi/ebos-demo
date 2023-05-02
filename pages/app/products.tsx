import { FieldArray, Form, Formik } from "formik";
import Link from "next/link";
import IdeasModal from "../../components/app/ideas-modal";
import useModalToggler from "../../hooks/use-modal-toggler";
import Product from "../../components/products/product";
import { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as clientApi from "../../http-client/products.client";
import { useSession } from "next-auth/react";
import { IUserProduct } from "../../models/user-product";
import { IFuture } from "../../models/types";
import Spinner from "../../components/common/spinner";
import { productPagesEnum } from "../../models/enums";
import ConsultantReview from "../../components/common/consultant-review";
import UserInfoHeader from "../../components/common/user-info-header";
import Header from "../../components/common/header";
import { object, array, string, number } from "yup";

const Products = () => {
	const { data: session }: any = useSession();
	const emptyUserProduct = useMemo(() => {
		return {
			id: "",
			userId: session?.user?.id,
			products: [],
		} as IUserProduct;
	}, []);

	const [isIdeasModalOpen, toggleIdeasModal] = useModalToggler();

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
					queryClient.invalidateQueries([clientApi.Keys.All]);
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
			<div className='min-h-screen products-gradient w-screen bg-white'>
				<div className='px-12 mx-0 my-auto md:w-[calc(1300px_-_1.5_*_2)] lg:w-[960px_-_1.5rem_*_2] xl:w-[1300_-_1.5rem_*_2]'>
					<div className='p-12 relative mx-auto max-w-[1920px]'>
						<div className='flex justify-between items-center gap-5 pb-5'>
							<UserInfoHeader className='w-1/2'></UserInfoHeader>
							<Header
								className='w-1/2'
								toggleIdeasModal={toggleIdeasModal}></Header>
						</div>
						<h3 className='text-[2.52rem] mb-10 text-yellow-green'>
							Pioneer, Migrator, Settler
						</h3>
						<Formik
							initialValues={{
								products: userProduct?.products,
							}}
							validationSchema={object({
								products: array(
									object({
										// id: string("must be a string").required(
										//    "required"
										// ),
										name: string().required("Name is required"),
										futures: array(
											object({
												year: number()
													.typeError("you must specify a year")
													.min(2023, "min year is 2023")
													.max(2099, "max year is 2099")
													.required("Year is required"),
												level: number().required(
													"Level is required"
												),
												sales: number().required(
													"sales percentage is required"
												),
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
													<div className='flex flex-col gap-12'>
														<div className='py-5 flex flex-col gap-20'>
															{!!values.products?.length &&
																values.products?.map(
																	(product, productIndex) => (
																		<div key={productIndex}>
																			<Product
																				product={product}
																				index={productIndex}
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
															{isLoading && (
																<Spinner
																	className='text-3xl'
																	message='Loading ...'></Spinner>
															)}
														</div>
														<div className='w-1/2 flex gap-5 items-center justify-start pr-5 md:pr-10 py-10'>
															<button
																type='submit'
																className={
																	isSubmitting || !isValid
																		? "btn-rev btn-disabled"
																		: "btn-rev"
																}
																disabled={isSubmitting || !isValid}>
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
																<span>Add New Product</span>
															</button>

															<div className="flex gap-5">
																{(!!isLoading ||
																	isUpdatingUserProduct ||
																	isCreatingUserProduct) && (
																		<Spinner
																			className='flex items-center px-10 text-2xl'
																			message='Saving Products'
																		/>
																	)}


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
		</>
	);
};

export default Products;
