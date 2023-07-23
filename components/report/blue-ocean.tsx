import { Fragment } from "react";
import { IUserProduct } from "../../models/user-product";
import Spinner from "../common/spinner";
import RedOceanProductChart from "../red-ocean/product-chart";
import { IFactorCompetitor } from "../../models/types";

interface Props {
	userProduct?: IUserProduct;
	isLoading: boolean;
}
const BlueOceanReport = ({ userProduct, isLoading }: Props) => {
	const calcExcellenceLevel = (value: string | number) => {
		if (value == "1") return "Poor";
		if (value == "2") return "Moderate";
		if (value == "3") return "Good";
		if (value == "4") return "Excellent";
	};

	return (
		<div>
			<div className='mb-5'>
				<h2 className='report-header-4 font-hero-bold'>
					Blue Ocean Canvas
				</h2>
			</div>
			<div className='flex gap-5'>
				{isLoading && (
					<Spinner
						message='loading products...'
						className='items-center'
					/>
				)}
			</div>
			<div className='pl-6'>
				<ul className='list-outside'>
					{!isLoading && !userProduct?.products?.length && (
						<p className='text-yellow-600'>No products were added</p>
					)}
					{!isLoading &&
						userProduct?.products?.map((product, productIndex) => (
							<li
								key={product.name + productIndex}
								className='list-decimal p-3'>
								<p className='report-header-3 font-hero-semibold mr-3 mb-3 py-5'>
									{product.name}
								</p>
								<div className='relative h-[300px] mb-10'>
									<RedOceanProductChart
										product={product}
										customOptions={{
											backgroundColor: "#f8fafc",
											titleTextStyle: {
												fontSize: 13, // Don't specify px
											},
											legend: {
												position: "right",
												alignment: "start",
												textStyle: {
													fontSize: 13,
												},
											},
										}}
									/>
									<div className='absolute inset-0'></div>
								</div>
								<table className='table-auto w-full border'>
									<thead>
										<tr className='bg-slate-50'>
											<th className='p-3 border'>ideaFactor</th>
											{product.ideaFactors?.length &&
												product.ideaFactors[0]?.competitors
													?.filter(
														(c) =>
															!product.competitors?.find(
																(pc) => pc.uuid === c.uuid
															)?.isUntapped
													)
													?.map((competitor) => (
														<Fragment key={competitor.uuid}>
															{
																<th className='p-3 border'>
																	{
																		product.competitors?.find(
																			(comp) =>
																				comp.uuid ===
																				competitor.uuid
																		)?.name
																	}
																</th>
															}
														</Fragment>
													))}
										</tr>
									</thead>
									<tbody>
										{product.ideaFactors?.map(
											(ideaFactor, ideaFactorIndex) => (
												<tr
													key={ideaFactorIndex}
													className='even:bg-slate-50'>
													<td className='p-3 border'>
														{ideaFactor.name}
													</td>
													{ideaFactor.competitors
														?.filter(
															(c) =>
																!product.competitors?.find(
																	(pc) => pc.uuid == c.uuid
																)?.isUntapped
														)
														?.map((comp: IFactorCompetitor) => (
															<td
																key={comp.uuid}
																className='p-3 border'>
																<>{console.log("comp", comp)}</>
																{calcExcellenceLevel(
																	comp.value
																)}
															</td>
														))}
												</tr>
											)
										)}
									</tbody>
								</table>
							</li>
						))}
				</ul>
			</div>
		</div>
	);
};

export default BlueOceanReport;
