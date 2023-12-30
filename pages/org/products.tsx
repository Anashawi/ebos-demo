import { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import * as productsApi from "../../http-client/products.client";
import { useQuery } from "@tanstack/react-query";
import { IUserProduct } from "../../models/user-product";
import { stepNamesEnum, videoPropNamesEnum } from "../../models/enums";
import { IProduct } from "../../models/types";
import { appContextData } from "../../context";

import ProductsContent from "../../components/products/products-content";
import ChartsContent from "../../components/common/charts-content";
import { stepTwoTranscript } from "../../components/common/openai-chat/openai-transcript";
import { getCompanyProductMessage } from "../../components/common/openai-chat/custom-messages";
import Chat from "../../components/common/openai-chat/";

const emptyUserProducts = {
  id: "",
  userId: "",
  products: [],
} as IUserProduct;

const Products = () => {
  const { data: session }: any = useSession();

  const { appContext, setAppContext } = useContext(appContextData);
  useEffect(() => setAppContext({ ...appContext, activeStep: stepNamesEnum.pioneerMigratorSettler }), []);

  emptyUserProducts.userId = session?.user?.id;
  const [userProducts, setUserProducts] = useState<IUserProduct>(emptyUserProducts);
  const [chartProducts, setChartProducts] = useState<IProduct[]>([]);
  const [chatGPTMessage, setChatGPTMessage] = useState<string>("");

  const {
    data: fetchedUserProducts,
    isLoading: areUserProductsLoading,
    status: fetchingProdsStatus,
  } = useQuery({
    queryKey: [productsApi.Keys.UserProduct, userProducts.id],
    queryFn: productsApi.getAll,
    refetchOnWindowFocus: false,
    enabled: !!session?.user?.id,
  });

  useEffect(() => {
    if (fetchingProdsStatus === "success") {
      if (fetchedUserProducts) setUserProducts(fetchedUserProducts);
      setChatGPTMessage(`${stepTwoTranscript}\n\n${getCompanyProductMessage(fetchedUserProducts)}`);
    }
  }, [fetchingProdsStatus]);

  return (
    <>
      <article className="main-content">
        <article className="forms-container">
          <ProductsContent
            userProduct={userProducts}
            isLoading={areUserProductsLoading}
            setChatGPTMessage={setChatGPTMessage}
            dispatchChartProducts={setChartProducts}
          />
        </article>
        <aside className="aside-content">
          <ChartsContent
            videoPropName={videoPropNamesEnum.products}
            videoLabel="Products Video"
            chartProducts={chartProducts}
            isChartDataLoading={areUserProductsLoading}
          />
        </aside>
      </article>
      <Chat initialMessage={chatGPTMessage}></Chat>
    </>
  );
};

export default Products;
