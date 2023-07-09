import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FieldArray, Field, ErrorMessage } from "formik";
import { NextPage } from "next";
import { useMemo } from "react";
import {
	ICompetitor,
	IFactorCompetitor,
	IFactor,
	IProduct,
} from "../../models/types";

interface Props {
	product: IProduct;
	index: number;
}

const RedOceanProduct: NextPage<Props> = ({ product, index }) => {
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
		<>
			<div>
				<div key={index} className='p-5 bg-dark-50 rounded-2xl'>
					<div className='flex justify-between mb-10'>
						<h2 className='text-2xl text-dark-400 font-hero-bold'>{product.name}</h2>
					</div>
					<FieldArray name={`products.${index}.factors`}>
						{({ remove, push }) => (
							<>
								<ul className='flex flex-col gap-5 mb-10 pr-5 pb-5 max-w-full overflow-auto'>
									{!!product.factors?.length &&
										product.factors.map((factor, factorIndex) => (
											<li
												key={factorIndex}
												className='flex gap-5 items-start w-max'>
												<div className='flex flex-col'>
													<label>Factor {factorIndex + 1}</label>
													<Field
														type='text'
														placeholder='name'
														className='light-input w-[140px]'
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
													{product.competitors
														?.filter((comp) => !comp.isUntapped)
														.map(
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
																		className='light-input'
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
													className='self-center w-[1.2rem] h-auto cursor-pointer text-gray-200 hover:text-rose-500 transition duration-200'
												/>
											</li>
										))}
									<div className='flex mt-5'>
										<button
											type='button'
											onClick={() => {
												push(emptyFactor);
											}}
											className='btn-primary-light pl-9 pr-[4.5rem]'>
											<FontAwesomeIcon
												className='w-3 h-auto cursor-pointer hover:text-gray-600'
												icon={faPlus}
											/>
											Add More Factors
										</button>
									</div>
								</ul>
							</>
						)}
					</FieldArray>
				</div>
			</div>
			<div className='flex flex-col justify-between gap-12 px-10'>
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
			</div>
		</>
	);
};

export default RedOceanProduct;
