import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import * as organizationsApi from "../../http-client/organizations.client";
import * as goalsApi from "../../http-client/goals.client";
import { useQuery } from "@tanstack/react-query";
import { IUserOrganizations } from "../../models/organization";
import { IUserGoals } from "../../models/user-goal";

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
    const [userOrganizations, setUserOrganizations] = useState<IUserOrganizations>(emptyUserOrganizations);
    emptyUserGoals.userId = session?.user?.id;
    const [userGoals, setUserGoals] = useState<IUserGoals>(emptyUserGoals);
    const [chatGPTMessage, setChatGPTMessage] = useState<string>("");

    // fetch user organizations
    const { data: fetchedUserOrganizations, isLoading: areUserOrganizationsLoading } = useQuery(
        [organizationsApi.keys.all, session?.user?.id],
        organizationsApi.getAll,
        {
            refetchOnWindowFocus: false,
            retry: 2,
        }
    );

    // fetch user goals
    const { data: fetchedUserGoals, isLoading: areUserGoalsLoading } = useQuery<IUserGoals>({
        queryKey: [goalsApi.Keys.All],
        queryFn: goalsApi.getAll,
        refetchOnWindowFocus: false,
        enabled: !!session?.user?.id,
    });

    // on data load send ChatGPT transcript with data
    useEffect(() => {
        if (!areUserOrganizationsLoading && !areUserGoalsLoading) {
            setChatGPTMessage(
                `${stepOneTranscript}\n\n${getUserOrganizationsMsg(fetchedUserOrganizations)}\n${getUserGoalsMsg(
                    fetchedUserGoals
                )}`
            );
        }
    }, [fetchedUserOrganizations, areUserOrganizationsLoading, fetchedUserGoals, areUserGoalsLoading]);

    return (
        <>
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
            <Chat initialMessage={chatGPTMessage}></Chat>
        </>
    );
};

export default GoalsContent;
