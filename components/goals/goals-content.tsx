import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import * as organizationsApi from "../../http-client/organizations.client";
import * as goalsApi from "../../http-client/goals.client";
import { useQuery } from "@tanstack/react-query";
import { IUserOrganizations } from "../../models/organization";
import { IUserGoals } from "../../models/user-goal";

import OrganizationsForm from "./ogranizations-form";
import GoalsForm from "./goals-form";
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

interface Props {
  setOpenaiMessage: Dispatch<SetStateAction<string>>;
}

const GoalsContent = ({ setOpenaiMessage }: Props) => {
  const { data: session }: any = useSession();

  emptyUserOrganizations.userId = session?.user?.id;
  emptyUserGoals.userId = session?.user?.id;

  const [userOrganizations, setUserOrganizations] = useState(emptyUserOrganizations);
  const [userGoals, setUserGoals] = useState(emptyUserGoals);

  // fetch user organizations
  const {
    data: fetchedUserOrganizations,
    isLoading: areUserOrganizationsLoading,
    status: fetchingOrgsStatus,
  } = useQuery({
    queryKey: [organizationsApi.keys.all, session?.user?.id],
    queryFn: organizationsApi.getAll,
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
    enabled: !!session?.user?.id, // wth is this
  });

  useEffect(() => {
    if (fetchingOrgsStatus === "success" && fetchedUserOrganizations.status === 200 && fetchedUserOrganizations.data) {
      setUserOrganizations({ ...fetchedUserOrganizations.data });
    }
  }, [fetchingOrgsStatus]);

  useEffect(() => {
    if (fetchingGoalsStatus === "success" && fetchedUserGoals) {
      setUserGoals(fetchedUserGoals);
    }
  }, [fetchingGoalsStatus]);

  useEffect(() => {
    if (fetchingOrgsStatus === "success" && fetchingGoalsStatus === "success") {
      setOpenaiMessage(
        `${stepOneTranscript}\n\n${getUserOrganizationsMsg(fetchedUserOrganizations.data)}\n${getUserGoalsMsg(
          fetchedUserGoals
        )}`
      );
    }
  }, [fetchingOrgsStatus, fetchingGoalsStatus]);

  return (
    <>
      <OrganizationsForm
        areUserOrganizationsLoading={areUserOrganizationsLoading}
        userOrganizations={userOrganizations}
        setUserOrganizations={setUserOrganizations}
        setOpenaiMessage={setOpenaiMessage}
      />
      <GoalsForm
        areUserGoalsLoading={areUserGoalsLoading}
        userGoals={userGoals}
        setUserGoals={setUserGoals}
        setOpenaiMessage={setOpenaiMessage}
      />
    </>
  );
};

export default GoalsContent;
