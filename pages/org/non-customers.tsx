import { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import * as nonCustomersApi from "../../http-client/non-customers.client";
import { useQuery } from "@tanstack/react-query";
import { IUserNonCustomers } from "../../models/user-non-customers";
import { stepNamesEnum, videoPropNamesEnum } from "../../models/enums";
import { appContextData } from "../../context";

import NonCustomersContent from "../../components/non-customers/non-customers-content";
import ChartsContent from "../../components/common/charts-content";
import Chat from "../../components/common/openai-chat";
import { stepEightTranscript } from "../../components/common/openai-chat/openai-transcript";
import { getNonCustomersMessage } from "../../components/common/openai-chat/custom-messages";

const NonCustomers = () => {
  const { data: session }: any = useSession();

  const { setAppContext } = useContext(appContextData);
  useEffect(() => {
    setAppContext((prev) => ({ ...prev, activeStep: stepNamesEnum.nonCustomers }));
  }, []);

  const emptyUserNonCustomers = {
    id: "",
    userId: session?.user?.id,
    soonNonCustomers: [],
    refusingNonCustomers: [],
    unwantedNonCustomers: [],
  } as IUserNonCustomers;

  const [userNonCustomers, setUserNonCustomers] = useState<IUserNonCustomers>(emptyUserNonCustomers);
  const [openaiMessage, setOpenaiMessage] = useState(``);

  const {
    data: fetchedNonCustomers,
    isLoading: areNonCustomersLoading,
    status: fetchingNonCustomersStatus,
  } = useQuery<IUserNonCustomers>({
    queryKey: [nonCustomersApi.Keys.All],
    queryFn: nonCustomersApi.getOne,
    refetchOnWindowFocus: false,
    enabled: !!session?.user?.id,
  });

  useEffect(() => {
    if (fetchingNonCustomersStatus === "success") {
      setUserNonCustomers(fetchedNonCustomers ?? emptyUserNonCustomers);
      setOpenaiMessage(`${stepEightTranscript}\n\n${getNonCustomersMessage(fetchedNonCustomers)}`);
    }
  }, [fetchingNonCustomersStatus]);

  return (
    <>
      <article className="main-content">
        <article className="forms-container">
          <NonCustomersContent
            userNonCustomers={userNonCustomers}
            dispatchUserNonCustomers={setUserNonCustomers}
            isLoading={areNonCustomersLoading}
            setOpenaiMessage={setOpenaiMessage}
          />
        </article>
        <aside className="aside-content">
          <ChartsContent
            videoPropName={videoPropNamesEnum.nonCustomers}
            videoLabel="Non Customers Video"
            chartProducts={[userNonCustomers]}
            isChartDataLoading={areNonCustomersLoading}
            setOpenaiMessage={setOpenaiMessage}
          />
        </aside>
      </article>
      <Chat initialMessage={openaiMessage}></Chat>
    </>
  );
};

export default NonCustomers;
