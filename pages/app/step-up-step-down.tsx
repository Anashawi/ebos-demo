import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import useModalToggler from "../../hooks/use-modal-toggler";
import { IUserAnalysis } from "../../models/user-analysis";
import * as clientApi from "../../http-client/analysis.client";
import ConsultantReview from "../../components/common/consultant-review";
import UserInfoHeader from "../../components/common/user-info-header";
import Header from "../../components/common/header";
import IdeasModal from "../../components/app/ideas-modal";
import { faCirclePlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Spinner from "../../components/common/spinner";

const Analysis = () => {
	const [isIdeasModalOpen, toggleIdeasModal] = useModalToggler();

	const { data: session }: any = useSession();

	const emptyUserAnalysis = {
		id: "",
		userId: session?.user?.id,
		above: [],
		below: [],
		customers: [],
	} as IUserAnalysis;

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
		if (!data) {
			setUserAnalysis((prevValue) => {
				prevValue.above = ["", "", ""];
				prevValue.customers = ["", "", ""];
				prevValue.below = ["", "", ""];
				return prevValue;
			});
		}
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
			<IdeasModal isOpen={isIdeasModalOpen} toggle={toggleIdeasModal} />

			<div className='homepage-bg-gradient bg-white'>
				<div className='px-12 mx-0 my-auto md:w-[calc(1300px_-_1.5_*_2)] lg:w-[960px_-_1.5rem_*_2] xl:w-[1300_-_1.5rem_*_2]'>
					<div className='flex flex-wrap'>
						<div className='w-1/2 bg-white p-12 relative'>
							<UserInfoHeader></UserInfoHeader>
							<h3 className='text-[2.8rem] my-10 text-yellow-green'>
								Step-up step-down
							</h3>
							{isLoading && (
								<Spinner
									className='flex items-center px-1 text-2xl'
									message='Loading non customers...'
								/>
							)}
							{!isLoading && (
								<form className='flex flex-col'>
									<div className='flex flex-col gap-5'>
										<h6 className='f6 mb-2 text-xl'>10% above</h6>
										<ul className='flex flex-col gap-5'>
											{!!userAnalysis.above?.length &&
												userAnalysis.above.map((item, index) => (
													<li
														key={index}
														className='flex items-center'>
														<input
															type='text'
															className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none text-xl'
															value={item}
															onChange={(e) => {
																setUserAnalysis((prevValue) => {
																	userAnalysis.above[index] =
																		e.target.value;
																	return { ...prevValue };
																});
															}}
														/>
														<button
															type='button'
															onClick={() => {
																userAnalysis.above =
																	userAnalysis.above.filter(
																		(item, i) => index !== i
																	);
																setUserAnalysis((prevValue) => {
																	return { ...prevValue };
																});
															}}
															className='btn-delete'>
															<FontAwesomeIcon
																icon={faTimes}
																className='w-4 hover:text-rose-800'
															/>
														</button>
													</li>
												))}
										</ul>
										<div className='flex justify-center'>
											<button
												type='button'
												onClick={() => {
													userAnalysis.above.push("");
													setUserAnalysis((prevValue) => {
														return { ...prevValue };
													});
												}}
												className='inline-flex items-center gap-2 text-xl p-3 mb-7 text-black-eerie hover:text-gray-600'>
												<FontAwesomeIcon
													className='w-5 h-auto cursor-pointer text-black-eerie hover:text-gray-600'
													icon={faCirclePlus}
												/>
												Add more
											</button>
										</div>
									</div>
									<div className='flex flex-col gap-5'>
										<h6 className='f6 mb-2 text-xl'>
											Your Customers
										</h6>
										<ul className='flex flex-col gap-5'>
											{!!userAnalysis.customers?.length &&
												userAnalysis.customers.map(
													(item, index) => (
														<li
															key={index}
															className='flex items-center'>
															<input
																type='text'
																className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none text-xl'
																value={item}
																onChange={(e) => {
																	userAnalysis.customers[
																		index
																	] = e.target.value;
																	setUserAnalysis(
																		(prevValue) => {
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
																	userAnalysis.customers =
																		userAnalysis.customers.filter(
																			(item, i) =>
																				index !== i
																		);
																	setUserAnalysis(
																		(prevValue) => {
																			return {
																				...prevValue,
																			};
																		}
																	);
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
													userAnalysis.customers.push("");
													setUserAnalysis({
														...userAnalysis,
													});
												}}
												className='inline-flex items-center gap-2 text-xl p-3 mb-7 text-black-eerie hover:text-gray-600'>
												<FontAwesomeIcon
													className='w-5 h-auto cursor-pointer text-black-eerie hover:text-gray-600'
													icon={faCirclePlus}
												/>
												Add more
											</button>
										</div>
									</div>
									<div className='flex flex-col gap-5'>
										<h6 className='f6 mb-2 text-xl'>10% below</h6>
										<ul className='flex flex-col gap-5'>
											{!!userAnalysis.below?.length &&
												userAnalysis.below.map((item, index) => (
													<li
														key={index}
														className='flex items-center'>
														<input
															type='text'
															className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none text-xl'
															value={item}
															onChange={(e) => {
																setUserAnalysis((prevValue) => {
																	userAnalysis.below[index] =
																		e.target.value;
																	return { ...prevValue };
																});
															}}
														/>
														<button
															type='button'
															onClick={() => {
																userAnalysis.below =
																	userAnalysis.below.filter(
																		(item, i) => index !== i
																	);
																setUserAnalysis((prevValue) => {
																	return { ...prevValue };
																});
															}}
															className='btn-delete'>
															<FontAwesomeIcon
																icon={faTimes}
																className='w-4 hover:text-rose-800'
															/>
														</button>
													</li>
												))}
										</ul>
										<div className='flex justify-center'>
											<button
												type='button'
												onClick={() => {
													userAnalysis.below.push("");
													setUserAnalysis((prevValue) => {
														return { ...prevValue };
													});
												}}
												className='inline-flex items-center gap-2 text-xl p-3 mb-7 text-black-eerie hover:text-gray-600'>
												<FontAwesomeIcon
													className='w-5 h-auto cursor-pointer text-black-eerie hover:text-gray-600'
													icon={faCirclePlus}
												/>
												Add more
											</button>
										</div>
									</div>
									<div className='h-10'>
										{(isUpdatingUserAnalysis ||
											isCreatingUserAnalysis) && (
											<Spinner
												className='flex items-center px-1 text-xl'
												message='Saving non customers...'
											/>
										)}
									</div>
									<div className='flex gap-5 justify-between items-center flex-wrap'>
										<button
											type='button'
											onClick={() => {
												console.log(userAnalysis.customers);
												userAnalysis.userId = session?.user?.id;
												if (!userAnalysis.id) {
													createUserAnalysis(userAnalysis);
												} else {
													updateUserAnalysis(userAnalysis);
												}
											}}
											className='btn-rev'>
											Save
										</button>
										{!!userAnalysis.id && (
											<Link href={"/"}>
												<span className='text-md text-gray-400 italic'>
													go to next →{" "}
													<span className='text-gray-500'>
														Road Map
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
								className='w-full mb-10'
								toggleIdeasModal={toggleIdeasModal}></Header>
							<div className='py-3'>
								<div className='ml-5 p-5 relative rounded-lg bg-gray-100 text-gray-800 mb-2'>
									<div className='p-6 relative rounded-lg mb-2'>
										<h6 className='f6 mb-2 text-xl'>10% Above</h6>
										<ul className='normal mb-2'>
											{userAnalysis.above.map((item, index) => (
												<li key={index} className='p-3'>
													{item}
												</li>
											))}
										</ul>
									</div>
									<div className='p-5 relative rounded-lg bg-gray-800'>
										<h6 className='f6 mb-2 text-xl text-gray-50'>
											Your Customers
										</h6>
										<ul className='normal mb-2'>
											{userAnalysis.customers?.map(
												(customer, index) => (
													<li
														key={index}
														className='text-gray-50 p-3'>
														{customer}
													</li>
												)
											)}
										</ul>
									</div>
									<div className='p-6 relative rounded-lg mb-2'>
										<h6 className='f6 mb-2 text-xl'>10% below</h6>
										<ul className='normal mb-2'>
											{userAnalysis.below.map((item, index) => (
												<li key={index} className='p-3'>
													{item}
												</li>
											))}
										</ul>
									</div>
								</div>
								<ConsultantReview
									className='ml-5 mt-10'
									pageTitle='Step-up step-down'></ConsultantReview>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Analysis;
