import { FieldArray, Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import IdeasModal from "../../components/app/ideas-modal";
import useModalToggler from "../../hooks/use-modal-toggler";
import * as Yup from "yup";
import { useEffect, useMemo, useState } from "react";
import IdeaFactorsProduct from "../../components/idea-factors/product";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { productPagesEnum } from "../../models/enums";
import { IFactor, IProduct } from "../../models/types";
import { IUserProduct } from "../../models/user-product";
import * as clientApi from "../../http-client/products.client";
import ConsultantReview from "../../components/common/consultant-review";

const IdeaFactors = () => {
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
			firstFactor.competitors =
				prod.competitors?.map((comp) => {
					return {
						uuid: comp.uuid,
						value: "0",
					};
				}) ?? [];
			if (!prod.factors || (prod.factors && prod.factors.length === 0)) {
				prod.factors = [firstFactor];
			}
		});
		setUserProduct(data ?? emptyUserProduct);
		setLookupProducts(!!data?.products?.length ? data.products : []);
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

	const firstFactor = useMemo(() => {
		return {
			name: "",
			competitors: [],
		} as IFactor;
	}, []);

	const [lookupProducts, setLookupProducts] = useState<IProduct[]>([]);

	return (
		<>
			<IdeasModal isOpen={isIdeasModalOpen} toggle={toggleIdeasModal} />

			<div className='factors-gradient w-screen bg-white'>
				<div className='min-h-screen px-12 mx-0 my-auto md:w-[calc(1300px_-_1.5_*_2)] lg:w-[960px_-_1.5rem_*_2] xl:w-[1300_-_1.5rem_*_2]'>
					<div className='flex flex-wrap'>
						<div className='flex flex-col gap-7 w-full p-12 relative'>
							<div className='flex gap-5 items-center'>
								<div className='w-1/2'>
									<strong className='mr-1'>Mustafa Khairy </strong>
									<span> | </span>
									<Link href='http://bo.adpadelhouse.com/logout'>
										logout
									</Link>
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
							<div className='flex'>
								<div className='md:w-1/2 flex gap-12 justify-between pr-12'>
									<h3 className='text-[2.52rem] text-yellow-green'>
										Blue Ocean Canvas
									</h3>
								</div>
							</div>
							<Formik
								initialValues={{
									products: userProduct.products?.filter(
										(prod) =>
											!lookupProducts.some(
												(lookupProd) =>
													lookupProd.uuid === prod.uuid
											)
									),
								}}
								validationSchema={Yup.object({
									products: Yup.array(
										Yup.object({
											ideaFactors: Yup.array(
												Yup.object({
													name: Yup.string().required("required"),
												})
											)
												.required(
													"Must provide at least one idea factor !"
												)
												.min(
													1,
													"Must provide at least one idea factor !"
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
																	<p className='text-rose-300'>
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
																				<IdeaFactorsProduct
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
															<div className='py-10 md:w-1/2 pr-12 flex items-center gap-5'>
																<label className='text-yellow-green font-semibold text-3xl'>
																	Show more products
																</label>
																<select
																	className='min-w-[200px] grow p-3 bg-gray-100 outline-none caret-dark-blue border-none'
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
													{!!userProduct.products?.filter(
														(prod) =>
															!lookupProducts.some(
																(lookupProd) =>
																	lookupProd.uuid === prod.uuid
															)
													).length && (
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
													<Link
														href='/'
														className='btn text-black-eerie hover:text-blue-ncs'>
														<strong>Back To Dashboard</strong>
													</Link>
												</div>
												<div className='py-3'>
													<ConsultantReview pageTitle='Blue Ocean Canvas'></ConsultantReview>
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

export default IdeaFactors;
