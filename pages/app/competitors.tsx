import { FieldArray, Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import IdeasModal from "../../components/app/ideas-modal";
import useModalToggler from "../../hooks/use-modal-toggler";
import * as Yup from "yup";
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
		data?.products.forEach((prod) => {
			if (
				!prod.competitors ||
				(prod.competitors && prod.competitors.length === 0)
			) {
				prod.competitors = [meAsCompetitor];
			}
		});
		setUserProduct(data ?? emptyUserProduct);
		setLookupProducts(!!data?.products.length ? data.products : []);
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

			<div className='market-potential-gradient w-screen bg-white'>
				<div className='min-h-screen px-12 mx-0 my-auto md:w-[calc(1300px_-_1.5_*_2)] lg:w-[960px_-_1.5rem_*_2] xl:w-[1300_-_1.5rem_*_2]'>
					<div className='flex flex-wrap'>
						<div className='flex flex-col gap-7 w-full p-12 relative'>
							<div className='flex items-center'>
								<div className='w-[66%]'>
									<strong className='mr-1'>Mustafa Khairy </strong> |
									<Link href='http://bo.adpadelhouse.com/logout'>
										logout
									</Link>
								</div>
								<div className='flex justify-between items-center gap-5 w-[34%]'>
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
							<div className='flex'>
								<div className='md:w-[66%] flex gap-12 justify-between pr-12'>
									<h3 className='text-[2.52rem] text-yellow-green'>
										Market potential
									</h3>
								</div>
							</div>
							<Formik
								initialValues={{
									products: userProduct.products.filter(
										(prod: any) =>
											!lookupProducts.some(
												(lookupProd) =>
													lookupProd.uuid === prod.uuid
											)
									),
								}}
								validationSchema={Yup.object({
									products: Yup.array(
										Yup.object({
											competitors: Yup.array(
												Yup.object({
													name: Yup.string().required("required"),
													marketShare: Yup.number()
														.required("required")
														.min(
															0,
															"Market share must be 0 or greater"
														)
														.max(
															100,
															"Market share must be less than 100"
														),
												})
											)
												.test((competitors: any, curr) => {
													console.log(curr.parent);
													const sum = competitors.reduce(
														(acc: number, curr: any) =>
															curr.marketShare + acc,
														0
													);
													if (sum !== 100) {
														return new Yup.ValidationError(
															{
																errorMessage: `The sum of product market shares must be 100% but you have ${sum}%`,
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
								validateOnMount>
								{({ values, isSubmitting, isValid, errors }) => {
									return (
										<Form>
											<FieldArray name='products'>
												{({ push, remove }) => {
													return (
														<div className='flex flex-col gap-12'>
															<div className='flex flex-col gap-20'>
																{!values.products?.length && (
																	<p className='w-max bg-rose-50 text-rose-500 p-5'>
																		make a selection to view
																		products !
																	</p>
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
															<div className='py-10 md:w-[66%] pr-12 flex items-center gap-5'>
																<label className='text-yellow-green font-semibold text-3xl'>
																	Show more products
																</label>
																<select
																	className='min-w-[200px] max-w-[330px] grow p-3 bg-gray-100 outline-none caret-dark-blue border-none'
																	value={0}
																	onChange={(e) => {
																		const productToBeShown =
																			userProduct.products.find(
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
																		select a product to be
																		displayed
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
																</select>
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
														isUpdatingUserProduct) && (
														<Spinner
															className='flex items-center px-10 text-2xl'
															message='Loading Products'
														/>
													)}
												</div>
												<div className='py-3'>
													<button
														className='btn text-black-eerie mt-10'
														data-name='Pioneer, Migrate, Settler'
														id='theSubmitBtn'>
														<strong>Request </strong> for
														consultant review
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
			</div>
		</>
	);
};

export default Competitors;
