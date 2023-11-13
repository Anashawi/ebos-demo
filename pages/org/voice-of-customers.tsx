import { stepNamesEnum, videoPropNamesEnum } from "../../models/enums";

import ActionsNavbar from "../../components/common/actions-navbar";
import StepsNavbar from "../../components/common/steps-navbar";
import VoiceOfCustomersContent from "../../components/voice-of-customers/voice-of-customer-content";
import ChartsContent from "../../components/common/charts-content";

const VoiceOfCustomers = () => {
    return (
        <>
            <div className="px-16 py-24 bg-gray-100">
                <div className="flex flex-row flex-wrap justify-center gap-16">
                    <ActionsNavbar
                        selectedStepTitle={stepNamesEnum.voiceOfCustomers}
                    />
                    <div className="grow flex flex-col justify-start gap-8">
                        <StepsNavbar
                            selectedNodeTitle={stepNamesEnum.voiceOfCustomers}
                        />
                        <div className="flex flex-row flex-wrap justify-center gap-8">
                            <VoiceOfCustomersContent />
                            <ChartsContent
                                videoPropName={
                                    videoPropNamesEnum.voiceOfCustomers
                                }
                                videoLabel="Voice of Customers Video"
                                chartProducts={[]}
                                isChartDataLoading={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VoiceOfCustomers;
