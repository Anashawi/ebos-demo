import Image from "next/image";
import Link from "next/link";
import IdeasModal from "../../components/app/ideas-modal";
import useModalToggler from "../../hooks/use-modal-toggler";
import { useFormik } from "formik";
import { array, object, string } from "yup";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useMemo, useState, useEffect } from "react";
import { IUserCustomers } from "../../models/user-customers";
import * as clientApi from "../../http-client/customers.client";
import Spinner from "../../components/common/spinner";
import ConsultantReview from "../../components/common/consultant-review";
import UserInfoHeader from "../../components/common/user-info-header";
import Header from "../../components/common/header";
import Modal from "../../components/common/modal";
import SharedVideoForm from "../../components/disruption/shared-video-form";
import Video from "../../components/disruption/video";
import { navbarNodesEnum, videoPropNamesEnum } from "../../models/enums";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../components/common/navbar";
import VerticalNavbar from "../../components/common/vertical-navbar";

const VoiceOfCustomers = () => {
	const { data: session }: any = useSession();

	const [isIdeasModalOpen, toggleIdeasModal] = useModalToggler();
	const [isEditUrlsModalOn, toggleEditVideoModal] = useModalToggler();
	const [isVideoModalOn, toggleVideoModal] = useModalToggler();

	const emptyUserCustomers = useMemo(() => {
		return {
			id: "",
			userId: session?.user?.id,
			topCategories: ["", "", "", "", ""],
			wishlist: ["", "", "", "", ""],
			fulfill: ["", "", "", "", ""],
		} as IUserCustomers;
	}, []);

	const [userCustomers, setUserCustomers] =
		useState<IUserCustomers>(emptyUserCustomers);

	const queryClient = useQueryClient();

	const { data, isLoading } = useQuery<IUserCustomers>({
		queryKey: [clientApi.Keys.All],
		queryFn: clientApi.getOne,
		refetchOnWindowFocus: false,
		enabled: !!session?.user?.id,
	});

	useEffect(() => {
		if (data) {
			setUserCustomers(data);
		}
	}, [data]);

	const { mutate: updateUserCustomers, isLoading: isUpdatingUserCustomers } =
		useMutation(
			(userCustomers: IUserCustomers) => {
				return clientApi.updateOne(userCustomers);
			},
			{
				onMutate: (updated) => {
					queryClient.setQueryData(
						[clientApi.Keys.All, userCustomers.id],
						updated
					);
				},
				onSuccess: (updated) => {
					queryClient.invalidateQueries([
						clientApi.Keys.All,
						userCustomers.id,
					]);
					queryClient.invalidateQueries([clientApi.Keys.All]);
				},
			}
		);

	const { mutate: createUserCustomers, isLoading: isCreatingUserCustomers } =
		useMutation(
			(userCustomers: IUserCustomers) => clientApi.insertOne(userCustomers),
			{
				onMutate: (updated) => {
					queryClient.setQueryData(
						[clientApi.Keys.All, userCustomers.id],
						updated
					);
				},
				onSuccess: (updated) => {
					queryClient.invalidateQueries([
						clientApi.Keys.All,
						userCustomers.id,
					]);
					queryClient.invalidateQueries([clientApi.Keys.All]);
				},
			}
		);

	const formik = useFormik({
		initialValues: {
			...userCustomers,
		},
		validationSchema: object({
			topCategories: array(string()),
			wishlist: array(string()),
			fulfill: array(string()),
		}),
		onSubmit: async (values, { setSubmitting }) => {
			values.userId = session?.user?.id;
			if (!values.id) {
				await createUserCustomers(values);
			} else {
				await updateUserCustomers(values);
			}
			setSubmitting(false);
		},
		enableReinitialize: true,
	});

	return (
		<>
			{/* {(session?.user as any)?.role === "admin" && (
				<button
					type='button'
					className='p-3 rounded inline-flex gap-5 items-center btn text-black-eerie hover:text-blue-ncs w-max'
					onClick={() => toggleEditVideoModal(true)}>
					<span>Edit video Url</span>
					<FontAwesomeIcon className='w-7' icon={faEdit} />
				</button>
			)} */}

			<div className='bg-gray-100 pt-9'>
				<div className='flex gap-[4.4rem] px-16 m-auto'>
					<div className='py-12'>
						<VerticalNavbar />
					</div>
					<div className='grow max-w-[1920px] flex flex-col py-12 mx-auto'>
						<Navbar selectedNode={navbarNodesEnum.disruption} />
						<div className='content-container'>
							<div className='left-content'>
								{/* <VoiceOfCustomersContent
									toggleEditVideoModal={toggleEditVideoModal}
									toggleVideoModal={toggleVideoModal}
								/> */}
								<h3 className='mb-5 title-header'>
									Voice of customers
								</h3>
								{isLoading && (
									<Spinner
										className='flex items-center text-2xl'
										message='Loading Customers...'
									/>
								)}
								{!isLoading && (
									<div className='flex gap-5 flex-wrap'>
										<div className='grow'>
											<h4 className='text-3xl font-normal mb-6 mr-7'>
												Top customer categories
											</h4>
											<ul className='flex flex-col gap-5 mb-5 mr-7'>
												<li>
													<input
														type='text'
														{...formik.getFieldProps(
															"topCategories.0"
														)}
														className='light-input w-full'
													/>
												</li>
												<li>
													<input
														type='text'
														{...formik.getFieldProps(
															"topCategories.1"
														)}
														className='light-input w-full'
													/>
												</li>
												<li>
													<input
														type='text'
														{...formik.getFieldProps(
															"topCategories.2"
														)}
														className='light-input w-full'
													/>
												</li>
												<li>
													<input
														type='text'
														{...formik.getFieldProps(
															"topCategories.3"
														)}
														className='light-input w-full'
													/>
												</li>
												<li>
													<input
														type='text'
														{...formik.getFieldProps(
															"topCategories.4"
														)}
														className='light-input w-full'
													/>
												</li>
											</ul>
										</div>

										<div className='grow'>
											<h4 className='text-3xl font-normal mb-6'>
												What do they want
											</h4>
											<ul className='flex flex-col gap-5 mb-5'>
												<li>
													<input
														type='text'
														{...formik.getFieldProps(
															"wishlist.0"
														)}
														className='light-input w-full'
													/>
												</li>
												<li>
													<input
														type='text'
														{...formik.getFieldProps(
															"wishlist.1"
														)}
														className='light-input w-full'
													/>
												</li>
												<li>
													<input
														type='text'
														{...formik.getFieldProps(
															"wishlist.2"
														)}
														className='light-input w-full'
													/>
												</li>
												<li>
													<input
														type='text'
														{...formik.getFieldProps(
															"wishlist.3"
														)}
														className='light-input w-full'
													/>
												</li>
												<li>
													<input
														type='text'
														{...formik.getFieldProps(
															"wishlist.4"
														)}
														className='light-input w-full'
													/>
												</li>
											</ul>
										</div>
										<div className='grow'>
											<h4 className='text-3xl font-normal mb-6'>
												How to fulfill it
											</h4>
											<ul className='flex flex-col gap-5 mb-5'>
												<li>
													<input
														type='text'
														{...formik.getFieldProps("fulfill.0")}
														className='light-input w-full'
													/>
												</li>
												<li>
													<input
														type='text'
														{...formik.getFieldProps("fulfill.1")}
														className='light-input w-full'
													/>
												</li>
												<li>
													<input
														type='text'
														{...formik.getFieldProps("fulfill.2")}
														className='light-input w-full'
													/>
												</li>
												<li>
													<input
														type='text'
														{...formik.getFieldProps("fulfill.3")}
														className='light-input w-full'
													/>
												</li>
												<li>
													<input
														type='text'
														{...formik.getFieldProps("fulfill.4")}
														className='light-input w-full'
													/>
												</li>
											</ul>
										</div>

										<div className='h-10'>
											{(isUpdatingUserCustomers ||
												isCreatingUserCustomers) && (
												<Spinner
													className='flex items-center text-xl'
													message='Saving Customers...'
												/>
											)}
										</div>
										<div className='flex gap-5 justify-between items-center mr-7'>
											<button
												type='button'
												onClick={() => {
													formik.handleSubmit();
												}}
												className={
													formik.isSubmitting || !formik.isValid
														? "btn-rev btn-disabled"
														: "btn-rev"
												}
												disabled={
													formik.isSubmitting || !formik.isValid
												}>
												Submit
											</button>
											{!!userCustomers.id && (
												<Link href={"/"}>
													<span className='text-md text-gray-400 italic'>
														go to next →{" "}
														<span className='text-gray-500'>
															Blue Ocean
														</span>
													</span>
												</Link>
											)}
										</div>
									</div>
								)}
							</div>
							<div className='right-content'>
								<div className='flex flex-col gap-2 p-1 bg-white rounded-xl'>
									<button
										type='button'
										onClick={() => {
											toggleIdeasModal(true);
										}}
										className='w-full btn-primary-light rounded-xl'>
										My Ideas
									</button>
								</div>
								<div className='flex flex-col gap-1 p-1 bg-white rounded-xl'>
									<button
										type='button'
										onClick={() => {
											toggleVideoModal(true);
										}}
										className='w-full btn-primary-light rounded-xl'>
										Resource Videos
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* <div className='homepage-bg-gradient bg-white'>
				<form>
					<div className='px-12 mx-0 my-auto md:w-[calc(1300px_-_1.5_*_2)] lg:w-[960px_-_1.5rem_*_2] xl:w-[1300_-_1.5rem_*_2]'>
						<div className='flex flex-wrap'>
							<div className='grow md:w-4/12 bg-white px-10 py-12 relative'>
								<UserInfoHeader></UserInfoHeader>
							</div>
						</div>
					</div>
				</form>
			</div> */}

			{/* ideas modal */}
			<IdeasModal
				isOpen={isIdeasModalOpen}
				toggle={() => toggleIdeasModal()}
			/>

			{/* video modal */}
			<Modal
				config={{
					isShown: isVideoModalOn,
					closeCallback: () => toggleVideoModal(false),
					className:
						"flex flex-col w-[90%] lg:w-2/3 max-w-[1320px] h-[90%] max-h-[600px] rounded-xl overflow-hidden ",
				}}>
				<Video currVideoPropName={videoPropNamesEnum.voiceOfCustomers} />
				<div className='flex justify-center p-5 bg-black'>
					<button
						className='btn-diff bg-gray-100 hover:bg-gray-300'
						onClick={() => toggleVideoModal(true)}>
						close
					</button>
				</div>
			</Modal>

			{/* video url form modal */}
			<Modal
				config={{
					isShown: isEditUrlsModalOn,
					closeCallback: () => toggleEditVideoModal(false),
					className:
						"flex flex-col lg:w-1/3 max-w-[1320px] rounded-xl overflow-hidden p-5 lg:p-10",
				}}>
				<SharedVideoForm
					toggleEditVideoModal={() => toggleEditVideoModal(false)}
					videoPropName={videoPropNamesEnum.voiceOfCustomers}
					videoLabel='Voice of Customers Video'
				/>
			</Modal>
		</>
	);
};

export default VoiceOfCustomers;
