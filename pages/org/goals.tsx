import { useContext, useEffect, useState } from "react";

import { stepNamesEnum, videoPropNamesEnum } from "../../models/enums";
import { appContextData } from "../../context";

import GoalsContent from "../../components/goals/goals-content";
import ChartsContent from "../../components/common/charts-content";
import OpenAIChat from "../../components/common/openai-chat";

const Goals = () => {
  const { setAppContext } = useContext(appContextData);
  useEffect(() => {
    setAppContext((prev) => ({ ...prev, activeStep: stepNamesEnum.visualizeSuccess }));
  }, []);

  const [openaiMessage, setOpenaiMessage] = useState("");

  return (
    <>
      <article className="main-content">
        <article className="forms-container">
          <GoalsContent setOpenaiMessage={setOpenaiMessage} />
        </article>
        <aside className="aside-content">
          <ChartsContent
            videoPropName={videoPropNamesEnum.goalsVideo}
            videoLabel="Goals Video"
            chartProducts={[]}
            isChartDataLoading={false}
            setOpenaiMessage={setOpenaiMessage}
          />
        </aside>
      </article>
      <OpenAIChat initialMessage={openaiMessage}></OpenAIChat>
    </>
  );
};

export default Goals;
