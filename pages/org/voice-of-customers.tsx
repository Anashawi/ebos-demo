import { stepNamesEnum, videoPropNamesEnum } from "../../models/enums";

import VoiceOfCustomersContent from "../../components/voice-of-customers/voice-of-customer-content";
import ChartsContent from "../../components/common/charts-content";

const VoiceOfCustomers = () => {
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

VoiceOfCustomers.stepTitle = stepNamesEnum.voiceOfCustomers;

export default VoiceOfCustomers;
