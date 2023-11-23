import { stepNamesEnum, videoPropNamesEnum } from "../../models/enums";

import ActionsNavbar from "../../components/common/actions-navbar";
import StepsNavbar from "../../components/common/steps-navbar";
import VoiceOfCustomersContent from "../../components/voice-of-customers/voice-of-customer-content";
import ChartsContent from "../../components/common/charts-content";

const VoiceOfCustomers = () => {
    return (
        <div className="min-w-[1366px] min-h-[100vh] flex flex-row justify-center gap-16 px-8 py-16 bg-gray-100">
            <div className="md:max-w-[100px] flex flex-col px-4 py-8 bg-white rounded-full">
                <ActionsNavbar
                    selectedStepTitle={stepNamesEnum.voiceOfCustomers}
                />
            </div>
            <div className="grow flex flex-col justify-start gap-8">
                <StepsNavbar
                    selectedNodeTitle={stepNamesEnum.voiceOfCustomers}
                />
                <div className="flex flex-row justify-center gap-8">
                    <VoiceOfCustomersContent />
                    <ChartsContent
                        videoPropName={videoPropNamesEnum.voiceOfCustomers}
                        videoLabel="Voice of Customers Video"
                        chartProducts={[]}
                        isChartDataLoading={false}
                    />
                </div>
            </div>
        </div>
    );
};

export default VoiceOfCustomers;
