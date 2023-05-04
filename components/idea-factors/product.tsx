import { faTrash, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FieldArray, Field, ErrorMessage } from "formik";
import Chart from "react-google-charts";
import { useMemo } from "react";
import { ICompetitor, IProduct } from "../../models/types";
import useIdeaFactorsChart from "../../hooks/use-idea-factors-chart";

interface Props {
	product: IProduct;
	index: number;
	formUtilities: any;
}

const IdeaFactorsProduct = ({ product, index }: Props) => {
	const [chart] = useIdeaFactorsChart(product);

	const emptyFactor = useMemo(() => {
		return {
			id: "0",
			name: "",
			competitors: product.competitors?.map((comp) => {
				return {
					id: "0",
					value: "1",
				};
			}),
		};
	}, []);

	return (
		<div className='flex justify-between'>
			<div className='md:w-1/2 pr-12'>
				<div key={index} className='border p-5'>
					<h2 className='text-xl font-normal mb-10'>{product.name}</h2>
					<FieldArray name={`products.${index}.ideaFactors`}>
						{({ remove, push }) => (
							<>
								<ul className='flex flex-col gap-5 mb-10 pr-2 bg-white h-[350px] overflow-y-auto'>
									{!!product.ideaFactors?.length &&
										product.ideaFactors.map((idea, ideaIndex) => (
											<li
												key={ideaIndex}
												className='flex gap-5 items-start'>
												<div className='flex flex-col'>
													<label className='text-lg'>
														Idea {ideaIndex + 1}
													</label>
													<Field
														type='text'
														placeholder='name'
														className='w-[140px] text-lg p-3 bg-gray-100 outline-none border-none'
														name={`products.${index}.ideaFactors.${ideaIndex}.name`}
													/>
													<ErrorMessage
														name={`products.${index}.ideaFactors.${ideaIndex}.name`}>
														{(msg) => (
															<div className='text-sm text-rose-500'>
																{msg}
															</div>
														)}
													</ErrorMessage>
												</div>
												<div className='flex-1 flex gap-5'>
													{product.competitors
														?.filter((c) => !c.isUntapped)
														?.map(
															(
																comp: ICompetitor,
																compIndex: number
															) => (
																<div
																	key={compIndex}
																	className='flex-1 flex flex-col min-w-[140px]'>
																	<label className='text-lg'>
																		{comp.name}
																	</label>
																	<Field
																		as='select'
																		placeholder={`products.${index}.ideaFactors.${ideaIndex}.competitors.${index}.value`}
																		className='grow p-3 bg-gray-100 outline-none caret-dark-blue border-none text-lg'
																		name={`products.${index}.ideaFactors.${ideaIndex}.competitors.${compIndex}.value`}>
																		<option
																			className='text-lg'
																			value={1}>
																			Poor
																		</option>
																		<option
																			className='text-lg'
																			value={2}>
																			Moderate
																		</option>
																		<option
																			className='text-lg'
																			value={3}>
																			Good
																		</option>
																		<option
																			className='text-lg'
																			value={4}>
																			Excellent
																		</option>
																	</Field>
																	<ErrorMessage
																		name={`products.${index}.ideaFactors.${ideaIndex}.competitors.${index}.value`}>
																		{(msg) => (
																			<div className='w-full text-sm text-rose-500'>
																				{msg}
																			</div>
																		)}
																	</ErrorMessage>
																</div>
															)
														)}
												</div>
												<FontAwesomeIcon
													icon={faTrash}
													onClick={() => {
														remove(ideaIndex);
													}}
													className='self-center w-[1.2rem] h-auto cursor-pointer text-gray-200 hover:text-rose-500'
												/>
											</li>
										))}
									<div className='flex justify-center'>
										<button
											type='button'
											onClick={() => {
												push(emptyFactor);
											}}
											className='inline-flex items-center gap-2 text-lg p-3 mb-7 text-black-eerie hover:text-gray-600'>
											<FontAwesomeIcon
												className='w-5 h-auto cursor-pointer text-black-eerie hover:text-gray-600'
												icon={faCirclePlus}
											/>
											Add more idea factors
										</button>
									</div>
								</ul>
							</>
						)}
					</FieldArray>
				</div>
			</div>
			<div className='flex flex-col justify-between gap-12 md:w-1/2 px-10'>
				{!product.competitors?.length && (
					<div className='flex flex-col gap-10 w-full h-full items-center'>
						<p className='text-xl p-10 text-center bg-rose-50 text-rose-500'>
							This product has no competitors yet !
						</p>
						<a
							href='./competitors'
							className='text-xl text-white hover:text-white hover:no-underline underline'>
							Go Add Competitors
						</a>
					</div>
				)}
				{!!product.competitors?.length && <Chart {...chart} legendToggle />}
			</div>
		</div>
	);
};

export default IdeaFactorsProduct;
