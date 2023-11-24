import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import * as productsApi from "../../http-client/products.client";
import { useQuery } from "@tanstack/react-query";
import { stepNamesEnum, videoPropNamesEnum } from "../../models/enums";
import { ICompetitor, IProduct } from "../../models/types";
import { IUserProduct } from "../../models/user-product";

import ActionsNavbar from "../../components/common/actions-navbar";
import StepsNavbar from "../../components/common/steps-navbar";
import MarketPotentialContent from "../../components/market-potential/market-potential-content";
import ChartsContent from "../../components/common/charts-content";

import * as _ from "lodash";

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
    const [userProducts, setUserProducts] =
        useState<IUserProduct>(emptyUserProduct);
    const [chartProducts, setChartProducts] = useState<IProduct[]>([]);

    const { data: fetchedUserProducts, isLoading: areProductsLoading } =
        useQuery<IUserProduct>({
            queryKey: [productsApi.Keys.All],
            queryFn: productsApi.getAll,
            refetchOnWindowFocus: false,
            enabled: !!session?.user?.id,
        });

    useEffect(() => {
        userProducts?.products?.forEach(prod => {
            if (
                !prod.competitors ||
                (prod.competitors && prod.competitors.length === 0)
            ) {
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
    }, [fetchedUserProducts, userProducts?.products]);

    return (
        <div className="content-container">
            <header className="left-side-main-navigation">
                <ActionsNavbar
                    selectedStepTitle={stepNamesEnum.marketPotential}
                />
            </header>
            <main className="right-side-step-content">
                <nav className="top-navigation">
                    <StepsNavbar
                        selectedNodeTitle={stepNamesEnum.marketPotential}
                    />
                </nav>
                <article className="main-content">
                    <article className="forms-container">
                        <MarketPotentialContent
                            userProduct={userProducts}
                            isLoading={areProductsLoading}
                            setChartProducts={setChartProducts}
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
            </main>
        </div>
    );
};
{
    /* <div className='w-1/2'>
							<div className='flex flex-wrap justify-start items-center gap-4 pl-10 py-5 mx-auto'>
								<ConsultantReview
									pageTitle={"Market potential"}></ConsultantReview>
								{(session?.user as any)?.role === "admin" && (
									<button
										className='p-3 rounded inline-flex gap-5 items-center btn text-black-eerie hover:text-blue-ncs w-max'
										onClick={() => toggleEditVideoModal(true)}>
										<span>Edit video Url</span>
										<FontAwesomeIcon className='w-7' icon={faEdit} />
									</button>
								)}
								<button
									className='p-3 rounded inline-flex gap-5 items-center btn text-black-eerie hover:text-blue-ncs w-max'
									onClick={() => toggleVideoModal(true)}>
									<span>Watch Video Tutorial</span>
									<FontAwesomeIcon className='w-7' icon={faEye} />
								</button>
							</div>
						</div> */
}
export default Competitors;
