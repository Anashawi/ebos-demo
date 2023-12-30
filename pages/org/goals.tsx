import { useContext, useEffect } from "react";

import { stepNamesEnum, videoPropNamesEnum } from "../../models/enums";
import { appContextData } from "../../context";

import GoalsContent from "../../components/goals/goals-content";
import ChartsContent from "../../components/common/charts-content";

const Goals = () => {
  const { appContext, setAppContext } = useContext(appContextData);
  useEffect(() => setAppContext({ ...appContext, activeStep: stepNamesEnum.visualizeSuccess }), []);

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
