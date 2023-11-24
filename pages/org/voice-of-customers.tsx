import { stepNamesEnum, videoPropNamesEnum } from "../../models/enums";

import ActionsNavbar from "../../components/common/actions-navbar";
import StepsNavbar from "../../components/common/steps-navbar";
import VoiceOfCustomersContent from "../../components/voice-of-customers/voice-of-customer-content";
import ChartsContent from "../../components/common/charts-content";

const VoiceOfCustomers = () => {
    return (
        <div className="content-container">
            <header className="left-side-main-navigation">
                <ActionsNavbar
                    selectedStepTitle={stepNamesEnum.voiceOfCustomers}
                />
            </header>
            <main className="right-side-step-content">
                <nav className="top-navigation">
                    <StepsNavbar
                        selectedNodeTitle={stepNamesEnum.voiceOfCustomers}
                    />
                </nav>
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
            </main>
        </div>
    );
};

export default VoiceOfCustomers;
