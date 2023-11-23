import { stepNamesEnum, videoPropNamesEnum } from "../../models/enums";

import ActionsNavbar from "../../components/common/actions-navbar";
import StepsNavbar from "../../components/common/steps-navbar";
import GoalsContent from "../../components/goals/goals-content";
import ChartsContent from "../../components/common/charts-content";

const Goals = () => {
    return (
        <div className="min-w-[1366px] min-h-[100vh] flex flex-row justify-center gap-16 px-8 py-16 bg-gray-100">
            <div className="md:max-w-[100px] min-h-[84vh] flex flex-col justify-between px-4 py-8 bg-white rounded-full">
                <ActionsNavbar
                    selectedStepTitle={stepNamesEnum.visualizeSuccess}
                />
            </div>
            <div className="grow flex flex-col justify-start gap-8">
                <StepsNavbar
                    selectedNodeTitle={stepNamesEnum.visualizeSuccess}
                />
                <main className="flex flex-row flex-wrap justify-center gap-4">
                    <GoalsContent />
                    <ChartsContent
                        videoPropName={videoPropNamesEnum.goalsVideo}
                        videoLabel="Goals Video"
                        chartProducts={[]}
                        isChartDataLoading={false}
                    />
                </main>
            </div>
        </div>
    );
};

export default Goals;
