import { stepNamesEnum, videoPropNamesEnum } from "../../models/enums";

import GoalsContent from "../../components/goals/goals-content";
import ChartsContent from "../../components/common/charts-content";

const Goals = () => {
    return (
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
    );
};

Goals.stepTitle = stepNamesEnum.visualizeSuccess;

export default Goals;
