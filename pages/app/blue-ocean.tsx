import { FieldArray, Form, Formik } from "formik";
import IdeasModal from "../../components/app/ideas-modal";
import useModalToggler from "../../hooks/use-modal-toggler";
import * as Yup from "yup";
import { useEffect, useMemo, useState } from "react";
import IdeaFactorsProduct from "../../components/idea-factors/product";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { productPagesEnum } from "../../models/enums";
import { IIdeaFactor, IProduct } from "../../models/types";
import { IUserProduct } from "../../models/user-product";
import * as clientApi from "../../http-client/products.client";
import ConsultantReview from "../../components/common/consultant-review";
import UserInfoHeader from "../../components/common/user-info-header";
import Header from "../../components/common/header";
import Link from "next/link";
import Spinner from "../../components/common/spinner";

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
			emptyFactor.competitors =
				prod.competitors?.map((comp) => {
					return {
						uuid: comp.uuid,
						value: "1",
					};
				}) ?? [];
			if (
				!prod.ideaFactors ||
				(prod.ideaFactors && prod.ideaFactors.length === 0)
			) {
				prod.ideaFactors = [
					{ ...emptyFactor, name: "idea example 1" },
					{ ...emptyFactor, name: "idea example 2" },
					{ ...emptyFactor, name: "idea example 3" },
				];
			}
		});
		if (data) {
			setUserProduct(data);
		}
		setUserProduct(data ?? emptyUserProduct);
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
		} as IIdeaFactor;
	}, []);

	return (
		<>
			<IdeasModal isOpen={isIdeasModalOpen} toggle={toggleIdeasModal} />

			<div className='factors-gradient w-screen bg-white'>
				<div className='min-h-screen px-12 mx-0 my-auto md:w-[calc(1300px_-_1.5_*_2)] lg:w-[960px_-_1.5rem_*_2] xl:w-[1300_-_1.5rem_*_2]'>
					<div className='flex flex-wrap'>
						<div className='flex flex-col gap-7 w-full p-12 relative'>
							<div className='flex gap-5 items-center'>
								<UserInfoHeader className='w-1/2'></UserInfoHeader>
								<Header
									className='w-1/2'
									toggleIdeasModal={toggleIdeasModal}></Header>
							</div>
							<div className='md:w-1/2 flex gap-12 justify-between mb-10 pr-12'>
								<h3 className='text-4xl text-yellow-green'>
									Blue Ocean Canvas
								</h3>
							</div>
							<Formik
								initialValues={{
									products: userProduct.products,
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
															<div className='flex flex-col gap-12'>
																<div className='flex flex-col gap-20'>
																	{!values.products?.length &&
																		!isLoading && (
																			<p className='text-rose-300'>
																				make a selection to
																				view products !
																			</p>
																		)}
																	{!!isLoading && (
																		<Spinner
																			className='flex items-center text-2xl'
																			message='Loading Blue Ocean...'
																		/>
																	)}
																	{!!values.products.length &&
																		values.products.map(
																			(
																				product,
																				productIndex
																			) => (
																				<div
																					key={
																						productIndex
																					}>
																					<IdeaFactorsProduct
																						product={
																							product
																						}
																						index={
																							productIndex
																						}
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
															</div>
															<div className='flex gap-3 items-center mt-10'>
																<div className='w-1/2 flex flex-col gap-3 pr-11'>
																	<div className='h-10'>
																		{isUpdatingUserProduct && (
																			<Spinner
																				className='flex items-center text-xl'
																				message='Saving Blue Ocean'
																			/>
																		)}
																	</div>
																	<div className='flex gap-5 justify-between items-center'>
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
																		{userProduct?.products
																			?.length > 0 && (
																			<Link href={"/"}>
																				<span className='text-md text-gray-400 italic'>
																					go to next →{" "}
																					<span className='text-gray-500'>
																						Non Customers
																					</span>
																				</span>
																			</Link>
																		)}
																	</div>
																</div>
																<div className='w-1/2 pl-9 py-3'>
																	<ConsultantReview pageTitle='Blue Ocean Canvas'></ConsultantReview>
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
		</>
	);
};

export default IdeaFactors;
