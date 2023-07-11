import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import useModalToggler from "../../hooks/use-modal-toggler";
import { IUserAnalysis } from "../../models/user-analysis";
import * as clientApi from "../../http-client/analysis.client";
import IdeasModal from "../../components/app/ideas-modal";
import Modal from "../../components/common/modal";
import SharedVideoForm from "../../components/disruption/shared-video-form";
import Video from "../../components/disruption/video";
import { navbarNodesEnum, videoPropNamesEnum } from "../../models/enums";
import Navbar from "../../components/common/navbar";
import VerticalNavbar from "../../components/common/vertical-navbar";
import StepUpStepDownContent from "../../components/step-up-step-down/content";
import StepUpStepDownCustomersReview from "../../components/step-up-step-down/customers-review";
import Spinner from "../../components/common/spinner";

const Analysis = () => {
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

	const [isIdeasModalOpen, toggleIdeasModal] = useModalToggler();
	const [isEditUrlsModalOn, toggleEditVideoModal] = useModalToggler();
	const [isVideoModalOn, toggleVideoModal] = useModalToggler();

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

	return (
		<>
			<div className='bg-gray-100 pt-9'>
				<div className='flex gap-[4.4rem] px-16 m-auto'>
					<div className='py-12'>
						<VerticalNavbar />
					</div>
					<div className='grow max-w-[1920px] flex flex-col py-12 mx-auto'>
						<Navbar selectedNode={navbarNodesEnum.stepUpStepDownModel} />
						<div className='content-container'>
							<div className='left-content'>
								<StepUpStepDownContent
									userAnalysis={userAnalysis}
									dispatchUserAnalysis={setUserAnalysis}
									isLoading={isLoading}
								/>
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
								{isLoading && (
									<Spinner
										message='Loading customers...'
										className='p-5 items-center text-xl'
									/>
								)}
								{!isLoading && (
									<StepUpStepDownCustomersReview
										userAnalysis={userAnalysis}
										isLoading={isLoading}
									/>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* <div className='ml-5 p-5 relative rounded-lg bg-gray-100 text-gray-800 mb-2'>
								<div className='p-6 relative rounded-lg mb-2'>
									<h6 className='f6 mb-2 text-xl'>10% Above</h6>
									<ul className='normal mb-2'>
										{userAnalysis.above.map((item, index) => (
											<li key={index} className='p-2'>
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
													className='text-gray-50 p-2'>
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
											<li key={index} className='p-2'>
												{item}
											</li>
										))}
									</ul>
								</div>
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
				<Video videoPropName={videoPropNamesEnum.stepUpStepDownModel} />
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
					videoPropName={videoPropNamesEnum.stepUpStepDownModel}
					videoLabel='Step Up Step Down Model Video'
				/>
			</Modal>
		</>
	);
};

export default Analysis;
