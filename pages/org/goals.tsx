import { stepNamesEnum } from "../../models/enums";
import StepsNavbar from "../../components/common/steps-navbar";
import ActionsNavbar from "../../components/common/actions-navbar";
import GoalsContent from "../../components/goals/goals-content";
import ChartsContent from "../../components/common/charts-content";

const Goals = () => {
    return (
        <>
            <div className="bg-gray-100 pt-9">
                <div className="flex gap-[4.4rem] px-16 m-auto">
                    <div className="py-12">
                        <ActionsNavbar
                            selectedStepTitle={stepNamesEnum.visualizeSuccess}
                        />
                    </div>
                    <div className="grow max-w-[1920px] flex flex-col py-12 mx-auto">
                        <StepsNavbar
                            selectedNode={stepNamesEnum.visualizeSuccess}
                        />
                        <div className="content-container">
                            <div className="left-content grow">
                                <GoalsContent />
                            </div>
                            <ChartsContent></ChartsContent>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Goals;
