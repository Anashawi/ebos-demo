import { FieldArray, Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import IdeasModal from "../../components/app/ideas-modal";
import useModalToggler from "../../hooks/use-modal-toggler";
import { useEffect, useMemo, useState } from "react";
import CompetitorsProduct from "../../components/competitors/product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as clientApi from "../../http-client/products.client";
import { IUserProduct } from "../../models/user-product";
import { useSession } from "next-auth/react";
import { productPagesEnum } from "../../models/enums";
import Spinner from "../../components/common/spinner";
import { IProduct } from "../../models/types";
import { ICompetitor } from "../../models/types";
import { object, array, string, number, ValidationError } from "yup";
import ConsultantReview from "../../components/common/consultant-review";
import Header from "../../components/common/header";
import UserInfoHeader from "../../components/common/user-info-header";

const Competitors = () => {
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
		data?.products?.forEach((prod) => {
			if (
				!prod.competitors ||
				(prod.competitors && prod.competitors.length === 0)
			) {
				prod.competitors = [meAsCompetitor];
			}
		});
		setUserProduct(data ?? emptyUserProduct);
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

	const meAsCompetitor = useMemo(() => {
		return {
			uuid: crypto.randomUUID(),
			name: "Me",
			marketShare: 100,
		} as ICompetitor;
	}, []);

	const [lookupProducts, setLookupProducts] = useState<IProduct[]>([]);

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
								pageTitle="Market Potential"
								toggleIdeasModal={toggleIdeasModal}></Header>
						</div>

						<h3 className='text-[2.52rem] text-yellow-green'>
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
													)

											})
										)
											.test((competitors: any, curr) => {
												const sum = competitors.reduce(
													(acc: number, curr: any) =>
														curr.marketShare + acc,
													0
												);
												if (sum !== 100) {
													let msg = "";
													if (100 - sum > 0) {
														msg = `you have ${100 - sum
															}% left `;
													} else {
														msg = `you have ${sum - 100
															}% more`;
													}
													return new ValidationError(
														{
															errorMessage: `The sum of product market shares must be 100% ${msg}`,
															product_uuid: curr.parent.uuid,
														} as any,
														undefined,
														`competitors`
													);
												}
												return true;
											})
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
									userProduct.products =
										values.products.concat(lookupProducts);
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
													<div className='flex flex-col gap-12 mt-20'>
														<div className='flex flex-col gap-20'>
															{!values.products?.length &&
																!isLoading && (
																	<p className='w-max italic py-5'>
																		Select a product to start analyzing its market potential ...
																	</p>
																)}
															{isLoading && (
																<Spinner
																	className='text-3xl'
																	message='Loading ...'></Spinner>
															)}
															{!!values.products.length &&
																values.products.map(
																	(
																		product,
																		productIndex
																	) => (
																		<div
																			key={productIndex}>
																			<CompetitorsProduct
																				product={product}
																				index={
																					productIndex
																				}
																				onRemove={() => {
																					setLookupProducts(
																						(
																							prevValue
																						) => [
																								...prevValue,
																								product,
																							]
																					);
																					remove(
																						productIndex
																					);
																				}}
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
														<div className='pr-12 flex items-center gap-5'>
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

															{lookupProducts.length > 0 && <select
																className='min-w-[200px] max-w-[330px] grow p-3 bg-gray-100 outline-none caret-dark-blue border-none'
																value={0}
																onChange={(e) => {
																	const productToBeShown =
																		userProduct.products?.find(
																			(prod) =>
																				prod.uuid ===
																				e.target.value
																		);
																	push(productToBeShown);
																	setLookupProducts(
																		(prevValue) =>
																			prevValue.filter(
																				(prod) =>
																					prod.uuid !==
																					e.target.value
																			)
																	);
																}}>
																<option value={0}>
																	Add one of existing products
																</option>
																{lookupProducts.map(
																	(product, index) => (
																		<option
																			key={index}
																			value={
																				product.uuid
																			}>
																			{product.name}
																		</option>
																	)
																)}
															</select>}
															{(!!isLoading ||
																isUpdatingUserProduct) && (
																	<Spinner
																		className='flex items-center px-10 text-2xl'
																		message='Saving Market Potential'
																	/>
																)}

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

export default Competitors;
