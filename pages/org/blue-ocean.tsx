import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";

import * as productsApi from "../../http-client/products.client";
import { useQuery } from "@tanstack/react-query";
import { IUserProduct } from "../../models/user-product";
import { IIdeaFactor, IProduct } from "../../models/types";
import { stepNamesEnum, videoPropNamesEnum } from "../../models/enums";

import ActionsNavbar from "../../components/common/actions-navbar";
import StepsNavbar from "../../components/common/steps-navbar";
import BlueOceanContent from "../../components/blue-ocean/blue-ocean-content";
import ChartsContent from "../../components/common/charts-content";

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
        <div className="min-w-[1366px] min-h-[100vh] flex flex-row justify-center gap-16 px-8 py-16 bg-gray-100">
            <div className="md:max-w-[100px] flex flex-col px-4 py-8 bg-white rounded-full">
                <ActionsNavbar
                    selectedStepTitle={stepNamesEnum.blueOceanCanvas}
                />
            </div>
            <div className="grow flex flex-col justify-start gap-8">
                <StepsNavbar
                    selectedNodeTitle={stepNamesEnum.blueOceanCanvas}
                />
                <div className="flex flex-row justify-center gap-8">
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
    );
};

export default BlueOceanCanvas;
