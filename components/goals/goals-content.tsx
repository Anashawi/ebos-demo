import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import * as organizationsApi from "../../http-client/organizations.client";
import * as goalsApi from "../../http-client/goals.client";
import { useQuery } from "@tanstack/react-query";
import { IUserOrganizations } from "../../models/organization";
import { IUserGoals } from "../../models/user-goal";

import OrganizationsForm from "./ogranizations-form";
import GoalsForm from "./goals-form";
import GoNextButton from "../common/go-next-button";
import Chat from "../common/openai-chat/openai-chat";
import { stepOneTranscript } from "../common/openai-chat/openai-transcript";
import {
    getUserGoalsMsg,
    getUserOrganizationsMsg,
} from "../common/openai-chat/custom-messages";

const emptyUserOrganizations: IUserOrganizations = {
    id: "",
    userId: "",
    organizations: [],
};
const emptyUserGoal: IUserGoals = {
    id: "",
    userId: "",
    targetDate: "",
    goals: [],
};

const GoalsContent = () => {
    const { data: session }: any = useSession();

    // fetch user organizations
    const {
        data: fetchedUserOrganizations,
        isLoading: areUserOrganizationsLoading,
    } = useQuery(
        [organizationsApi.keys.all, session?.user?.id],
        organizationsApi.getAll,
        {
            refetchOnWindowFocus: false,
            retry: 2,
        }
    );
    emptyUserOrganizations.userId = session?.user?.id;
    const [userOrganizations, setUserOrganizations] =
        useState<IUserOrganizations>(emptyUserOrganizations);

    // fetch user goals
    const { data: fetchedUserGoals, isLoading: areUserGoalsLoading } =
        useQuery<IUserGoals>({
            queryKey: [goalsApi.Keys.All],
            queryFn: goalsApi.getAll,
            refetchOnWindowFocus: false,
            enabled: !!session?.user?.id,
        });
    emptyUserGoal.userId = session?.user?.id;
    const [userGoals, setUserGoals] = useState<IUserGoals>(emptyUserGoal);
    const [chatGPTMessage, setChatGPTMessage] = useState<string>("");

    // on data load send ChatGPT transcript with data
    useEffect(() => {
        if (!areUserOrganizationsLoading && !areUserGoalsLoading) {
            const combinedMsg = `${stepOneTranscript}\n\n${getUserOrganizationsMsg(
                fetchedUserOrganizations
            )}\n${getUserGoalsMsg(fetchedUserGoals)}`;
            setChatGPTMessage(combinedMsg);
        }
    }, [
        fetchedUserOrganizations,
        areUserOrganizationsLoading,
        fetchedUserGoals,
        areUserGoalsLoading,
    ]);

    return (
        <>
            <div className="grow flex flex-col gap-8 px-16 py-8 bg-white relative rounded-3xl">
                <OrganizationsForm
                    fetchedUserOrganizations={fetchedUserOrganizations}
                    areUserOrganizationsLoading={areUserOrganizationsLoading}
                    userOrganizations={userOrganizations}
                    setUserOrganizations={setUserOrganizations}
                    setChatGPTMessage={setChatGPTMessage}
                />
                <GoalsForm
                    fetchedUserGoals={fetchedUserGoals}
                    areUserGoalsLoading={areUserGoalsLoading}
                    userGoals={userGoals}
                    setUserGoals={setUserGoals}
                    setChatGPTMessage={setChatGPTMessage}
                />
                <GoNextButton
                    stepUri={`../org/products`}
                    nextStepTitle={`pioneer, migrator, settler`}
                    clickable={
                        userOrganizations.organizations.length > 0 &&
                        userGoals.goals.length > 0
                    }
                />
            </div>
            <Chat initialMessage={chatGPTMessage}></Chat>
        </>
    );
};

export default GoalsContent;
