import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { videoPropNamesEnum } from "../../models/enums";
import Plans from "@components/ui/plans";
import useFuturesChart from "../../hooks/use-futures-chart";
import useModalToggler from "../../hooks/use-modal-toggler";
import IdeasModal from "../app/ideas-modal";
import Modal from "../common/modal";
import Spinner from "../common/spinner";
import SharedVideoForm from "../disruption/shared-video-form";
import Video from "../disruption/video";
import MarketPotentialProductChart from "../market-potential/product-chart";
import RedOceanProductChart from "../red-ocean/product-chart";
import BlueOceanProductChart from "../blue-ocean/product-chart";
import NonCustomersReview from "../non-customers/review";
import ChartsButton from "./charts/charts-button";

import Chart from "react-google-charts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import StepUpStepDownCustomersReview from "../step-up-step-down/customers-review";

import { insertOne, getAll, deleteOne } from "../../http-client/payments";
import { useRouter } from "next/router";
import { insertOne as insertLog } from "../../http-client/activity-logs";
import emailjs from "emailjs-com";

interface Props {
  videoPropName: videoPropNamesEnum;
  videoLabel: string;
  chartProducts: any[];
  isChartDataLoading?: boolean;
  setOpenaiMessage: Dispatch<SetStateAction<string>>;
}

