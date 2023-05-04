import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { Field, FieldArray, Form, Formik } from "formik";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { object, array, string } from "yup";
import * as clientApi from "../../http-client/non-customers.client";
import { IUserNonCustomers } from "../../models/user-non-customers";
import Spinner from "../../components/common/spinner";
import ConsultantReview from "../../components/common/consultant-review";
import UserInfoHeader from "../../components/common/user-info-header";
import Header from "../../components/common/header";

const NonCustomers = () => {
	const { data: session }: any = useSession();

	const emptyUserNonCustomers = useMemo(() => {
		return {
			id: "",
			userId: session?.user?.id,
			soonNonCustomers: [],
			refusingCustomers: [],
			unwantedCustomers: [],
		} as IUserNonCustomers;
	}, []);

	const [userNonCustomers, setUserNonCustomers] = useState<IUserNonCustomers>(
		emptyUserNonCustomers
	);

	const queryClient = useQueryClient();

	const { data, isLoading } = useQuery<IUserNonCustomers>({
		queryKey: [clientApi.Keys.All],
		queryFn: clientApi.getOne,
		refetchOnWindowFocus: false,
		enabled: !!session?.user?.id,
	});

	useEffect(() => {
		if (data) {
			setUserNonCustomers(data);
		}
	}, [data]);

	const {
		mutate: updateUserNonCustomers,
		isLoading: isUpdatingUserNonCustomers,
	} = useMutation(
		(userNonCustomers: IUserNonCustomers) => {
			return clientApi.updateOne(userNonCustomers);
		},
		{
			onMutate: (updated) => {
				queryClient.setQueryData(
					[clientApi.Keys.All, userNonCustomers.id],
					updated
				);
			},
			onSuccess: (updated) => {
				queryClient.invalidateQueries([
					clientApi.Keys.All,
					userNonCustomers.id,
				]);
				queryClient.invalidateQueries([clientApi.Keys.All]);
			},
		}
	);

	const {
		mutate: createUserNonCustomers,
		isLoading: isCreatingUserNonCustomers,
	} = useMutation(
		(userNonCustomers: IUserNonCustomers) =>
			clientApi.insertOne(userNonCustomers),
		{
			onMutate: (updated) => {
				queryClient.setQueryData(
					[clientApi.Keys.All, userNonCustomers.id],
					updated
				);
			},
			onSuccess: (updated) => {
				queryClient.invalidateQueries([
					clientApi.Keys.All,
					userNonCustomers.id,
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
						<div className='w-1/2 bg-white p-12 relative'>
							<UserInfoHeader></UserInfoHeader>

							<h3 className='text-[2.52rem] my-10 text-yellow-green'>
								Non customers
							</h3>
							<Formik
								initialValues={{
									...userNonCustomers,
								}}
								validationSchema={object({
									soonNonCustomers: array(string()),
									refusingCustomers: array(string()),
									unwantedCustomers: array(string()),
								})}
								onSubmit={async (values, { setSubmitting }) => {
									values.userId = session?.user?.id;
									if (!values.id) {
										await createUserNonCustomers(values);
									} else {
										await updateUserNonCustomers(values);
									}
									setSubmitting(false);
								}}
								enableReinitialize
								validateOnMount>
								{({ values, isSubmitting, isValid, errors }) => {
									return (
										<Form className='flex flex-col gap-3 mb-5'>
											<h6 className='f6  mb-2'>
												Soon to be non Customers
											</h6>
											<FieldArray name='soonNonCustomers'>
												{({ push, remove }) => {
													return (
														<>
															<ul className='flex flex-col gap-5 non'>
																{!!values.soonNonCustomers
																	?.length &&
																	values.soonNonCustomers.map(
																		(nonCustomer, index) => (
																			<li key={index}>
																				<Field
																					type='text'
																					className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none nonCustomers'
																					name={`soonNonCustomers.${index}`}
																				/>
																				<button
																					onClick={() => {
																						remove(index);
																					}}
																					className='btn-delete deleteItem'>
																					X
																				</button>
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
														</>
													);
												}}
											</FieldArray>
											<div className='flex flex-col gap-3 my-5'>
												<h6 className='f6  mb-2'>
													Refusing customers
												</h6>
												<FieldArray name='refusingCustomers'>
													{({ push, remove }) => {
														return (
															<>
																<ul className='flex flex-col gap-5 non'>
																	{!!values.refusingCustomers
																		?.length &&
																		values.refusingCustomers.map(
																			(
																				nonCustomer,
																				index
																			) => (
																				<li key={index}>
																					<Field
																						type='text'
																						className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none nonCustomers'
																						name={`refusingCustomers.${index}`}
																					/>
																					<button
																						onClick={() => {
																							remove(
																								index
																							);
																						}}
																						className='btn-delete deleteItem'>
																						X
																					</button>
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
															</>
														);
													}}
												</FieldArray>
											</div>
											<div className='flex flex-col gap-3 my-5'>
												<h6 className='f6  mb-2'>
													Unwanted customers
												</h6>
												<FieldArray name='unwantedCustomers'>
													{({ push, remove }) => {
														return (
															<>
																<ul className='flex flex-col gap-5 non'>
																	{!!values.unwantedCustomers
																		?.length &&
																		values.unwantedCustomers.map(
																			(
																				nonCustomer,
																				index
																			) => (
																				<li key={index}>
																					<Field
																						type='text'
																						className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none nonCustomers'
																						name={`unwantedCustomers.${index}`}
																					/>
																					<button
																						onClick={() => {
																							remove(
																								index
																							);
																						}}
																						className='btn-delete deleteItem'>
																						X
																					</button>
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
															</>
														);
													}}
												</FieldArray>
											</div>
											<div className='flex flex-wrap gap-5 py-3'>
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
												{(!!isLoading ||
													isUpdatingUserNonCustomers ||
													isCreatingUserNonCustomers) && (
													<Spinner
														className='flex items-center px-1 text-2xl'
														message='Loading ...'
													/>
												)}
											</div>
										</Form>
									);
								}}
							</Formik>
						</div>
						<div className='w-1/2 pane-right-gradient min-h-screen px-12 py-8'>
							<Header className='w-full mb-10'></Header>
							<div className='p-5 relative rounded-lg bg-gray-100 text-gray-800'>
								<div className='p-6 relative rounded-lg mb-10 p-6 relative rounded-lg bg-gray-300'>
									<div className='p-6 relative rounded-lg mb-10 p-6 relative rounded-lg bg-yellow-jasmine text-gray-900'>
										<h6 className='f6 mb-2'>
											Soon to be non nonCustomers
										</h6>
										<ul className='normal mb-2'>
											{!!userNonCustomers.soonNonCustomers?.length &&
												userNonCustomers.soonNonCustomers.map(
													(nonCustomers, index) => (
														<li key={index}>{nonCustomers}</li>
													)
												)}
										</ul>
									</div>
									<h6 className='f6 mb-2'>Refusing nonCustomers</h6>
									<ul className='normal mb-2'>
										{!!userNonCustomers.refusingCustomers?.length &&
											userNonCustomers.refusingCustomers.map(
												(customer, index) => (
													<li key={index}>{customer}</li>
												)
											)}
									</ul>
								</div>
								<h6 className='f6 mb-2'>Unwanted nonCustomers</h6>
								<ul className='normal mb-2'>
									{!!userNonCustomers.unwantedCustomers?.length &&
										userNonCustomers.unwantedCustomers.map(
											(customer, index) => (
												<li key={index}>{customer}</li>
											)
										)}
								</ul>
							</div>
							<div className='py-3'>
								<ConsultantReview
									className='mt-10'
									pageTitle='Non Customers'></ConsultantReview>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default NonCustomers;
