import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import * as productsClientApi from "../../http-client/products.client";
import { useQuery } from "@tanstack/react-query";
import { IUserProduct } from "../../models/user-product";
import { stepNamesEnum, videoPropNamesEnum } from "../../models/enums";
import { IProduct } from "../../models/types";

import ProductsContent from "../../components/products/products-content";
import ChartsContent from "../../components/common/charts-content";

const Products = () => {
    const { data: session }: any = useSession();

    // loading/setting user products
    const emptyUserProduct = {
        id: "",
        userId: session?.user?.id,
        products: [],
    } as IUserProduct;
    const [userProducts, setUserProducts] =
        useState<IUserProduct>(emptyUserProduct);

    const { data: fetchedUserProducts, isLoading: isUserProductsLoading } =
        useQuery<IUserProduct>({
            queryKey: [productsClientApi.Keys.UserProduct, userProducts.id],
            queryFn: productsClientApi.getAll,
            refetchOnWindowFocus: false,
            enabled: !!session?.user?.id,
        });

    useEffect(() => {
        if (fetchedUserProducts) {
            setUserProducts(fetchedUserProducts);
        }
    }, [fetchedUserProducts]);

    const [chartProducts, setChartProducts] = useState<IProduct[]>([]);

    return (
        <article className="main-content">
            <article className="forms-container">
                <ProductsContent
                    userProduct={userProducts}
                    isLoading={isUserProductsLoading}
                    dispatchChartProducts={setChartProducts}
                />
            </article>
            <aside className="aside-content">
                <ChartsContent
                    videoPropName={videoPropNamesEnum.products}
                    videoLabel="Products Video"
                    chartProducts={chartProducts}
                    isChartDataLoading={isUserProductsLoading}
                />
            </aside>
        </article>
    );
};

Products.stepTitle = stepNamesEnum.pioneerMigratorSettler;

export default Products;
