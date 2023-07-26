import { useEffect, useState } from "react";
import GoalsReport from "../../components/report/goals";
import MarketPotentialReport from "../../components/report/market-potential";
import PioneerMigratorSettlerReport from "../../components/report/pioneer-migrator-settler";
import { IUserProduct } from "../../models/user-product";
import * as clientApi from "../../http-client/products.client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import RedOceanReport from "../../components/report/red-ocean";
import BlueOceanReport from "../../components/report/blue-ocean";
import DisruptionReport from "../../components/report/disruption";

const Report = () => {
	const { data: session }: any = useSession();

	// const emptyUserProduct = {
	// 	id: "",
	// 	userId: session?.user?.id,
	// 	products: [],
	// } as IUserProduct;

	const [userProduct, setUserProduct] = useState<IUserProduct>();

	const { data, isLoading } = useQuery<IUserProduct>({
		queryKey: [clientApi.Keys.UserProduct, userProduct?.id],
		queryFn: clientApi.getAll,
		refetchOnWindowFocus: false,
		enabled: !!session?.user?.id,
	});

	useEffect(() => {
		if (data) {
			setUserProduct(data);
		}
	}, [data]);

	return (
		<div className='py-10 text-dark-400'>
			<div className='w-[21cm] mx-auto p-10 border border-gray-100 shadow-lg'>
				<div className='mb-10'>
					<h1 className='text-5xl font-hero-bold'>Report</h1>
				</div>
				<section className='flex flex-col gap-10 min-h-[29.7cm]'>
					<GoalsReport />
					<PioneerMigratorSettlerReport
						userProduct={userProduct}
						isLoading={isLoading}
					/>
					<MarketPotentialReport
						userProduct={userProduct}
						isLoading={isLoading}
					/>
					<RedOceanReport
						userProduct={userProduct}
						isLoading={isLoading}
					/>
					<BlueOceanReport
						userProduct={userProduct}
						isLoading={isLoading}
					/>
					<DisruptionReport />
				</section>
			</div>
		</div>
	);
};

export default Report;
