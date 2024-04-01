import { useState, useEffect, useMemo, useContext } from "react";
import { useSession } from "next-auth/react";

import * as clientApi from "../../http-client/products.client";
import { useQuery } from "@tanstack/react-query";
import { IUserProduct } from "../../models/user-product";
import { stepNamesEnum, videoPropNamesEnum } from "../../models/enums";
import { IFactor, IProduct } from "../../models/types";
import { appContextData } from "../../context";

import RedOceanContent from "../../components/red-ocean/red-ocean-content";
import ChartsContent from "../../components/common/charts-content";
import { stepFourTranscript } from "../../components/common/openai-chat/openai-transcript";
import { getRedOceanMessage } from "../../components/common/openai-chat/custom-messages";
import Chat from "../../components/common/openai-chat";

const RedOceanCanvas = () => {
  const { data: session }: any = useSession();

  const { setAppContext } = useContext(appContextData);
  useEffect(() => {
    setAppContext((prev) => ({ ...prev, activeStep: stepNamesEnum.redOceanCanvas }));
  }, []);

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

  const [userProducts, setUserProducts] = useState<IUserProduct>(emptyUserProduct);
  const [chartProducts, setChartProducts] = useState<IProduct[]>([]);
  const [openaiMessage, setOpenaiMessage] = useState(``);

  const {
    data: fetchedUserProducts,
    isLoading: areUserProductsLoading,
    status,
  } = useQuery<IUserProduct>({
    queryKey: [clientApi.Keys.All, session?.user?.id],
    queryFn: clientApi.getAll,
    refetchOnWindowFocus: false,
    enabled: !!session?.user?.id,
  });

  useEffect(() => {
    if (status === "success") {
      fetchedUserProducts?.products?.forEach((prod) => {
        emptyFactor.competitors =
          prod.competitors?.map((comp) => {
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
          prod.factors.forEach((factor) => {
            const existingCompetitorUuids = new Set(factor.competitors.map((c) => c.uuid));

            const newfactorCompetitors = prod.competitors
              ?.filter((comp) => !existingCompetitorUuids.has(comp.uuid))
              .map((comp) => {
                return {
                  uuid: comp.uuid,
                  value: 1,
                };
              });

            if (newfactorCompetitors?.length) {
              // Add competitors that exist in prod.competitors but not in factor.competitors
              factor.competitors = factor.competitors.concat(newfactorCompetitors);
            }

            // Remove competitors that exist in factor.competitors but not in prod.competitors
            factor.competitors = factor.competitors.filter((comp) =>
              prod.competitors?.some((c) => c.uuid === comp.uuid)
            );
          });
        }
      });
      if (fetchedUserProducts) {
        setUserProducts(fetchedUserProducts ?? emptyUserProduct);
      }
      setOpenaiMessage(`${stepFourTranscript}\n\n${getRedOceanMessage(fetchedUserProducts)}`);
    }
  }, [status]);

  return (
    <>
      <article className="main-content">
        <article className="forms-container">
          <RedOceanContent
            userProducts={userProducts}
            dispatchChartProducts={(products) => {
              setChartProducts(products);
            }}
            isLoading={areUserProductsLoading}
            setOpenaiMessage={setOpenaiMessage}
          />
        </article>
        <aside className="aside-content">
          <ChartsContent
            videoPropName={videoPropNamesEnum.redOcean}
            videoLabel="Red Ocean Video"
            chartProducts={chartProducts}
            isChartDataLoading={areUserProductsLoading}
            setOpenaiMessage={setOpenaiMessage}
          />
        </aside>
      </article>
      <Chat initialMessage={openaiMessage}></Chat>
    </>
  );
};

export default RedOceanCanvas;
