import { useMemo, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";

import * as customersApi from "../../http-client/customers.client";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { IUserCustomers } from "../../models/user-customers";

import Spinner from "../common/spinner";
import GoNextButton from "../common/go-next-button";
import Chat from "../common/openai-chat/openai-chat";
import { stepSixTranscript } from "../common/openai-chat/openai-transcript";
import { getVoiceOfCustomerMessage } from "../common/openai-chat/custom-messages";

import { useFormik } from "formik";
import { array, object, string } from "yup";

const VoiceOfCustomersContent = () => {
    const { data: session }: any = useSession();
    const router = useRouter();
    const queryClient = useQueryClient();

    const emptyUserCustomers = useMemo(() => {
        return {
            id: "",
            userId: session?.user?.id,
            topCategories: ["", "", "", "", ""],
            wishlist: ["", "", "", "", ""],
            fulfill: ["", "", "", "", ""],
        } as IUserCustomers;
    }, [session?.user?.id]);

    const [userCustomers, setUserCustomers] =
        useState<IUserCustomers>(emptyUserCustomers);

    const { data: fetchedUserCustomers, isLoading: isUserCustomersLoading } =
        useQuery<IUserCustomers>({
            queryKey: [customersApi.Keys.All],
            queryFn: customersApi.getOne,
            refetchOnWindowFocus: false,
            enabled: !!session?.user?.id,
        });

    useEffect(() => {
        if (fetchedUserCustomers) {
            setUserCustomers(fetchedUserCustomers);
        }
    }, [fetchedUserCustomers]);

    const [chatGPTMessage, setChatGPTMessage] = useState<string>("");
    // on data load send ChatGPT transcript with data
    useEffect(() => {
        if (!isUserCustomersLoading && fetchedUserCustomers?.id) {
            const combinedMsg = `${stepSixTranscript}\n\n${getVoiceOfCustomerMessage(
                fetchedUserCustomers
            )}`;
            setChatGPTMessage(combinedMsg);
        }
    }, [isUserCustomersLoading, fetchedUserCustomers]);

    const { mutate: updateUserCustomers, isLoading: isUpdatingUserCustomers } =
        useMutation(
            (userCustomers: IUserCustomers) => {
                return customersApi.updateOne(userCustomers);
            },
            {
                onMutate: newVoices => {
                    queryClient.setQueryData(
                        [customersApi.Keys.All, userCustomers.id],
                        newVoices
                    );
                    setChatGPTMessage(getVoiceOfCustomerMessage(newVoices));
                },
                onSuccess: updatedVoices => {
                    queryClient.invalidateQueries([
                        customersApi.Keys.All,
                        userCustomers.id,
                    ]);
                    queryClient.invalidateQueries([customersApi.Keys.All]);
                },
            }
        );

    const { mutate: createUserCustomers, isLoading: isCreatingUserCustomers } =
        useMutation(
            (userCustomers: IUserCustomers) =>
                customersApi.insertOne(userCustomers),
            {
                onMutate: updated => {
                    queryClient.setQueryData(
                        [customersApi.Keys.All, userCustomers.id],
                        updated
                    );
                    setChatGPTMessage(getVoiceOfCustomerMessage(updated));
                },
                onSuccess: updated => {
                    queryClient.invalidateQueries([
                        customersApi.Keys.All,
                        userCustomers.id,
                    ]);
                    queryClient.invalidateQueries([customersApi.Keys.All]);
                },
            }
        );

    const formik = useFormik({
        initialValues: {
            ...userCustomers,
        },
        validationSchema: object({
            topCategories: array(string()),
            wishlist: array(string()),
            fulfill: array(string()),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            values.userId = session?.user?.id;
            if (!values.id) {
                await createUserCustomers(values);
            } else {
                await updateUserCustomers(values);
            }
            setSubmitting(false);
        },
        enableReinitialize: true,
    });

    return (
        <>
            <div className="grow flex flex-col gap-8 px-16 py-8 bg-white relative rounded-3xl">
                <h2 className="title-header">Voice of customers</h2>
                {isUserCustomersLoading && (
                    <Spinner
                        className="flex items-center text-2xl"
                        message="Loading Customers..."
                    />
                )}
                {!isUserCustomersLoading && (
                    <div className="flex flex-col gap-4">
                        <div className="pill-yellow-50 p-3 md:w-full">
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
                                what do your top customer categories want and
                                how can you fulfill their needs?
                            </p>
                        </div>
                        <div className="flex gap-4 flex-wrap xl:flex-nowrap p-5 bg-dark-50 rounded-2xl">
                            <div className="grow flex flex-col gap-8">
                                <h4 className="text-[1.75rem] text-dark-400 font-hero-semibold">
                                    Customer categories
                                </h4>
                                <ul className="flex flex-col gap-4">
                                    <li>
                                        <input
                                            type="text"
                                            placeholder="Write your notes here..."
                                            {...formik.getFieldProps(
                                                "topCategories.0"
                                            )}
                                            className="light-input w-full"
                                        />
                                    </li>
                                    <li>
                                        <input
                                            type="text"
                                            placeholder="Write your notes here..."
                                            {...formik.getFieldProps(
                                                "topCategories.1"
                                            )}
                                            className="light-input w-full"
                                        />
                                    </li>
                                    <li>
                                        <input
                                            type="text"
                                            placeholder="Write your notes here..."
                                            {...formik.getFieldProps(
                                                "topCategories.2"
                                            )}
                                            className="light-input w-full"
                                        />
                                    </li>
                                    <li>
                                        <input
                                            type="text"
                                            placeholder="Write your notes here..."
                                            {...formik.getFieldProps(
                                                "topCategories.3"
                                            )}
                                            className="light-input w-full"
                                        />
                                    </li>
                                    <li>
                                        <input
                                            type="text"
                                            placeholder="Write your notes here..."
                                            {...formik.getFieldProps(
                                                "topCategories.4"
                                            )}
                                            className="light-input w-full"
                                        />
                                    </li>
                                </ul>
                            </div>
                            <div className="grow flex flex-col gap-8">
                                <h4 className="text-[1.75rem] text-dark-400 font-hero-semibold">
                                    What they want
                                </h4>
                                <ul className="flex flex-col gap-4">
                                    <li>
                                        <input
                                            type="text"
                                            placeholder="Write your notes here..."
                                            {...formik.getFieldProps(
                                                "wishlist.0"
                                            )}
                                            className="light-input w-full"
                                        />
                                    </li>
                                    <li>
                                        <input
                                            type="text"
                                            placeholder="Write your notes here..."
                                            {...formik.getFieldProps(
                                                "wishlist.1"
                                            )}
                                            className="light-input w-full"
                                        />
                                    </li>
                                    <li>
                                        <input
                                            type="text"
                                            placeholder="Write your notes here..."
                                            {...formik.getFieldProps(
                                                "wishlist.2"
                                            )}
                                            className="light-input w-full"
                                        />
                                    </li>
                                    <li>
                                        <input
                                            type="text"
                                            placeholder="Write your notes here..."
                                            {...formik.getFieldProps(
                                                "wishlist.3"
                                            )}
                                            className="light-input w-full"
                                        />
                                    </li>
                                    <li>
                                        <input
                                            type="text"
                                            placeholder="Write your notes here..."
                                            {...formik.getFieldProps(
                                                "wishlist.4"
                                            )}
                                            className="light-input w-full"
                                        />
                                    </li>
                                </ul>
                            </div>
                            <div className="grow flex flex-col gap-8">
                                <h4 className="text-[1.75rem] text-dark-400 font-hero-semibold">
                                    How to fulfill it
                                </h4>
                                <ul className="flex flex-col gap-4">
                                    <li>
                                        <input
                                            type="text"
                                            placeholder="Write your notes here..."
                                            {...formik.getFieldProps(
                                                "fulfill.0"
                                            )}
                                            className="light-input w-full"
                                        />
                                    </li>
                                    <li>
                                        <input
                                            type="text"
                                            placeholder="Write your notes here..."
                                            {...formik.getFieldProps(
                                                "fulfill.1"
                                            )}
                                            className="light-input w-full"
                                        />
                                    </li>
                                    <li>
                                        <input
                                            type="text"
                                            placeholder="Write your notes here..."
                                            {...formik.getFieldProps(
                                                "fulfill.2"
                                            )}
                                            className="light-input w-full"
                                        />
                                    </li>
                                    <li>
                                        <input
                                            type="text"
                                            placeholder="Write your notes here..."
                                            {...formik.getFieldProps(
                                                "fulfill.3"
                                            )}
                                            className="light-input w-full"
                                        />
                                    </li>
                                    <li>
                                        <input
                                            type="text"
                                            placeholder="Write your notes here..."
                                            {...formik.getFieldProps(
                                                "fulfill.4"
                                            )}
                                            className="light-input w-full"
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex justify-end h-10">
                            {(isUpdatingUserCustomers ||
                                isCreatingUserCustomers) && (
                                <Spinner
                                    className="flex items-center text-xl"
                                    message="Saving Customers..."
                                />
                            )}
                        </div>
                        <div className="flex gap-4 justify-end">
                            <button
                                type="button"
                                onClick={() => {
                                    formik.handleSubmit();
                                }}
                                className={
                                    formik.isSubmitting || !formik.isValid
                                        ? "btn-rev btn-disabled"
                                        : "btn-rev"
                                }
                                disabled={
                                    formik.isSubmitting || !formik.isValid
                                }
                            >
                                Save
                            </button>
                            <GoNextButton
                                stepUri={`../org/blue-ocean`}
                                nextStepTitle={`Blue Ocean Canvas`}
                                clickable={!!userCustomers.id}
                            />
                        </div>
                    </div>
                )}
            </div>
            <Chat initialMessage={chatGPTMessage}></Chat>
        </>
    );
};

export default VoiceOfCustomersContent;
