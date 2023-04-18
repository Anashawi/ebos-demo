import objectPath from "object-path";
import { NextPage } from "next";
import { ErrorMessage, Field, FieldArray } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Chart, { ReactGoogleChartProps } from "react-google-charts";
import {
	faCirclePlus,
	faMinusCircle,
	faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useMemo, useState } from "react";
import useConfirmDialog from "../../hooks/use-confirm-dialog";
import ConfirmModal from "../common/confirm-dialog";
import { ConfirmDialog } from "../../models/types";
import { IFuture } from "../../models/future";
import { IProduct } from "../../models/product";
import useFuturesChart from "../../hooks/use-futures-chart";
import * as futuresClientApi from "../../http-client/futures.client";
import { useQuery } from "@tanstack/react-query";

type Props = {
	product: IProduct;
	index: number;
	onRemove: any;
};

const Product: NextPage<Props> = ({ product, index, onRemove }) => {
	let deleteConfig: ConfirmDialog = {
		isShown: false,
		title: "Delete Product",
		confirmMessage: "Are you sure to delete this product ?",
		okBtnText: "Delete",
		cancelBtnText: "Cancel",
		okCallback: () => {},
		closeCallback: () => {},
	};
	const [deleteDialogConfig, toggleDeleteDialog] = useConfirmDialog();
	const [futures, setFutures] = useState<IFuture[]>([]);

	const { data: futuresRes, isLoading: isLoadingFutures } = useQuery<
		IFuture[]
	>({
		queryKey: [futuresClientApi.Keys.All],
		queryFn: futuresClientApi.getAll,
		refetchOnWindowFocus: false,
	});
	useEffect(() => {
		product.futures = futuresRes.fil;
		// setProducts((prevProduct) => {
		// 	prevProduct.futures = futuresRes ?? [];
		// 	return { ...prevProduct };
		// });
	}, [futuresRes]);

	const emptyFuture = useMemo(() => {
		return {
			id: "",
			productId: "",
			year: (futures[futures?.length - 1]?.year ?? 2022) + 1,
			level: 2,
			sales: 50,
		};
	}, []);

	const [chart] = useFuturesChart(product, futures);

	return (
		<>
			<div key={index} className='flex'>
				<div className='flex-1 pr-10'>
					<div className='p-5 lg:p-7 shadow border bg-white flex flex-col gap-5 h-[480px]'>
						<div className='flex flex-col gap-3 border-b border-gray-300 pb-5'>
							<div className='flex items-center gap-5'>
								<div className='grow'>
									<label>Product name</label>
									<Field
										type='text'
										className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none'
										placeholder='Name'
										name={`products.${index}.name`}
									/>
									<ErrorMessage name={`products.${index}.name`}>
										{(msg) => (
											<div className='text-lg text-rose-500'>
												{msg}
											</div>
										)}
									</ErrorMessage>
								</div>
								{/* <FontAwesomeIcon
                           onClick={() => {
                              deleteConfig.closeCallback = toggleDeleteDialog;
                              deleteConfig.okCallback = () => {
                                 remove(index);
                              };
                              toggleDeleteDialog(deleteConfig);
                           }}
                           className='w-7 h-auto cursor-pointer text-rose-200 hover:text-rose-800'
                           icon={faTrash}
                        /> */}
								<div className='flex justify-end mb-5'>
									<FontAwesomeIcon
										onClick={onRemove}
										className='w-7 cursor-pointer text-rose-200 hover:text-rose-500'
										icon={faTrash}
									/>
								</div>
							</div>
						</div>
						<FieldArray name={`products.${index}.futures`}>
							{({ remove, push, form }) => {
								// addFutureCallback(product, push);
								return (
									<div className='overflow-y-auto'>
										{!!futures?.length &&
											futures?.map((future, futureIndex) => {
												return (
													<div
														key={futureIndex}
														className='flex flex-col border-b border-gray-300 pb-3'>
														<div className='flex'>
															<div className='grow p-2'>
																<label>
																	{futureIndex === 0
																		? `Present`
																		: `Future ${futureIndex}`}{" "}
																</label>
																<Field
																	type='number'
																	min='2023'
																	max='2099'
																	className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none'
																	placeholder='year'
																	name={`products.${index}.futures.${futureIndex}.year`}
																/>
																<ErrorMessage
																	name={`products.${index}.futures.${futureIndex}.year`}>
																	{(msg) => (
																		<div className='text-lg text-rose-500'>
																			{msg}
																		</div>
																	)}
																</ErrorMessage>
															</div>
															<div className='grow p-2'>
																<label>Level</label>
																<Field
																	as='select'
																	name={`products.${index}.futures.${futureIndex}.level`}
																	className='accent-blue-true w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none'>
																	<option value={1}>
																		Settler
																	</option>
																	<option value={2}>
																		Migrator
																	</option>
																	<option value={3}>
																		Pioneer
																	</option>
																</Field>
																<ErrorMessage
																	name={`products.${index}.futures.${futureIndex}.level`}>
																	{(msg) => (
																		<div className='text-lg text-rose-500'>
																			{msg}
																		</div>
																	)}
																</ErrorMessage>
															</div>
															<div className='grow p-2'>
																<label>Sales (%)</label>
																<Field
																	as='select'
																	name={`products.${index}.futures.${futureIndex}.sales`}
																	min='0'
																	max='100'
																	className='accent-blue-true w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none'>
																	<option value={0}>0</option>
																	<option value={10}>
																		10
																	</option>
																	<option value={20}>
																		20
																	</option>
																	<option value={30}>
																		30
																	</option>
																	<option value={40}>
																		40
																	</option>
																	<option value={50}>
																		50
																	</option>
																	<option value={60}>
																		60
																	</option>
																	<option value={70}>
																		70
																	</option>
																	<option value={80}>
																		80
																	</option>
																	<option value={90}>
																		90
																	</option>
																	<option value={100}>
																		100
																	</option>
																</Field>
																<ErrorMessage
																	name={`products.${index}.futures.${futureIndex}.sales`}>
																	{(msg) => (
																		<div className='text-lg text-rose-500'>
																			{msg}
																		</div>
																	)}
																</ErrorMessage>
															</div>
														</div>
													</div>
												);
											})}
										{!futures?.length &&
											!!objectPath.get(
												form,
												`errors.products.${index}.futures`
											) && (
												<div className='w-full flex items-center'>
													<p className='grow text-lg p-3 text-center bg-rose-50 text-rose-500'>
														{objectPath.get(
															form,
															`errors.products.${index}.futures`
														)}
													</p>
												</div>
											)}
										<div className='flex justify-between w-full pr-3 py-5 gap-5'>
											{futures?.length > 0 && (
												<button
													type='button'
													onClick={() => {
														remove(futures.length - 1);
													}}
													className='inline-flex items-center gap-3 text-lg p-5 btn text-rose-400 hover:text-rose-500'>
													<span>remove last Future</span>
													<FontAwesomeIcon
														className='w-7 h-auto cursor-pointer hover:text-rose-500'
														icon={faMinusCircle}
													/>
												</button>
											)}
											<button
												type='button'
												onClick={() => {
													push(emptyFuture);
												}}
												className='inline-flex items-center gap-3 text-lg p-5 btn blue-gradient text-black-eerie hover:text-white'>
												<FontAwesomeIcon
													className='w-7 h-auto cursor-pointer text-white'
													icon={faCirclePlus}
												/>
											</button>
										</div>
									</div>
								);
							}}
						</FieldArray>
					</div>
				</div>
				<div className='md:w-1/2 pl-10'>
					<Chart {...chart} legendToggle />
				</div>
			</div>

			<ConfirmModal config={deleteDialogConfig}></ConfirmModal>
		</>
	);
};

export default Product;
