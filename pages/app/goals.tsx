import { Field, FieldArray, Form, Formik, ErrorMessage } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import useModalToggler from "../../hooks/use-modal-toggler";
import { array, date, object, string } from "yup";
import Spinner from "../../components/common/spinner";
import * as clientApi from "../../http-client/goals.client";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { IUserGoal } from "../../models/user-goal";
import IdeasModal from "../../components/app/ideas-modal";
import { useSession } from "next-auth/react";

const Goals = () => {
	const [isIdeasModalOpen, toggleIdeasModal] = useModalToggler();

	const { data: session }: any = useSession();

	const emptyUserGoal = useMemo(() => {
		return {
			id: "",
			userId: session?.user?.id,
			targetDate: "",
			goals: [],
		} as IUserGoal;
	}, []);

	const [userGoal, setUserGoal] = useState<IUserGoal>(emptyUserGoal);

	const queryClient = useQueryClient();

	const { data, isLoading, refetch } = useQuery<IUserGoal>({
		queryKey: [clientApi.Keys.All],
		queryFn: clientApi.getAll,
		refetchOnWindowFocus: false,
		enabled: !!session?.user?.id,
	});

	useEffect(() => {
		if (data) {
			setUserGoal(data);
		}
	}, [data]);

	const { mutate: updateUserGoal, isLoading: isUpdatingUserGoal } =
		useMutation(
			(userGoal: IUserGoal) => {
				return clientApi.updateOne(userGoal);
			},
			{
				onMutate: (updated) => {
					queryClient.setQueryData(
						[clientApi.Keys.UserGoal, userGoal.id],
						updated
					);
				},
				onSuccess: (updated) => {
					queryClient.invalidateQueries([
						clientApi.Keys.UserGoal,
						userGoal.id,
					]);
					queryClient.invalidateQueries([clientApi.Keys.All]);
				},
			}
		);

	const { mutate: createUserGoal, isLoading: isCreatingUserGoal } =
		useMutation((userGoal: IUserGoal) => clientApi.insertOne(userGoal), {
			onMutate: (updated) => {
				queryClient.setQueryData(
					[clientApi.Keys.UserGoal, userGoal.id],
					updated
				);
			},
			onSuccess: (updated) => {
				queryClient.invalidateQueries([
					clientApi.Keys.UserGoal,
					userGoal.id,
				]);
				queryClient.invalidateQueries([clientApi.Keys.All]);
			},
		});

	return (
		<>
			<IdeasModal isOpen={isIdeasModalOpen} toggle={toggleIdeasModal} />

			<div className='homepage-bg-gradient w-screen bg-white'>
				<div className='px-12 mx-0 my-auto md:w-[calc(1300px_-_1.5_*_2)] lg:w-[960px_-_1.5rem_*_2] xl:w-[1300_-_1.5rem_*_2]'>
					<div className='flex flex-wrap'>
						<div className='md:w-1/2 bg-white p-12 relative'>
							<div className='pb-5'>
								<strong className='mr-1'>Mustafa Khairy </strong> |
								<Link href='http://bo.adpadelhouse.com/logout'>
									{" "}
									logout{" "}
								</Link>
							</div>
							<h3 className='text-[2.52rem] mb-6 text-yellow-green'>
								Goals
							</h3>
							<Formik
								initialValues={{
									...userGoal,
								}}
								validationSchema={object({
									goals: array(string())
										.required("Must add at least one goal !")
										.min(1, "Must add at least one goal !"),
									targetDate: date().required(
										"Must add a target date"
									),
								})}
								onSubmit={async (values, actions) => {
									userGoal.userId = session.user.id;
									if (userGoal?.id) {
										await updateUserGoal({
											...userGoal,
											...values,
										});
									} else {
										await createUserGoal({
											...userGoal,
											...values,
										});
									}
									actions.setSubmitting(false);
								}}
								enableReinitialize
								validateOnMount>
								{({ values, isSubmitting, isValid, errors }) => (
									<>
										<h3 className='flex gap-5 flex-wrap items-start text-[2.52rem] mb-6 font-normal'>
											<p>Choose a target date</p>
											<div className='grow flex flex-col'>
												<Field
													type='date'
													className='p-3 bg-gray-100 outline-none caret-dark-blue border-none'
													name='targetDate'
													placeholder='Goal name'
												/>
												<ErrorMessage name={`targetDate`}>
													{(msg) => (
														<div className='text-lg text-rose-500'>
															{msg}
														</div>
													)}
												</ErrorMessage>
											</div>
										</h3>
										<h3 className='text-[2.52rem] mb-6 font-normal'>
											Visualize success on this date, What does it
											look like
										</h3>
										<h2 className='text-[4.2rem] mb-6 text-yellow-green'>
											Celebrating Unequivocal Success!
										</h2>
										<p className='mb-5'>
											Things you want to be celebrating:
										</p>

										<Form>
											<FieldArray name='goals'>
												{({ remove, push, form }) => (
													<>
														<ul className='flex flex-col gap-3 mb-10'>
															{isLoading && (
																<Spinner
																	className=''
																	message='Loading Goals'
																/>
															)}
															{!!values.goals?.length &&
																values.goals.map(
																	(
																		goal: string,
																		index: number
																	) => (
																		<div key={index}>
																			<li>
																				<Field
																					type='text'
																					className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none goals'
																					name={`goals.${index}`}
																					placeholder='Goal name'
																				/>
																				<Link
																					href=''
																					onClick={() => {
																						remove(index);
																					}}
																					className='btn-delete mt-2'>
																					x
																				</Link>
																			</li>
																			<ErrorMessage
																				name={`goals.${index}`}>
																				{(msg) => (
																					<div className='text-lg text-rose-500'>
																						{msg}
																					</div>
																				)}
																			</ErrorMessage>
																		</div>
																	)
																)}
															{!values.goals?.length &&
																form.errors?.goals &&
																!isLoading && (
																	<p className='p-3 text-center bg-rose-50 text-lg text-rose-500'>
																		<>{form.errors.goals}</>
																	</p>
																)}
														</ul>
														<div className='flex justify-between items-center'>
															<div className='flex gap-3'>
																<Link
																	href=''
																	onClick={() => {
																		push("");
																	}}
																	className='btn blue-gradient text-black-eerie hover:text-white'>
																	+ Add
																</Link>
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
																	Save and submit
																</button>
																<Link
																	href='/'
																	className='btn text-black-eerie hover:text-blue-ncs'>
																	<strong>
																		Back To Dashboard
																	</strong>
																</Link>
															</div>
															{isSubmitting ||
																isCreatingUserGoal ||
																(isUpdatingUserGoal && (
																	<Spinner
																		className=''
																		message='Saving Goals'
																	/>
																))}
														</div>
													</>
												)}
											</FieldArray>
										</Form>
									</>
								)}
							</Formik>
							{/* <script src="/modules/goals.js"></script> */}
						</div>
						<div className='md:w-1/2 pane-right-gradient min-h-screen p-12'>
							<div className=''>
								<button
									type='button'
									className='btn text-black-eerie'
									onClick={toggleIdeasModal}>
									My ideas
								</button>
							</div>
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
							<div className='p-5 relative rounded-lg bg-gray-100 text-gray-800 h-3 mb-10'>
								<iframe width='530' height='315'></iframe>
							</div>
							<div className='mx-auto text-center'>
								<button
									className='btn text-black-eerie mt-10'
									data-name='Goals'
									id='theSubmitBtn'>
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

export default Goals;
