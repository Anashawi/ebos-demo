import { useContext, useEffect, useMemo, useState } from "react";

import { IVideos } from "../../models/videos";
import { stepNamesEnum, videoPropNamesEnum } from "../../models/enums";
import { appContextData } from "../../context";

import useModalToggler from "../../hooks/use-modal-toggler";
import IdeasModal from "../../components/app/ideas-modal";
import Modal from "../../components/common/modal";
import DisruptionContent from "../../components/disruption/disruption-content";
import Video from "../../components/disruption/video";
import VideosForm from "../../components/disruption/videos-form";
import VideosButtonList from "../../components/disruption/videos-button-list";
import ChartsButton from "../../components/common/charts/charts-button";
import Chat from "../../components/common/openai-chat";

const Disruption = () => {
  const { setAppContext } = useContext(appContextData);
  useEffect(() => {
    setAppContext((prev) => ({ ...prev, activeStep: stepNamesEnum.disruption }));
  }, []);

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

  const [selectedVideoPropName, setSelectedVideoPropName] = useState<videoPropNamesEnum>(videoPropNamesEnum.goalsVideo);
  const [videos, setVideos] = useState<IVideos>(emptyVideos);
  const [openaiMessage, setOpenaiMessage] = useState(``);

  const [isIdeasModalOpen, toggleIdeasModal] = useModalToggler();
  const [isVideoModalOn, toggleVideoModal] = useModalToggler();
  const [isEditUrlsModalOn, toggleEditUrlsModal] = useModalToggler();

  return (
    <>
      <article className="main-content">
        <article className="forms-container">
          <DisruptionContent
            videos={videos}
            dispatchVideos={setVideos}
            setSelectedVideoPropName={setSelectedVideoPropName}
            toggleEditUrlsModal={toggleEditUrlsModal}
            toggleVideoModal={toggleVideoModal}
            setOpenaiMessage={setOpenaiMessage}
          />
        </article>
        <aside className="aside-content">
          <article className="helpers-modals-and-charts">
            <ChartsButton title="My Ideas" icon={undefined} clickCallback={() => toggleIdeasModal(true)} />
            <VideosButtonList
              title="7 Practical &amp; Quick"
              videosProps={[
                {
                  title: "Eco Systems",
                  name: videoPropNamesEnum.ecoSystems,
                },
                {
                  title: "Info is Power",
                  name: videoPropNamesEnum.infoIsPower,
                },
                {
                  title: "OTCR",
                  name: videoPropNamesEnum.OTCR,
                },
                {
                  title: "Value Destruction",
                  name: videoPropNamesEnum.valueDestruction,
                },
                {
                  title: "Customer Journey",
                  name: videoPropNamesEnum.customerJourney,
                },
                {
                  title: "Digital Platforms",
                  name: videoPropNamesEnum.digitalPlatforms,
                },
                {
                  title: "Building Capacity",
                  name: videoPropNamesEnum.buildingCapacity,
                },
              ]}
              setSelectedVideoPropName={setSelectedVideoPropName}
              toggleVideoModal={toggleVideoModal}
            />
          </article>
        </aside>
      </article>
      {/* ideas modal */}
      <IdeasModal isOpen={isIdeasModalOpen} toggle={() => toggleIdeasModal()} setOpenaiMessage={setOpenaiMessage} />
      {/* video modal */}
      <Modal
        config={{
          isShown: isVideoModalOn,
          closeCallback: () => toggleVideoModal(false),
          className: "flex flex-col w-[90%] lg:w-2/3 max-w-[1320px] h-[90%] max-h-[600px] rounded-xl overflow-hidden ",
        }}>
        <Video videoPropName={selectedVideoPropName} />
        <div className="flex justify-center p-5 bg-black">
          <button
            className="btn-diff bg-gray-100 hover:bg-gray-300 text-dark-400"
            onClick={() => toggleVideoModal(false)}>
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
        }}>
        <VideosForm videos={videos} toggleEditUrlsModal={() => toggleEditUrlsModal(false)} />
      </Modal>
      <Chat initialMessage={openaiMessage}></Chat>
    </>
  );
};

export default Disruption;
