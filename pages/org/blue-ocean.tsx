import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";

import * as productsApi from "../../http-client/products.client";
import { useQuery } from "@tanstack/react-query";
import { IUserProduct } from "../../models/user-product";
import { IIdeaFactor, IProduct } from "../../models/types";
import { stepNamesEnum, videoPropNamesEnum } from "../../models/enums";

import useModalToggler from "../../hooks/use-modal-toggler";
import ActionsNavbar from "../../components/common/actions-navbar";
import StepsNavbar from "../../components/common/steps-navbar";
import BlueOceanContent from "../../components/blue-ocean/blue-ocean-content";
import ChartsContent from "../../components/common/charts-content";
import BlueOceanProductChart from "../../components/blue-ocean/product-chart";
import Spinner from "../../components/common/spinner";
import Video from "../../components/disruption/video";
import SharedVideoForm from "../../components/disruption/shared-video-form";
import Modal from "../../components/common/modal";
import IdeasModal from "../../components/app/ideas-modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const BlueOceanCanvas = () => {
    const { data: session }: any = useSession();

    const emptyFactor = useMemo(() => {
        return {
            name: "",
            competitors: [],
        } as IIdeaFactor;
    }, []);

    const emptyUserProduct = useMemo(() => {
        return {
            id: "",
            userId: session?.user?.id,
            products: [],
        } as IUserProduct;
    }, [session?.user?.id]);

    const [userProduct, setUserProduct] =
        useState<IUserProduct>(emptyUserProduct);

    const [chartProducts, setChartProducts] = useState<IProduct[]>([]);

    const { data: products, isLoading: areProductsLoading } =
        useQuery<IUserProduct>({
            queryKey: [productsApi.Keys.All],
            queryFn: productsApi.getAll,
            refetchOnWindowFocus: false,
            enabled: !!session?.user?.id,
        });

    useEffect(() => {
        products?.products?.forEach(prod => {
            emptyFactor.competitors =
                prod.competitors?.map(comp => {
                    return {
                        uuid: comp.uuid,
                        value: 1,
                    };
                }) ?? [];
            if (!prod.ideaFactors?.length) {
                prod.ideaFactors = [
                    { ...emptyFactor, name: "" },
                    { ...emptyFactor, name: "" },
                    { ...emptyFactor, name: "" },
                ];
            } else {
                prod.ideaFactors.forEach(ideaFactor => {
                    const existingCompetitorUuids = new Set(
                        ideaFactor.competitors.map(c => c.uuid)
                    );

                    const newIdeaFactorCompetitors = prod.competitors
                        ?.filter(
                            comp => !existingCompetitorUuids.has(comp.uuid)
                        )
                        .map(comp => {
                            return {
                                uuid: comp.uuid,
                                value: 1,
                            };
                        });

                    if (newIdeaFactorCompetitors?.length) {
                        // Add competitors that exist in prod.competitors but not in ideaFactor.competitors
                        ideaFactor.competitors = ideaFactor.competitors.concat(
                            newIdeaFactorCompetitors
                        );
                    }

                    // Remove competitors that exist in ideaFactor.competitors but not in prod.competitors
                    ideaFactor.competitors = ideaFactor.competitors.filter(
                        comp =>
                            prod.competitors?.some(c => c.uuid === comp.uuid)
                    );
                });
            }
        });
        if (products) {
            setUserProduct(products);
        }
        setUserProduct(products ?? emptyUserProduct);
    }, [products, emptyUserProduct, emptyFactor, setUserProduct]);

    return (
        <>
            <div className="px-16 py-24 bg-gray-100">
                <div className="flex flex-row flex-wrap justify-center gap-16">
                    <ActionsNavbar
                        selectedStepTitle={stepNamesEnum.blueOceanCanvas}
                    />
                    <div className="grow flex flex-col justify-start gap-8">
                        <StepsNavbar
                            selectedNodeTitle={stepNamesEnum.blueOceanCanvas}
                        />
                        <div className="flex flex-row flex-wrap justify-center gap-8">
                            <BlueOceanContent
                                userProduct={userProduct}
                                dispatchProducts={products => {
                                    setChartProducts(products);
                                }}
                                isLoading={areProductsLoading}
                            />

                            <ChartsContent
                                videoPropName={videoPropNamesEnum.blueOcean}
                                videoLabel="Blue Ocean Video"
                                chartProducts={chartProducts}
                                isChartDataLoading={areProductsLoading}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlueOceanCanvas;
