import { useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";

import * as clientApi from "../../http-client/products.client";
import { useQuery } from "@tanstack/react-query";
import { IUserProduct } from "../../models/user-product";
import { stepNamesEnum, videoPropNamesEnum } from "../../models/enums";
import { IFactor, IProduct } from "../../models/types";

import ActionsNavbar from "../../components/common/actions-navbar";
import StepsNavbar from "../../components/common/steps-navbar";
import RedOceanContent from "../../components/red-ocean/red-ocean-content";
import ChartsContent from "../../components/common/charts-content";

const RedOceanCanvas = () => {
    const { data: session }: any = useSession();

    const emptyFactor = useMemo(() => {
        return {
            name: "",
            competitors: [],
        } as IFactor;
    }, []);

    const emptyUserProduct = useMemo(() => {
        return {
            id: "",
            userId: session?.user?.id,
            products: [],
        } as IUserProduct;
    }, [session?.user?.id]);

    const [userProducts, setUserProducts] =
        useState<IUserProduct>(emptyUserProduct);

    const [chartProducts, setChartProducts] = useState<IProduct[]>([]);

    const { data: fetchedUserProducts, isLoading: areUserProductsLoading } =
        useQuery<IUserProduct>({
            queryKey: [clientApi.Keys.All],
            queryFn: clientApi.getAll,
            refetchOnWindowFocus: false,
            enabled: !!session?.user?.id,
        });

    useEffect(() => {
        fetchedUserProducts?.products?.forEach(prod => {
            emptyFactor.competitors =
                prod.competitors?.map(comp => {
                    return {
                        uuid: comp.uuid,
                        value: 1,
                    };
                }) ?? [];
            if (!prod.factors?.length) {
                prod.factors = [
                    { ...emptyFactor, name: "" },
                    { ...emptyFactor, name: "" },
                    { ...emptyFactor, name: "" },
                ];
            } else {
                prod.factors.forEach(factor => {
                    const existingCompetitorUuids = new Set(
                        factor.competitors.map(c => c.uuid)
                    );

                    const newfactorCompetitors = prod.competitors
                        ?.filter(
                            comp => !existingCompetitorUuids.has(comp.uuid)
                        )
                        .map(comp => {
                            return {
                                uuid: comp.uuid,
                                value: 1,
                            };
                        });

                    if (newfactorCompetitors?.length) {
                        // Add competitors that exist in prod.competitors but not in factor.competitors
                        factor.competitors =
                            factor.competitors.concat(newfactorCompetitors);
                    }

                    // Remove competitors that exist in factor.competitors but not in prod.competitors
                    factor.competitors = factor.competitors.filter(comp =>
                        prod.competitors?.some(c => c.uuid === comp.uuid)
                    );
                });
            }
        });
        if (fetchedUserProducts) {
            setUserProducts(fetchedUserProducts);
        }
        setUserProducts(fetchedUserProducts ?? emptyUserProduct);
    }, [fetchedUserProducts]);

    return (
        <div className="content-container">
            <header className="left-side-main-navigation">
                <ActionsNavbar
                    selectedStepTitle={stepNamesEnum.redOceanCanvas}
                />
            </header>
            <main className="right-side-step-content">
                <nav className="top-navigation">
                    <StepsNavbar
                        selectedNodeTitle={stepNamesEnum.redOceanCanvas}
                    />
                </nav>
                <article className="main-content">
                    <article className="forms-container">
                        <RedOceanContent
                            userProduct={userProducts}
                            dispatchChartProducts={products => {
                                setChartProducts(products);
                            }}
                            isLoading={areUserProductsLoading}
                        />
                    </article>
                    <aside className="aside-content">
                        <ChartsContent
                            videoPropName={videoPropNamesEnum.redOcean}
                            videoLabel="Red Ocean Video"
                            chartProducts={chartProducts}
                            isChartDataLoading={areUserProductsLoading}
                        />
                    </aside>
                </article>
            </main>
        </div>
    );
};

export default RedOceanCanvas;
