import useModalToggler from "../../hooks/use-modal-toggler";
import IdeasModal from "../../components/app/ideas-modal";
import Modal from "../../components/common/modal";
import SharedVideoForm from "../../components/disruption/shared-video-form";
import Video from "../../components/disruption/video";
import { navbarNodesEnum, videoPropNamesEnum } from "../../models/enums";
import NonCustomersContent from "../../components/non-customers/content";
import Navbar from "../../components/common/navbar";
import VerticalNavbar from "../../components/common/vertical-navbar";
import NonCustomersReview from "../../components/non-customers/review";
import { useEffect, useState } from "react";
import { IUserNonCustomers } from "../../models/user-non-customers";
import { useSession } from "next-auth/react";
import * as clientApi from "../../http-client/non-customers.client";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../components/common/spinner";

const NonCustomers = () => {
	const { data: session }: any = useSession();

	const [isIdeasModalOpen, toggleIdeasModal] = useModalToggler();
	const [isEditUrlsModalOn, toggleEditVideoModal] = useModalToggler();
	const [isVideoModalOn, toggleVideoModal] = useModalToggler();

	const emptyUserNonCustomers = {
		id: "",
		userId: session?.user?.id,
		soonNonCustomers: [],
		refusingNonCustomers: [],
		unwantedNonCustomers: [],
	} as IUserNonCustomers;

	const [userNonCustomers, setUserNonCustomers] = useState<IUserNonCustomers>(
		emptyUserNonCustomers
	);

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

	return (
		<>
			<div className='bg-gray-100 pt-9'>
				<div className='flex gap-[4.4rem] px-16 m-auto'>
					<div className='py-12'>
						<VerticalNavbar />
					</div>
					<div className='grow max-w-[1920px] flex flex-col py-12 mx-auto'>
						<Navbar selectedNode={navbarNodesEnum.nonCustomers} />
						<div className='content-container'>
							<div className='left-content'>
								<NonCustomersContent
									userNonCustomers={userNonCustomers}
									dispatchUserNonCustomers={setUserNonCustomers}
									isLoading={isLoading}
								/>
							</div>
							<div className='right-content'>
								<div className='p-1 bg-white rounded-xl'>
									<button
										type='button'
										onClick={() => {
											toggleIdeasModal(true);
										}}
										className='w-full btn-primary-light rounded-xl'>
										My Ideas
									</button>
								</div>
								<div className='p-1 bg-white rounded-xl'>
									<button
										type='button'
										onClick={() => {
											toggleVideoModal(true);
										}}
										className='w-full btn-primary-light rounded-xl'>
										Resource Videos
									</button>
								</div>
								{isLoading && (
									<Spinner
										message='Loading non-customers...'
										className='p-5 items-center text-xl'
									/>
								)}
								{!isLoading && (
									<NonCustomersReview
										userNonCustomers={userNonCustomers}
									/>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* <div className='ml-5 p-5 relative rounded-lg bg-gray-100 text-gray-800'>
								<div className='p-6 relative rounded-lg mb-10 bg-gray-300'>
									<div className='p-6 relative rounded-lg mb-10 bg-yellow-jasmine text-gray-900'>
										<h6 className='f6 mb-2 text-xl'>
											Soon to be non Customers
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
				<Video videoPropName={videoPropNamesEnum.nonCustomers} />
				<div className='flex justify-center p-5 bg-black'>
					<button
						className='btn-diff bg-gray-100 hover:bg-gray-300 text-dark-400'
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
					videoPropName={videoPropNamesEnum.nonCustomers}
					videoLabel='Non Customers Video'
				/>
			</Modal>
		</>
	);
};

export default NonCustomers;
