import { stepNamesEnum, videoPropNamesEnum } from "../../models/enums";

import ActionsNavbar from "../../components/common/actions-navbar";
import StepsNavbar from "../../components/common/steps-navbar";
import GoalsContent from "../../components/goals/goals-content";
import ChartsContent from "../../components/common/charts-content";

const Goals = () => {
    return (
        <>
            <div className="px-16 py-24 bg-gray-100">
                <div className="flex flex-row flex-wrap justify-center gap-16">
                    <ActionsNavbar
                        selectedStepTitle={stepNamesEnum.visualizeSuccess}
                    />
                    <div className="grow flex flex-col justify-start gap-8">
                        <StepsNavbar
                            selectedNodeTitle={stepNamesEnum.visualizeSuccess}
                        />
                        <main className="flex flex-row flex-wrap justify-center gap-8">
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
            </div>
        </>
    );
};

export default Goals;
