import { useSession } from "next-auth/react";
import { videoPropNamesEnum } from "../../models/enums";
import useModalToggler from "../../hooks/use-modal-toggler";

import IdeasModal from "../../components/app/ideas-modal";
import Modal from "../../components/common/modal";
import SharedVideoForm from "../../components/disruption/shared-video-form";
import Video from "../../components/disruption/video";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const ChartsContent = () => {
    const { data: session }: any = useSession();

    const [isIdeasModalOpen, toggleIdeasModal] = useModalToggler();
    const [isEditUrlModalOn, toggleEditVideoModal] = useModalToggler();
    const [isVideoModalOn, toggleVideoModal] = useModalToggler(false);

    return (
        <>
            <div className="right-content w-auto">
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
                {session?.user?.role === "admin" && (
                    <div className="p-1 bg-white rounded-xl">
                        <button
                            type="button"
                            onClick={() => toggleEditVideoModal(true)}
                            className="w-full btn-primary-light rounded-xl"
                        >
                            <span>Edit video Url</span>
                            <FontAwesomeIcon className="w-7" icon={faEdit} />
                        </button>
                    </div>
                )}
            </div>

            {/* ideas modal */}
            <IdeasModal
                isOpen={isIdeasModalOpen}
                toggle={() => toggleIdeasModal(false)}
            />

            {/* video url form modal */}
            <Modal
                config={{
                    isShown: isEditUrlModalOn,
                    closeCallback: () => toggleEditVideoModal(false),
                    className:
                        "flex flex-col lg:w-1/3 max-w-[1320px] rounded-xl overflow-hidden p-5 lg:p-10",
                }}
            >
                <SharedVideoForm
                    toggleEditVideoModal={() => toggleEditVideoModal(false)}
                    videoPropName={videoPropNamesEnum.goalsVideo}
                    videoLabel="Goals Video"
                />
            </Modal>

            {/* video modal */}
            <Modal
                config={{
                    isShown: isVideoModalOn,
                    closeCallback: () => toggleVideoModal(false),
                    className:
                        "flex flex-col w-[90%] lg:w-2/3 max-w-[1320px] h-[90%] max-h-[600px] rounded-xl overflow-hidden ",
                }}
            >
                <Video videoPropName={videoPropNamesEnum.goalsVideo} />
                <div className="flex justify-center p-5 bg-black">
                    <button
                        className="btn-diff bg-gray-100 hover:bg-gray-300 text-dark-400"
                        onClick={() => toggleVideoModal(false)}
                    >
                        close
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default ChartsContent;
