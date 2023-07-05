import { FieldArray, Form, Formik } from "formik";
import { useEffect, useMemo } from "react";
import CompetitorsProduct from "./product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as clientApi from "../../http-client/products.client";
import { IUserProduct } from "../../models/user-product";
import { useSession } from "next-auth/react";
import { productPagesEnum } from "../../models/enums";
import Spinner from "../common/spinner";
import { ICompetitor } from "../../models/types";
import { object, array, string, number } from "yup";
import Link from "next/link";
import * as _ from "lodash";
import ZeroProductsWarning from "../common/zero-products-warning";
import FormikContextChild from "../products/formik-context-child";
import { useRouter } from "next/router";

interface Props {
	userProduct: IUserProduct;
	distpatchUserProduct: (userProduct?: IUserProduct) => void;
}

const MarketPotentialContent = ({
	userProduct,
	distpatchUserProduct,
}: Props) => {
	const router = useRouter();

	let dbProduct: IUserProduct | undefined;

	const { data: session }: any = useSession();

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
		distpatchUserProduct(data);
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
			<h3 className='title-header'>Market potential</h3>
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
										.min(0, "Market share must be 0 or greater"),
								})
							)
								.required("Must provide at least one competitor !")
								.min(1, "Must provide at least one competitor !"),
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
										<div className='flex flex-col gap-3'>
											<div className='flex flex-col gap-20'>
												{!userProduct.products?.length &&
													!isLoading && <ZeroProductsWarning />}
												{!values.products?.length &&
													!!userProduct.products?.length &&
													!isLoading && (
														<p className='w-max italic py-5'>
															Select a product to start analyzing
															its market potential ...
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
											<div>
												<div className='h-10'>
													{isUpdatingUserProduct && (
														<Spinner
															className='flex items-center text-xl'
															message='Saving Market Potential...'
														/>
													)}
												</div>
												<div className='flex gap-5 items-center justify-between'>
													{!!values.products?.length && (
														<div className='flex items-center gap-5'>
															<button
																type='submit'
																className={
																	isSubmitting || !isValid
																		? "btn-rev btn-disabled"
																		: "btn-rev"
																}
																disabled={
																	isSubmitting || !isValid
																}>
																Save
															</button>
														</div>
													)}
													{userProduct?.products?.length > 0 && (
														<div
															className='cursor-pointer bg-dark-200 px-7 py-3 rounded-full'
															onClick={() => {
																router.push("../org/red-ocean");
															}}>
															<span className='text-md text-white italic'>
																go to next →{" "}
																<span className='text-white'>
																	Red Ocean Canvas
																</span>
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
								dispatch={() => {
									distpatchUserProduct(
										_.cloneDeep({ ...userProduct, ...values })
									);
								}}
							/>
						</Form>
					);
				}}
			</Formik>
		</>
	);
};

export default MarketPotentialContent;
