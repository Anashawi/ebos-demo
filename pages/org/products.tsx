import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import * as productsClientApi from "../../http-client/products.client";
import { useQuery } from "@tanstack/react-query";
import { IUserProduct } from "../../models/user-product";
import { stepNamesEnum, videoPropNamesEnum } from "../../models/enums";
import { IProduct } from "../../models/types";

import ActionsNavbar from "../../components/common/actions-navbar";
import StepsNavbar from "../../components/common/steps-navbar";
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
        <div className="min-w-[1366px] min-h-[100vh] flex flex-row justify-center gap-16 px-8 py-16 bg-gray-100">
            <div className="md:max-w-[100px] min-h-[84vh] flex flex-col justify-between px-4 py-8 bg-white rounded-full">
                <ActionsNavbar
                    selectedStepTitle={stepNamesEnum.pioneerMigratorSettler}
                />
            </div>
            <div className="grow flex flex-col justify-start gap-8">
                <StepsNavbar
                    selectedNodeTitle={stepNamesEnum.pioneerMigratorSettler}
                />
                <div className="flex flex-row justify-center gap-4">
                    <ProductsContent
                        userProduct={userProducts}
                        isLoading={isUserProductsLoading}
                        dispatchChartProducts={setChartProducts}
                    />
                    <ChartsContent
                        videoPropName={videoPropNamesEnum.products}
                        videoLabel="Products Video"
                        chartProducts={chartProducts}
                        isChartDataLoading={isUserProductsLoading}
                    />
                </div>
            </div>
        </div>
    );
};

export default Products;
