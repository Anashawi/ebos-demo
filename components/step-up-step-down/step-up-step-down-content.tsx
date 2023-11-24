import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";

import * as analysisApi from "../../http-client/analysis.client";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { IUserAnalysis } from "../../models/user-analysis";

import Spinner from "../common/spinner";
import Chat from "../common/openai-chat/openai-chat";
import { stepNineTranscript } from "../common/openai-chat/openai-transcript";
import { getStepUpDownMessage } from "../common/openai-chat/custom-messages";

import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GoNextButton from "../common/go-next-button";

interface Props {
    userAnalysis: IUserAnalysis;
    dispatchUserAnalysis: (userAnalysis: any) => void;
    isLoading: boolean;
}

const StepUpStepDownContent = ({
    userAnalysis,
    dispatchUserAnalysis,
    isLoading: isAnalysisLoading,
}: Props) => {
    const { data: session }: any = useSession();
    const queryClient = useQueryClient();
    const router = useRouter();

    const [chatGPTMessage, setChatGPTMessage] = useState<string>("");
    // on data load send ChatGPT transcript with data
    useEffect(() => {
        if (userAnalysis.id) {
            const combinedMsg = `${stepNineTranscript}\n\n${getStepUpDownMessage(
                userAnalysis
            )}`;
            setChatGPTMessage(combinedMsg);
        }
    }, [userAnalysis]);

    const [aboveCustomerToBeAdded, setAboveCustomerToBeAdded] =
        useState<string>("");
    const [currentCustomerToBeAdded, setCurrentCustomerToBeAdded] =
        useState<string>("");
    const [belowCustomerToBeAdded, setBelowCustomerToBeAdded] =
        useState<string>("");

    const { mutate: updateUserAnalysis, isLoading: isUpdatingUserAnalysis } =
        useMutation(
            (userAnalysis: IUserAnalysis) => {
                return analysisApi.updateOne(userAnalysis);
            },
            {
                onMutate: newAnalysis => {
                    queryClient.setQueryData(
                        [analysisApi.Keys.All, userAnalysis.id],
                        newAnalysis
                    );
                    setChatGPTMessage(getStepUpDownMessage(newAnalysis));
                },
                onSuccess: storedAnalysis => {
                    queryClient.invalidateQueries([
                        analysisApi.Keys.All,
                        userAnalysis.id,
                    ]);
                    queryClient.invalidateQueries([analysisApi.Keys.All]);
                },
            }
        );

    const { mutate: createUserAnalysis, isLoading: isCreatingUserAnalysis } =
        useMutation(
            (userAnalysis: IUserAnalysis) =>
                analysisApi.insertOne(userAnalysis),
            {
                onMutate: newAnalysis => {
                    queryClient.setQueryData(
                        [analysisApi.Keys.All, userAnalysis.id],
                        newAnalysis
                    );
                    setChatGPTMessage(getStepUpDownMessage(newAnalysis));
                },
                onSuccess: storedAnalysis => {
                    queryClient.invalidateQueries([
                        analysisApi.Keys.All,
                        userAnalysis.id,
                    ]);
                    queryClient.invalidateQueries([analysisApi.Keys.All]);
                },
            }
        );

    return (
        <>
            <section className="form-container">
                <h3 className="title-header">Step-up step-down</h3>
                {isAnalysisLoading && (
                    <Spinner
                        className="flex items-center px-1 text-2xl"
                        message="Loading customers..."
                    />
                )}
                {!isAnalysisLoading && (
                    <form className="flex flex-col gap-4">
                        <div className="flex flex-col gap-4 p-5 bg-dark-50 rounded-2xl">
                            <h4 className="text-dark-400 text-[1.75rem] font-hero-semibold">
                                10% above
                            </h4>
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
                                    Who are your customers if you step up 10%
                                    above?
                                </p>
                            </div>
                            <ul className="flex flex-col gap-4">
                                {!userAnalysis.above?.length &&
                                    !isAnalysisLoading && (
                                        <div className="w-full flex justify-start items-center">
                                            <p className="p-5 text-dark-400 text-xl text-center italic">
                                                Start adding step up
                                                customers...
                                            </p>
                                        </div>
                                    )}
                                <div className="flex flex-wrap items-center gap-4">
                                    <input
                                        type="text"
                                        className="w-full xl:w-[69%] light-input"
                                        placeholder="Enter step up customer"
                                        value={aboveCustomerToBeAdded}
                                        onChange={e => {
                                            setAboveCustomerToBeAdded(
                                                e.target.value
                                            );
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            userAnalysis.above.push(
                                                aboveCustomerToBeAdded
                                            );
                                            dispatchUserAnalysis({
                                                ...userAnalysis,
                                            });
                                            setAboveCustomerToBeAdded("");
                                        }}
                                        disabled={!aboveCustomerToBeAdded}
                                        className={
                                            !!aboveCustomerToBeAdded
                                                ? "btn-primary"
                                                : "btn-primary hover:bg-primary-300 cursor-not-allowed"
                                        }
                                    >
                                        <FontAwesomeIcon
                                            className="w-3 h-auto cursor-pointer hover:text-gray-600"
                                            icon={faPlus}
                                        />
                                        Add more
                                    </button>
                                </div>
                                {!!userAnalysis.above?.length &&
                                    userAnalysis.above.map((item, index) => (
                                        <li
                                            key={index}
                                            className="relative xl:w-[69%] flex items-center"
                                        >
                                            <input
                                                type="text"
                                                className="dark-input text-ellipsis"
                                                value={item}
                                                readOnly
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    userAnalysis.above =
                                                        userAnalysis.above.filter(
                                                            (item, i) =>
                                                                index !== i
                                                        );
                                                    dispatchUserAnalysis(
                                                        (
                                                            prevValue: IUserAnalysis
                                                        ) => {
                                                            return {
                                                                ...prevValue,
                                                            };
                                                        }
                                                    );
                                                }}
                                                className="btn-delete"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faTimes}
                                                    className="w-4 text-dark-300 hover:text-dark-400"
                                                />
                                            </button>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                        <div className="flex flex-col gap-4 p-4 bg-dark-50 rounded-2xl">
                            <h4 className="text-dark-400 text-[1.75rem] font-hero-semibold">
                                Your Customers
                            </h4>
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
                                    Who are your current customers?
                                </p>
                            </div>
                            {!userAnalysis.customers?.length &&
                                !isAnalysisLoading && (
                                    <div className="w-full flex justify-start items-center">
                                        <p className="p-5 text-dark-400 text-xl text-center italic">
                                            Start adding current customers...
                                        </p>
                                    </div>
                                )}
                            <div className="flex flex-row flex-wrap items-center gap-4">
                                <input
                                    type="text"
                                    className="w-full xl:w-[69%] light-input"
                                    placeholder="Enter current customer"
                                    value={currentCustomerToBeAdded}
                                    onChange={e => {
                                        setCurrentCustomerToBeAdded(
                                            e.target.value
                                        );
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        userAnalysis.customers.push(
                                            currentCustomerToBeAdded
                                        );
                                        dispatchUserAnalysis({
                                            ...userAnalysis,
                                        });
                                        setCurrentCustomerToBeAdded("");
                                    }}
                                    disabled={!currentCustomerToBeAdded}
                                    className={
                                        !!currentCustomerToBeAdded
                                            ? "btn-primary"
                                            : "btn-primary hover:bg-primary-300 cursor-not-allowed"
                                    }
                                >
                                    <FontAwesomeIcon
                                        className="w-3 h-auto cursor-pointer hover:text-gray-600"
                                        icon={faPlus}
                                    />
                                    Add more
                                </button>
                            </div>
                            <ul className="flex flex-col gap-4">
                                {!!userAnalysis.customers?.length &&
                                    userAnalysis.customers.map(
                                        (item, index) => (
                                            <li
                                                key={index}
                                                className="relative xl:w-[69%] flex items-center"
                                            >
                                                <input
                                                    type="text"
                                                    className="dark-input"
                                                    value={item}
                                                    readOnly
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        userAnalysis.customers =
                                                            userAnalysis.customers.filter(
                                                                (item, i) =>
                                                                    index !== i
                                                            );
                                                        dispatchUserAnalysis(
                                                            (
                                                                prevValue: IUserAnalysis
                                                            ) => {
                                                                return {
                                                                    ...prevValue,
                                                                };
                                                            }
                                                        );
                                                    }}
                                                    className="btn-delete"
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faTimes}
                                                        className="w-4 text-dark-300 hover:text-dark-400"
                                                    />
                                                </button>
                                            </li>
                                        )
                                    )}
                            </ul>
                        </div>
                        <div className="flex flex-col gap-4 p-5 bg-dark-50 rounded-2xl">
                            <h4 className="text-dark-400 text-[1.75rem] font-hero-semibold">
                                10% below
                            </h4>
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
                                    Who are your customers if you step down 10%
                                    below?
                                </p>
                            </div>
                            {!userAnalysis.below?.length &&
                                !isAnalysisLoading && (
                                    <div className="w-full flex justify-start items-center">
                                        <p className="p-5 text-dark-400 text-xl text-center italic">
                                            Start adding step down customers...
                                        </p>
                                    </div>
                                )}
                            <div className="flex flex-row flex-wrap items-center gap-4">
                                <input
                                    type="text"
                                    className="w-full xl:w-[69%] light-input"
                                    placeholder="Enter step down customer"
                                    value={belowCustomerToBeAdded}
                                    onChange={e => {
                                        setBelowCustomerToBeAdded(
                                            e.target.value
                                        );
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        userAnalysis.below.push(
                                            belowCustomerToBeAdded
                                        );
                                        dispatchUserAnalysis({
                                            ...userAnalysis,
                                        });
                                        setBelowCustomerToBeAdded("");
                                    }}
                                    disabled={!belowCustomerToBeAdded}
                                    className={
                                        !!belowCustomerToBeAdded
                                            ? "btn-primary"
                                            : "btn-primary hover:bg-primary-300 cursor-not-allowed"
                                    }
                                >
                                    <FontAwesomeIcon
                                        className="w-3 h-auto cursor-pointer hover:text-gray-600"
                                        icon={faPlus}
                                    />
                                    Add more
                                </button>
                            </div>
                            <ul className="flex flex-col gap-4">
                                {!!userAnalysis.below?.length &&
                                    userAnalysis.below.map((item, index) => (
                                        <li
                                            key={index}
                                            className="relative xl:w-[69%] flex items-center"
                                        >
                                            <input
                                                type="text"
                                                className="dark-input"
                                                value={item}
                                                readOnly
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    userAnalysis.below =
                                                        userAnalysis.below.filter(
                                                            (item, i) =>
                                                                index !== i
                                                        );
                                                    dispatchUserAnalysis(
                                                        (
                                                            prevValue: IUserAnalysis
                                                        ) => {
                                                            return {
                                                                ...prevValue,
                                                            };
                                                        }
                                                    );
                                                }}
                                                className="btn-delete"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faTimes}
                                                    className="w-4 text-dark-300 hover:text-dark-400"
                                                />
                                            </button>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                        <div className="flex justify-end h-10">
                            {(isUpdatingUserAnalysis ||
                                isCreatingUserAnalysis) && (
                                <Spinner
                                    className="flex items-center px-1 text-xl"
                                    message="Saving customers..."
                                />
                            )}
                        </div>
                        <div className="flex gap-4 justify-end items-center flex-wrap">
                            <button
                                type="button"
                                onClick={() => {
                                    console.log(userAnalysis.customers);
                                    userAnalysis.userId = session?.user?.id;
                                    if (!userAnalysis.id) {
                                        createUserAnalysis(userAnalysis);
                                    } else {
                                        updateUserAnalysis(userAnalysis);
                                    }
                                }}
                                className="btn-rev"
                            >
                                Save
                            </button>
                            {!!userAnalysis.id && (
                                <div
                                    className="cursor-pointer bg-dark-300 hover:shadow-lg px-9 py-3 rounded-full"
                                    onClick={() => {
                                        router.push("../org/roadmap");
                                    }}
                                >
                                    <span className="text-xl text-md text-white">
                                        Go to next -{" "}
                                        <span className="text-white">
                                            Road Map{" "}
                                        </span>
                                    </span>
                                </div>
                            )}
                        </div>
                    </form>
                )}
            </section>
            <Chat initialMessage={chatGPTMessage}></Chat>
        </>
    );
};

export default StepUpStepDownContent;
