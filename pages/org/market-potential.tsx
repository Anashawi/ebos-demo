import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import * as productsApi from "../../http-client/products.client";
import { useQuery } from "@tanstack/react-query";
import { stepNamesEnum, videoPropNamesEnum } from "../../models/enums";
import { ICompetitor, IProduct } from "../../models/types";
import { IUserProduct } from "../../models/user-product";

import MarketPotentialContent from "../../components/market-potential/market-potential-content";
import ChartsContent from "../../components/common/charts-content";

import * as _ from "lodash";
import Chat from "../../components/common/openai-chat";
import { stepThreeTranscript } from "../../components/common/openai-chat/openai-transcript";
import { getMarketPotentialMessage } from "../../components/common/openai-chat/custom-messages";

const emptyUserProduct = {
    id: "",
    userId: "",
    products: [],
} as IUserProduct;

const Competitors = () => {
    const { data: session }: any = useSession();

    const emptyCompetitor = () => {
        const uuid = crypto.randomUUID();
        return {
            uuid: uuid,
            name: "",
            marketShare: 0,
        } as ICompetitor;
    };

    emptyUserProduct.userId = session?.user?.id;
    const [userProducts, setUserProducts] = useState<IUserProduct>(emptyUserProduct);
    const [chartProducts, setChartProducts] = useState<IProduct[]>([]);
    const [chatGPTMessage, setChatGPTMessage] = useState<string>("");

    const {
        data: fetchedUserProducts,
        isLoading: areProductsLoading,
        status: fetchingProdsStatus,
    } = useQuery<IUserProduct>({
        queryKey: [productsApi.Keys.All],
        queryFn: productsApi.getAll,
        refetchOnWindowFocus: false,
        enabled: !!session?.user?.id,
    });

    useEffect(() => {
        if (fetchingProdsStatus === "success") {
            userProducts?.products?.forEach(prod => {
                if (!prod.competitors || (prod.competitors && prod.competitors.length === 0)) {
                    prod.competitors = [
                        { ...emptyCompetitor(), name: "Me" },
                        { ...emptyCompetitor(), name: "", isUntapped: true },
                        { ...emptyCompetitor(), name: "" },
                    ];
                }
            });
            if (fetchedUserProducts) {
                setUserProducts(fetchedUserProducts);
            }
            setChartProducts(fetchedUserProducts?.products || []);
            setChatGPTMessage(`${stepThreeTranscript}\n\n${getMarketPotentialMessage(fetchedUserProducts)}`);
        }
    }, [fetchingProdsStatus]);

    return (
        <>
            <article className="main-content">
                <article className="forms-container">
                    <MarketPotentialContent
                        userProduct={userProducts}
                        isLoading={areProductsLoading}
                        setChartProducts={setChartProducts}
                        setChatGPTMessage={setChatGPTMessage}
                    />
                </article>
                <aside className="aside-content">
                    <ChartsContent
                        videoPropName={videoPropNamesEnum.marketPotential}
                        videoLabel="Market Potential Video"
                        chartProducts={chartProducts}
                    />
                </aside>
            </article>
            <Chat initialMessage={chatGPTMessage}></Chat>
        </>
    );
};

Competitors.stepTitle = stepNamesEnum.marketPotential;

export default Competitors;
