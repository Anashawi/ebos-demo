import { useState, useEffect, ChangeEvent } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

import * as goalsApi from "../../http-client/goals.client";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { IUserGoals } from "../../models/user-goal";

import Spinner from "../common/spinner";
import { getUserGoalsMsg } from "../common/openai-chat/custom-messages";

import { Field, FieldArray, Form, Formik, ErrorMessage } from "formik";
import { array, date, object, string } from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

interface Props {
    fetchedUserGoals: IUserGoals | undefined;
    areUserGoalsLoading: boolean;
    userGoals: IUserGoals;
    setUserGoals: React.Dispatch<React.SetStateAction<IUserGoals>>;
    setChatGPTMessage: React.Dispatch<React.SetStateAction<string>>;
}

const GoalsForm = ({
    fetchedUserGoals,
    areUserGoalsLoading,
    userGoals,
    setUserGoals,
    setChatGPTMessage,
}: Props) => {
    const { data: session }: any = useSession();
    const queryClient = useQueryClient();

    const [goalToBeAdded, setGoalToBeAdded] = useState("");

    // display goals
    useEffect(() => {
        if (fetchedUserGoals) {
            setUserGoals(fetchedUserGoals);
        }
    }, [fetchedUserGoals, setUserGoals]);

    // update goal with local storage mutation
    const { mutate: updateUserGoal, isLoading: isUpdatingUserGoal } =
        useMutation(
            (userGoals: IUserGoals) => {
                return goalsApi.updateOne(userGoals);
            },
            {
                onMutate: newGoal => {
                    queryClient.setQueryData(
                        [goalsApi.Keys.UserGoals, userGoals.id],
                        newGoal
                    );
                    setChatGPTMessage(getUserGoalsMsg(newGoal));
                },
                onSuccess: storedGoal => {
                    queryClient.invalidateQueries([
                        goalsApi.Keys.UserGoals,
                        userGoals.id,
                    ]);
                    // flag locally stored goals as invalid, to be loaded onPageLoad
                    queryClient.invalidateQueries([goalsApi.Keys.All]);
                },
            }
        );

    // create goal with local storage mutation
    const { mutate: createUserGoal, isLoading: isCreatingUserGoal } =
        useMutation((userGoals: IUserGoals) => goalsApi.insertOne(userGoals), {
            onMutate: newGoal => {
                queryClient.setQueryData(
                    [goalsApi.Keys.UserGoals, userGoals.id],
                    newGoal
                );
                setChatGPTMessage(getUserGoalsMsg(newGoal));
            },
            onSuccess: storedGoal => {
                queryClient.invalidateQueries([
                    goalsApi.Keys.UserGoals,
                    userGoals.id,
                ]);
                // flag locally stored goals as invalid, to be loaded onPageLoad
                queryClient.invalidateQueries([goalsApi.Keys.All]);
            },
        });

    return (
        <div className="goals-form flex flex-col gap-4">
            <h2 className="title-header">Goals</h2>
            <div className="flex flex-col gap-4 bg-dark-50 rounded-2xl p-4">
                <Formik
                    initialValues={{
                        ...userGoals,
                    }}
                    validationSchema={object({
                        goals: array(string())
                            .required(
                                "Start defining your goals toward success, click Add New Goal!"
                            )
                            .min(
                                0,
                                "Start defining your goals toward success, click Add New Goal!"
                            ),
                        targetDate: date().required("Must add a target date"),
                    })}
                    onSubmit={async (values, actions) => {
                        userGoals.userId = session?.user?.id;
                        if (userGoals?.id) {
                            await updateUserGoal({
                                ...userGoals,
                                ...values,
                            });
                        } else {
                            const { userId, ...newValues } = values;
                            await createUserGoal({
                                ...userGoals,
                                ...newValues,
                            });
                        }
                        actions.setSubmitting(false);
                    }}
                    enableReinitialize
                    validateOnMount
                >
                    {({
                        values: formValues,
                        isSubmitting,
                        isValid,
                        errors,
                    }) => (
                        <>
                            <div className="w-full xl:w-[40%] flex flex-col gap-2">
                                <label className="font-semibold text-[#4e79b2]">
                                    Choose a target date
                                </label>
                                <div className="grow flex flex-col">
                                    <Field
                                        type="date"
                                        className="light-input"
                                        min={new Date()
                                            .toISOString()
                                            .slice(0, 10)} // 10 chars for dd/mm/yyyy
                                        name="targetDate"
                                        placeholder="Target Date"
                                    />
                                    <ErrorMessage name={`targetDate`}>
                                        {msg => (
                                            <div className="text-lg text-rose-500">
                                                {msg}
                                            </div>
                                        )}
                                    </ErrorMessage>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="block font-hero-bold text-[#4e79b2]">
                                    Things you want to be celebrating:
                                </label>
                                <div className="flex flex-col gap-4">
                                    <div className="pill-yellow-50 p-3">
                                        <div className="w-[2.5rem] h-[2.5rem]">
                                            <Image
                                                src="/bulb.svg"
                                                alt="Bulb Icon"
                                                width={0}
                                                height={0}
                                                className="w-full h-auto"
                                            />
                                        </div>
                                        <h3 className="text-xl text-dark-300">
                                            Visualize success on this date, What
                                            does it look like...?
                                        </h3>
                                    </div>
                                    <Form>
                                        <FieldArray name="goals">
                                            {({ remove, push, form }) => (
                                                <div className="flex flex-col gap-4">
                                                    <div className="flex flex-wrap justify-start gap-2">
                                                        <Field
                                                            type="text"
                                                            className="w-[100%] xl:w-[69%] light-input"
                                                            placeholder="Enter your goal here"
                                                            value={
                                                                goalToBeAdded
                                                            }
                                                            onChange={(
                                                                e: ChangeEvent<HTMLInputElement>
                                                            ) => {
                                                                setGoalToBeAdded(
                                                                    e.target
                                                                        .value
                                                                );
                                                            }}
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                push(
                                                                    goalToBeAdded
                                                                );
                                                                setGoalToBeAdded(
                                                                    ""
                                                                );
                                                            }}
                                                            disabled={
                                                                !goalToBeAdded
                                                            }
                                                            className={
                                                                !!goalToBeAdded
                                                                    ? "btn-primary pl-9 pr-8"
                                                                    : "btn-primary-light pl-9 pr-8 hover:bg-primary-300 cursor-not-allowed"
                                                            }
                                                        >
                                                            <FontAwesomeIcon
                                                                className="w-[0.8rem] h-auto cursor-pointer"
                                                                icon={faPlus}
                                                            />
                                                            <span className="text-xl">
                                                                Add New Goal
                                                            </span>
                                                        </button>
                                                    </div>
                                                    {areUserGoalsLoading && (
                                                        <Spinner
                                                            className=""
                                                            message="Loading Goals"
                                                        />
                                                    )}
                                                    {!areUserGoalsLoading &&
                                                        formValues.goals
                                                            ?.length === 0 && (
                                                            <div className="w-full flex items-center">
                                                                <p className="pb-2 text-xl text-center italic">
                                                                    Start adding
                                                                    your
                                                                    goals...
                                                                </p>
                                                            </div>
                                                        )}
                                                    <ul className="flex flex-col gap-2 text-gray-gunmetal">
                                                        {!areUserGoalsLoading &&
                                                            formValues.goals
                                                                ?.length > 0 &&
                                                            formValues.goals.map(
                                                                (
                                                                    goal: string,
                                                                    index: number
                                                                ) => (
                                                                    <div
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        <li className="relative w-[100%] xl:w-[69%]">
                                                                            <Field
                                                                                type="text"
                                                                                className="dark-input"
                                                                                name={`goals.${index}`}
                                                                                readOnly
                                                                                placeholder="Goal"
                                                                            />
                                                                            <FontAwesomeIcon
                                                                                icon={
                                                                                    faTimes
                                                                                }
                                                                                className="w-4 cursor-pointer absolute right-6 top-5 text-dark-300 hover:text-dark-400"
                                                                                onClick={() => {
                                                                                    remove(
                                                                                        index
                                                                                    );
                                                                                }}
                                                                            />
                                                                        </li>
                                                                        <ErrorMessage
                                                                            name={`goals.${index}`}
                                                                        >
                                                                            {msg => (
                                                                                <div className="text-lg text-rose-500">
                                                                                    {
                                                                                        msg
                                                                                    }
                                                                                </div>
                                                                            )}
                                                                        </ErrorMessage>
                                                                    </div>
                                                                )
                                                            )}
                                                        {form.errors?.goals && (
                                                            <p className="p-3 text-center bg-rose-50 text-lg text-rose-500">
                                                                <>
                                                                    {
                                                                        form
                                                                            .errors
                                                                            .goals
                                                                    }
                                                                </>
                                                            </p>
                                                        )}
                                                    </ul>
                                                    <div className="flex flex-col gap-2 justify-center">
                                                        <div className="flex justify-end h-10">
                                                            {(isSubmitting ||
                                                                isCreatingUserGoal ||
                                                                isUpdatingUserGoal) && (
                                                                <Spinner
                                                                    className="text-lg py-3"
                                                                    message="Saving Goals"
                                                                />
                                                            )}
                                                        </div>
                                                        <div className="flex justify-end">
                                                            <button
                                                                type="submit"
                                                                className={
                                                                    isSubmitting ||
                                                                    !isValid
                                                                        ? "btn-rev btn-disabled"
                                                                        : "btn-rev"
                                                                }
                                                                disabled={
                                                                    isSubmitting ||
                                                                    !isValid
                                                                }
                                                            >
                                                                Save
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </FieldArray>
                                    </Form>
                                </div>
                            </div>
                        </>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default GoalsForm;
