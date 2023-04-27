import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { Field, FieldArray, Form, Formik } from "formik";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import useModalToggler from "../../hooks/use-modal-toggler";
import { IUserAnalysis } from "../../models/user-analysis";
import * as clientApi from "../../http-client/analysis.client";
import { object, array, string } from "yup";

const Analysis = () => {
	const [isIdeasModalOpen, toggleIdeasModal] = useModalToggler();

	const { data: session }: any = useSession();

	const emptyUserAnalysis = useMemo(() => {
		return {
			id: "",
			userId: session?.user?.id,
			above: [],
			below: [],
		} as IUserAnalysis;
	}, []);

	const [userAnalysis, setUserAnalysis] =
		useState<IUserAnalysis>(emptyUserAnalysis);

	const queryClient = useQueryClient();

	const { data, isLoading } = useQuery<IUserAnalysis>({
		queryKey: [clientApi.Keys.All],
		queryFn: clientApi.getOne,
		refetchOnWindowFocus: false,
		enabled: !!session?.user?.id,
	});

	useEffect(() => {
		if (data) {
			setUserAnalysis(data);
		}
	}, [data]);

	const { mutate: updateUserAnalysis, isLoading: isUpdatingUserAnalysis } =
		useMutation(
			(userAnalysis: IUserAnalysis) => {
				return clientApi.updateOne(userAnalysis);
			},
			{
				onMutate: (updated) => {
					queryClient.setQueryData(
						[clientApi.Keys.All, userAnalysis.id],
						updated
					);
				},
				onSuccess: (updated) => {
					queryClient.invalidateQueries([
						clientApi.Keys.All,
						userAnalysis.id,
					]);
					queryClient.invalidateQueries([clientApi.Keys.All]);
				},
			}
		);

	const { mutate: createUserAnalysis, isLoading: isCreatingUserAnalysis } =
		useMutation(
			(userAnalysis: IUserAnalysis) => clientApi.insertOne(userAnalysis),
			{
				onMutate: (updated) => {
					queryClient.setQueryData(
						[clientApi.Keys.All, userAnalysis.id],
						updated
					);
				},
				onSuccess: (updated) => {
					queryClient.invalidateQueries([
						clientApi.Keys.All,
						userAnalysis.id,
					]);
					queryClient.invalidateQueries([clientApi.Keys.All]);
				},
			}
		);

	return (
		<>
			<div className='homepage-bg-gradient w-screen bg-white'>
				<div className='px-12 mx-0 my-auto md:w-[calc(1300px_-_1.5_*_2)] lg:w-[960px_-_1.5rem_*_2] xl:w-[1300_-_1.5rem_*_2]'>
					<div className='flex flex-wrap'>
						<div className='md:w-4/12 bg-white p-12 relative'>
							<div className='pb-5'>
								<strong className='mr-1'>Mustafa Khairy </strong> |
								<a href='http://bo.adpadelhouse.com/logout'> logout </a>
							</div>
							<h3 className='text-[2.52rem] my-10 text-yellow-green'>
								Step-up step-down
							</h3>
							<Formik
								initialValues={{
									...userAnalysis,
								}}
								validationSchema={object({
									above: array(string()),
									below: array(string()),
								})}
								onSubmit={async (values, { setSubmitting }) => {
									values.userId = session?.user?.id;
									if (!values.id) {
										await createUserAnalysis(values);
									} else {
										await updateUserAnalysis(values);
									}
									setSubmitting(false);
								}}
								enableReinitialize
								validateOnMount>
								{({ values, isSubmitting, isValid }) => {
									return (
										<Form className='flex flex-col gap-10'>
											<FieldArray name='above'>
												{({ push, remove }) => {
													return (
														<div className='flex flex-col gap-5'>
															<h6 className='f6 mb-2'>
																10% above
															</h6>
															<ul className='flex flex-col gap-5'>
																{!!values.above?.length &&
																	values.above.map(
																		(item, index) => (
																			<li key={index}>
																				<Field
																					type='text'
																					className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none is_above'
																					name={`above.${index}`}
																				/>
																				<a
																					onClick={() => {
																						remove(index);
																					}}
																					className='btn-delete deleteItem'>
																					X
																				</a>
																			</li>
																		)
																	)}
															</ul>
															<div>
																<a
																	onClick={() => {
																		push("");
																	}}
																	className='btn blue-gradient text-black-eerie hover:text-white'>
																	+ Add
																</a>
															</div>
														</div>
													);
												}}
											</FieldArray>
											<FieldArray name='below'>
												{({ push, remove }) => {
													return (
														<div className='flex flex-col gap-5'>
															<h6 className='f6 mb-2'>
																10% below
															</h6>
															<ul className='flex flex-col gap-5 below'>
																{!!values.below?.length &&
																	values.below.map(
																		(item, index) => (
																			<li key={index}>
																				<Field
																					type='text'
																					className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none is_below'
																					name={`below.${index}`}
																				/>
																				<a
																					onClick={() => {
																						remove(index);
																					}}
																					className='btn-delete deleteItem'>
																					X
																				</a>
																			</li>
																		)
																	)}
															</ul>
															<div>
																<a
																	onClick={() => {
																		push("");
																	}}
																	className='btn blue-gradient text-black-eerie hover:text-white'>
																	+ Add
																</a>
															</div>
														</div>
													);
												}}
											</FieldArray>
											<div className='flex gap-5'>
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
											</div>
										</Form>
									);
								}}
							</Formik>
						</div>
						<div className='md:w-8/12 pane-right-gradient min-h-screen px-12 py-8'>
							<Link href='/' className='logo-pane'>
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
							<div className='py-3'>
								<div className='p-5 relative rounded-lg bg-gray-100 text-gray-800 mb-2'>
									<div className='p-6 relative rounded-lg mb-2'>
										<h6 className='f6 mb-2'>10% Above</h6>
										<ul className='normal mb-2 is_aboveli'>
											{userAnalysis.above.map((item, index) => (
												<li key='index' className='bg-gray-200 p-3'>
													{item}
												</li>
											))}
										</ul>
									</div>
									<div className='p-6 relative rounded-lg p-6 relative rounded-lg bg-gray-800 text-white'>
										Your customer
									</div>
									<div className='p-6 relative rounded-lg mb-2'>
										<h6 className='f6 mb-2'>10% below</h6>
										<ul className='normal mb-2 is_belowli'>
											{userAnalysis.below.map((item, index) => (
												<li key='index' className='bg-gray-200 p-3'>
													{item}
												</li>
											))}
										</ul>
									</div>
								</div>
								<button
									className='btn text-black-eerie mt-10'
									data-name='Goals'
									id=''>
									<strong>Request </strong> for consultant review
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Analysis;
