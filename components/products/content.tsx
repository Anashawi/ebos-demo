import { FieldArray, Form, Formik } from "formik";
import Product from "./product";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as clientApi from "../../http-client/products.client";
import { useSession } from "next-auth/react";
import { IUserProduct } from "../../models/user-product";
import { IFuture, IProduct } from "../../models/types";
import Spinner from "../common/spinner";
import { productPagesEnum } from "../../models/enums";
import { object, array, string, number } from "yup";
import FormikContextChild from "./formik-context-child";
import { cloneDeep } from "lodash";
import { useRouter } from "next/router";

interface Props {
	dispatchChartProducts: (products: IProduct[]) => void;
}

const ProductsContent = ({ dispatchChartProducts }: Props) => {
	const { data: session }: any = useSession();

	const router = useRouter();

	const emptyUserProduct = {
		id: "",
		userId: session?.user?.id,
		products: [],
	} as IUserProduct;

	const [userProduct, setUserProduct] =
		useState<IUserProduct>(emptyUserProduct);

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

	const emptyProduct = {
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

	return (
		<>
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
				{({ values, isSubmitting, isValid, isValidating }) => {
					return (
						<Form>
							<FieldArray name='products'>
								{({ push, remove, form }) => {
									return (
										<div className='flex flex-col gap-5'>
											<div className='flex flex-wrap gap-5'>
												<h3 className='w-full text-[2.8rem] text-[#93a7c4] font-normal'>
													Pioneer, Migrator, Settler
												</h3>
												<div className='w-full flex flex-col gap-10'>
													{!!isLoading && (
														<Spinner
															className='flex items-center text-2xl'
															message='Loading Products...'
														/>
													)}
													{!!values.products?.length &&
														values.products?.map(
															(product, productIndex) => (
																<div key={productIndex}>
																	<Product
																		product={product}
																		index={productIndex}
																		onRemove={() => {
																			remove(productIndex);
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
																	<>{form.errors.products}</>
																</p>
															</div>
														)}
												</div>
											</div>
											<div>
												<div className='h-10'>
													{(isUpdatingUserProduct ||
														isCreatingUserProduct) && (
														<Spinner
															className='flex items-center text-lg'
															message='Saving Products'
														/>
													)}
												</div>
												<div className='flex gap-5 items-center justify-between px-7'>
													<div className='flex gap-5'>
														<button
															type='button'
															onClick={() => {
																push(emptyProduct);
															}}
															className='btn-primary px-8'>
															<FontAwesomeIcon
																className='w-4 h-auto cursor-pointer'
																icon={faPlus}
															/>
															<span>Add New Product</span>
														</button>
														<button
															type='submit'
															className={
																isSubmitting ||
																(!isValid && !isValidating)
																	? "btn-rev btn-disabled cursor-not-allowed"
																	: "btn-rev"
															}
															disabled={
																isSubmitting ||
																(!isValid && !isValidating)
															}>
															Save
														</button>
													</div>
													{userProduct?.products?.length > 0 && (
														<div
															className='cursor-pointer bg-dark-200 px-7 py-3 rounded-full'
															onClick={() => {
																router.push(
																	"../org/market-potential"
																);
															}}>
															<span className='text-md text-white italic'>
																go to next →{" "}
																<span>market potential</span>
															</span>
														</div>
													)}
												</div>
											</div>
										</div>
									);
								}}
							</FieldArray>

							<FormikContextChild
								dispatch={(values) => {
									dispatchChartProducts(cloneDeep(values.products));
								}}
							/>
						</Form>
					);
				}}
			</Formik>
		</>
	);
};

export default ProductsContent;
