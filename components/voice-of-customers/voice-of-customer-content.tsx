import { useMemo, useState, useEffect, useContext } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

import * as customersApi from "../../http-client/customers.client";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { IUserCustomers } from "../../models/user-customers";
import { appContextData } from "../../context";

import Spinner from "../common/spinner";
import GoNextButton from "../common/go-next-button";
import Chat from "../common/openai-chat";
import { stepSixTranscript } from "../common/openai-chat/openai-transcript";
import { getVoiceOfCustomerMessage } from "../common/openai-chat/custom-messages";

import { useFormik } from "formik";
import { array, object, string } from "yup";

const VoiceOfCustomersContent = () => {
  const { data: session }: any = useSession();
  const queryClient = useQueryClient();
  const { appContext, setAppContext } = useContext(appContextData);

  let emptyUserCustomers = useMemo(() => {
    return {
      id: "",
      userId: session?.user?.id,
      topCategories: ["", "", "", "", ""],
      wishlist: ["", "", "", "", ""],
      fulfill: ["", "", "", "", ""],
    } as IUserCustomers;
  }, [session?.user?.id]);

  const [userCustomers, setUserCustomers] = useState<IUserCustomers>(emptyUserCustomers);

  const {
    data: fetchedUserCustomers,
    isLoading: isUserCustomersLoading,
    status: fetchingCustomersStatus,
    refetch: refetchUserCustomers,
  } = useQuery<IUserCustomers>({
    queryKey: [customersApi.Keys.All],
    queryFn: customersApi.getOne,
    refetchOnWindowFocus: false,
    enabled: !!session?.user?.id,
  });

  useEffect(() => {
    if (fetchingCustomersStatus === "success") {
      if (fetchedUserCustomers) setUserCustomers(fetchedUserCustomers);
      setAppContext({
        ...appContext,
        openAIMessage: `${stepSixTranscript}\n\n${getVoiceOfCustomerMessage(fetchedUserCustomers)}`,
      });
    }
  }, [fetchingCustomersStatus]);

  const { mutate: updateUserCustomers, isLoading: isUpdatingUserCustomers } = useMutation(
    (userCustomers: IUserCustomers) => {
      return customersApi.updateOne(userCustomers);
    },
    {
      onMutate: (newVoices) => {
        queryClient.setQueryData([customersApi.Keys.All, userCustomers.id], newVoices);
        setAppContext({
          ...appContext,
          openAIMessage: getVoiceOfCustomerMessage(newVoices),
        });
        refetchUserCustomers();
      },
      onSuccess: (storedVoices) => {
        queryClient.invalidateQueries([customersApi.Keys.All, userCustomers.id]);
        queryClient.invalidateQueries([customersApi.Keys.All]);
        setUserCustomers(storedVoices);
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
      await updateUserCustomers(values);
      setSubmitting(false);
    },
    enableReinitialize: true,
  });

  return (
    <>
      <section className="form-container">
        <h3 className="title-header">Voice of customers</h3>
        {isUserCustomersLoading ? (
          <Spinner className="flex items-center text-2xl" message="Loading Customers..." />
        ) : (
          <div className="flex flex-col gap-4">
            <div className="pill-yellow-50 p-3 md:w-full">
              <Image src="/bulb.svg" alt="Bulb Icon" width={36} height={36} />
              <p className="text-xl text-dark-300">
                what do your top customer categories want and how can you fulfill their needs?
              </p>
            </div>
            <div className="flex gap-4 p-4 bg-dark-50 rounded-2xl overflow-auto">
              <div className="grow flex flex-col gap-8">
                <h4 className="text-[1.75rem] text-dark-400 font-hero-semibold">Customer categories</h4>
                <ul className="flex flex-col gap-4">
                  <li>
                    <input
                      className="light-input w-full"
                      type="text"
                      placeholder="Enter your notes here"
                      {...formik.getFieldProps("topCategories.0")}
                    />
                  </li>
                  <li>
                    <input
                      className="light-input w-full"
                      type="text"
                      placeholder="Enter your notes here"
                      {...formik.getFieldProps("topCategories.1")}
                    />
                  </li>
                  <li>
                    <input
                      type="text"
                      placeholder="Enter your notes here"
                      {...formik.getFieldProps("topCategories.2")}
                      className="light-input w-full"
                    />
                  </li>
                  <li>
                    <input
                      type="text"
                      placeholder="Enter your notes here"
                      {...formik.getFieldProps("topCategories.3")}
                      className="light-input w-full"
                    />
                  </li>
                  <li>
                    <input
                      type="text"
                      placeholder="Enter your notes here"
                      {...formik.getFieldProps("topCategories.4")}
                      className="light-input w-full"
                    />
                  </li>
                </ul>
              </div>
              <div className="grow flex flex-col gap-8">
                <h4 className="text-[1.75rem] text-dark-400 font-hero-semibold">What they want</h4>
                <ul className="flex flex-col gap-4">
                  <li>
                    <input
                      type="text"
                      placeholder="Enter your notes here"
                      {...formik.getFieldProps("wishlist.0")}
                      className="light-input w-full"
                    />
                  </li>
                  <li>
                    <input
                      type="text"
                      placeholder="Enter your notes here"
                      {...formik.getFieldProps("wishlist.1")}
                      className="light-input w-full"
                    />
                  </li>
                  <li>
                    <input
                      type="text"
                      placeholder="Enter your notes here"
                      {...formik.getFieldProps("wishlist.2")}
                      className="light-input w-full"
                    />
                  </li>
                  <li>
                    <input
                      type="text"
                      placeholder="Enter your notes here"
                      {...formik.getFieldProps("wishlist.3")}
                      className="light-input w-full"
                    />
                  </li>
                  <li>
                    <input
                      type="text"
                      placeholder="Enter your notes here"
                      {...formik.getFieldProps("wishlist.4")}
                      className="light-input w-full"
                    />
                  </li>
                </ul>
              </div>
              <div className="grow flex flex-col gap-8">
                <h4 className="text-[1.75rem] text-dark-400 font-hero-semibold">How to fulfill it</h4>
                <ul className="flex flex-col gap-4">
                  <li>
                    <input
                      type="text"
                      placeholder="Enter your notes here"
                      {...formik.getFieldProps("fulfill.0")}
                      className="light-input w-full"
                    />
                  </li>
                  <li>
                    <input
                      type="text"
                      placeholder="Enter your notes here"
                      {...formik.getFieldProps("fulfill.1")}
                      className="light-input w-full"
                    />
                  </li>
                  <li>
                    <input
                      type="text"
                      placeholder="Enter your notes here"
                      {...formik.getFieldProps("fulfill.2")}
                      className="light-input w-full"
                    />
                  </li>
                  <li>
                    <input
                      type="text"
                      placeholder="Enter your notes here"
                      {...formik.getFieldProps("fulfill.3")}
                      className="light-input w-full"
                    />
                  </li>
                  <li>
                    <input
                      type="text"
                      placeholder="Enter your notes here"
                      {...formik.getFieldProps("fulfill.4")}
                      className="light-input w-full"
                    />
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex justify-end h-10">
              {isUpdatingUserCustomers && (
                <Spinner className="flex items-center text-xl" message="Saving Customers..." />
              )}
            </div>
            <div className="flex gap-4 justify-end">
              <button
                className={`btn-rev ${
                  isUserCustomersLoading || isUpdatingUserCustomers || formik.isSubmitting || !formik.isValid
                    ? `btn-disabled`
                    : ``
                }`}
                type="button"
                onClick={() => {
                  formik.handleSubmit();
                }}
                disabled={isUserCustomersLoading || isUpdatingUserCustomers || formik.isSubmitting || !formik.isValid}>
                Save
              </button>
              <GoNextButton
                stepUri={`../org/blue-ocean`}
                nextStepTitle={`Blue Ocean Canvas`}
                disabled={!userCustomers?.id}
              />
            </div>
          </div>
        )}
      </section>
      <Chat initialMessage={appContext.openAIMessage}></Chat>
    </>
  );
};

export default VoiceOfCustomersContent;
