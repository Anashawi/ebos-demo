import { faCirclePlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FieldArray, Field, ErrorMessage } from "formik";
import Chart from "react-google-charts";
import { useMemo } from "react";
import { ICompetitor, IProduct } from "../../models/types";
import useCompetitorsChart from "../../hooks/use-competitors-chart";

interface Props {
	product: IProduct;
	index: number;
	formUtilities: any;
}

const CompetitorsProduct = ({ product, index, formUtilities }: Props) => {
	const [chart] = useCompetitorsChart(product);

	const emptyCompetitor = useMemo(() => {
		return {
			uuid: crypto.randomUUID(),
			name: "",
			marketShare: 0,
		} as ICompetitor;
	}, []);

	return (
		<div className='flex justify-between text-lg'>
			<div className='md:w-1/2 pr-12'>
				<div key={index} className=''>
					<FieldArray name={`products.${index}.competitors`}>
						{({ remove, push }) => (
							<div className='relative'>
								<ul className='flex flex-col gap-3 mb-10 pr-5 border p-5 h-[355px] overflow-y-auto'>
									{!product?.competitors?.length && (
										<div className='text-center bg-rose-50 text-sm text-rose-500 p-5'>
											Please, add at least one competitor
										</div>
									)}
									{!!product?.competitors?.length &&
										product?.competitors.map((comp, compIndex) => (
											<li
												key={compIndex}
												className='flex gap-5 items-start relative'>
												{compIndex > 0 && (
													<>
														<div className='w-full md:w-1/2 flex flex-col gap-2'>
															<label>
																{!comp.isUntapped && (
																	<>
																		Competitor {compIndex - 1}
																	</>
																)}
																{comp.isUntapped && (
																	<>Untapped Market</>
																)}
															</label>
															<Field
																type='text'
																placeholder='name'
																className='w-full text-lg p-3 bg-gray-100 outline-none caret-dark-blue border-none'
																name={`products.${index}.competitors.${compIndex}.name`}
															/>
															<ErrorMessage
																name={`products.${index}.competitors.${compIndex}.name`}>
																{(msg) => (
																	<div className='text-sm text-rose-500'>
																		{msg}
																	</div>
																)}
															</ErrorMessage>
														</div>
													</>
												)}
												{compIndex === 0 && (
													<>
														<div className='w-full md:w-1/2 flex flex-col gap-2'>
															<label>My Product</label>
															<Field
																type='text'
																placeholder='product name'
																className='text-lg w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none'
																name={`products.${index}.name`}
															/>
														</div>
													</>
												)}
												<div className='w-full md:w-1/2 flex flex-col gap-2'>
													<label>Market share (USD)</label>
													<div className='flex items-baseline'>
														<span className='inline-block p-3 bg-yellow-jasmine'>
															$
														</span>
														<Field
															type='number'
															placeholder='percentage'
															className='grow comp-share p-3 text-lg bg-gray-100 outline-none caret-dark-blue border-none'
															name={`products.${index}.competitors.${compIndex}.marketShare`}
															min='0'
														/>
													</div>
													<ErrorMessage
														name={`products.${index}.competitors.${compIndex}.marketShare`}>
														{(msg) => (
															<div className='w-full text-sm text-rose-500'>
																{msg}
															</div>
														)}
													</ErrorMessage>
												</div>
												{compIndex > 1 && (
													<FontAwesomeIcon
														icon={faTimes}
														onClick={() => {
															if (compIndex > 0)
																remove(compIndex);
														}}
														className='w-4 h-auto absolute top-12 right-4 cursor-pointer text-gray-500 hover:text-rose-800'
													/>
												)}
											</li>
										))}
									<div>
										{!!formUtilities.errors?.competitors &&
											formUtilities.errors.competitors
												.product_uuid === product?.uuid && (
												<p className='text-rose-500'>
													{
														formUtilities.errors.competitors
															.errorMessage
													}
												</p>
											)}
									</div>
									<div className='flex justify-center'>
										<button
											type='button'
											onClick={() => {
												push(emptyCompetitor);
											}}
											className='inline-flex items-center gap-2 text-lg p-3 mb-7 text-black-eerie hover:text-gray-600'>
											<FontAwesomeIcon
												className='w-5 h-auto cursor-pointer text-black-eerie hover:text-gray-600'
												icon={faCirclePlus}
											/>
											Add more competitors
										</button>
									</div>
								</ul>
							</div>
						)}
					</FieldArray>
				</div>
			</div>
			<div className='flex flex-col justify-between gap-12 md:w-1/2 h-[355px]  px-10'>
				<Chart {...chart} legendToggle />
			</div>
		</div>
	);
};

export default CompetitorsProduct;
