import Link from "next/link";
import IdeasModal from "../../components/app/ideas-modal";
import Modal from "../../components/common/modal";
import useModalToggler from "../../hooks/use-modal-toggler";
import { useEffect, useMemo, useState } from "react";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import VideosForm from "../../components/videos/videos-form";
import Video from "../../components/videos/video";
import { useQuery } from "@tanstack/react-query";
import * as clientApi from "../../http-client/videos.client";
import { IVideos } from "../../models/videos";
import { useSession } from "next-auth/react";
import ConsultantReview from "../../components/common/consultant-review";
import UserInfoHeader from "../../components/common/user-info-header";
import Header from "../../components/common/header";

const Disruption = () => {
	const { data: session } = useSession();

	const emptyVideos: IVideos = useMemo(() => {
		return {
			id: "",
			staffOnDemand: "",
			communityAndCrowd: "",
			algorithms: "",
			leveragedAssets: "",
			Engagement: "",
			interface: "",
			dashboard: "",
			experimentation: "",
			socialPlatforms: "",
			ecoSystems: "",
			autonomy: "",
			infoIsPower: "",
			OTCR: "",
			valueDestruction: "",
			customerJourney: "",
			digitalPlatforms: "",
			buildingCapacity: "",
		} as IVideos;
	}, []);

	const [isIdeasModalOpen, toggleIdeasModal] = useModalToggler();
	const [isVideoModalOn, toggleVideoModal] = useModalToggler();
	const [isEditUrlsModalOn, toggleEditUrlsModal] = useModalToggler();
	const [selectedVideoURL, setSelectedVideoURL] = useState<string>("");
	const [videos, setVideos] = useState<IVideos>(emptyVideos);

	const { data, isLoading } = useQuery<IVideos>({
		queryKey: [clientApi.Keys.all],
		queryFn: clientApi.getOne,
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		if (data) {
			setVideos(data);
		}
	}, [data]);

	return (
		<>
			<div className='homepage-bg-gradient w-screen bg-white'>
				<div className='px-12 mx-0 my-auto md:w-[calc(1300px_-_1.5_*_2)] lg:w-[960px_-_1.5rem_*_2] xl:w-[1300_-_1.5rem_*_2]'>
					<div className='flex flex-wrap'>
						<div className='flex flex-col md:w-8/12 bg-white p-12 relative'>
							<UserInfoHeader className='w-1/2 mb-10'></UserInfoHeader>

							<h3 className='text-[2.52rem] mb-6 text-yellow-green'>
								Videos
							</h3>

							<h3 className='text-3xl mb-6 font-normal'>
								10 Comprehensives
							</h3>
							<p className='mb-10 text-xl'>
								Watch help videos then update your ideas accordingly.
								Submit for feedback.
							</p>
							<div className='flex flex-wrap gap-5'>
								<div className='col-1/2 grow'>
									<h4 className='text-[2.1rem] mb-6'>Scale</h4>
									<ul className='flex flex-col gap-3 mb-5'>
										<li className='flex gap-5 justify-between items-center p-5 relative bg-gray-100 text-gray-800 text-lg'>
											Staff on Demand
											<a
												className='ml-5 text-[1.1rem]'
												target='_blank'
												data-video='1'
												onClick={() => {
													setSelectedVideoURL(
														videos.staffOnDemand
													);
													toggleVideoModal();
												}}>
												Watch video
											</a>
										</li>
										<li className='flex gap-5 justify-between items-center p-5 relative bg-gray-100 text-gray-800 text-lg'>
											Community and Crowd
											<a
												data-video='1'
												className='ml-5 text-[1.1rem]'
												target='_blank'
												onClick={() => {
													setSelectedVideoURL(
														videos.communityAndCrowd
													);
													toggleVideoModal();
												}}>
												Watch video
											</a>
										</li>
										<li className='flex gap-5 justify-between items-center p-5 relative bg-gray-100 text-gray-800 text-lg'>
											Algorithms
											<a
												data-video=' 1'
												className='ml-5 text-[1.1rem]'
												target='_blank'
												onClick={() => {
													setSelectedVideoURL(videos.algorithms);
													toggleVideoModal();
												}}>
												Watch video
											</a>
										</li>
										<li className='flex gap-5 justify-between items-center p-5 relative bg-gray-100 text-gray-800 text-lg'>
											Leveraged Assets
											<a
												data-video=' 1'
												className='ml-5 text-[1.1rem]'
												target='_blank'
												onClick={() => {
													setSelectedVideoURL(
														videos.leveragedAssets
													);
													toggleVideoModal();
												}}>
												Watch video
											</a>
										</li>
										<li className='flex gap-5 justify-between items-center p-5 relative bg-gray-100 text-gray-800 text-lg'>
											Engagement
											<a
												data-video=' 1'
												className='ml-5 text-[1.1rem]'
												target='_blank'
												onClick={() => {
													setSelectedVideoURL(videos.Engagement);
													toggleVideoModal();
												}}>
												Watch video
											</a>
										</li>
									</ul>
								</div>
								<div className='col-1/2 grow'>
									<h4 className='text-[2.1rem] mb-6'>Ideas</h4>

									<ul className='flex flex-col gap-3 mb-5'>
										<li className='flex gap-5 justify-between items-center p-5 relative bg-gray-100 text-gray-800 text-lg'>
											Interface
											<a
												data-video=' 1'
												className='ml-5 text-[1.1rem]'
												target='_blank'
												onClick={() => {
													setSelectedVideoURL(videos.interface);
													toggleVideoModal();
												}}>
												Watch video
											</a>
										</li>
										<li className='flex gap-5 justify-between items-center p-5 relative bg-gray-100 text-gray-800 text-lg'>
											Dashboard
											<a
												data-video=' 1'
												className='ml-5 text-[1.1rem]'
												target='_blank'
												onClick={() => {
													setSelectedVideoURL(videos.dashboard);
													toggleVideoModal();
												}}>
												Watch video
											</a>
										</li>
										<li className='flex gap-5 justify-between items-center p-5 relative bg-gray-100 text-gray-800 text-lg'>
											Experimentation
											<a
												data-video=' 1'
												className='ml-5 text-[1.1rem]'
												target='_blank'
												onClick={() => {
													setSelectedVideoURL(
														videos.experimentation
													);
													toggleVideoModal();
												}}>
												Watch video
											</a>
										</li>
										<li className='flex gap-5 justify-between items-center p-5 relative bg-gray-100 text-gray-800 text-lg'>
											Autonomy
											<a
												data-video=' 1'
												className='ml-5 text-[1.1rem]'
												target='_blank'
												onClick={() => {
													setSelectedVideoURL(videos.autonomy);
													toggleVideoModal();
												}}>
												Watch video
											</a>
										</li>
										<li className='flex gap-5 justify-between items-center p-5 relative bg-gray-100 text-gray-800 text-lg'>
											Social Platforms
											<a
												data-video=' 1'
												className='ml-5 text-[1.1rem]'
												target='_blank'
												onClick={() => {
													setSelectedVideoURL(
														videos.socialPlatforms
													);
													toggleVideoModal();
												}}>
												Watch video
											</a>
										</li>
									</ul>
								</div>
							</div>
							<div className='mt-5 flex gap-5 justify-between'>
								{(session?.user as any)?.role !== "admin" && (
									<button
										className='p-3 rounded inline-flex gap-5 items-center btn text-black-eerie hover:text-blue-ncs w-max'
										onClick={toggleEditUrlsModal}>
										<span>Edit video Urls</span>
										<FontAwesomeIcon className='w-7' icon={faEdit} />
									</button>
								)}
							</div>
						</div>
						<div className='md:w-4/12 pane-right-gradient min-h-screen'>
							<Header
								className='w-full p-5 mb-10'
								toggleIdeasModal={toggleIdeasModal}></Header>

							<div className='p-10'>
								<h4 className='text-[2.1rem] mb-6'>
									7 Practical &amp; Quick
								</h4>
								<ul className='flex flex-col gap-3 mb-5'>
									<li className='flex gap-5 justify-between items-center p-5 relative bg-gray-100 text-gray-800 text-lg'>
										Eco Systems
										<a
											onClick={() => {
												setSelectedVideoURL(videos.ecoSystems);
												toggleVideoModal();
											}}
											className='ml-5 text-[1.1rem]'
											target='_blank'>
											Watch video
										</a>
									</li>
									<li className='flex gap-5 justify-between items-center p-5 relative bg-gray-100 text-gray-800 text-lg'>
										Info is Power
										<a
											onClick={() => {
												setSelectedVideoURL(videos.infoIsPower);
												toggleVideoModal();
											}}
											className='ml-5 text-[1.1rem]'
											target='_blank'>
											Watch video
										</a>
									</li>
									<li className='flex gap-5 justify-between items-center p-5 relative bg-gray-100 text-gray-800 text-lg'>
										OTCR
										<a
											onClick={() => {
												setSelectedVideoURL(videos.OTCR);
												toggleVideoModal();
											}}
											className='ml-5 text-[1.1rem]'
											target='_blank'>
											Watch video
										</a>
									</li>
									<li className='flex gap-5 justify-between items-center p-5 relative bg-gray-100 text-gray-800 text-lg'>
										Value Destruction
										<a
											onClick={() => {
												setSelectedVideoURL(
													videos.valueDestruction
												);
												toggleVideoModal();
											}}
											className='ml-5 text-[1.1rem]'
											target='_blank'>
											Watch video
										</a>
									</li>
									<li className='flex gap-5 justify-between items-center p-5 relative bg-gray-100 text-gray-800 text-lg'>
										Customer Journey
										<a
											onClick={() => {
												setSelectedVideoURL(videos.customerJourney);
												toggleVideoModal();
											}}
											className='ml-5 text-[1.1rem]'
											target='_blank'>
											Watch video
										</a>
									</li>
									<li className='flex gap-5 justify-between items-center p-5 relative bg-gray-100 text-gray-800 text-lg'>
										Digital Platforms
										<a
											onClick={() => {
												setSelectedVideoURL(
													videos.digitalPlatforms
												);
												toggleVideoModal();
											}}
											className='ml-5 text-[1.1rem]'
											target='_blank'>
											Watch video
										</a>
									</li>
									<li className='flex gap-5 justify-between items-center p-5 relative bg-gray-100 text-gray-800 text-lg'>
										Building Capacity
										<a
											onClick={() => {
												setSelectedVideoURL(
													videos.buildingCapacity
												);
												toggleVideoModal();
											}}
											className='ml-5 text-[1.1rem]'
											target='_blank'>
											Watch video
										</a>
									</li>
								</ul>

								<div className='py-3'>
									<ConsultantReview
										className='mt-10'
										pageTitle='Disruption'></ConsultantReview>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* ideas modal */}
			<IdeasModal isOpen={isIdeasModalOpen} toggle={toggleIdeasModal} />

			{/* video modal */}
			<Modal
				config={{
					isShown: isVideoModalOn,
					closeCallback: toggleVideoModal,
					className:
						"flex flex-col w-[90%] lg:w-2/3 max-w-[1320px] h-[90%] max-h-[600px] rounded-xl overflow-hidden ",
				}}>
				<Video url={selectedVideoURL} />
				<div className='flex justify-center p-5 bg-black'>
					<button
						className='btn-diff bg-gray-100 hover:bg-gray-300'
						onClick={toggleVideoModal}>
						close
					</button>
				</div>
			</Modal>

			{/* video urls form modal */}
			<Modal
				config={{
					isShown: isEditUrlsModalOn,
					closeCallback: toggleEditUrlsModal,
					className:
						"flex flex-col w-[90%] lg:w-2/3 max-w-[1320px] h-[90%] max-h-[750px] rounded-xl overflow-hidden p-5 lg:p-10",
				}}>
				<VideosForm
					videos={videos}
					toggleEditUrlsModal={toggleEditUrlsModal}
				/>
			</Modal>
		</>
	);
};

export default Disruption;
