import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import * as nonCustomersApi from "../../http-client/non-customers.client";
import { useQuery } from "@tanstack/react-query";
import { IUserNonCustomers } from "../../models/user-non-customers";
import { stepNamesEnum, videoPropNamesEnum } from "../../models/enums";

import ActionsNavbar from "../../components/common/actions-navbar";
import StepsNavbar from "../../components/common/steps-navbar";
import NonCustomersContent from "../../components/non-customers/non-customers-content";
import NonCustomersReview from "../../components/non-customers/review";
import Spinner from "../../components/common/spinner";
import Video from "../../components/disruption/video";
import useModalToggler from "../../hooks/use-modal-toggler";
import SharedVideoForm from "../../components/disruption/shared-video-form";
import Modal from "../../components/common/modal";
import IdeasModal from "../../components/app/ideas-modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

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

    const { data: fetchedNonCustomers, isLoading: areNonCustomersLoading } =
        useQuery<IUserNonCustomers>({
            queryKey: [nonCustomersApi.Keys.All],
            queryFn: nonCustomersApi.getOne,
            refetchOnWindowFocus: false,
            enabled: !!session?.user?.id,
        });

    useEffect(() => {
        if (fetchedNonCustomers) {
            setUserNonCustomers(fetchedNonCustomers);
        }
    }, [fetchedNonCustomers]);

    return (
        <>
            <div className="min-w-[1366px] min-h-[100vh] flex flex-row justify-center gap-16 px-8 py-16 bg-gray-100">
                <div className="md:max-w-[100px] flex flex-col px-4 py-8 bg-white rounded-full">
                    <ActionsNavbar
                        selectedStepTitle={stepNamesEnum.nonCustomers}
                    />
                </div>
                <div className="grow flex flex-col justify-start gap-8">
                    <StepsNavbar
                        selectedNodeTitle={stepNamesEnum.nonCustomers}
                    />
                    <div className="flex flex-row justify-center gap-8">
                        <NonCustomersContent
                            userNonCustomers={userNonCustomers}
                            dispatchUserNonCustomers={setUserNonCustomers}
                            isLoading={areNonCustomersLoading}
                        />
                        <div className="min-h-screen px-4 py-8 flex flex-col gap-4 bg-nyanza rounded-3xl">
                            <div className="p-1 bg-white rounded-xl">
                                <button
                                    type="button"
                                    className="w-full btn-primary-light rounded-xl"
                                    onClick={() => {
                                        toggleVideoModal(true);
                                    }}
                                >
                                    Watch Video Tutorial
                                </button>
                            </div>
                            <div className="p-1 bg-white rounded-xl">
                                <button
                                    type="button"
                                    className="w-full btn-primary-light rounded-xl"
                                    onClick={() => {
                                        toggleIdeasModal(true);
                                    }}
                                >
                                    My Ideas
                                </button>
                            </div>
                            {session?.user?.role === "admin" && (
                                <div className="p-1 bg-white rounded-xl">
                                    <button
                                        type="button"
                                        className="w-full btn-primary-light rounded-xl"
                                        onClick={() =>
                                            toggleEditVideoModal(true)
                                        }
                                    >
                                        <span>Edit video Url</span>
                                        <FontAwesomeIcon
                                            className="w-7"
                                            icon={faEdit}
                                        />
                                    </button>
                                </div>
                            )}
                            {areNonCustomersLoading && (
                                <Spinner
                                    message="Loading non-customers..."
                                    className="p-5 items-center text-xl"
                                />
                            )}
                            {!areNonCustomersLoading && (
                                <NonCustomersReview
                                    userNonCustomers={userNonCustomers}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>

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
                <Video videoPropName={videoPropNamesEnum.nonCustomers} />
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
                    videoPropName={videoPropNamesEnum.nonCustomers}
                    videoLabel="Non Customers Video"
                />
            </Modal>
        </>
    );
};

export default NonCustomers;
