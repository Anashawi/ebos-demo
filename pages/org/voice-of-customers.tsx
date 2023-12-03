import { stepNamesEnum, videoPropNamesEnum } from "../../models/enums";

import VoiceOfCustomersContent from "../../components/voice-of-customers/voice-of-customer-content";
import ChartsContent from "../../components/common/charts-content";
import { useContext } from "react";
import { activeStepData } from "../../context";

const VoiceOfCustomers = () => {
    const { setActiveStep } = useContext(activeStepData);
    setActiveStep(stepNamesEnum.voiceOfCustomers);
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
