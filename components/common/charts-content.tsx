import { useSession } from "next-auth/react";

import { videoPropNamesEnum } from "../../models/enums";

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

interface Props {
    videoPropName: videoPropNamesEnum;
    videoLabel: string;
    chartProducts: any[];
    isChartDataLoading?: boolean;
}

const ChartsContent = ({
    videoPropName,
    videoLabel,
    chartProducts,
    isChartDataLoading,
}: Props) => {
    const { data: session }: any = useSession();

    const [isIdeasModalOpen, toggleIdeasModal] = useModalToggler();
    const [isVideoModalOn, toggleVideoModal] = useModalToggler(false);
    const [isEditUrlModalOn, toggleEditVideoModal] = useModalToggler();

    const [chart] = useFuturesChart(chartProducts);

    // UI checks
    const isAdmin = session?.user?.role === "admin";
    const isNotLoadingWithChartData =
        !isChartDataLoading && chartProducts.length > 0;

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
                    <Link
                        href="/org/report"
                        className="btn-primary-light text-center text-white hover:text-white"
                    >
                        Generate Report
                    </Link>
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
                            {videoPropName ===
                                videoPropNamesEnum.marketPotential && (
                                <MarketPotentialProductChart
                                    product={product}
                                />
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
                        <NonCustomersReview
                            userNonCustomers={chartProducts[0]}
                        />
                    )}
                {isNotLoadingWithChartData &&
                    videoPropName ===
                        videoPropNamesEnum.stepUpStepDownModel && (
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
