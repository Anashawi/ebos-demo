import { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import * as organizationsApi from "../../http-client/organizations.client";
import * as goalsApi from "../../http-client/goals.client";
import { useQuery } from "@tanstack/react-query";
import { IUserOrganizations } from "../../models/organization";
import { IUserGoals } from "../../models/user-goal";
import { appContextData } from "../../context";

import OrganizationsForm from "./ogranizations-form";
import GoalsForm from "./goals-form";
import Chat from "../common/openai-chat";
import { stepOneTranscript } from "../common/openai-chat/openai-transcript";
import { getUserGoalsMsg, getUserOrganizationsMsg } from "../common/openai-chat/custom-messages";

const emptyUserOrganizations: IUserOrganizations = {
  id: "",
  userId: "",
  organizations: [],
};
const emptyUserGoals: IUserGoals = {
  id: "",
  userId: "",
  targetDate: "",
  goals: [],
};

const GoalsContent = () => {
  const { data: session }: any = useSession();

  emptyUserOrganizations.userId = session?.user?.id;
  emptyUserGoals.userId = session?.user?.id;

  const [userOrganizations, setUserOrganizations] = useState<IUserOrganizations>(emptyUserOrganizations);
  const [userGoals, setUserGoals] = useState<IUserGoals>(emptyUserGoals);
  const { appContext, setAppContext } = useContext(appContextData);

  // fetch user organizations
  const {
    data: fetchedUserOrganizations,
    isLoading: areUserOrganizationsLoading,
    status: fetchingOrgsStatus,
  } = useQuery([organizationsApi.keys.all, session?.user?.id], organizationsApi.getAll, {
    refetchOnWindowFocus: false,
    retry: 2,
  });

  // fetch user goals
  const {
    data: fetchedUserGoals,
    isLoading: areUserGoalsLoading,
    status: fetchingGoalsStatus,
  } = useQuery({
    queryKey: [goalsApi.Keys.All],
    queryFn: goalsApi.getAll,
    refetchOnWindowFocus: false,
    enabled: !!session?.user?.id,
  });

  useEffect(() => {
    if (fetchingOrgsStatus === "success" && fetchingGoalsStatus === "success") {
      setAppContext({
        ...appContext,
        openAIMessage: `${stepOneTranscript}\n\n${getUserOrganizationsMsg(
          fetchedUserOrganizations.data
        )}\n${getUserGoalsMsg(fetchedUserGoals)}`,
      });
    }
  }, [fetchingOrgsStatus, fetchingGoalsStatus]);

  return (
    <>
      <OrganizationsForm
        fetchedUserOrganizations={fetchedUserOrganizations}
        areUserOrganizationsLoading={areUserOrganizationsLoading}
        userOrganizations={userOrganizations}
        setUserOrganizations={setUserOrganizations}
      />
      <GoalsForm
        fetchedUserGoals={fetchedUserGoals}
        areUserGoalsLoading={areUserGoalsLoading}
        userGoals={userGoals}
        setUserGoals={setUserGoals}
      />
      <Chat initialMessage={appContext.openAIMessage}></Chat>
    </>
  );
};

export default GoalsContent;
