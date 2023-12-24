import { useContext, useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";

import * as productsApi from "../../http-client/products.client";
import { useQuery } from "@tanstack/react-query";
import { IUserProduct } from "../../models/user-product";
import { IIdeaFactor, IProduct } from "../../models/types";
import { stepNamesEnum, videoPropNamesEnum } from "../../models/enums";
import { appContextData } from "../../context";

import BlueOceanContent from "../../components/blue-ocean/blue-ocean-content";
import ChartsContent from "../../components/common/charts-content";
import { stepSevenTranscript } from "../../components/common/openai-chat/openai-transcript";
import { getBlueOceanMessage } from "../../components/common/openai-chat/custom-messages";
import Chat from "../../components/common/openai-chat";

const BlueOceanCanvas = () => {
  const { data: session }: any = useSession();

  const { appContext, setAppContext } = useContext(appContextData);
  useEffect(() => setAppContext({ ...appContext, activeStep: stepNamesEnum.blueOceanCanvas }), []);

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

  const [userProduct, setUserProduct] = useState<IUserProduct>(emptyUserProduct);
  const [chartProducts, setChartProducts] = useState<IProduct[]>([]);
  const [chatGPTMessage, setChatGPTMessage] = useState<string>("");

  const {
    data: fetchedProducts,
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
      fetchedProducts?.products?.forEach(prod => {
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
            const existingCompetitorUuids = new Set(ideaFactor.competitors.map(c => c.uuid));

            const newIdeaFactorCompetitors = prod.competitors
              ?.filter(comp => !existingCompetitorUuids.has(comp.uuid))
              .map(comp => {
                return {
                  uuid: comp.uuid,
                  value: 1,
                };
              });

            if (newIdeaFactorCompetitors?.length) {
              // Add competitors that exist in prod.competitors but not in ideaFactor.competitors
              ideaFactor.competitors = ideaFactor.competitors.concat(newIdeaFactorCompetitors);
            }

            // Remove competitors that exist in ideaFactor.competitors but not in prod.competitors
            ideaFactor.competitors = ideaFactor.competitors.filter(comp =>
              prod.competitors?.some(c => c.uuid === comp.uuid)
            );
          });
        }
      });
      if (fetchedProducts) {
        setUserProduct(fetchedProducts ?? emptyUserProduct);
      }
      setChatGPTMessage(`${stepSevenTranscript}\n\n${getBlueOceanMessage(fetchedProducts)}`);
    }
  }, [fetchingProdsStatus]);

  return (
    <>
      <article className="main-content">
        <article className="forms-container">
          <BlueOceanContent
            userProduct={userProduct}
            dispatchProducts={products => {
              setChartProducts(products);
            }}
            isLoading={areProductsLoading}
            setChatGPTMessage={setChatGPTMessage}
          />
        </article>
        <aside className="aside-content">
          <ChartsContent
            videoPropName={videoPropNamesEnum.blueOcean}
            videoLabel="Blue Ocean Video"
            chartProducts={chartProducts}
            isChartDataLoading={areProductsLoading}
          />
        </aside>
      </article>
      <Chat initialMessage={chatGPTMessage}></Chat>
    </>
  );
};

export default BlueOceanCanvas;
