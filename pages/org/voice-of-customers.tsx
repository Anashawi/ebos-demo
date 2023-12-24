import { useContext, useEffect } from "react";

import { stepNamesEnum, videoPropNamesEnum } from "../../models/enums";

import VoiceOfCustomersContent from "../../components/voice-of-customers/voice-of-customer-content";
import ChartsContent from "../../components/common/charts-content";
import { appContextData } from "../../context";

const VoiceOfCustomers = () => {
  const { appContext, setAppContext } = useContext(appContextData);
  useEffect(() => setAppContext({ ...appContext, activeStep: stepNamesEnum.voiceOfCustomers }), []);

  return (
    <article className="main-content">
      <article className="forms-container">
        <VoiceOfCustomersContent />
      </article>
      <aside className="aside-content">
        <ChartsContent
          videoPropName={videoPropNamesEnum.voiceOfCustomers}
          videoLabel="Voice of Customers Video"
          chartProducts={[]}
          isChartDataLoading={false}
        />
      </aside>
    </article>
  );
};

export default VoiceOfCustomers;
