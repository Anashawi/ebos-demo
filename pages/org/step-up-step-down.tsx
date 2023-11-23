import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import * as analysisApi from "../../http-client/analysis.client";
import { useQuery } from "@tanstack/react-query";
import { IUserAnalysis } from "../../models/user-analysis";
import { stepNamesEnum, videoPropNamesEnum } from "../../models/enums";

import useModalToggler from "../../hooks/use-modal-toggler";
import ActionsNavbar from "../../components/common/actions-navbar";
import StepsNavbar from "../../components/common/steps-navbar";
import StepUpStepDownContent from "../../components/step-up-step-down/step-up-step-down-content";
import StepUpStepDownCustomersReview from "../../components/step-up-step-down/customers-review";
import Spinner from "../../components/common/spinner";
import IdeasModal from "../../components/app/ideas-modal";
import Modal from "../../components/common/modal";
import SharedVideoForm from "../../components/disruption/shared-video-form";
import Video from "../../components/disruption/video";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const Analysis = () => {
    const { data: session }: any = useSession();

    const [isIdeasModalOpen, toggleIdeasModal] = useModalToggler();
    const [isEditUrlsModalOn, toggleEditVideoModal] = useModalToggler();
    const [isVideoModalOn, toggleVideoModal] = useModalToggler();

    const emptyUserAnalysis = {
        id: "",
        userId: session?.user?.id,
        above: [],
        below: [],
        customers: [],
    } as IUserAnalysis;

    const [userAnalysis, setUserAnalysis] =
        useState<IUserAnalysis>(emptyUserAnalysis);

    const { data: fetchedAnalysis, isLoading: isAnalysisLoading } =
        useQuery<IUserAnalysis>({
            queryKey: [analysisApi.Keys.All],
            queryFn: analysisApi.getOne,
            refetchOnWindowFocus: false,
            enabled: !!session?.user?.id,
        });

    useEffect(() => {
        if (fetchedAnalysis) {
            setUserAnalysis(fetchedAnalysis);
        }
    }, [fetchedAnalysis]);

    return (
        <>
            <div className="px-16 py-24 bg-gray-100">
                <div className="flex flex-row flex-wrap justify-center gap-16">
                    <ActionsNavbar
                        selectedStepTitle={stepNamesEnum.stepUpStepDownModel}
                    />
                    <div className="grow flex flex-col justify-start gap-8">
                        <StepsNavbar
                            selectedNodeTitle={
                                stepNamesEnum.stepUpStepDownModel
                            }
                        />
                        <div className="flex flex-row flex-wrap justify-center gap-8">
                            <StepUpStepDownContent
                                userAnalysis={userAnalysis}
                                dispatchUserAnalysis={setUserAnalysis}
                                isLoading={isAnalysisLoading}
                            />
                            <div className="min-h-screen px-4 py-8 flex flex-col gap-4 bg-nyanza rounded-3xl">
                                <div className="p-1 bg-white rounded-xl">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            toggleVideoModal(true);
                                        }}
                                        className="w-full btn-primary-light rounded-xl"
                                    >
                                        Watch Video Tutorial
                                    </button>
                                </div>
                                <div className="p-1 bg-white rounded-xl">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            toggleIdeasModal(true);
                                        }}
                                        className="w-full btn-primary-light rounded-xl"
                                    >
                                        My Ideas
                                    </button>
                                </div>
                                {session?.user?.role === "admin" && (
                                    <div className="p-1 bg-white rounded-xl">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                toggleEditVideoModal(true)
                                            }
                                            className="w-full btn-primary-light rounded-xl"
                                        >
                                            <span>Edit video Url</span>
                                            <FontAwesomeIcon
                                                className="w-7"
                                                icon={faEdit}
                                            />
                                        </button>
                                    </div>
                                )}
                                {isAnalysisLoading && (
                                    <Spinner
                                        message="Loading customers..."
                                        className="p-5 items-center text-xl"
                                    />
                                )}
                                {!isAnalysisLoading && (
                                    <StepUpStepDownCustomersReview
                                        userAnalysis={userAnalysis}
                                        isLoading={isAnalysisLoading}
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
                }}
            >
                <Video videoPropName={videoPropNamesEnum.stepUpStepDownModel} />
                <div className="flex justify-center p-5 bg-black">
                    <button
                        className="btn-diff bg-gray-100 hover:bg-gray-300 text-dark-400"
                        onClick={() => toggleVideoModal(false)}
                    >
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
                }}
            >
                <SharedVideoForm
                    toggleEditVideoModal={() => toggleEditVideoModal(false)}
                    videoPropName={videoPropNamesEnum.stepUpStepDownModel}
                    videoLabel="Step Up Step Down Model Video"
                />
            </Modal>
        </>
    );
};

export default Analysis;
