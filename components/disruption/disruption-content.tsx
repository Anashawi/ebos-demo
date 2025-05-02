import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";

import * as videosApi from "../../http-client/videos.client";
import * as takeawaysApi from "../../http-client/takeaways.client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { takeawayTypeEnums, videoPropNamesEnum } from "../../models/enums";
import { IVideos } from "../../models/videos";
import { IUserTakeaways } from "../../models/user-takeaways";

import DisruptionTakeaways from "./takeaways";
import Spinner from "../common/spinner";
import { stepFiveTranscript } from "../common/openai-chat/openai-transcript";
import { getDisruptionMessage } from "../common/openai-chat/custom-messages";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faEdit } from "@fortawesome/free-solid-svg-icons";

interface Props {
  videos: IVideos;
  dispatchVideos: (videos: IVideos) => void;
  setSelectedVideoPropName: (name: videoPropNamesEnum) => void;
  toggleVideoModal: (isOpen?: boolean) => void;
  toggleEditUrlsModal: (isOpen?: boolean) => void;
  setOpenaiMessage: Dispatch<SetStateAction<string>>;
}

const DisruptionContent = ({
  videos,
  dispatchVideos,
  setSelectedVideoPropName,
  toggleVideoModal,
  toggleEditUrlsModal,
  setOpenaiMessage,
}: Props) => {
  const { data: session }: any = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: fetchedVideos, status: fetchingVideoStatus } =
    useQuery<IVideos>({
      queryKey: [videosApi.Keys.all],
      queryFn: videosApi.getOne,
      refetchOnWindowFocus: false,
    });

  useEffect(() => {
    if (fetchingVideoStatus === "success") {
      if (fetchedVideos) dispatchVideos(fetchedVideos);
    }
  }, [fetchingVideoStatus]);

  const emptyScaleTakeaways = {
    type: takeawayTypeEnums.scale,
    notes: [],
  };

  const emptyIdeasTakeaways = {
    type: takeawayTypeEnums.ideas,
    notes: [],
  };

  const emptyUserTakeaways: IUserTakeaways = {
    id: "",
    userId: session?.user?.id,
    takeaways: [emptyScaleTakeaways, emptyIdeasTakeaways],
  };

  const [userTakeaways, setUserTakeaways] =
    useState<IUserTakeaways>(emptyUserTakeaways);

  const {
    data: fetchedTakeaways,
    isLoading: isLoadingTakeaways,
    status: fetchingTakeawaysStatus,
  } = useQuery<IUserTakeaways>(
    [takeawaysApi.Keys.all, userTakeaways.id],
    takeawaysApi.getOne,
    {
      enabled: !!session?.user?.id,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (fetchingTakeawaysStatus === "success") {
      if (fetchedTakeaways) setUserTakeaways(fetchedTakeaways);
      setOpenaiMessage(
        `${stepFiveTranscript}\n\n${getDisruptionMessage(fetchedTakeaways)}`
      );
    }
  }, [fetchingTakeawaysStatus]);

  const { mutate: updateUserTakeaways, isLoading: isUpdatingUserTakeaways } =
    useMutation(
      (userTakeaways: IUserTakeaways) => {
        return takeawaysApi.updateOne(userTakeaways);
      },
      {
        onMutate: (newTakeaways) => {
          queryClient.setQueryData(
            [takeawaysApi.Keys.all, userTakeaways.id],
            newTakeaways
          );
          setOpenaiMessage(getDisruptionMessage(fetchedTakeaways));
        },
        onSuccess: (storedTakeaways) => {
          queryClient.invalidateQueries([
            takeawaysApi.Keys.all,
            userTakeaways.id,
          ]);
        },
      }
    );

  const { mutate: createUserTakeaways, isLoading: isCreatingUserTakeaways } =
    useMutation(
      (userTakeaways: IUserTakeaways) => takeawaysApi.insertOne(userTakeaways),
      {
        onMutate: (newTakeaways) => {
          queryClient.setQueryData(
            [takeawaysApi.Keys.all, userTakeaways.id],
            newTakeaways
          );
          setOpenaiMessage(getDisruptionMessage(fetchedTakeaways));
        },
        onSuccess: (storedTakeaways) => {
          queryClient.invalidateQueries([
            takeawaysApi.Keys.all,
            userTakeaways.id,
          ]);
          queryClient.invalidateQueries([takeawaysApi.Keys.all]);
          setUserTakeaways(storedTakeaways);
        },
      }
    );

  return (
    <>
      <section className="form-container">
        <h3 className="title-header">Disruption</h3>
        <div className="pill-yellow-50 p-3">
          <div className="w-[3rem] h-[3rem]">
            <Image
              src="/bulb.svg"
              alt="Bulb Icon"
              width={0}
              height={0}
              className="w-full h-auto"
            />
          </div>
          <p className="text-xl text-dark-300">
            Watch help videos then update your ideas accordingly. Submit for
            feedback.
          </p>
        </div>

        <div className="flex flex-wrap gap-5 p-5 bg-dark-50 rounded-2xl">
          <div className="col-1/2 grow">
            <h4 className="mb-3 text-[1.75rem] text-dark-400 font-hero-bold">
              Swift
            </h4>
            <ul className="flex flex-col gap-3 mb-5">
              <li className="pill-primary-300 text-xl">
                Synapse
                <div
                  className="cursor-pointer hover:scale-[115%] transition duration-100"
                  onClick={() => {
                    setSelectedVideoPropName(videoPropNamesEnum.staffOnDemand);
                    toggleVideoModal();
                  }}
                >
                  <FontAwesomeIcon
                    className="w-9 h-auto text-primary-300 bg-white rounded-full p-[1.3px]"
                    icon={faCirclePlay}
                  />
                </div>
              </li>
              <li className="pill-primary-300 text-xl">
                Window
                <div
                  className="cursor-pointer hover:scale-[115%] transition duration-200"
                  onClick={() => {
                    setSelectedVideoPropName(
                      videoPropNamesEnum.communityAndCrowd
                    );
                    toggleVideoModal();
                  }}
                >
                  <FontAwesomeIcon
                    className="w-9 h-auto text-primary-300 bg-white rounded-full p-[1.3px]"
                    icon={faCirclePlay}
                  />
                </div>
              </li>
              <li className="pill-primary-300 text-xl">
                Ideation
                <div
                  className="cursor-pointer hover:scale-[115%] transition duration-200"
                  onClick={() => {
                    setSelectedVideoPropName(videoPropNamesEnum.algorithms);
                    toggleVideoModal();
                  }}
                >
                  <FontAwesomeIcon
                    className="w-9 h-auto text-primary-300 bg-white rounded-full p-[1.3px]"
                    icon={faCirclePlay}
                  />
                </div>
              </li>
              <li className="pill-primary-300 text-xl">
                Flow
                <div
                  className="cursor-pointer hover:scale-[115%] transition duration-200"
                  onClick={() => {
                    setSelectedVideoPropName(
                      videoPropNamesEnum.leveragedAssets
                    );
                    toggleVideoModal();
                  }}
                >
                  <FontAwesomeIcon
                    className="w-9 h-auto text-primary-300 bg-white rounded-full p-[1.3px]"
                    icon={faCirclePlay}
                  />
                </div>
              </li>
              <li className="pill-primary-300 text-xl">
                Tribe
                <div
                  className="cursor-pointer hover:scale-[115%] transition duration-200"
                  onClick={() => {
                    setSelectedVideoPropName(videoPropNamesEnum.Engagement);
                    toggleVideoModal();
                  }}
                >
                  <FontAwesomeIcon
                    className="w-9 h-auto text-primary-300 bg-white rounded-full p-[1.3px]"
                    icon={faCirclePlay}
                  />
                </div>
              </li>
            </ul>
          </div>
          <div className="col-1/2 grow">
            <h4 className="mb-3 text-[1.75rem] text-dark-400 font-hero-bold">
              Reach
            </h4>

            <ul className="flex flex-col gap-3 mb-5">
              <li className="pill-primary-300 text-xl">
                Remote Talent
                <div
                  className="cursor-pointer hover:scale-[115%] transition duration-200"
                  onClick={() => {
                    setSelectedVideoPropName(videoPropNamesEnum.interface);
                    toggleVideoModal();
                  }}
                >
                  <FontAwesomeIcon
                    className="w-9 h-auto text-primary-300 bg-white rounded-full p-[1.3px]"
                    icon={faCirclePlay}
                  />
                </div>
              </li>
              <li className="pill-primary-300 text-xl">
                Ecosystem
                <div
                  className="cursor-pointer hover:scale-[115%] transition duration-200"
                  onClick={() => {
                    setSelectedVideoPropName(videoPropNamesEnum.dashboard);
                    toggleVideoModal();
                  }}
                >
                  <FontAwesomeIcon
                    className="w-9 h-auto text-primary-300 bg-white rounded-full p-[1.3px]"
                    icon={faCirclePlay}
                  />
                </div>
              </li>
              <li className="pill-primary-300 text-xl">
                Automation
                <div
                  className="cursor-pointer hover:scale-[115%] transition duration-200"
                  onClick={() => {
                    setSelectedVideoPropName(
                      videoPropNamesEnum.experimentation
                    );
                    toggleVideoModal();
                  }}
                >
                  <FontAwesomeIcon
                    className="w-9 h-auto text-primary-300 bg-white rounded-full p-[1.3px]"
                    icon={faCirclePlay}
                  />
                </div>
              </li>
              <li className="pill-primary-300 text-xl">
                Cloud Resources
                <div
                  className="cursor-pointer hover:scale-[115%] transition duration-200"
                  onClick={() => {
                    setSelectedVideoPropName(videoPropNamesEnum.autonomy);
                    toggleVideoModal();
                  }}
                >
                  <FontAwesomeIcon
                    className="w-9 h-auto text-primary-300 bg-white rounded-full p-[1.3px]"
                    icon={faCirclePlay}
                  />
                </div>
              </li>
              <li className="pill-primary-300 text-xl">
                Human Energy
                <div
                  className="cursor-pointer hover:scale-[115%] transition duration-200"
                  onClick={() => {
                    setSelectedVideoPropName(
                      videoPropNamesEnum.socialPlatforms
                    );
                    toggleVideoModal();
                  }}
                >
                  <FontAwesomeIcon
                    className="w-9 h-auto text-primary-300 bg-white rounded-full p-[1.3px]"
                    icon={faCirclePlay}
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>

        <DisruptionTakeaways
          userTakeaways={userTakeaways}
          dispatchUserTakeaways={setUserTakeaways}
          isLoading={isLoadingTakeaways}
          className="flex flex-col gap-[5.5rem] xl:flex-nowrap w-full my-5 px-6"
        />

        <div className="flex justify-end h-10">
          {(isUpdatingUserTakeaways || isCreatingUserTakeaways) && (
            <Spinner
              className="pl-10 flex items-center text-2xl"
              message="Saving your takeaways..."
            />
          )}
        </div>
        {(session?.user as any)?.role !== "admin" && (
          <div className="flex justify-end gap-4">
            {!!userTakeaways && (
              <button
                className={`btn-rev ${
                  isLoadingTakeaways ||
                  isUpdatingUserTakeaways ||
                  isCreatingUserTakeaways
                    ? `btn-disabled`
                    : ``
                }`}
                onClick={() => {
                  if (!userTakeaways.id) {
                    createUserTakeaways({
                      ...userTakeaways,
                      userId: session.user.id,
                    });
                  } else {
                    updateUserTakeaways({
                      ...userTakeaways,
                    });
                  }
                }}
              >
                Save
              </button>
            )}
            {!!videos.id && (
              <div
                className="cursor-pointer bg-dark-300 hover:shadow-lg px-9 py-3 rounded-full"
                onClick={() => {
                  router.push("../org/voice-of-customers");
                }}
              >
                <span className="text-xl text-md text-white">
                  Go to next -{" "}
                  <span className="text-white">Voice of Customers</span>
                </span>
              </div>
            )}
          </div>
        )}
        {(session?.user as any)?.role === "admin" && (
          <div className="flex gap-4 justify-between">
            <div className="flex gap-5">
              <button
                className="btn-primary-light"
                onClick={() => toggleEditUrlsModal(true)}
              >
                <span>Edit video Urls</span>
                <FontAwesomeIcon className="w-7" icon={faEdit} />
              </button>
              {!!userTakeaways && (
                <button
                  onClick={() => {
                    if (!userTakeaways.id) {
                      createUserTakeaways({
                        ...userTakeaways,
                      });
                    } else {
                      updateUserTakeaways({
                        ...userTakeaways,
                      });
                    }
                  }}
                  className="btn-rev"
                >
                  Save
                </button>
              )}
            </div>
            {!!videos.id && (
              <div
                className="cursor-pointer bg-dark-300 hover:shadow-lg px-9 py-3 rounded-full"
                onClick={() => {
                  router.push("../org/voice-of-customers");
                }}
              >
                <span className="text-xl text-md text-white">
                  Go to next -{" "}
                  <span className="text-white">Voice of Customers</span>
                </span>
              </div>
            )}
          </div>
        )}
      </section>
    </>
  );
};

export default DisruptionContent;
