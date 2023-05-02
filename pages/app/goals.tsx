import { Field, FieldArray, Form, Formik, ErrorMessage } from "formik";
import { useEffect, useMemo, useState } from "react";
import useModalToggler from "../../hooks/use-modal-toggler";
import { array, date, object, string } from "yup";
import Spinner from "../../components/common/spinner";
import * as clientApi from "../../http-client/goals.client";
import * as videosClientApi from "../../http-client/videos.client";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { IUserGoals } from "../../models/user-goal";
import IdeasModal from "../../components/app/ideas-modal";
import { useSession } from "next-auth/react";
import { IVideos } from "../../models/videos";
import Header from "../../components/common/header";
import UserInfoHeader from "../../components/common/user-info-header";
import ConsultantReview from "../../components/common/consultant-review";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../components/common/modal";
import GoalsVideoForm from "../../components/videos/goals-video-form";

const Goals = () => {
	const [isIdeasModalOpen, toggleIdeasModal] = useModalToggler();
	const [isEditUrlsModalOn, toggleEditVideoModal] = useModalToggler();

	const { data: session }: any = useSession();

	const emptyUserGoal = useMemo(() => {
		return {
			id: "",
			userId: session?.user?.id,
			targetDate: "",
			goals: [],
		} as IUserGoals;
	}, []);

	const [userGoals, setUserGoal] = useState<IUserGoals>(emptyUserGoal);

	const queryClient = useQueryClient();

	const { data, isLoading } = useQuery<IUserGoals>({
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

	const [goalsVideo, setGoalsVideo] = useState<string>("");

	const { data: videos, isLoading: isVideosLoading } = useQuery<IVideos>({
		queryKey: [videosClientApi.Keys.all],
		queryFn: videosClientApi.getOne,
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		if (videos) {
			setGoalsVideo(videos.goalsVideo);
		}
	}, [videos]);

	const { mutate: updateUserGoal, isLoading: isUpdatingUserGoal } =
		useMutation(
			(userGoals: IUserGoals) => {
				return clientApi.updateOne(userGoals);
			},
			{
				onMutate: (updated) => {
					queryClient.setQueryData(
						[clientApi.Keys.UserGoals, userGoals.id],
						updated
					);
				},
				onSuccess: (updated) => {
					queryClient.invalidateQueries([
						clientApi.Keys.UserGoals,
						userGoals.id,
					]);
					queryClient.invalidateQueries([clientApi.Keys.All]);
				},
			}
		);

	const { mutate: createUserGoal, isLoading: isCreatingUserGoal } =
		useMutation((userGoals: IUserGoals) => clientApi.insertOne(userGoals), {
			onMutate: (updated) => {
				queryClient.setQueryData(
					[clientApi.Keys.UserGoals, userGoals.id],
					updated
				);
			},
			onSuccess: (updated) => {
				queryClient.invalidateQueries([
					clientApi.Keys.UserGoals,
					userGoals.id,
				]);
				queryClient.invalidateQueries([clientApi.Keys.All]);
			},
		});

	return (
		<>
			<IdeasModal isOpen={isIdeasModalOpen} toggle={toggleIdeasModal} />

			<div className='homepage-bg-gradient w-screen bg-white'>
				<div className='px-12 mx-0 my-auto md:w-[calc(1300px_-_1.5_*_2)] lg:w-[960px_-_1.5rem_*_2] xl:w-[1300_-_1.5rem_*_2]'>
					<div className='flex flex-col py-12'>
						<div className='flex justify-between items-center gap-12 px-12'>
							<UserInfoHeader className='w-1/2'></UserInfoHeader>
							<Header
								className='w-1/2'
								toggleIdeasModal={toggleIdeasModal}></Header>
						</div>
						<div className='flex flex-wrap'>
							<div className='md:w-1/2 bg-white relative px-12 flex flex-col gap-5 mt-5'>
								<h3 className='text-[2.52rem] text-yellow-green'>
									Goals
								</h3>
								<Formik
									initialValues={{
										...userGoals,
									}}
									validationSchema={object({
										goals: array(string())
<<<<<<< HEAD
											.required(
												"Start defining your goals toward success, click Add New Goal!"
											)
											.min(
												1,
												"Start defining your goals toward success, click Add New Goal!"
											),
=======
											.required("Start defining your goals toward success, click Add New Goal!")
											.min(0, "Start defining your goals toward success, click Add New Goal!"),
>>>>>>> 1e2efae6be47b761f7a47dbce514fb3cea916ec8
										targetDate: date().required(
											"Must add a target date"
										),
									})}
									onSubmit={async (values, actions) => {
										userGoals.userId = session?.user?.id;
										if (userGoals?.id) {
											await updateUserGoal({
												...userGoals,
												...values,
											});
										} else {
											const { userId, ...newValues } = values;
											await createUserGoal({
												...userGoals,
												...newValues,
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
															<ul className='flex flex-col gap-3 mb-10 text-gray-gunmetal'>
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
																				<li className='relative'>
																					<Field
																						type='text'
																						className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none goals'
																						name={`goals.${index}`}
																						placeholder='Goal name'
																					/>
																					<FontAwesomeIcon
																						icon={faTimes}
																						className='w-4 cursor-pointer absolute right-4 top-4'
																						onClick={() => {
																							remove(
																								index
																							);
																						}}
																					/>
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
																			<>
																				{form.errors.goals}
																			</>
																		</p>
																	)}
															</ul>
															<div className='flex justify-between gap-5 items-center'>
																<div className='flex gap-3'>
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
																	<button
																		type='button'
																		onClick={() => {
																			push("");
																		}}
																		className='inline-flex items-center gap-3 btn text-black-eerie'>
																		<FontAwesomeIcon
																			className='w-5 h-auto cursor-pointer'
																			icon={faPlus}
																		/>
																		<span>Add New Goal</span>
																	</button>

																</div>
																{isSubmitting ||
																	isCreatingUserGoal ||
																	(isUpdatingUserGoal && (
																		<Spinner
																			className=''
																			message='Saving Goals'
																		/>
																	))}

																{userGoal?.goals?.length > 0 && <Link href={'/'}>
																	<span className="text-md text-gray-400 italic">
																		go to next → <span className="text-gray-500">pioneer, migrator, settler</span>
																	</span>
																</Link>}
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
							<div className='md:w-1/2 pane-right-gradient min-h-screen px-12 flex flex-col gap-5 mt-14'>
								<iframe
									width='100%'
									height='400'
									src={goalsVideo}></iframe>
								<div className='flex justify-start items-center w-full gap-4 py-10 mx-auto'>
									<ConsultantReview
										pageTitle={
											"Visualize Success"
										}></ConsultantReview>
									{(session?.user as any)?.role === "admin" && (
										<button
											className='p-3 rounded inline-flex gap-5 items-center btn text-black-eerie hover:text-blue-ncs w-max'
											onClick={toggleEditVideoModal}>
											<span>Edit video Url</span>
											<FontAwesomeIcon
												className='w-7'
												icon={faEdit}
											/>
										</button>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* video urls form modal */}
			<Modal
				config={{
					isShown: isEditUrlsModalOn,
					closeCallback: toggleEditVideoModal,
					className:
						"flex flex-col lg:w-1/3 max-w-[1320px] rounded-xl overflow-hidden p-5 lg:p-10",
				}}>
				<GoalsVideoForm toggleEditVideoModal={toggleEditVideoModal} />
			</Modal>
		</>
	);
};

export default Goals;
