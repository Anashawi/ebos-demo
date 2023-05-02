import objectPath from "object-path";
import { NextPage } from "next";
import { ErrorMessage, Field, FieldArray } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Chart from "react-google-charts";
import {
	faCirclePlus,
	faMinusCircle,
	faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useMemo } from "react";
import useConfirmDialog from "../../hooks/use-confirm-dialog";
import ConfirmModal from "../common/confirm-dialog";
import { ConfirmDialog, IFuture, IProduct } from "../../models/types";
import useFuturesChart from "../../hooks/use-futures-chart";

interface Props {
	product: IProduct;
	index: number;
	onRemove: any;
}

const Product: NextPage<Props> = ({ product, index, onRemove }) => {
	const deleteConfig: ConfirmDialog = useMemo(() => {
		return {
			isShown: false,
			title: "Delete Product",
			confirmMessage: "Are you sure to delete this product ?",
			okBtnText: "Delete",
			cancelBtnText: "Cancel",
			okCallback: () => {},
		};
	}, []);
	const [deleteDialogConfig, toggleDeleteDialog] =
		useConfirmDialog(deleteConfig);

	const emptyFuture = useMemo(() => {
		return {
			year:
				(product.futures
					? product.futures[product.futures?.length - 1]?.year ?? 2022
					: 2022) + 1,
			level: 2,
			sales: 50,
		} as IFuture;
	}, []);

	const [chart] = useFuturesChart(JSON.parse(JSON.stringify(product)));

	return (
		<>
			<div key={index} className='flex text-lg'>
				<div className='flex-1 pr-10'>
					<div className='bg-white flex flex-col gap-5 h-[480px]'>
						<div className='flex flex-col gap-3 border-b border-gray-300 pb-5'>
							<div className='flex items-center gap-5'>
								<div className='grow flex flex-col gap-3 relative'>
									<label>Product name</label>
									<Field
										type='text'
										className='w-full p-2 px-4 text-lg bg-gray-100 focus:outline-none caret-dark-blue border-none'
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
									<FontAwesomeIcon
										onClick={() => {
											deleteDialogConfig.okCallback = () => {
												onRemove();
											};
											toggleDeleteDialog(deleteDialogConfig);
										}}
										className='w-5 absolute top-0 right-3 cursor-pointer text-rose-200 hover:text-rose-500'
										icon={faTrash}
									/>
								</div>
							</div>
						</div>
						<FieldArray name={`products.${index}.futures`}>
							{({ remove, push, form }) => {
								return (
									<div className='overflow-y-auto'>
										{!!product.futures?.length &&
											product.futures?.map((future, futureIndex) => {
												return (
													<div
														key={futureIndex}
														className='flex flex-col border-b border-gray-300 pb-3'>
														<div className='flex'>
															<div className='grow p-2 flex flex-col'>
																<label>
																	{futureIndex === 0
																		? `Present`
																		: `Future ${futureIndex}`}{" "}
																</label>
																<Field
																	type='number'
																	min='2023'
																	max='2099'
																	className='w-full text-lg p-2 bg-gray-100 outline-none caret-dark-blue border-none'
																	placeholder='year'
																	// onChange={(e: any) => {
																	// 	console.log(
																	// 		e,
																	// 		product.futures
																	// 	);
																	// 	if (product.futures) {
																	// 		if (futureIndex > 0) {
																	// 			if (
																	// 				+e.target.value >
																	// 				product.futures[
																	// 					futureIndex -
																	// 						1
																	// 				].year
																	// 			) {
																	// 				e.preventDefault();
																	// 			}
																	// 		}
																	// 	}
																	// }}
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
															<div className='grow p-2 flex flex-col'>
																<label>Level</label>
																<Field
																	as='select'
																	name={`products.${index}.futures.${futureIndex}.level`}
																	className='accent-blue-true text-lg w-full p-2 bg-gray-100 outline-none caret-dark-blue border-none'>
																	<option value='1'>
																		Settler
																	</option>
																	<option value='2'>
																		Migrator
																	</option>
																	<option value='3'>
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
															<div className='grow p-2 flex flex-col'>
																<label>Sales (%)</label>
																<Field
																	type='number'
																	name={`products.${index}.futures.${futureIndex}.sales`}
																	min='0'
																	max='100'
																	className='accent-blue-true w-full p-2 text-lg bg-gray-100 outline-none caret-dark-blue border-none'
																/>
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
										{!product.futures?.length &&
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
										<div className='flex justify-between w-full pr-3  gap-5'>
											<button
												type='button'
												onClick={() => {
													const newFuture = { ...emptyFuture };
													if (product.futures?.length) {
														newFuture.year =
															product.futures[
																product.futures.length - 1
															].year + 1;
													}
													push(newFuture);
												}}
												className='inline-flex items-center gap-3 text-lg p-5 text-black-eerie'>
												<FontAwesomeIcon
													className='w-5 h-auto cursor-pointer text-gray-700'
													icon={faCirclePlus}
												/>
												<span>add new future</span>
											</button>
											{!!product.futures?.length &&
												product.futures?.length > 0 && (
													<button
														type='button'
														onClick={() => {
															if (product.futures) {
																remove(
																	product.futures.length - 1
																);
															}
														}}
														className='inline-flex items-center gap-3 text-lg px-3 text-rose-400 hover:text-rose-500'>
														<FontAwesomeIcon
															className='w-5 h-auto cursor-pointer hover:text-rose-500'
															icon={faMinusCircle}
														/>
														<span>remove last future</span>
													</button>
												)}
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

			<ConfirmModal
				config={deleteDialogConfig}
				toggle={() => {
					toggleDeleteDialog();
				}}></ConfirmModal>
		</>
	);
};

export default Product;
