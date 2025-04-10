import { useState, useEffect, useContext } from "react";
import { useSession } from "next-auth/react";

import * as analysisApi from "../../http-client/analysis.client";
import { useQuery } from "@tanstack/react-query";
import { IUserAnalysis } from "../../models/user-analysis";
import { stepNamesEnum, videoPropNamesEnum } from "../../models/enums";
import { appContextData } from "../../context";

import StepUpStepDownContent from "../../components/step-up-step-down/step-up-step-down-content";
import ChartsContent from "../../components/common/charts-content";
import Chat from "../../components/common/openai-chat";
import { stepNineTranscript } from "../../components/common/openai-chat/openai-transcript";
import { getStepUpDownMessage } from "../../components/common/openai-chat/custom-messages";

const Analysis = () => {
  const { data: session }: any = useSession();

  const { setAppContext } = useContext(appContextData);
  useEffect(() => {
    setAppContext((prev) => ({ ...prev, activeStep: stepNamesEnum.stepUpStepDownModel }));
  }, []);

  const emptyUserAnalysis = {
    id: "",
    userId: session?.user?.id,
    above: [],
    below: [],
    customers: [],
  } as IUserAnalysis;

  const [userAnalysis, setUserAnalysis] = useState<IUserAnalysis>(emptyUserAnalysis);
  const [openaiMessage, setOpenaiMessage] = useState(``);

  const {
    data: fetchedAnalysis,
    isLoading: isAnalysisLoading,
    status: fetchingAnalysisStatus,
  } = useQuery<IUserAnalysis>({
    queryKey: [analysisApi.Keys.All],
    queryFn: analysisApi.getOne,
    refetchOnWindowFocus: false,
    enabled: !!session?.user?.id,
  });

  useEffect(() => {
    if (fetchingAnalysisStatus === "success") {
      setUserAnalysis(fetchedAnalysis ?? emptyUserAnalysis);
      setOpenaiMessage(`${stepNineTranscript}\n\n${getStepUpDownMessage(fetchedAnalysis)}`);
    }
  }, [fetchingAnalysisStatus]);

  return (
    <>
      <article className="main-content">
        <article className="forms-container">
          <StepUpStepDownContent
            userAnalysis={userAnalysis}
            dispatchUserAnalysis={setUserAnalysis}
            isLoading={isAnalysisLoading}
            setOpenaiMessage={setOpenaiMessage}
          />
        </article>
        <aside className="aside-content">
          <ChartsContent
            videoPropName={videoPropNamesEnum.stepUpStepDownModel}
            videoLabel="Step Up Step Down Model Video"
            chartProducts={[userAnalysis]}
            isChartDataLoading={isAnalysisLoading}
            setOpenaiMessage={setOpenaiMessage}
          />
        </aside>
      </article>
      <Chat initialMessage={openaiMessage}></Chat>
    </>
  );
};

export default Analysis;
