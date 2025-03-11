import { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import * as ideasApi from "../../http-client/ideas.client";
import { useQuery } from "@tanstack/react-query";
import { IUserIdeas } from "../../models/user-idea";
import { stepNamesEnum, videoPropNamesEnum } from "../../models/enums";
import { appContextData } from "../../context";

import Spinner from "../../components/common/spinner";
import RoadMapContent from "../../components/roadmap/roadmap-content";
import ChartsContent from "../../components/common/charts-content";
import RoadmapChart from "../../components/roadmap/roadmap-chart";
import { stepTenTranscript } from "../../components/common/openai-chat/openai-transcript";
import { getIdeasMessage } from "../../components/common/openai-chat/custom-messages";
import Chat from "../../components/common/openai-chat";

const RoadMap = () => {
  const { data: session }: any = useSession();

  const { setAppContext } = useContext(appContextData);

  useEffect(() => {
    setAppContext((prev) => ({ ...prev, activeStep: stepNamesEnum.roadMap }));
  }, []);

  // "yyyy-mm"
  const todayDateStr = new Date().toISOString().substring(0, 7);

  const emptyUserIdeas: IUserIdeas = {
    id: "",
    startDate: todayDateStr,
    userId: session?.user?.id,
    ideas: [],
  } as IUserIdeas;
  const [userIdeas, setUserIdeas] = useState<IUserIdeas>(emptyUserIdeas);
  const [openaiMessage, setOpenaiMessage] = useState(``);

  const {
    data: fetchedIdeas,
    isLoading: areIdeasLoading,
    status: fetchingIdeasStatus,
  } = useQuery<IUserIdeas>({
    queryKey: [ideasApi.Keys.All],
    queryFn: ideasApi.getOne,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (fetchingIdeasStatus === "success") {
      if (fetchedIdeas) {
        fetchedIdeas.ideas.forEach((idea) => {
          !idea.durationInMonths ? (idea.durationInMonths = 6) : null;
        });
        setUserIdeas(fetchedIdeas);
      }
      setOpenaiMessage(`${stepTenTranscript}\n\n${getIdeasMessage(fetchedIdeas)}`);
    }
  }, [fetchingIdeasStatus]);

  return (
    <>
      <article className="main-content">
        <article className="forms-container">
          <RoadMapContent
            userIdeas={userIdeas}
            dispatchUserIdeas={setUserIdeas}
            todayDateStr={todayDateStr}
            isLoading={areIdeasLoading}
            setOpenaiMessage={setOpenaiMessage}
          />
        </article>
        <aside className="aside-content">
          <ChartsContent
            videoPropName={videoPropNamesEnum.roadMap}
            videoLabel="Road Map Video"
            chartProducts={[]}
            isChartDataLoading={false}
            setOpenaiMessage={setOpenaiMessage}
          />
        </aside>
      </article>
      <div className="p-8 rounded-2xl bg-white">
        {areIdeasLoading && (
          <Spinner className="flex items-center px-1 text-2xl" message="Loading roadmap ideas chart..." />
        )}
        {!areIdeasLoading && userIdeas.ideas.length === 0 && (
          <div className="w-full flex items-center">
            <p className="text-2xl text-center italic">Start adding your ideas to see roadmap ideas chart...</p>
          </div>
        )}
        {!areIdeasLoading && userIdeas.ideas.length > 0 && <RoadmapChart userIdeas={userIdeas} />}
      </div>
      <Chat initialMessage={openaiMessage}></Chat>
    </>
  );
};

export default RoadMap;
