import { useContext, useEffect, useState } from "react";

import { stepNamesEnum, videoPropNamesEnum } from "../../models/enums";
import { appContextData } from "../../context";

import VoiceOfCustomersContent from "../../components/voice-of-customers/voice-of-customer-content";
import ChartsContent from "../../components/common/charts-content";
import Chat from "../../components/common/openai-chat";

const VoiceOfCustomers = () => {
  const { setAppContext } = useContext(appContextData);
  useEffect(() => {
    setAppContext((prev) => ({ ...prev, activeStep: stepNamesEnum.voiceOfCustomers }));
  }, []);

  const [openaiMessage, setOpenaiMessage] = useState(``);

  return (
    <>
      <article className="main-content">
        <article className="forms-container">
          <VoiceOfCustomersContent setOpenaiMessage={setOpenaiMessage} />
        </article>
        <aside className="aside-content">
          <ChartsContent
            videoPropName={videoPropNamesEnum.voiceOfCustomers}
            videoLabel="Voice of Customers Video"
            chartProducts={[]}
            isChartDataLoading={false}
            setOpenaiMessage={setOpenaiMessage}
          />
        </aside>
      </article>
      <Chat initialMessage={openaiMessage}></Chat>
    </>
  );
};

export default VoiceOfCustomers;
