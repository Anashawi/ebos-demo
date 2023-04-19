import { FieldArray, Form, Formik } from "formik";
import Link from "next/link";
import IdeasModal from "../../components/app/ideas-modal";
import useModalToggler from "../../hooks/use-modal-toggler";
import * as Yup from "yup";
import Product from "../../components/products/product";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as clientApi from "../../http-client/products.client";
import { useSession } from "next-auth/react";
import { IUserProduct } from "../../models/user-product";
import { IFuture, IProduct } from "../../models/types";
import Spinner from "../../components/common/spinner";
import { productPagesEnum } from "../../models/enums";

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

	const { data, isLoading, refetch } = useQuery<IUserProduct>({
		queryKey: [clientApi.Keys.All],
		queryFn: clientApi.getAll,
		refetchOnWindowFocus: false,
		enabled: !!session?.user?.id,
	});

	useEffect(() => {
		setUserProduct(data ?? emptyUserProduct);
	}, [data]);

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

	const emptyProduct = useMemo(() => {
		return {
			uuid: "",
			name: "",
			futures: [
				{
					year: 2023,
					level: 1,
					sales: 55,
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
						<div className='flex justify-between gap-5 pb-5'>
							<div className='flex gap-2 items-center'>
								<strong className='mr-1'>Mustafa Khairy </strong> |
								<a href='http://bo.adpadelhouse.com/logout'> logout </a>
							</div>
							<div className='flex justify-between items-center gap-5 w-1/2'>
								<div className='ml-5'>
									<button
										type='button'
										onClick={toggleIdeasModal}
										className='btn text-black-eerie'>
										My ideas
									</button>
								</div>
								<Link href='/' className='logo-pane mb-0'>
									<h4 className='text-[3rem] text-white'>20X</h4>
									<span className='relative -translate-x-[1.2rem]'>
										revenue BY
									</span>
									<div className='w-[110px] h-[33px]'>
										<Image
											width='55'
											height='30'
											src='/ilogo.webp'
											alt='CaseInPoint'
										/>
									</div>
								</Link>
							</div>
						</div>
						<h3 className='text-[2.52rem] mb-10 text-yellow-green'>
							Pioneer, Migrator, Settler
						</h3>
						<Formik
							initialValues={{
								products: userProduct?.products,
							}}
							validationSchema={Yup.object({
								products: Yup.array(
									Yup.object({
										// id: Yup.string("must be a string").required(
										//    "required"
										// ),
										name: Yup.string().required("Name is required"),
										futures: Yup.array(
											Yup.object({
												year: Yup.number()
													.typeError("you must specify a year")
													.min(2023, "min year is 2023")
													.max(2099, "max year is 2099")
													.required("Year is required"),
												level: Yup.number().required(
													"Level is required"
												),
												sales: Yup.number().required(
													"sales percentage is required"
												),
											})
										)
											.required("Must provide at least one future !")
											.min(1, "Must provide at least one future !"),
									})
								)
									.required("Must provide at least one product !")
									.min(1, "Must provide at least one product !"),
							})}
							onSubmit={async (values, actions) => {
								values.products?.map((product) => {
									if (!product.uuid) {
										product.uuid = crypto.randomUUID();
									}
								});
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
																form.errors?.products && (
																	<div className='w-full flex justify-center items-center'>
																		<p className='text-2xl p-10 text-center bg-rose-50 text-rose-500'>
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
														<div className='w-1/2 flex gap-5 items-center justify-end pr-5 md:pr-10 py-10'>
															<button
																type='button'
																onClick={() => {
																	push(emptyProduct);
																}}
																className='inline-flex items-center gap-3 btn blue-gradient text-black-eerie hover:text-white'>
																<FontAwesomeIcon
																	className='w-7 h-auto cursor-pointer text-white'
																	icon={faCirclePlus}
																/>
																<span>Add New Product</span>
															</button>
														</div>
													</div>
												);
											}}
										</FieldArray>
										<div className='flex gap-3 justify-between items-center mt-10'>
											<div className='flex gap-3'>
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
												<Link
													href='/'
													className='btn text-black-eerie hover:text-blue-ncs'>
													<strong>Back To Dashboard</strong>
												</Link>
												{(!!isLoading ||
													isUpdatingUserProduct ||
													isCreatingUserProduct) && (
													<Spinner
														className='flex items-center px-10 text-2xl'
														message='Loading Products'
													/>
												)}
											</div>
											<div className='py-3'>
												<button
													className='btn text-black-eerie mt-10'
													data-name='Pioneer, Migrate, Settler'>
													<strong>Request </strong> for consultant
													review
												</button>
											</div>
										</div>
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
