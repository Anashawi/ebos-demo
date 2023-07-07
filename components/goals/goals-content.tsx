import { Field, FieldArray, Form, Formik, ErrorMessage } from "formik";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { array, date, object, string } from "yup";
import Spinner from "../../components/common/spinner";
import * as clientApi from "../../http-client/goals.client";
import * as videosClientApi from "../../http-client/videos.client";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { IUserGoals } from "../../models/user-goal";
import { useSession } from "next-auth/react";
import { IVideos } from "../../models/videos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

const GoalsContent = () => {
	const [goalToBeAdded, setGoalToBeAdded] = useState("");

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

	const router = useRouter();

	return (
		<>
			<h3 className='title-header'>
				Goals
			</h3>
			<Formik
				initialValues={{
					...userGoals,
				}}
				validationSchema={object({
					goals: array(string())
						.required(
							"Start defining your goals toward success, click Add New Goal!"
						)
						.min(
							0,
							"Start defining your goals toward success, click Add New Goal!"
						),
					targetDate: date().required("Must add a target date"),
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
						<h3 className='flex gap-5 flex-wrap items-center text-2xl mb-10 font-normal'>
							<div className='w-full xl:w-[40%] flex flex-col gap-2'>
								<label className='font-semibold text-[#4e79b2]'>
									Choose a target date
								</label>
								<div className='grow flex flex-col'>
									<Field
										type='date'
										className='light-input'
										min={new Date().toISOString().slice(0, 10)} // 10 chars for dd/mm/yyyy
										name='targetDate'
										placeholder='Target Date'
									/>
									<ErrorMessage name={`targetDate`}>
										{(msg) => (
											<div className='text-lg text-rose-500'>
												{msg}
											</div>
										)}
									</ErrorMessage>
								</div>
							</div>
						</h3>
						<p className='font-semibold text-[#4e79b2]'>
							Things you want to be celebrating:
						</p>
						<div className='flex flex-col gap-3'>
							<div className='pill-yellow-50 p-5'>
								<span>icon</span>
								<h3 className='text-xl text-gray-400 font-normal'>
									Visualize success on this date, What does it look
									like...?
								</h3>
							</div>

							<Form>
								<FieldArray name='goals'>
									{({ remove, push, form }) => (
										<>
											<ul className='lg:w-[90%] flex flex-col gap-3 mb-10 text-gray-gunmetal'>
												{isLoading && (
													<Spinner
														className=''
														message='Loading Goals'
													/>
												)}
												{!values.goals?.length && !isLoading && (
													<div className='w-full flex items-center'>
														<p className='text-2xl text-center text-gray-400 italic'>
															Start adding your goals...
														</p>
													</div>
												)}
												<div className='w-full flex gap-5 items-center'>
													<div className='w-[69%]'>
														<Field
															type='text'
															className='w-full light-input'
															placeholder='Enter your goal here'
															value={goalToBeAdded}
															onChange={(
																e: ChangeEvent<HTMLInputElement>
															) => {
																setGoalToBeAdded(
																	e.target.value
																);
															}}
														/>
													</div>
													<button
														type='button'
														onClick={() => {
															push(goalToBeAdded);
															setGoalToBeAdded("");
														}}
														disabled={!goalToBeAdded}
														className={
															!!goalToBeAdded
																? "grow inline-flex justify-center items-center gap-3 bg-[#4e79b2] text-white px-10 py-4 hover:bg-[#4e79b2] text-xl rounded-full"
																: "grow inline-flex justify-center items-center gap-3 bg-[#8cafdc] text-white px-10 py-4 hover:bg-[#8cafdc] text-xl rounded-full"
														}>
														<FontAwesomeIcon
															className='w-[0.8rem] h-auto cursor-pointer'
															icon={faPlus}
														/>
														<span className='text-lg'>Add New Goal</span>
													</button>
												</div>
												{!!values.goals?.length &&
													!isLoading &&
													values.goals.map(
														(goal: string, index: number) => (
															<div key={index}>
																<li className='relative w-[69%]'>
																	<Field
																		type='text'
																		className='dark-input'
																		name={`goals.${index}`}
																		readOnly
																		placeholder='Goal'
																	/>
																	<FontAwesomeIcon
																		icon={faTimes}
																		className='w-4 cursor-pointer absolute right-4 top-4 text-gray-500 hover:text-rose-800'
																		onClick={() => {
																			remove(index);
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
															<>{form.errors.goals}</>
														</p>
													)}
											</ul>
											<div className='h-12'>
												{isSubmitting ||
													isCreatingUserGoal ||
													(isUpdatingUserGoal && (
														<Spinner
															className='text-lg py-3'
															message='Saving Goals'
														/>
													))}
											</div>
											<div className='flex justify-between gap-5 items-center'>
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
												</div>
												{userGoals?.goals.filter(
													(str) => str?.length > 0
												)?.length > 0 && (
													<div
														className='cursor-pointer bg-dark-200 px-7 py-3 rounded-full'
														onClick={() => {
															router.push("../org/products");
														}}>
														<span className='text-md text-white italic'>
															go to next →{" "}
															<span className='text-white'>
																pioneer, migrator, settler
															</span>
														</span>
													</div>
												)}
											</div>
										</>
									)}
								</FieldArray>
							</Form>
						</div>
					</>
				)}
			</Formik>
			{/* <script src="/modules/goals.js"></script> */}
		</>
	);
};

export default GoalsContent;
