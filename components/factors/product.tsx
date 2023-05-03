import {
	faEyeSlash,
	faTrash,
	faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FieldArray, Field, ErrorMessage } from "formik";
import Chart from "react-google-charts";
import { NextPage } from "next";
import { useMemo } from "react";
import {
	ICompetitor,
	IFactorCompetitor,
	IFactor,
	IProduct,
} from "../../models/types";
import useFactorsChart from "../../hooks/use-factors-chart";

interface Props {
	product: IProduct;
	index: number;
	onRemove: any;
}

const FactorsProduct: NextPage<Props> = ({ product, index, onRemove }) => {
	const [chart] = useFactorsChart(product);

	const emptyFactor = useMemo(() => {
		return {
			name: "",
			competitors: product.competitors?.map((comp) => {
				return {
					uuid: crypto.randomUUID(),
					value: "1",
				} as IFactorCompetitor;
			}),
		} as IFactor;
	}, []);

	return (
		<div className='flex justify-between text-lg'>
			<div className='md:w-1/2 pr-12'>
				<div key={index} className='border p-5'>
					<div className='flex justify-between mb-10'>
						<h2 className='text-xl font-normal'>{product.name}</h2>
						<FontAwesomeIcon
							onClick={onRemove}
							className='w-[2rem] cursor-pointer text-gray-200 hover:text-rose-500'
							icon={faEyeSlash}
						/>
					</div>
					<FieldArray name={`products.${index}.factors`}>
						{({ remove, push }) => (
							<>
								<ul className='flex flex-col gap-5 mb-10 pr-5 bg-white h-[350px] overflow-y-auto'>
									{!!product.factors?.length &&
										product.factors.map((factor, factorIndex) => (
											<li
												key={factorIndex}
												className='flex gap-5 items-start w-max'>
												<div className='flex flex-col'>
													<label>Factor</label>
													<Field
														type='text'
														placeholder='name'
														className='w-[140px] text-lg p-3 bg-gray-100 outline-none caret-dark-blue border-none'
														name={`products.${index}.factors.${factorIndex}.name`}
													/>
													<ErrorMessage
														name={`products.${index}.factors.${factorIndex}.name`}>
														{(msg) => (
															<div className='text-lg text-rose-500'>
																{msg}
															</div>
														)}
													</ErrorMessage>
												</div>
												<div className='flex-1 flex gap-5'>
													{product.competitors?.map(
														(
															comp: ICompetitor,
															compIndex: number
														) => (
															<div
																key={compIndex}
																className='flex-1 flex flex-col min-w-[140px]'>
																<label className='block max-w-[90%] text-ellipsis overflow-hidden break-keep'>
																	<span>{comp.name}</span>
																</label>
																<Field
																	as='select'
																	placeholder={`products.${index}.factors.${factorIndex}.competitors.${index}.value`}
																	className='grow p-3 bg-gray-100 outline-none caret-dark-blue border-none text-lg'
																	name={`products.${index}.factors.${factorIndex}.competitors.${compIndex}.value`}>
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
																	name={`products.${index}.factors.${factorIndex}.competitors.${index}.value`}>
																	{(msg) => (
																		<div className='w-full text-lg text-rose-500'>
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
														remove(factorIndex);
													}}
													className='self-center w-[1.5rem] h-auto cursor-pointer text-rose-200 hover:text-rose-800'
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
											Add more factors
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

export default FactorsProduct;
