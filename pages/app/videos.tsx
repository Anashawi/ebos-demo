import Image from "next/image";
import Link from "next/link";
import IdeasModal from "../../components/app/ideas-modal";
import Modal from "../../components/common/modal";
import useModalToggler from "../../hooks/use-modal-toggler";
import { useEffect, useMemo, useState } from "react";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import VideosForm from "../../components/videos/videos-form";
import Video from "../../components/videos/video";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as clientApi from "../../http-client/videos.client";
import { IVideos } from "../../models/videos";
import { useSession } from "next-auth/react";

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
							<div className='pb-5'>
								<strong className='mr-1'>Mustafa Khairy </strong> |
								<a href='http://bo.adpadelhouse.com/logout'> logout </a>
							</div>

							<h3 className='text-[2.52rem] mb-6 text-yellow-green'>
								Videos
							</h3>

							<h3 className='text-[2.52rem] mb-6 font-normal'>
								10 Comprehensives
							</h3>
							<p className='mb-10'>
								Watch help videos then update your ideas accordingly.
								Submit for feedback.
							</p>
							<div className='flex flex-wrap gap-5'>
								<div className='col-1/2 grow'>
									<h4 className='text-[2.1rem] mb-6'>Scale</h4>
									<ul className='flex flex-col gap-3 mb-5'>
										<li className='flex gap-5 justify-between items-center p-5 relative rounded-lg bg-gray-100 text-gray-800'>
											Staff on Demand
											<a
												className='ml-5 text-[1.2rem]'
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
										<li className='flex gap-5 justify-between items-center p-5 relative rounded-lg bg-gray-100 text-gray-800'>
											Community and Crowd
											<a
												data-video='1'
												className='ml-5 text-[1.2rem]'
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
										<li className='flex gap-5 justify-between items-center p-5 relative rounded-lg bg-gray-100 text-gray-800'>
											Algorithms
											<a
												data-video=' 1'
												className='ml-5 text-[1.2rem]'
												target='_blank'
												onClick={() => {
													setSelectedVideoURL(videos.algorithms);
													toggleVideoModal();
												}}>
												Watch video
											</a>
										</li>
										<li className='flex gap-5 justify-between items-center p-5 relative rounded-lg bg-gray-100 text-gray-800'>
											Leveraged Assets
											<a
												data-video=' 1'
												className='ml-5 text-[1.2rem]'
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
										<li className='flex gap-5 justify-between items-center p-5 relative rounded-lg bg-gray-100 text-gray-800'>
											Engagement
											<a
												data-video=' 1'
												className='ml-5 text-[1.2rem]'
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
										<li className='flex gap-5 justify-between items-center p-5 relative rounded-lg bg-gray-100 text-gray-800'>
											Interface
											<a
												data-video=' 1'
												className='ml-5 text-[1.2rem]'
												target='_blank'
												onClick={() => {
													setSelectedVideoURL(videos.interface);
													toggleVideoModal();
												}}>
												Watch video
											</a>
										</li>
										<li className='flex gap-5 justify-between items-center p-5 relative rounded-lg bg-gray-100 text-gray-800'>
											Dashboard
											<a
												data-video=' 1'
												className='ml-5 text-[1.2rem]'
												target='_blank'
												onClick={() => {
													setSelectedVideoURL(videos.dashboard);
													toggleVideoModal();
												}}>
												Watch video
											</a>
										</li>
										<li className='flex gap-5 justify-between items-center p-5 relative rounded-lg bg-gray-100 text-gray-800'>
											Experimentation
											<a
												data-video=' 1'
												className='ml-5 text-[1.2rem]'
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
										<li className='flex gap-5 justify-between items-center p-5 relative rounded-lg bg-gray-100 text-gray-800'>
											Autonomy
											<a
												data-video=' 1'
												className='ml-5 text-[1.2rem]'
												target='_blank'
												onClick={() => {
													setSelectedVideoURL(videos.autonomy);
													toggleVideoModal();
												}}>
												Watch video
											</a>
										</li>
										<li className='flex gap-5 justify-between items-center p-5 relative rounded-lg bg-gray-100 text-gray-800'>
											Social Platforms
											<a
												data-video=' 1'
												className='ml-5 text-[1.2rem]'
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
								<Link
									href='/'
									className='btn text-black-eerie hover:text-blue-ncs w-max'>
									<strong>Back To Dashboard</strong>
								</Link>
								{(session?.user as any)?.role === "admin" && (
									<button
										className='p-3 rounded inline-flex gap-5 items-center btn text-black-eerie hover:text-blue-ncs w-max'
										onClick={toggleEditUrlsModal}>
										<span>Edit videos Urls</span>
										<FontAwesomeIcon className='w-7' icon={faEdit} />
									</button>
								)}
							</div>
						</div>
						<div className='md:w-4/12 pane-right-gradient min-h-screen p-12'>
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

							<h4 className='text-[2.1rem] mb-6'>
								7 Practical &amp; Quick
							</h4>

							<ul className='flex flex-col gap-3 mb-5'>
								<li className='flex gap-5 justify-between items-center p-5 relative rounded-lg bg-gray-100 text-gray-800'>
									Eco Systems
									<a
										onClick={() => {
											setSelectedVideoURL(videos.ecoSystems);
											toggleVideoModal();
										}}
										className='ml-5 text-[1.2rem]'
										target='_blank'>
										Watch video
									</a>
								</li>
								<li className='flex gap-5 justify-between items-center p-5 relative rounded-lg bg-gray-100 text-gray-800'>
									Info is Power
									<a
										onClick={() => {
											setSelectedVideoURL(videos.infoIsPower);
											toggleVideoModal();
										}}
										className='ml-5 text-[1.2rem]'
										target='_blank'>
										Watch video
									</a>
								</li>
								<li className='flex gap-5 justify-between items-center p-5 relative rounded-lg bg-gray-100 text-gray-800'>
									OTCR
									<a
										onClick={() => {
											setSelectedVideoURL(videos.OTCR);
											toggleVideoModal();
										}}
										className='ml-5 text-[1.2rem]'
										target='_blank'>
										Watch video
									</a>
								</li>
								<li className='flex gap-5 justify-between items-center p-5 relative rounded-lg bg-gray-100 text-gray-800'>
									Value Destruction
									<a
										onClick={() => {
											setSelectedVideoURL(videos.valueDestruction);
											toggleVideoModal();
										}}
										className='ml-5 text-[1.2rem]'
										target='_blank'>
										Watch video
									</a>
								</li>
								<li className='flex gap-5 justify-between items-center p-5 relative rounded-lg bg-gray-100 text-gray-800'>
									Customer Journey
									<a
										onClick={() => {
											setSelectedVideoURL(videos.customerJourney);
											toggleVideoModal();
										}}
										className='ml-5 text-[1.2rem]'
										target='_blank'>
										Watch video
									</a>
								</li>
								<li className='flex gap-5 justify-between items-center p-5 relative rounded-lg bg-gray-100 text-gray-800'>
									Digital Platforms
									<a
										onClick={() => {
											setSelectedVideoURL(videos.digitalPlatforms);
											toggleVideoModal();
										}}
										className='ml-5 text-[1.2rem]'
										target='_blank'>
										Watch video
									</a>
								</li>
								<li className='flex gap-5 justify-between items-center p-5 relative rounded-lg bg-gray-100 text-gray-800'>
									Building Capacity
									<a
										onClick={() => {
											setSelectedVideoURL(videos.buildingCapacity);
											toggleVideoModal();
										}}
										className='ml-5 text-[1.2rem]'
										target='_blank'>
										Watch video
									</a>
								</li>
							</ul>

							<div className='py-3'>
								<button className='btn text-black-eerie'>
									<strong>Request </strong> for consultant review
								</button>
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