const ChartsContent = ({
  videoPropName,
  videoLabel,
  chartProducts,
  isChartDataLoading,
  setOpenaiMessage,
}: Props) => {
  const router = useRouter();
  const { result, orderId } = router.query;
  const { data: session }: any = useSession();
  const userInfo = session?.user;

  const [isIdeasModalOpen, toggleIdeasModal] = useModalToggler();
  const [isVideoModalOn, toggleVideoModal] = useModalToggler(false);
  const [isEditUrlModalOn, toggleEditVideoModal] = useModalToggler();
  const [subscribers, setSubscribers] = useState([]);
  const [chart] = useFuturesChart(chartProducts);

  // UI checks
  const isAdmin = session?.user?.role === "admin";
  const isNotLoadingWithChartData =
    !isChartDataLoading && chartProducts.length > 0;

  const [isPlansOpen, setIsPlansOpen] = useState(false); // State to control Plans dialog visibility

  const handleOpenPlansDialog = async () => {
    const now = new Date();

    if (isAdmin) {
      router.push("/org/report");
      return; // stop execution after redirect
    }
    for (const elem of subscribers) {
      //@ts-ignore
      const expirationDate = new Date(elem.subscriptionExpirationDate);

      //@ts-ignore
      if (elem?.userId === userInfo?.id) {
        if (now < expirationDate) {
          //@ts-ignore
          const result = await insertLog({
            action: "Generate a report",
            createdBy: userInfo?.email || "unknown",
            typeOfAction: "Preview",
          });
          router.push("/org/report");
          return; // stop execution after redirect
        } else {
          //@ts-ignore
          await deleteOne(elem.id);
          setIsPlansOpen(true);
          return;
        }
      }
    }

    // if no matching userId, just open the plans
    setIsPlansOpen(true);
  };

  const handleClosePlansDialog = () => {
    setIsPlansOpen(false);
  };

  const sendEmail = async () => {
    try {
      const serviceID = process.env.NEXT_PUBLIC_SERVICEID!;
      const templateID = process.env.NEXT_PUBLIC_TEMPLATEID!;
      const userID = process.env.NEXT_PUBLIC_USERID!;

      //@ts-ignore
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      const templateParams = {
        //@ts-ignore
        to_name: userInfo?.name,
        to_email: userInfo?.email,
        //@ts-ignore
        message: `${userInfo?.name} has successfully subscribed.`,
      };
      // Step 2: Send email from client side
      if (userInfo) {
        const emailResponse = await emailjs.send(
          //@ts-ignore
          serviceID,
          templateID,
          templateParams,
          userID
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("userInfo") || "{}");

      if (result === "SUCCESS" && user?.id && user?.name && user?.email) {
        const now = new Date();
        const oneYearLater = new Date();
        oneYearLater.setFullYear(now.getFullYear() + 1);

        const insertPayment = async () => {
          const res = await insertOne({
            userName: user?.name,
            userId: user?.id,
            userEmail: user?.email,
            //@ts-ignore
            orderId: orderId,
            subscriptionDate: now,
            subscriptionExpirationDate: oneYearLater,
          });
          sendEmail();
          //@ts-ignore
          const result = await insertLog({
            action: "Subscribe",
            createdBy: user.email || "unknown",
            typeOfAction: "Payment",
          });
          localStorage.removeItem("userInfo");
          router.push("/org/report");
          return res;
        };

        insertPayment();
      }
    }
  }, [result, orderId]);

  useEffect(() => {
    const api = async () => {
      const result = await getAll();
      // await deleteOne("6811eb6e7fd27620db5be0d1");
      setSubscribers(result);
    };
    api();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && userInfo?.id) {
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          id: userInfo.id,
          name: userInfo.fullName,
          email: userInfo.email,
        })
      );
    }
  }, [userInfo]);

  return (
    <>
      <article className="helpers-modals-and-charts">
        <ChartsButton
          title="Watch Video Tutorial"
          icon={undefined}
          clickCallback={() => toggleVideoModal(true)}
        />
        <ChartsButton
          title="My Ideas"
          icon={undefined}
          clickCallback={() => toggleIdeasModal(true)}
        />
        {isAdmin && (
          <ChartsButton
            title="Edit video Url"
            icon={<FontAwesomeIcon className="w-7" icon={faEdit} />}
            clickCallback={() => toggleEditVideoModal(true)}
          />
        )}
        {videoPropName === videoPropNamesEnum.roadMap && (
          <>
            {/* Button that triggers the Plans dialog */}
            <ChartsButton
              title="Generate a report"
              icon={undefined}
              clickCallback={handleOpenPlansDialog}
            />

            {/* The Plans Dialog */}
            {isPlansOpen && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                  <Plans
                    isOpen={isPlansOpen}
                    closePlans={handleClosePlansDialog}
                  />
                </div>
              </div>
            )}
          </>
        )}
        {isChartDataLoading && (
          <Spinner
            message="Loading products chart..."
            className="p-5 items-center text-xl"
          />
        )}
        {isNotLoadingWithChartData &&
          (videoPropName === videoPropNamesEnum.marketPotential ||
            videoPropName === videoPropNamesEnum.redOcean ||
            videoPropName === videoPropNamesEnum.blueOcean) &&
          chartProducts.map((product, index) => (
            <div key={index} className="h-[300px]">
              {videoPropName === videoPropNamesEnum.marketPotential && (
                <MarketPotentialProductChart product={product} />
              )}
              {videoPropName === videoPropNamesEnum.redOcean && (
                <RedOceanProductChart product={product} />
              )}
              {videoPropName === videoPropNamesEnum.blueOcean && (
                <BlueOceanProductChart product={product} />
              )}
            </div>
          ))}
        {isNotLoadingWithChartData &&
          videoPropName === videoPropNamesEnum.products && (
            <Chart {...chart} legendToggle />
          )}
        {isNotLoadingWithChartData &&
          videoPropName === videoPropNamesEnum.nonCustomers && (
            <NonCustomersReview userNonCustomers={chartProducts[0]} />
          )}
        {isNotLoadingWithChartData &&
          videoPropName === videoPropNamesEnum.stepUpStepDownModel && (
            <StepUpStepDownCustomersReview
              userAnalysis={chartProducts[0]}
              isLoading={isNotLoadingWithChartData}
            />
          )}
      </article>
      {/* ideas modal */}
      <IdeasModal
        isOpen={isIdeasModalOpen}
        toggle={() => toggleIdeasModal(false)}
        setOpenaiMessage={setOpenaiMessage}
      />
      {/* video modal */}
      <Modal
        config={{
          isShown: isVideoModalOn,
          closeCallback: () => toggleVideoModal(false),
          className:
            "flex flex-col w-[90%] lg:w-2/3 max-w-[1320px] h-[90%] max-h-[600px] rounded-xl overflow-hidden ",
        }}
      >
        <Video videoPropName={videoPropName} />
        <div className="flex justify-center p-5 bg-black">
          <button
            className="btn-diff bg-gray-100 hover:bg-gray-300 text-dark-400"
            onClick={() => toggleVideoModal(false)}
          >
            close
          </button>
        </div>
      </Modal>
      {/* video url form modal */}
      <Modal
        config={{
          isShown: isEditUrlModalOn,
          closeCallback: () => toggleEditVideoModal(false),
          className:
            "flex flex-col lg:w-1/3 max-w-[1320px] rounded-xl overflow-hidden p-5 lg:p-10",
        }}
      >
        <SharedVideoForm
          toggleEditVideoModal={() => toggleEditVideoModal(false)}
          videoPropName={videoPropName}
          videoLabel={videoLabel}
        />
      </Modal>
    </>
  );
};

export default ChartsContent;
