import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import * as productsApi from "../../http-client/products.client";
import { useQuery } from "@tanstack/react-query";
import { IUserProduct } from "../../models/user-product";
import { stepNamesEnum, videoPropNamesEnum } from "../../models/enums";
import { IProduct } from "../../models/types";

import ProductsContent from "../../components/products/products-content";
import ChartsContent from "../../components/common/charts-content";

const emptyUserProducts = {
    id: "",
    userId: "",
    products: [],
} as IUserProduct;

const Products = () => {
    const { data: session }: any = useSession();

    emptyUserProducts.userId = session?.user?.id;
    const [userProducts, setUserProducts] = useState<IUserProduct>(emptyUserProducts);
    const [chartProducts, setChartProducts] = useState<IProduct[]>([]);

    const { data: fetchedUserProducts, isLoading: areUserProductsLoading } = useQuery({
        queryKey: [productsApi.Keys.UserProduct, userProducts.id],
        queryFn: productsApi.getAll,
        refetchOnWindowFocus: false,
        enabled: !!session?.user?.id,
    });

    useEffect(() => {
        if (fetchedUserProducts) setUserProducts(fetchedUserProducts);
    }, [fetchedUserProducts]);

    return (
        <article className="main-content">
            <article className="forms-container">
                <ProductsContent
                    userProduct={userProducts}
                    isLoading={areUserProductsLoading}
                    fetchedUserProducts={fetchedUserProducts}
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
    );
};

Products.stepTitle = stepNamesEnum.pioneerMigratorSettler;

export default Products;
