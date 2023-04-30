import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useMemo, useRef } from "react";
import { IIdea } from "../../models/types";
import { IUserIdeas } from "../../models/user-idea";
import * as clientApi from "../../http-client/ideas.client";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { array, date, object, string } from "yup";
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Chart from "react-google-charts";
import useRoadmapChart from "../../hooks/use-roadmap-chart";
import Spinner from "../../components/common/spinner";
import ConsultantReview from "../../components/common/consultant-review";
import Header from "../../components/common/header";
import UserInfoHeader from "../../components/common/user-info-header";
import useModalToggler from "../../hooks/use-modal-toggler";

const Roadmap = () => {
	const { data: session }: any = useSession();

	const emptyUserIdeas: IUserIdeas = useMemo(() => {
		return {
			id: "",
			userId: session?.user?.id,
			ideas: [],
		} as IUserIdeas;
	}, []);

	const emptyIdea: IIdea = useMemo(() => {
		return {
			uuid: "",
			name: "",
			startMonth: "",
			durationInMonths: "",
		} as IIdea;
	}, []);

	const [userIdeas, setUserIdeas] = useState<IUserIdeas>(emptyUserIdeas);

	const formRef = useRef("");

	const minStartDateStr = useMemo(() => {
		return new Date().toISOString().substring(0, 7); // to get the "yyyy-mm" format
	}, []);

	const [chart] = useRoadmapChart(userIdeas.ideas);

	const { data, isLoading } = useQuery<IUserIdeas>({
		queryKey: [clientApi.Keys.All],
		queryFn: clientApi.getOne,
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		if (data) {
			setUserIdeas(data);
		}
	}, [data]);

	const queryClient = useQueryClient();

	const { mutate: createUserIdeas, isLoading: isCreatingIdea } = useMutation(
		(userIdeas: IUserIdeas) => {
			return clientApi.insertOne(userIdeas);
		},
		{
			onSuccess: (updated) => {
				queryClient.invalidateQueries([clientApi.Keys.All]);
			},
		}
	);

	const { mutate: updateUserIdeas, isLoading: isUpdatingIdeas } = useMutation(
		(userIdeas: IUserIdeas) => {
			return clientApi.updateOne(userIdeas);
		},
		{
			onSuccess: (updated) => {
				queryClient.invalidateQueries([clientApi.Keys.All]);
			},
		}
	);

	return (
		<>
			<div className='min-h-screen flex flex-col'>
				<input
					type='hidden'
					name='_token'
					value='E6vydmJoblEw5asasVKo4Ehneri0ZmjnuHJ03vSY'
				/>
				<div className='pane-upper flex flex-col'>
					<div className='px-12 py-8 flex flex-col gap-5 mx-auto lg:w-11/12'>
						<div className='flex gap-5 justify-between items-center pb-5'>
							<UserInfoHeader className='w-1/2'></UserInfoHeader>
							<Header className='w-full mb-10'></Header>
						</div>
						<h3 className='text-[2.52rem] mb-6 text-yellow-green'>
							Roadmap
						</h3>
						<div className='flex flex-col gap-5'>
							<h4 className='text-[2.1rem] mb-6'>
								Create a timeline for your ideas
							</h4>
							<Formik
								initialValues={{
									startDate: new Date(""),
									ideas: userIdeas.ideas,
								}}
								validationSchema={object({
									startDate: date()
										.typeError("The value must be a date (MM-yyyy)")
										.required("required"),
									ideas: array(
										object({
											uuid: string(),
											name: string().required("required"),
											startMonth: date()
												.required("start")
												.min(
													new Date(
														new Date().setHours(0, 0, 0, 0)
													),
													"Date cannot be in the past"
												),
											durationInMonths: date().required("start"),
										})
									)
										.required("Must provide at least one idea !")
										.min(1, "Must provide at least one idea !"),
								})}
								onSubmit={async (values, actions) => {
									userIdeas.userId = session?.user?.id;
									values.ideas?.map((idea) => {
										if (!idea.uuid) {
											idea.uuid = crypto.randomUUID();
										}
									});
									if (userIdeas?.id) {
										await updateUserIdeas({
											...userIdeas,
											ideas: values.ideas,
										});
									} else {
										await createUserIdeas({
											...userIdeas,
											ideas: values.ideas,
										});
									}
									actions.setSubmitting(false);
								}}
								enableReinitialize
								validateOnMount>
								{({ values, isSubmitting, isValid }) => (
									<Form>
										<div className='flex g-1 gap-5 mb-10'>
											<div>Start date</div>
											<div className='grow'>
												<Field
													type='month'
													name='startDate'
													min={minStartDateStr}
													className='w-full grow px-[1.6rem] py-[1rem] bg-gray-100 outline-none caret-dark-blue border-none'
												/>
												<ErrorMessage name='startDate'>
													{(msg) => (
														<div className='text-lg text-rose-500'>
															{msg}
														</div>
													)}
												</ErrorMessage>
											</div>
										</div>
										<FieldArray name='ideas'>
											{({ push, remove }) => (
												<>
													<ul className='flex flex-col gap-3 mb-5'>
														{!!values.ideas?.length &&
															values.ideas.map((idea, index) => (
																<li
																	key={index}
																	className='flex gap-5 items-start'>
																	<div className='flex flex-col'>
																		<div>Idea</div>
																		<Field
																			name={`ideas.${index}.name`}
																			className='w-full grow px-[1.6rem] py-[1rem] bg-gray-100 outline-none caret-dark-blue border-none'
																		/>
																	</div>
																	<div className='grow md:flex gap-5'>
																		<div className='grow'>
																			<div>
																				Start (month)
																			</div>
																			<Field
																				type='month'
																				min={
																					minStartDateStr
																				}
																				name={`ideas.${index}.startMonth`}
																				className='w-full grow px-[1.6rem] py-[1rem] bg-gray-100 outline-none caret-dark-blue border-none'
																			/>
																			<ErrorMessage
																				name={`ideas.${index}.startMonth`}>
																				{(msg) => (
																					<div className='text-lg text-rose-500'>
																						{msg}
																					</div>
																				)}
																			</ErrorMessage>
																		</div>
																		<div className='grow'>
																			<div>
																				Duration (months)
																			</div>
																			<Field
																				type='range'
																				min={1}
																				max={12}
																				name={`ideas.${index}.durationInMonths`}
																				list='duration'
																				className='w-full grow bg-gray-100 outline-none caret-dark-blue border-none'
																				step={1}
																			/>
																			<datalist
																				id='duration'
																				className='flex items-center justify-between text-lg w-full'>
																				<option
																					value={1}
																					label='01'
																					className='text-[1.12rem]'></option>
																				<option
																					value={2}
																					label='02'
																					className='text-[1.12rem]'></option>
																				<option
																					value={3}
																					label='03'
																					className='text-[1.12rem]'></option>
																				<option
																					value={4}
																					label='04'
																					className='text-[1.12rem]'></option>
																				<option
																					value={5}
																					label='05'
																					className='text-[1.12rem]'></option>
																				<option
																					value={6}
																					label='06'
																					className='text-[1.12rem]'></option>
																				<option
																					value={7}
																					label='07'
																					className='text-[1.12rem]'></option>
																				<option
																					value={8}
																					label='08'
																					className='text-[1.12rem]'></option>
																				<option
																					value={9}
																					label='09'
																					className='text-[1.12rem]'></option>
																				<option
																					value={10}
																					label='10'
																					className='text-[1.12rem]'></option>
																				<option
																					value={11}
																					label='11'
																					className='text-[1.12rem]'></option>
																				<option
																					value={12}
																					label='12'
																					className='text-[1.12rem]'></option>
																			</datalist>
																		</div>
																		<div className='col-2/12'>
																			<div
																				onClick={() => {
																					remove(index);
																				}}>
																				<FontAwesomeIcon
																					icon={faTimes}
																					className='w-[1rem] cursor-pointer hover:text-rose-500'
																				/>
																			</div>
																		</div>
																	</div>
																</li>
															))}
													</ul>
													<div className='flex gap-5 flex-wrap my-10'>
														<div className='flex gap-5'>
															<button
																onClick={() => {
																	push(emptyIdea);
																}}
																className='btn blue-gradient text-black-eerie hover:text-white'>
																+ Add another
															</button>
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
																Generate
															</button>
															<Link
																href='/'
																className='btn text-black-eerie hover:text-blue-ncs'>
																<strong>
																	Back To Dashboard
																</strong>
															</Link>
														</div>
														{isLoading && (
															<div className='flex grow'>
																<Spinner
																	className=''
																	message='Saving Ideas ...'
																/>
															</div>
														)}
													</div>
												</>
											)}
										</FieldArray>
									</Form>
								)}
							</Formik>
						</div>
					</div>
				</div>
				<div className='pane-lower-gradient grow'>
					<div className='px-12 py-8 mx-auto lg:w-11/12'>
						<Chart {...chart} legendToggle />
						<ConsultantReview pageTitle='Roadmap'></ConsultantReview>
					</div>
				</div>
			</div>
		</>
	);
};

export default Roadmap;
