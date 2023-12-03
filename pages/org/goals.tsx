import { stepNamesEnum, videoPropNamesEnum } from "../../models/enums";
import { activeStepData } from "../../context";

import GoalsContent from "../../components/goals/goals-content";
import ChartsContent from "../../components/common/charts-content";
import { useContext } from "react";

const Goals = () => {
    const { setActiveStep } = useContext(activeStepData);
    setActiveStep(stepNamesEnum.visualizeSuccess);
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

export default Goals;
