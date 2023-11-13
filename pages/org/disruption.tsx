import { useMemo, useState } from "react";

import { IVideos } from "../../models/videos";
import { stepNamesEnum, videoPropNamesEnum } from "../../models/enums";

import useModalToggler from "../../hooks/use-modal-toggler";
import IdeasModal from "../../components/app/ideas-modal";
import Modal from "../../components/common/modal";
import ActionsNavbar from "../../components/common/actions-navbar";
import StepsNavbar from "../../components/common/steps-navbar";
import PillPlayButton from "../../components/common/pill-play-button";
import DisruptionContent from "../../components/disruption/disruption-content";
import Video from "../../components/disruption/video";
import VideosForm from "../../components/disruption/videos-form";

const Disruption = () => {
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

    const [selectedVideoPropName, setSelectedVideoPropName] =
        useState<videoPropNamesEnum>(videoPropNamesEnum.goalsVideo);
    const [videos, setVideos] = useState<IVideos>(emptyVideos);
    const [isIdeasModalOpen, toggleIdeasModal] = useModalToggler();
    const [isVideoModalOn, toggleVideoModal] = useModalToggler();
    const [isEditUrlsModalOn, toggleEditUrlsModal] = useModalToggler();

    return (
        <>
            <div className="px-16 py-24 bg-gray-100">
                <div className="flex flex-row flex-wrap justify-center gap-16">
                    <ActionsNavbar
                        selectedStepTitle={stepNamesEnum.disruption}
                    />
                    <div className="grow flex flex-col justify-start gap-8">
                        <StepsNavbar
                            selectedNodeTitle={stepNamesEnum.disruption}
                        />
                        <div className="flex flex-row flex-wrap justify-center gap-8">
                            <DisruptionContent
                                videos={videos}
                                dispatchVideos={setVideos}
                                setSelectedVideoPropName={
                                    setSelectedVideoPropName
                                }
                                toggleEditUrlsModal={toggleEditUrlsModal}
                                toggleVideoModal={toggleVideoModal}
                            />
                            <div className="min-h-screen px-4 py-8 flex flex-col gap-4 bg-nyanza rounded-3xl">
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
                                <div className="px-10 py-5">
                                    <h4 className="mb-3 text-[1.75rem] text-dark-400 font-hero-bold">
                                        7 Practical &amp; Quick
                                    </h4>
                                    <ul className="flex flex-col gap-2">
                                        <li>
                                            <PillPlayButton
                                                buttonText="Eco Systems"
                                                onClickCallback={() => {
                                                    setSelectedVideoPropName(
                                                        videoPropNamesEnum.ecoSystems
                                                    );
                                                    toggleVideoModal();
                                                }}
                                            />
                                        </li>
                                        <li>
                                            <PillPlayButton
                                                buttonText="Info is Power"
                                                onClickCallback={() => {
                                                    setSelectedVideoPropName(
                                                        videoPropNamesEnum.infoIsPower
                                                    );
                                                    toggleVideoModal();
                                                }}
                                            />
                                        </li>
                                        <li>
                                            <PillPlayButton
                                                buttonText="OTCR"
                                                onClickCallback={() => {
                                                    setSelectedVideoPropName(
                                                        videoPropNamesEnum.OTCR
                                                    );
                                                    toggleVideoModal();
                                                }}
                                            />
                                        </li>
                                        <li>
                                            <PillPlayButton
                                                buttonText="Value Destruction"
                                                onClickCallback={() => {
                                                    setSelectedVideoPropName(
                                                        videoPropNamesEnum.valueDestruction
                                                    );
                                                    toggleVideoModal();
                                                }}
                                            />
                                        </li>
                                        <li>
                                            <PillPlayButton
                                                buttonText="Customer Journey"
                                                onClickCallback={() => {
                                                    setSelectedVideoPropName(
                                                        videoPropNamesEnum.customerJourney
                                                    );
                                                    toggleVideoModal();
                                                }}
                                            />
                                        </li>
                                        <li>
                                            <PillPlayButton
                                                buttonText="Digital Platforms"
                                                onClickCallback={() => {
                                                    setSelectedVideoPropName(
                                                        videoPropNamesEnum.digitalPlatforms
                                                    );
                                                    toggleVideoModal();
                                                }}
                                            />
                                        </li>
                                        <li>
                                            <PillPlayButton
                                                buttonText="Building Capacity"
                                                onClickCallback={() => {
                                                    setSelectedVideoPropName(
                                                        videoPropNamesEnum.buildingCapacity
                                                    );
                                                    toggleVideoModal();
                                                }}
                                            />
                                        </li>
                                    </ul>
                                </div>
                            </div>
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
                <Video videoPropName={selectedVideoPropName} />
                <div className="flex justify-center p-5 bg-black">
                    <button
                        className="btn-diff bg-gray-100 hover:bg-gray-300 text-dark-400"
                        onClick={() => toggleVideoModal(false)}
                    >
                        close
                    </button>
                </div>
            </Modal>

            {/* video urls form modal */}
            <Modal
                config={{
                    isShown: isEditUrlsModalOn,
                    closeCallback: () => toggleEditUrlsModal(false),
                    className:
                        "flex flex-col w-[90%] lg:w-2/3 max-w-[1320px] h-[90%] max-h-[750px] rounded-xl overflow-hidden p-5 lg:p-10",
                }}
            >
                <VideosForm
                    videos={videos}
                    toggleEditUrlsModal={() => toggleEditUrlsModal(false)}
                />
            </Modal>
        </>
    );
};

export default Disruption;
