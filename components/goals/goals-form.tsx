import { useState, useEffect, ChangeEvent, useContext } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

import * as goalsApi from "../../http-client/goals.client";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { IUserGoals } from "../../models/user-goal";
import { appContextData } from "../../context";

import Spinner from "../common/spinner";
import { getUserGoalsMsg } from "../common/openai-chat/custom-messages";

import { Field, FieldArray, Form, Formik, ErrorMessage } from "formik";
import { array, date, object, string } from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import GoNextButton from "../common/go-next-button";

interface Props {
  fetchedUserGoals: IUserGoals | undefined;
  areUserGoalsLoading: boolean;
  userGoals: IUserGoals;
  setUserGoals: React.Dispatch<React.SetStateAction<IUserGoals>>;
}

const GoalsForm = ({ fetchedUserGoals, areUserGoalsLoading, userGoals, setUserGoals }: Props) => {
  const { data: session }: any = useSession();
  const queryClient = useQueryClient();

  const [goalToBeAdded, setGoalToBeAdded] = useState("");
  const { appContext, setAppContext } = useContext(appContextData);

  // display goals
  useEffect(() => {
    if (fetchedUserGoals) {
      setUserGoals(fetchedUserGoals);
    }
  }, [fetchedUserGoals, setUserGoals]);

  // update goal with local storage mutation
  const { mutate: updateUserGoal, isLoading: isUpdatingUserGoal } = useMutation(
    (userGoals: IUserGoals) => {
      return goalsApi.updateOne(userGoals);
    },
    {
      onMutate: (newGoal) => {
        queryClient.setQueryData([goalsApi.Keys.UserGoals, userGoals.id], newGoal);
        setAppContext({
          ...appContext,
          openAIMessage: getUserGoalsMsg(newGoal),
        });
      },
      onSuccess: (storedGoal) => {
        queryClient.invalidateQueries([goalsApi.Keys.UserGoals, userGoals.id]);
        // flag locally stored goals as invalid, to be loaded onPageLoad
        queryClient.invalidateQueries([goalsApi.Keys.All]);
      },
    }
  );

  // create goal with local storage mutation
  const { mutate: createUserGoal, isLoading: isCreatingUserGoal } = useMutation(
    (userGoals: IUserGoals) => goalsApi.insertOne(userGoals),
    {
      onMutate: (newGoal) => {
        queryClient.setQueryData([goalsApi.Keys.UserGoals, userGoals.id], newGoal);
        setAppContext({
          ...appContext,
          openAIMessage: getUserGoalsMsg(newGoal),
        });
      },
      onSuccess: (storedGoal) => {
        queryClient.invalidateQueries([goalsApi.Keys.UserGoals, userGoals.id]);
        // flag locally stored goals as invalid, to be loaded onPageLoad
        queryClient.invalidateQueries([goalsApi.Keys.All]);
      },
    }
  );

  return (
    <section className="form-container">
      <h3 className="title-header">Goals</h3>
      <div className="flex flex-col gap-4 p-4 bg-dark-50 rounded-2xl">
        <Formik
          initialValues={{
            ...userGoals,
          }}
          validationSchema={object({
            goals: array(string().required("required")).required().min(1, "at least 1 goal is required"),
            targetDate: date().required("required"),
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
          validateOnMount>
          {({ values: formValues, isSubmitting, isValid, errors, touched }) => (
            <>
              <div className="w-full xl:w-[40%] flex flex-col gap-2">
                <label className="font-semibold text-[#4e79b2]">Choose a target date</label>
                <div className="grow flex flex-col">
                  <Field
                    className="light-input"
                    name="targetDate"
                    type="date"
                    min={new Date().toISOString().slice(0, 10)} // 10 chars for dd/mm/yyyy
                    placeholder="Enter target date"
                  />
                  <ErrorMessage name={`targetDate`}>
                    {(msg) => <p className="text-lg text-rose-500">{msg}</p>}
                  </ErrorMessage>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="block font-hero-bold text-[#4e79b2]">Things you want to be celebrating:</label>
                <div className="flex flex-col gap-4">
                  <div className="pill-yellow-50 p-3">
                    <div className="w-[2.5rem] h-[2.5rem]">
                      <Image src="/bulb.svg" alt="Bulb Icon" width={0} height={0} className="w-full h-auto" />
                    </div>
                    <p className="text-xl text-dark-300">Visualize success on this date, What does it look like...?</p>
                  </div>
                  <Form>
                    <FieldArray name="goals">
                      {({ remove: removeGoal, push: pushToGoalsList }) => (
                        <div className="flex flex-col gap-4">
                          <div className="flex flex-row justify-start gap-2">
                            <Field
                              className="w-2/3 light-input"
                              name="goals"
                              type="text"
                              placeholder="Enter your goal here"
                              value={goalToBeAdded}
                              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setGoalToBeAdded(e.target.value);
                              }}
                            />
                            <button
                              className={`btn-primary px-8 cursor-pointer ${!goalToBeAdded ? `btn-disabled` : ``}`}
                              type="button"
                              disabled={!goalToBeAdded}
                              onClick={() => {
                                pushToGoalsList(goalToBeAdded);
                                setGoalToBeAdded("");
                              }}>
                              <FontAwesomeIcon className="w-4 cursor-pointer" icon={faPlus} />
                              <span className="text-xl">Add New Goal</span>
                            </button>
                          </div>
                          {areUserGoalsLoading && <Spinner className="" message="Loading Goals" />}
                          {!areUserGoalsLoading && formValues.goals?.length === 0 && (
                            <div className="w-full flex items-center">
                              <p className="pb-2 text-xl text-center italic">Start adding your goals...</p>
                            </div>
                          )}
                          <ul className="flex flex-col gap-2 text-gray-gunmetal">
                            {!areUserGoalsLoading &&
                              formValues.goals?.length > 0 &&
                              formValues.goals.map((goal: string, goalIndex: number) => (
                                <div key={goalIndex}>
                                  <li className="relative w-[100%] xl:w-[69%]">
                                    <Field
                                      type="text"
                                      className="dark-input"
                                      name={`goals.${goalIndex}`}
                                      readOnly
                                      placeholder="Goal"
                                    />
                                    <FontAwesomeIcon
                                      icon={faTimes}
                                      className="w-4 cursor-pointer absolute right-6 top-5 text-dark-300 hover:text-dark-400"
                                      onClick={() => {
                                        removeGoal(goalIndex);
                                      }}
                                    />
                                  </li>
                                  <ErrorMessage name={`goals.${goalIndex}`}>
                                    {(msg) => <div className="text-lg text-rose-500">{msg}</div>}
                                  </ErrorMessage>
                                </div>
                              ))}
                            {errors?.goals && touched.goals && (
                              <p className="text-lg text-rose-500">
                                <>{errors.goals}</>
                              </p>
                            )}
                          </ul>
                          <div className="flex flex-col gap-2 justify-center">
                            <div className="flex justify-end h-10">
                              {(isSubmitting || isCreatingUserGoal || isUpdatingUserGoal) && (
                                <Spinner className="text-lg py-3" message="Saving Goals" />
                              )}
                            </div>
                            <div className="flex justify-end">
                              <button
                                className={`btn-rev ${
                                  isSubmitting || isCreatingUserGoal || isUpdatingUserGoal || !isValid
                                    ? `btn-disabled`
                                    : ``
                                }`}
                                type="submit"
                                disabled={false}>
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
      <GoNextButton
        stepUri={`../org/products`}
        nextStepTitle={`Pioneer Migrator Settler`}
        disabled={userGoals.goals.length < 1}
      />
    </section>
  );
};

export default GoalsForm;
