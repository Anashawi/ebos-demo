import { useMemo, Dispatch, SetStateAction, useContext } from "react";
import { useSession } from "next-auth/react";

import * as ideasApi from "../../http-client/ideas.client";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { IIdea } from "../../models/types";
import { IUserIdeas } from "../../models/user-idea";
import { appContextData } from "../../context";

import Spinner from "../common/spinner";
import { getIdeasMessage } from "../common/openai-chat/custom-messages";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteButton from "../common/delete-button";

interface Props {
  userIdeas: IUserIdeas;
  dispatchUserIdeas: (userIdeas: IUserIdeas) => void;
  todayDateStr: string;
  isLoading: boolean;
  setOpenaiMessage: Dispatch<SetStateAction<string>>;
}

const RoadMapContent = ({ userIdeas, dispatchUserIdeas, todayDateStr, isLoading, setOpenaiMessage }: Props) => {
  const { data: session }: any = useSession();
  const queryClient = useQueryClient();

  const emptyIdea: IIdea = useMemo(() => {
    return {
      uuid: "",
      name: "",
      ownerName: "",
      startMonth: todayDateStr,
      durationInMonths: 6,
    } as IIdea;
  }, []);

  const { mutate: updateIdeas, isLoading: isUpdatingIdeas } = useMutation(
    (newUserIdeas: IUserIdeas) => {
      return ideasApi.updateOne(newUserIdeas);
    },
    {
      onMutate: (newIdeas) => {
        setOpenaiMessage(getIdeasMessage(newIdeas));
      },
      onSuccess: (storedIdeas) => {
        queryClient.invalidateQueries([ideasApi.Keys.All]);
        dispatchUserIdeas({ ...storedIdeas });
      },
    }
  );

  const calcIdeaStartMonth = (idea: any) => {
    if (!idea.startMonth || (idea.startMonth && new Date(idea.startMonth) < new Date(userIdeas.startDate || ""))) {
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
    <section className="form-container">
      <h3 className="title-header">Roadmap</h3>
      <div className="flex flex-col gap-8 p-4 bg-dark-50 rounded-2xl">
        <h4 className="text-dark-400 text-[1.75rem] font-hero-semibold">Create a timeline for your ideas</h4>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="text-xl">Start date</label>
            <div className="flex flex-col w-1/6">
              <input
                className="light-input"
                type="month"
                value={userIdeas.startDate}
                min={getMinDateStr(userIdeas.startDate)}
                onChange={(e) => {
                  userIdeas.startDate = e.target.value;
                  dispatchUserIdeas({ ...userIdeas });
                }}
              />
            </div>
          </div>
          <ul className="flex flex-col gap-4 overflow-auto">
            {isLoading && <Spinner className="flex items-center px-1 text-2xl" message="Loading ideas..." />}
            {isNotLoadingWithoutIdeas && (
              <div className="w-full flex items-center">
                <p className="text-xl text-center italic">Start adding your ideas...</p>
              </div>
            )}
            {isNotLoadingWithIdeas &&
              userIdeas.ideas.map((idea, index) => (
                <li key={index} className="flex gap-2">
                  <div className="flex flex-col">
                    <label className="text-xl">Idea</label>
                    <input
                      value={idea.name}
                      onChange={(e) => {
                        userIdeas.ideas[index].name = e.target.value;
                        dispatchUserIdeas({
                          ...userIdeas,
                        });
                      }}
                      className="light-input"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xl">
                      Start<span className="text-sm ms-1">(month)</span>
                    </label>
                    <input
                      type="month"
                      value={calcIdeaStartMonth(idea)}
                      onChange={(e) => {
                        userIdeas.ideas[index].startMonth = e.target.value;
                        dispatchUserIdeas({
                          ...userIdeas,
                        });
                      }}
                      min={userIdeas.startDate || todayDateStr}
                      className="light-input"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xl">Idea Owner</label>
                    <input
                      type="text"
                      value={idea.ownerName}
                      onChange={(e) => {
                        userIdeas.ideas[index].ownerName = e.target.value;
                        dispatchUserIdeas({
                          ...userIdeas,
                        });
                      }}
                      className="light-input"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xl">
                      Duration<span className="text-sm ms-1">(months)</span>
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={12}
                      value={idea.durationInMonths}
                      onChange={(e) => {
                        userIdeas.ideas[index].durationInMonths = +e.target.value;
                        dispatchUserIdeas({
                          ...userIdeas,
                        });
                      }}
                      className="light-input"
                    />
                  </div>
                  <DeleteButton
                    callback={() => {
                      userIdeas.ideas = userIdeas.ideas.filter((idea, ideaIndex) => ideaIndex !== index);
                      dispatchUserIdeas({
                        ...userIdeas,
                      });
                    }}
                  />
                </li>
              ))}
          </ul>
          <div className="h-10 flex justify-end">
            {isUpdatingIdeas && <Spinner className="items-center" message="Saving Ideas ..." />}
          </div>
          <div className="flex justify-between gap-4">
            <button
              className="btn-primary px-10 py-4"
              type="button"
              onClick={() => {
                const newIdea = { ...emptyIdea };
                newIdea.name = `New Idea`;
                userIdeas.ideas.push(newIdea);
                dispatchUserIdeas({ ...userIdeas });
              }}>
              <FontAwesomeIcon className="w-4 cursor-pointer" icon={faPlus} />
              <span className="text-xl">Add New Idea</span>
            </button>
            <button
              className="btn-rev"
              type="button"
              onClick={() => {
                userIdeas.userId = session?.user?.id;
                userIdeas.ideas?.map((idea) => {
                  if (!idea.uuid) {
                    idea.uuid = crypto.randomUUID();
                  }
                });
                updateIdeas({
                  ...userIdeas,
                });
              }}>
              Save
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RoadMapContent;
