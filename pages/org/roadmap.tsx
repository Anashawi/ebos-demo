import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

import * as ideasApi from "../../http-client/ideas.client";
import { useQuery } from "@tanstack/react-query";
import { IUserIdeas } from "../../models/user-idea";
import { stepNamesEnum, videoPropNamesEnum } from "../../models/enums";

import useModalToggler from "../../hooks/use-modal-toggler";
import Spinner from "../../components/common/spinner";
import RoadMapContent from "../../components/roadmap/roadmap-content";
import StepsNavbar from "../../components/common/steps-navbar";
import ActionsNavbar from "../../components/common/actions-navbar";
import RoadmapChart from "../../components/roadmap/roadmap-chart";
import IdeasModal from "../../components/app/ideas-modal";
import Modal from "../../components/common/modal";
import SharedVideoForm from "../../components/disruption/shared-video-form";
import Video from "../../components/disruption/video";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const RoadMap = () => {
    const { data: session }: any = useSession();

    const [isIdeasModalOpen, toggleIdeasModal] = useModalToggler();
    const [isEditUrlsModalOn, toggleEditVideoModal] = useModalToggler();
    const [isVideoModalOn, toggleVideoModal] = useModalToggler();

    // "yyyy-mm"
    const todayDateStr = new Date().toISOString().substring(0, 7);

    const emptyUserIdeas: IUserIdeas = {
        id: "",
        startDate: todayDateStr,
        userId: session?.user?.id,
        ideas: [],
    } as IUserIdeas;
    const [userIdeas, setUserIdeas] = useState<IUserIdeas>(emptyUserIdeas);

    const { data: fetchedIdeas, isLoading: areIdeasLoading } =
        useQuery<IUserIdeas>({
            queryKey: [ideasApi.Keys.All],
            queryFn: ideasApi.getOne,
            refetchOnWindowFocus: false,
        });

    useEffect(() => {
        if (fetchedIdeas) {
            fetchedIdeas.ideas.forEach(idea => {
                !idea.durationInMonths ? (idea.durationInMonths = 6) : null;
            });
            setUserIdeas(fetchedIdeas);
        }
    }, [fetchedIdeas]);

    return (
        <>
            <div className="min-w-[1366px] min-h-[100vh] flex flex-row justify-center gap-16 px-8 py-16 bg-gray-100">
                <div className="md:max-w-[100px] flex flex-col px-4 py-8 bg-white rounded-full">
                    <ActionsNavbar selectedStepTitle={stepNamesEnum.roadMap} />
                </div>
                <div className="grow flex flex-col justify-start gap-8">
                    <StepsNavbar selectedNodeTitle={stepNamesEnum.roadMap} />
                    <div className="flex flex-row justify-center gap-8">
                        <RoadMapContent
                            userIdeas={userIdeas}
                            dispatchUserIdeas={setUserIdeas}
                            todayDateStr={todayDateStr}
                            isLoading={areIdeasLoading}
                        />
                        <div className="grow md:grow-0 right-content">
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
                            <div className="p-1 bg-white rounded-xl">
                                <Link
                                    href="/org/report"
                                    className="w-full btn-primary-light rounded-xl hover:text-white"
                                >
                                    Generate Report
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="p-8 rounded-2xl bg-white">
                        {areIdeasLoading && (
                            <Spinner
                                className="flex items-center px-1 text-2xl"
                                message="Loading roadmap ideas chart..."
                            />
                        )}
                        {!areIdeasLoading && userIdeas.ideas.length === 0 && (
                            <div className="w-full flex items-center">
                                <p className="text-2xl text-center italic">
                                    Start adding your ideas to see roadmap ideas
                                    chart...
                                </p>
                            </div>
                        )}
                        {!areIdeasLoading && userIdeas.ideas.length > 0 && (
                            <RoadmapChart userIdeas={userIdeas} />
                        )}
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
                <Video videoPropName={videoPropNamesEnum.roadMap} />
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
                    videoPropName={videoPropNamesEnum.roadMap}
                    videoLabel="Road Map Video"
                />
            </Modal>
        </>
    );
};

export default RoadMap;
