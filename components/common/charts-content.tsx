import { Dispatch, SetStateAction, useEffect } from "react";
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
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { createSession, checkStatus } from "../../http-client/payments";
import { useRouter } from "next/router";

interface Props {
  videoPropName: videoPropNamesEnum;
  videoLabel: string;
  chartProducts: any[];
  isChartDataLoading?: boolean;
  setOpenaiMessage: Dispatch<SetStateAction<string>>;
}

declare global {
  interface Window {
    Checkout: any;
  }
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
  console.log(session);

  const [isIdeasModalOpen, toggleIdeasModal] = useModalToggler();
  const [isVideoModalOn, toggleVideoModal] = useModalToggler(false);
  const [isEditUrlModalOn, toggleEditVideoModal] = useModalToggler();

  const [chart] = useFuturesChart(chartProducts);

  // UI checks
  const isAdmin = session?.user?.role === "admin";
  const isNotLoadingWithChartData =
    !isChartDataLoading && chartProducts.length > 0;

  const successPayment = async () => {
    const uniqueId = {
      id: uuidv4(),
    };
    const result = await createSession(uniqueId);
    return result.session.id;
  };

  const handlePaymentPage = async () => {
    const sessionId = await successPayment();
    await initializeScript();
    try {
      if (typeof window !== "undefined" && window.Checkout) {
        const checkoutInstance = window.Checkout;

        checkoutInstance.configure({
          session: {
            id: sessionId,
          },
        });

        checkoutInstance.showPaymentPage();
      } else {
        console.error("Checkout is not available.");
        alert("Payment service is unavailable. Please try again later.");
      }
    } catch (error) {
      console.error("Error in handlePaymentPage:", error);
      alert("Failed to initiate payment. Please try again.");
    }
  };

  const initializeScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src =
        "https://mepspay.gateway.mastercard.com/static/checkout/checkout.min.js";

      script.onload = () => {
        console.log(script);
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    if (result === "SUCCESS" && orderId) {
      const res = async () => {
        const result = await checkStatus(orderId);
      };
      res();
    }

    if (result === "CANCELLED") {
    }
  }, [result, orderId]);
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
            {/* <Link
              href=""
              onClick={handlePaymentPage}
              className="btn-primary-light text-center text-white hover:text-white"
            >
              Generate Report
            </Link> */}
            <Plans></Plans>
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
