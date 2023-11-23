import { useState, useMemo, useEffect } from "react";
import { useSession } from "next-auth/react";

import * as ideasApi from "../../http-client/ideas.client";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { IIdea } from "../../models/types";
import { IUserIdeas } from "../../models/user-idea";

import Spinner from "../common/spinner";
import Chat from "../common/openai-chat/openai-chat";
import { stepTenTranscript } from "../common/openai-chat/openai-transcript";
import { getIdeasMessage } from "../common/openai-chat/custom-messages";

import { faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteButton from "../common/delete-button";

interface Props {
    userIdeas: IUserIdeas;
    dispatchUserIdeas: (userIdeas: IUserIdeas) => void;
    todayDateStr: string;
    isLoading: boolean;
}

const RoadMapContent = ({
    userIdeas,
    dispatchUserIdeas,
    todayDateStr,
    isLoading,
}: Props) => {
    const { data: session }: any = useSession();
    const queryClient = useQueryClient();

    const [chatGPTMessage, setChatGPTMessage] = useState<string>("");
    // on data load send ChatGPT transcript with data
    useEffect(() => {
        if (userIdeas.id) {
            const combinedMsg = `${stepTenTranscript}\n\n${getIdeasMessage(
                userIdeas
            )}`;
            setChatGPTMessage(combinedMsg);
        }
    }, [userIdeas]);

    const emptyIdea: IIdea = useMemo(() => {
        return {
            uuid: "",
            name: "",
            ownerName: "",
            startMonth: todayDateStr,
            durationInMonths: 6,
        } as IIdea;
    }, []);

    const { mutate: createIdeas, isLoading: isCreatingIdeas } = useMutation(
        (newUserIdeas: IUserIdeas) => {
            return ideasApi.insertOne(newUserIdeas);
        },
        {
            onMutate: newIdeas => {
                setChatGPTMessage(getIdeasMessage(newIdeas));
            },
            onSuccess: storedIdeas => {
                queryClient.invalidateQueries([ideasApi.Keys.All]);
            },
        }
    );

    const { mutate: updateIdeas, isLoading: isUpdatingIdeas } = useMutation(
        (newUserIdeas: IUserIdeas) => {
            return ideasApi.updateOne(newUserIdeas);
        },
        {
            onMutate: newIdeas => {
                setChatGPTMessage(getIdeasMessage(newIdeas));
            },
            onSuccess: storedIdeas => {
                queryClient.invalidateQueries([ideasApi.Keys.All]);
            },
        }
    );

    const calcIdeaStartMonth = (idea: any) => {
        if (
            !idea.startMonth ||
            (idea.startMonth &&
                new Date(idea.startMonth) < new Date(userIdeas.startDate || ""))
        ) {
            idea.startMonth = userIdeas.startDate || todayDateStr;
            dispatchUserIdeas({ ...userIdeas });
        }
        return idea.startMonth;
    };

    const getMinDateStr = (savedStartDateStr: string | undefined) => {
        if (!savedStartDateStr) {
            return todayDateStr;
        }
        if (new Date(savedStartDateStr) < new Date(todayDateStr)) {
            return savedStartDateStr;
        }
        return todayDateStr;
    };

    const isNotLoadingWithoutIdeas = !isLoading && userIdeas.ideas.length === 0;
    const isNotLoadingWithIdeas = !isLoading && userIdeas.ideas?.length > 0;

    return (
        <>
            <div className="grow flex flex-col gap-8 px-8 py-4 bg-white relative rounded-3xl">
                <h2 className="title-header">Roadmap</h2>
                <div className="flex flex-col gap-8 p-4 bg-dark-50 rounded-2xl">
                    <h3 className="text-dark-400 text-[1.75rem] font-hero-semibold">
                        Create a timeline for your ideas
                    </h3>
                    <form className="flex flex-col gap-4">
                        <div className="flex flex-col">
                            <label className="text-xl">Start date</label>
                            <div className="flex">
                                <input
                                    type="month"
                                    value={userIdeas.startDate}
                                    onChange={e => {
                                        userIdeas.startDate = e.target.value;
                                        dispatchUserIdeas({ ...userIdeas });
                                    }}
                                    min={getMinDateStr(userIdeas.startDate)}
                                    className="light-input"
                                />
                            </div>
                        </div>
                        <ul className="flex flex-col gap-6 overflow-auto">
                            {isLoading && (
                                <Spinner
                                    className="flex items-center px-1 text-2xl"
                                    message="Loading ideas..."
                                />
                            )}
                            {isNotLoadingWithoutIdeas && (
                                <div className="w-full flex items-center">
                                    <p className="text-xl text-center italic">
                                        Start adding your ideas...
                                    </p>
                                </div>
                            )}
                            {isNotLoadingWithIdeas &&
                                userIdeas.ideas.map((idea, index) => (
                                    <li key={index} className="flex gap-2">
                                        <div className="flex flex-col">
                                            <label className="text-xl">
                                                Idea
                                            </label>
                                            <input
                                                value={idea.name}
                                                onChange={e => {
                                                    userIdeas.ideas[
                                                        index
                                                    ].name = e.target.value;
                                                    dispatchUserIdeas({
                                                        ...userIdeas,
                                                    });
                                                }}
                                                className="light-input"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="text-xl">
                                                Start (month)
                                            </label>
                                            <input
                                                type="month"
                                                value={calcIdeaStartMonth(idea)}
                                                onChange={e => {
                                                    userIdeas.ideas[
                                                        index
                                                    ].startMonth =
                                                        e.target.value;
                                                    dispatchUserIdeas({
                                                        ...userIdeas,
                                                    });
                                                }}
                                                min={
                                                    userIdeas.startDate ||
                                                    todayDateStr
                                                }
                                                className="light-input"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="text-xl">
                                                Idea Owner
                                            </label>
                                            <input
                                                type="text"
                                                value={idea.ownerName}
                                                onChange={e => {
                                                    userIdeas.ideas[
                                                        index
                                                    ].ownerName =
                                                        e.target.value;
                                                    dispatchUserIdeas({
                                                        ...userIdeas,
                                                    });
                                                }}
                                                className="light-input"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="text-xl">
                                                Duration (months)
                                            </label>
                                            <input
                                                type="number"
                                                min={1}
                                                max={12}
                                                value={idea.durationInMonths}
                                                onChange={e => {
                                                    userIdeas.ideas[
                                                        index
                                                    ].durationInMonths =
                                                        +e.target.value;
                                                    dispatchUserIdeas({
                                                        ...userIdeas,
                                                    });
                                                }}
                                                className="light-input"
                                            />
                                        </div>
                                        <DeleteButton
                                            callback={() => {
                                                userIdeas.ideas =
                                                    userIdeas.ideas.filter(
                                                        (idea, ideaIndex) =>
                                                            ideaIndex !== index
                                                    );
                                                dispatchUserIdeas({
                                                    ...userIdeas,
                                                });
                                            }}
                                        />
                                    </li>
                                ))}
                        </ul>
                        <div className="h-10 flex justify-end">
                            {(isUpdatingIdeas || isCreatingIdeas) && (
                                <Spinner
                                    className="items-center"
                                    message="Saving Ideas ..."
                                />
                            )}
                        </div>
                        <div className="flex justify-between gap-4">
                            <button
                                type="button"
                                onClick={() => {
                                    const newIdea = { ...emptyIdea };
                                    newIdea.name = `New Idea`;
                                    userIdeas.ideas.push(newIdea);
                                    dispatchUserIdeas({ ...userIdeas });
                                }}
                                className="btn-primary px-[3.5rem] py-[1rem]"
                            >
                                <FontAwesomeIcon
                                    className="w-[0.8rem] h-auto cursor-pointer"
                                    icon={faPlus}
                                />
                                <span className="text-xl">Add New Idea</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    userIdeas.userId = session?.user?.id;
                                    userIdeas.ideas?.map(idea => {
                                        if (!idea.uuid) {
                                            idea.uuid = crypto.randomUUID();
                                        }
                                    });
                                    if (userIdeas?.id) {
                                        updateIdeas({
                                            ...userIdeas,
                                        });
                                    } else {
                                        createIdeas({
                                            ...userIdeas,
                                        });
                                    }
                                }}
                                className="btn-rev"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Chat initialMessage={chatGPTMessage}></Chat>
        </>
    );
};

export default RoadMapContent;
