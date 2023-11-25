import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";

import * as nonCustomersApi from "../../http-client/non-customers.client";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { IUserNonCustomers } from "../../models/user-non-customers";

import Spinner from "../common/spinner";
import Chat from "../common/openai-chat";
import { stepEightTranscript } from "../common/openai-chat/openai-transcript";
import { getNonCustomersMessage } from "../common/openai-chat/custom-messages";

import { faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
    userNonCustomers: IUserNonCustomers;
    dispatchUserNonCustomers: (userNonCustomers: any) => void;
    isLoading: boolean;
}

const NonCustomersContent = ({
    userNonCustomers,
    dispatchUserNonCustomers,
    isLoading: areNonCustomersLoading,
}: Props) => {
    const { data: session }: any = useSession();
    const queryClient = useQueryClient();
    const router = useRouter();

    const [chatGPTMessage, setChatGPTMessage] = useState<string>("");
    // on data load send ChatGPT transcript with data
    useEffect(() => {
        if (userNonCustomers.id) {
            const combinedMsg = `${stepEightTranscript}\n\n${getNonCustomersMessage(
                userNonCustomers
            )}`;
            setChatGPTMessage(combinedMsg);
        }
    }, [userNonCustomers]);

    const [nonCustomerToBeAdded, setNonCustomerToBeAdded] =
        useState<string>("");
    const [refusingNonCustomerToBeAdded, setRefusingNonCustomerToBeAdded] =
        useState<string>("");
    const [unwantedNonCustomerToBeAdded, setUnwantedNonCustomerToBeAdded] =
        useState<string>("");

    const {
        mutate: updateUserNonCustomers,
        isLoading: isUpdatingUserNonCustomers,
    } = useMutation(
        (newUserNonCustomers: IUserNonCustomers) => {
            return nonCustomersApi.updateOne(newUserNonCustomers);
        },
        {
            onMutate: newNonCustomers => {
                queryClient.setQueryData(
                    [nonCustomersApi.Keys.All, userNonCustomers.id],
                    newNonCustomers
                );
                setChatGPTMessage(getNonCustomersMessage(newNonCustomers));
            },
            onSuccess: storedNonCustomers => {
                queryClient.invalidateQueries([
                    nonCustomersApi.Keys.All,
                    userNonCustomers.id,
                ]);
                queryClient.invalidateQueries([nonCustomersApi.Keys.All]);
            },
        }
    );

    const {
        mutate: createUserNonCustomers,
        isLoading: isCreatingUserNonCustomers,
    } = useMutation(
        (newUserNonCustomers: IUserNonCustomers) =>
            nonCustomersApi.insertOne(newUserNonCustomers),
        {
            onMutate: newNonCustomers => {
                queryClient.setQueryData(
                    [nonCustomersApi.Keys.All, userNonCustomers.id],
                    newNonCustomers
                );
                setChatGPTMessage(getNonCustomersMessage(newNonCustomers));
            },
            onSuccess: storedNonCustomers => {
                queryClient.invalidateQueries([
                    nonCustomersApi.Keys.All,
                    userNonCustomers.id,
                ]);
                queryClient.invalidateQueries([nonCustomersApi.Keys.All]);
            },
        }
    );

    return (
        <>
            <section className="form-container">
                <h3 className="title-header">Non customers</h3>
                {areNonCustomersLoading && (
                    <Spinner
                        className="flex items-center px-1 text-2xl"
                        message="Loading non customers..."
                    />
                )}
                {!areNonCustomersLoading && (
                    <form className="flex flex-col gap-4">
                        <section className="flex flex-col gap-8 p-5 bg-dark-50 rounded-2xl">
                            <h3 className="text-[1.75rem] text-dark-400 font-hero-semibold">
                                Soon to be non-customers
                            </h3>
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
                                    Who are the customers most likely to be left
                                    out in this transformation ?
                                </p>
                            </div>
                            <ul className="flex flex-col gap-4">
                                {!userNonCustomers.soonNonCustomers?.length &&
                                    !areNonCustomersLoading && (
                                        <div className="w-full flex justify-start items-center">
                                            <p className="p-5 text-dark-400 text-xl text-center italic">
                                                Start adding soon to be non
                                                customers...
                                            </p>
                                        </div>
                                    )}
                                <div className="flex flex-wrap items-center gap-4">
                                    <input
                                        type="text"
                                        className="w-full xl:w-[69%] light-input"
                                        placeholder="Enter Soon to be Non-Customer here"
                                        value={nonCustomerToBeAdded}
                                        onChange={e => {
                                            setNonCustomerToBeAdded(
                                                e.target.value
                                            );
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            userNonCustomers.soonNonCustomers.push(
                                                nonCustomerToBeAdded
                                            );
                                            dispatchUserNonCustomers({
                                                ...userNonCustomers,
                                            } as IUserNonCustomers);
                                            setNonCustomerToBeAdded("");
                                        }}
                                        disabled={!nonCustomerToBeAdded}
                                        className={
                                            !!nonCustomerToBeAdded
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
                                {!!userNonCustomers.soonNonCustomers?.length &&
                                    userNonCustomers.soonNonCustomers.map(
                                        (nonCustomer, index) => (
                                            <li
                                                key={index}
                                                className="relative xl:w-[69%] flex items-center"
                                            >
                                                <input
                                                    type="text"
                                                    className="dark-input"
                                                    value={nonCustomer}
                                                    readOnly
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        userNonCustomers.soonNonCustomers =
                                                            userNonCustomers.soonNonCustomers.filter(
                                                                (nonC, i) =>
                                                                    i !== index
                                                            );
                                                        dispatchUserNonCustomers(
                                                            {
                                                                ...userNonCustomers,
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
                        </section>
                        <section className="flex flex-col gap-8 p-4 bg-dark-50 rounded-2xl">
                            <h3 className="text-[1.75rem] text-dark-400 font-hero-semibold">
                                Refusing non-customers
                            </h3>
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
                                    Who are the customers most likely to be
                                    refusing of this transformation ?
                                </p>
                            </div>
                            <ul className="flex flex-col gap-4">
                                {!userNonCustomers.refusingNonCustomers
                                    ?.length &&
                                    !areNonCustomersLoading && (
                                        <div className="w-full flex justify-start items-center">
                                            <p className="p-5 text-dark-400 text-xl text-center italic">
                                                Start adding refusing
                                                non-customers...
                                            </p>
                                        </div>
                                    )}
                                <div className="flex flex-row flex-wrap items-center gap-4">
                                    <input
                                        type="text"
                                        className="w-full xl:w-[69%] light-input"
                                        placeholder="Enter refusing Non-Customer here"
                                        value={refusingNonCustomerToBeAdded}
                                        onChange={e => {
                                            setRefusingNonCustomerToBeAdded(
                                                e.target.value
                                            );
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            userNonCustomers.refusingNonCustomers.push(
                                                refusingNonCustomerToBeAdded
                                            );
                                            dispatchUserNonCustomers({
                                                ...userNonCustomers,
                                            } as IUserNonCustomers);
                                            setRefusingNonCustomerToBeAdded("");
                                        }}
                                        disabled={!refusingNonCustomerToBeAdded}
                                        className={
                                            !!refusingNonCustomerToBeAdded
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
                                {!!userNonCustomers.refusingNonCustomers
                                    ?.length &&
                                    userNonCustomers.refusingNonCustomers.map(
                                        (refusingCustomer, index) => (
                                            <li
                                                key={index}
                                                className="relative xl:w-[69%] flex items-center"
                                            >
                                                <input
                                                    type="text"
                                                    className="dark-input"
                                                    value={refusingCustomer}
                                                    readOnly
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        userNonCustomers.refusingNonCustomers =
                                                            userNonCustomers.refusingNonCustomers.filter(
                                                                (nonC, i) =>
                                                                    i !== index
                                                            );
                                                        dispatchUserNonCustomers(
                                                            {
                                                                ...userNonCustomers,
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
                        </section>
                        <section className="flex flex-col gap-8 p-4 bg-dark-50 rounded-2xl">
                            <h3 className="text-[1.75rem] text-dark-400 font-hero-semibold">
                                Unwanted non-customers
                            </h3>
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
                                    Who are the customers you don&apos;t want in
                                    this transformation ?
                                </p>
                            </div>

                            <ul className="flex flex-col gap-4">
                                {!userNonCustomers.unwantedNonCustomers
                                    ?.length &&
                                    !areNonCustomersLoading && (
                                        <div className="w-full flex justify-start items-center">
                                            <p className="p-5 text-dark-400 text-xl text-center italic">
                                                Start adding unwanted
                                                non-customers...
                                            </p>
                                        </div>
                                    )}
                                <div className="flex flex-row flex-wrap items-center gap-4">
                                    <input
                                        type="text"
                                        className="w-full xl:w-[69%] light-input"
                                        placeholder="Enter unwanted Non-Customer here"
                                        value={unwantedNonCustomerToBeAdded}
                                        onChange={e => {
                                            setUnwantedNonCustomerToBeAdded(
                                                e.target.value
                                            );
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            userNonCustomers.unwantedNonCustomers.push(
                                                unwantedNonCustomerToBeAdded
                                            );
                                            dispatchUserNonCustomers({
                                                ...userNonCustomers,
                                            } as IUserNonCustomers);
                                            setUnwantedNonCustomerToBeAdded("");
                                        }}
                                        disabled={!unwantedNonCustomerToBeAdded}
                                        className={
                                            !!unwantedNonCustomerToBeAdded
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
                                {!!userNonCustomers.unwantedNonCustomers
                                    ?.length &&
                                    userNonCustomers.unwantedNonCustomers.map(
                                        (unwantedCustomer, index) => (
                                            <li
                                                key={index}
                                                className="relative xl:w-[69%] flex items-center"
                                            >
                                                <input
                                                    type="text"
                                                    className="dark-input"
                                                    value={unwantedCustomer}
                                                    readOnly
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        userNonCustomers.unwantedNonCustomers =
                                                            userNonCustomers.unwantedNonCustomers.filter(
                                                                (nonC, i) =>
                                                                    i !== index
                                                            );
                                                        dispatchUserNonCustomers(
                                                            {
                                                                ...userNonCustomers,
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
                        </section>
                        <div className="flex justify-end h-10">
                            {(isUpdatingUserNonCustomers ||
                                isCreatingUserNonCustomers) && (
                                <Spinner
                                    className="flex items-center px-1 text-xl"
                                    message="Saving non customers..."
                                />
                            )}
                        </div>
                        <div className="flex flex-wrap justify-end gap-4">
                            <button
                                type="button"
                                onClick={() => {
                                    const newObj = {
                                        ...userNonCustomers,
                                    };
                                    newObj.userId = session?.user?.id;
                                    if (!userNonCustomers.id) {
                                        createUserNonCustomers(newObj);
                                    } else {
                                        updateUserNonCustomers(newObj);
                                    }
                                }}
                                className="btn-rev"
                            >
                                Save
                            </button>
                            {!!userNonCustomers.id && (
                                <div
                                    className="cursor-pointer bg-dark-300 hover:shadow-lg px-9 py-3 rounded-full"
                                    onClick={() => {
                                        router.push("../org/step-up-step-down");
                                    }}
                                >
                                    <span className="text-xl text-md text-white">
                                        Go to next -{" "}
                                        <span className="text-white">
                                            Step-up step-down model
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

export default NonCustomersContent;
