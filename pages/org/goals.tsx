import { stepNamesEnum, videoPropNamesEnum } from "../../models/enums";

import ActionsNavbar from "../../components/common/actions-navbar";
import StepsNavbar from "../../components/common/steps-navbar";
import GoalsContent from "../../components/goals/goals-content";
import ChartsContent from "../../components/common/charts-content";

const Goals = () => {
    return (
        <div className="content-container">
            <header className="left-side-main-navigation">
                <ActionsNavbar
                    selectedStepTitle={stepNamesEnum.visualizeSuccess}
                />
            </header>
            <main className="right-side-step-content">
                <nav className="top-navigation">
                    <StepsNavbar
                        selectedNodeTitle={stepNamesEnum.visualizeSuccess}
                    />
                </nav>
                <article className="main-content">
                    <article className="forms-container">
                        <GoalsContent />
                    </article>
                    <aside className="aside-content">
                        <ChartsContent
                            videoPropName={videoPropNamesEnum.goalsVideo}
                            videoLabel="Goals Video"
                            chartProducts={[]}
                            isChartDataLoading={false}
                        />
                    </aside>
                </article>
            </main>
        </div>
    );
};

export default Goals;
