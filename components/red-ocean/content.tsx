import { FieldArray, Form, Formik } from "formik";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import FactorsProduct from "../../components/red-ocean/product";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { productPagesEnum } from "../../models/enums";
import { IUserProduct } from "../../models/user-product";
import * as clientApi from "../../http-client/products.client";
import { IFactor } from "../../models/types";
import { string, object, array } from "yup";
import Spinner from "../../components/common/spinner";
import ZeroProductsWarning from "../../components/common/zero-products-warning";
import FormikContextChild from "../products/formik-context-child";
import { cloneDeep } from "lodash";

interface Props {
	userProduct: IUserProduct;
	dispatchUserProduct: (userProduct?: IUserProduct) => void;
}

const RedOceanContent = ({ userProduct, dispatchUserProduct }: Props) => {
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
			dispatchUserProduct(data);
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
			<div className='flex'>
				<div className='w-full mb-5 flex gap-12 items-center justify-between pr-12'>
					<h3 className='title-header'>Red Ocean Canvas</h3>
					<div className='w-1/2 pl-10 py-5 mx-auto'></div>
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
								.required("Must provide at least one factor !")
								.min(1, "Must provide at least one factor !"),
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
												{!userProduct.products?.length &&
													!isLoading && <ZeroProductsWarning />}
												{!values.products?.length &&
													!!userProduct.products?.length &&
													!isLoading && (
														<p className='text-rose-300'>
															make a selection to view products !
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
														(product, productIndex) => (
															<div key={productIndex}>
																<FactorsProduct
																	product={product}
																	index={productIndex}
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
													{!!userProduct.products?.length && (
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
													)}
													{userProduct?.products?.length > 0 && (
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

							<FormikContextChild
								dispatch={() => {
									dispatchUserProduct(
										cloneDeep({ ...userProduct, ...values })
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

export default RedOceanContent;
