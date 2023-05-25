import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import * as clientApi from "../../http-client/non-customers.client";
import { IUserNonCustomers } from "../../models/user-non-customers";
import Spinner from "../../components/common/spinner";
import ConsultantReview from "../../components/common/consultant-review";
import UserInfoHeader from "../../components/common/user-info-header";
import Header from "../../components/common/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCirclePlus,
	faEdit,
	faEye,
	faTimes,
} from "@fortawesome/free-solid-svg-icons";
import useModalToggler from "../../hooks/use-modal-toggler";
import IdeasModal from "../../components/app/ideas-modal";
import Link from "next/link";
import Modal from "../../components/common/modal";
import SharedVideoForm from "../../components/videos/shared-video-form";
import Video from "../../components/videos/video";
import { videoPropNamesEnum } from "../../models/enums";

const NonCustomers = () => {
	const { data: session }: any = useSession();

	const emptyUserNonCustomers = {
		id: "",
		userId: session?.user?.id,
		soonNonCustomers: [],
		refusingCustomers: [],
		unwantedCustomers: [],
	} as IUserNonCustomers;

	const [userNonCustomers, setUserNonCustomers] = useState<IUserNonCustomers>(
		emptyUserNonCustomers
	);

	const [isIdeasModalOpen, toggleIdeasModal] = useModalToggler();
	const [isEditUrlsModalOn, toggleEditVideoModal] = useModalToggler();
	const [isVideoModalOn, toggleVideoModal] = useModalToggler();

	const queryClient = useQueryClient();

	const { data, isLoading } = useQuery<IUserNonCustomers>({
		queryKey: [clientApi.Keys.All],
		queryFn: clientApi.getOne,
		refetchOnWindowFocus: false,
		enabled: !!session?.user?.id,
	});

	useEffect(() => {
		if (!data) {
			setUserNonCustomers((prevValue) => {
				prevValue.soonNonCustomers = ["", "", ""];
				prevValue.refusingCustomers = ["", "", ""];
				prevValue.unwantedCustomers = ["", "", ""];
				return prevValue;
			});
		}
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
			<IdeasModal isOpen={isIdeasModalOpen} toggle={toggleIdeasModal} />

			<div className='homepage-bg-gradient bg-white'>
				<div className='px-12 mx-0 my-auto md:w-[calc(1300px_-_1.5_*_2)] lg:w-[960px_-_1.5rem_*_2] xl:w-[1300_-_1.5rem_*_2]'>
					<div className='flex flex-wrap'>
						<div className='w-1/2 bg-white p-12 relative'>
							<UserInfoHeader></UserInfoHeader>

							<h3 className='text-[2.8rem] my-10 text-yellow-green'>
								Non customers
							</h3>
							{isLoading && (
								<Spinner
									className='flex items-center px-1 text-2xl'
									message='Loading non customers...'
								/>
							)}
							{!isLoading && (
								<form className='flex flex-col'>
									<div className='flex flex-col gap-3 my-5'>
										<h6 className='f6 mb-2 text-xl'>
											Soon to be non Customers
										</h6>
										<ul className='flex flex-col gap-5'>
											{!userNonCustomers.soonNonCustomers?.length &&
												!isLoading && (
													<div className='w-full flex justify-start items-center'>
														<p className='py-5 text-lg text-center italic'>
															Start adding soon non customers...
														</p>
													</div>
												)}
											{!!userNonCustomers.soonNonCustomers?.length &&
												userNonCustomers.soonNonCustomers.map(
													(nonCustomer, index) => (
														<li
															key={index}
															className='flex items-center'>
															<input
																type='text'
																className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none text-xl'
																value={nonCustomer}
																onChange={(e) => {
																	setUserNonCustomers(
																		(prevValue) => {
																			prevValue.soonNonCustomers[
																				index
																			] = e.target.value;
																			return {
																				...prevValue,
																			};
																		}
																	);
																}}
															/>
															<button
																type='button'
																onClick={() => {
																	userNonCustomers.soonNonCustomers =
																		userNonCustomers.soonNonCustomers.filter(
																			(nonC, i) =>
																				i !== index
																		);
																	setUserNonCustomers({
																		...userNonCustomers,
																	});
																}}
																className='btn-delete'>
																<FontAwesomeIcon
																	icon={faTimes}
																	className='w-4 hover:text-rose-800'
																/>
															</button>
														</li>
													)
												)}
										</ul>
										<div className='flex justify-center'>
											<button
												type='button'
												onClick={() => {
													userNonCustomers.soonNonCustomers.push(
														""
													);
													setUserNonCustomers({
														...userNonCustomers,
													});
												}}
												className='inline-flex items-center gap-2 text-lg p-3 text-black-eerie hover:text-gray-600'>
												<FontAwesomeIcon
													className='w-5 h-auto cursor-pointer text-black-eerie hover:text-gray-600'
													icon={faCirclePlus}
												/>
												Add more non customers
											</button>
										</div>
									</div>
									<div className='flex flex-col gap-3 my-5'>
										<h6 className='f6 mb-2 text-xl'>
											Refusing customers
										</h6>
										<ul className='flex flex-col gap-5'>
											{!userNonCustomers.refusingCustomers?.length &&
												!isLoading && (
													<div className='w-full flex justify-start items-center'>
														<p className='py-5 text-lg text-center italic'>
															Start adding refusing customers...
														</p>
													</div>
												)}
											{!!userNonCustomers.refusingCustomers
												?.length &&
												userNonCustomers.refusingCustomers.map(
													(refusingCustomer, index) => (
														<li
															key={index}
															className='flex items-center'>
															<input
																type='text'
																className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none nonCustomers text-xl'
																value={refusingCustomer}
																onChange={(e) => {
																	setUserNonCustomers(
																		(prevValue) => {
																			prevValue.refusingCustomers[
																				index
																			] = e.target.value;
																			return {
																				...prevValue,
																			};
																		}
																	);
																}}
															/>
															<button
																type='button'
																onClick={() => {
																	userNonCustomers.refusingCustomers =
																		userNonCustomers.refusingCustomers.filter(
																			(nonC, i) =>
																				i !== index
																		);
																	setUserNonCustomers({
																		...userNonCustomers,
																	});
																}}
																className='btn-delete'>
																<FontAwesomeIcon
																	icon={faTimes}
																	className='w-4 hover:text-rose-800'
																/>
															</button>
														</li>
													)
												)}
										</ul>
										<div className='flex justify-center'>
											<button
												type='button'
												onClick={() => {
													userNonCustomers.refusingCustomers.push(
														""
													);
													setUserNonCustomers({
														...userNonCustomers,
													});
												}}
												className='inline-flex items-center gap-2 text-lg p-3 mb-7 text-black-eerie hover:text-gray-600'>
												<FontAwesomeIcon
													className='w-5 h-auto cursor-pointer text-black-eerie hover:text-gray-600'
													icon={faCirclePlus}
												/>
												Add more refusing customers
											</button>
										</div>
									</div>
									<div className='flex flex-col gap-3 my-5'>
										<h6 className='f6 mb-2 text-xl'>
											Unwanted customers
										</h6>

										<ul className='flex flex-col gap-5'>
											{!userNonCustomers.unwantedCustomers?.length &&
												!isLoading && (
													<div className='w-full flex justify-start items-center'>
														<p className='py-5 text-lg text-center italic'>
															Start adding unwanted customers...
														</p>
													</div>
												)}
											{!!userNonCustomers.unwantedCustomers
												?.length &&
												userNonCustomers.unwantedCustomers.map(
													(unwantedCustomer, index) => (
														<li
															key={index}
															className='flex items-center'>
															<input
																type='text'
																className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none nonCustomers text-xl'
																value={unwantedCustomer}
																onChange={(e) => {
																	setUserNonCustomers(
																		(prevValue) => {
																			prevValue.unwantedCustomers[
																				index
																			] = e.target.value;
																			return {
																				...prevValue,
																			};
																		}
																	);
																}}
															/>
															<button
																type='button'
																onClick={() => {
																	userNonCustomers.unwantedCustomers =
																		userNonCustomers.unwantedCustomers.filter(
																			(nonC, i) =>
																				i !== index
																		);
																	setUserNonCustomers({
																		...userNonCustomers,
																	});
																}}
																className='btn-delete'>
																<FontAwesomeIcon
																	icon={faTimes}
																	className='w-4 hover:text-rose-800'
																/>
															</button>
														</li>
													)
												)}
										</ul>
										<div className='flex justify-center'>
											<button
												type='button'
												onClick={() => {
													userNonCustomers.unwantedCustomers.push(
														""
													);
													setUserNonCustomers({
														...userNonCustomers,
													});
												}}
												className='inline-flex items-center gap-2 text-lg p-3 mb-7 text-black-eerie hover:text-gray-600'>
												<FontAwesomeIcon
													className='w-5 h-auto cursor-pointer text-black-eerie hover:text-gray-600'
													icon={faCirclePlus}
												/>
												Add more unwanted customers
											</button>
										</div>
									</div>
									<div className='h-10'>
										{(isUpdatingUserNonCustomers ||
											isCreatingUserNonCustomers) && (
											<Spinner
												className='flex items-center px-1 text-xl'
												message='Saving non customers...'
											/>
										)}
									</div>
									<div className='flex flex-wrap gap-5 justify-between py-3'>
										<button
											type='button'
											onClick={() => {
												const newObj = {
													...userNonCustomers,
												};
												newObj.userId = session?.user?.id;
												if (!userNonCustomers.id) {
													createUserNonCustomers(newObj);
												} else {
													updateUserNonCustomers(newObj);
												}
											}}
											className='btn-rev'>
											Save
										</button>
										{!!userNonCustomers.id && (
											<Link href={"/"}>
												<span className='text-md text-gray-400 italic'>
													go to next →{" "}
													<span className='text-gray-500'>
														Step-up step-down model
													</span>
												</span>
											</Link>
										)}
									</div>
								</form>
							)}
						</div>
						<div className='w-1/2 pane-right-gradient min-h-screen px-12 py-8'>
							<Header
								className='w-full mb-12'
								toggleIdeasModal={toggleIdeasModal}></Header>

							<div className="mb-[3.75rem]">
								<div className='px-5 flex flex-wrap justify-start items-center gap-4'>
									<ConsultantReview
										pageTitle={
											"Non Customers Canvas"
										}></ConsultantReview>
									{(session?.user as any)?.role === "admin" && (
										<button
											type='button'
											className='p-3 rounded inline-flex gap-5 items-center btn text-black-eerie hover:text-blue-ncs w-max'
											onClick={toggleEditVideoModal}>
											<span>Edit video Url</span>
											<FontAwesomeIcon
												className='w-7'
												icon={faEdit}
											/>
										</button>
									)}
									<button
										type='button'
										className='p-3 rounded inline-flex gap-5 items-center btn text-black-eerie hover:text-blue-ncs w-max'
										onClick={toggleVideoModal}>
										<span>Watch Video</span>
										<FontAwesomeIcon className='w-7' icon={faEye} />
									</button>
								</div>
							</div>
							<div className='ml-5 p-5 relative rounded-lg bg-gray-100 text-gray-800'>
								<div className='p-6 relative rounded-lg mb-10 bg-gray-300'>
									<div className='p-6 relative rounded-lg mb-10 bg-yellow-jasmine text-gray-900'>
										<h6 className='f6 mb-2 text-xl'>
											Soon to be non nonCustomers
										</h6>
										<ul className='normal mb-2'>
											{!!userNonCustomers.soonNonCustomers?.length &&
												userNonCustomers.soonNonCustomers.map(
													(nonCustomers, index) => (
														<li
															key={index}
															className='flex items-center'>
															{nonCustomers}
														</li>
													)
												)}
										</ul>
									</div>
									<h6 className='f6 mb-2 text-xl'>
										Refusing nonCustomers
									</h6>
									<ul className='normal mb-2'>
										{!!userNonCustomers.refusingCustomers?.length &&
											userNonCustomers.refusingCustomers.map(
												(customer, index) => (
													<li key={index}>{customer}</li>
												)
											)}
									</ul>
								</div>
								<h6 className='f6 mb-2 text-xl'>
									Unwanted nonCustomers
								</h6>
								<ul className='normal mb-2'>
									{!!userNonCustomers.unwantedCustomers?.length &&
										userNonCustomers.unwantedCustomers.map(
											(customer, index) => (
												<li key={index}>{customer}</li>
											)
										)}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* video modal */}
			<Modal
				config={{
					isShown: isVideoModalOn,
					closeCallback: toggleVideoModal,
					className:
						"flex flex-col w-[90%] lg:w-2/3 max-w-[1320px] h-[90%] max-h-[600px] rounded-xl overflow-hidden ",
				}}>
				<Video currVideoPropName={videoPropNamesEnum.nonCustomers} />
				<div className='flex justify-center p-5 bg-black'>
					<button
						className='btn-diff bg-gray-100 hover:bg-gray-300'
						onClick={toggleVideoModal}>
						close
					</button>
				</div>
			</Modal>

			{/* video url form modal */}
			<Modal
				config={{
					isShown: isEditUrlsModalOn,
					closeCallback: toggleEditVideoModal,
					className:
						"flex flex-col lg:w-1/3 max-w-[1320px] rounded-xl overflow-hidden p-5 lg:p-10",
				}}>
				<SharedVideoForm
					toggleEditVideoModal={toggleEditVideoModal}
					videoPropName={videoPropNamesEnum.nonCustomers}
					videoLabel='Non Customers Video'
				/>
			</Modal>
		</>
	);
};

export default NonCustomers;
