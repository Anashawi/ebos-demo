import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import * as clientApi from "../../http-client/non-customers.client";
import { IUserNonCustomers } from "../../models/user-non-customers";
import Spinner from "../../components/common/spinner";
import { faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import Image from "next/image";

const NonCustomersContent = () => {
	const { data: session }: any = useSession();

	const router = useRouter();

	const [nonCustomerToBeAdded, setNonCustomerToBeAdded] = useState<string>("");
	const [refusingCustomerToBeAdded, setRefusingCustomerToBeAdded] =
		useState<string>("");
	const [unwantedCustomerToBeAdded, setUnwantedCustomerToBeAdded] =
		useState<string>("");

	const emptyUserNonCustomers = {
		id: "",
		userId: session?.user?.id,
		soonNonCustomers: [],
		refusingCustomers: [],
		unwantedCustomers: [],
	} as IUserNonCustomers;

	const [userNonCustomers, setUserNonCustomers] = useState<IUserNonCustomers>(
		emptyUserNonCustomers
	);

	const queryClient = useQueryClient();

	const { data, isLoading } = useQuery<IUserNonCustomers>({
		queryKey: [clientApi.Keys.All],
		queryFn: clientApi.getOne,
		refetchOnWindowFocus: false,
		enabled: !!session?.user?.id,
	});

	useEffect(() => {
		if (!data) {
			setUserNonCustomers((prevValue) => {
				prevValue.soonNonCustomers = ["", "", ""];
				prevValue.refusingCustomers = ["", "", ""];
				prevValue.unwantedCustomers = ["", "", ""];
				return prevValue;
			});
		}
		if (data) {
			setUserNonCustomers(data);
		}
	}, [data]);

	const {
		mutate: updateUserNonCustomers,
		isLoading: isUpdatingUserNonCustomers,
	} = useMutation(
		(userNonCustomers: IUserNonCustomers) => {
			return clientApi.updateOne(userNonCustomers);
		},
		{
			onMutate: (updated) => {
				queryClient.setQueryData(
					[clientApi.Keys.All, userNonCustomers.id],
					updated
				);
			},
			onSuccess: (updated) => {
				queryClient.invalidateQueries([
					clientApi.Keys.All,
					userNonCustomers.id,
				]);
				queryClient.invalidateQueries([clientApi.Keys.All]);
			},
		}
	);

	const {
		mutate: createUserNonCustomers,
		isLoading: isCreatingUserNonCustomers,
	} = useMutation(
		(userNonCustomers: IUserNonCustomers) =>
			clientApi.insertOne(userNonCustomers),
		{
			onMutate: (updated) => {
				queryClient.setQueryData(
					[clientApi.Keys.All, userNonCustomers.id],
					updated
				);
			},
			onSuccess: (updated) => {
				queryClient.invalidateQueries([
					clientApi.Keys.All,
					userNonCustomers.id,
				]);
				queryClient.invalidateQueries([clientApi.Keys.All]);
			},
		}
	);

	return (
		<>
			<h3 className='title-header mb-0'>Non customers</h3>
			{isLoading && (
				<Spinner
					className='flex items-center px-1 text-2xl'
					message='Loading non customers...'
				/>
			)}
			{!isLoading && (
				<form className='flex flex-col'>
					<div className='flex flex-col gap-5 my-5 p-5 bg-dark-50 rounded-2xl'>
						<h6 className='f6 mb-2 text-3xl text-dark-400 font-semibold'>
							Soon to be non-customers
						</h6>
						<div className='pill-yellow-50 p-3'>
							<div className='w-[3rem] h-[3rem]'>
									<Image
										src='/bulb.svg'
										alt='Bulb Icon'
										width={0}
										height={0}
										className='w-full h-auto'
									/>
								</div>
							<h3 className='text-xl text-gray-400 font-normal'>
								Who are the customers most likely to be left out in this
								transformation ?
							</h3>
						</div>
						<ul className='flex flex-col gap-5'>
							{!userNonCustomers.soonNonCustomers?.length &&
								!isLoading && (
									<div className='w-full flex justify-start items-center'>
										<p className='py-5 text-lg text-center italic'>
											Start adding soon non customers...
										</p>
									</div>
								)}
							<div className='w-full flex gap-5 items-center'>
								<input
									type='text'
									className='w-[69%] light-input'
									placeholder='Enter Soon to be Non-Customer here'
									value={nonCustomerToBeAdded}
									onChange={(e) => {
										setNonCustomerToBeAdded(e.target.value);
									}}
								/>
								<button
									type='button'
									onClick={() => {
										userNonCustomers.soonNonCustomers.push(
											nonCustomerToBeAdded
										);
										setUserNonCustomers({
											...userNonCustomers,
										});
										setNonCustomerToBeAdded("");
									}}
									disabled={!nonCustomerToBeAdded}
									className={
										!!nonCustomerToBeAdded
											? "btn-primary"
											: "btn-primary-light hover:bg-primary-300 cursor-not-allowed"
									}>
									<FontAwesomeIcon
										className='w-3 h-auto cursor-pointer hover:text-gray-600'
										icon={faPlus}
									/>
									Add more
								</button>
							</div>
							{!!userNonCustomers.soonNonCustomers?.length &&
								userNonCustomers.soonNonCustomers.map(
									(nonCustomer, index) => (
										<li
											key={index}
											className='relative w-[69%] flex items-center'>
											<input
												type='text'
												className='dark-input'
												value={nonCustomer}
												readOnly
											/>
											<button
												type='button'
												onClick={() => {
													userNonCustomers.soonNonCustomers =
														userNonCustomers.soonNonCustomers.filter(
															(nonC, i) => i !== index
														);
													setUserNonCustomers({
														...userNonCustomers,
													});
												}}
												className='btn-delete'>
												<FontAwesomeIcon
													icon={faTimes}
													className='w-4 hover:text-rose-800'
												/>
											</button>
										</li>
									)
								)}
						</ul>
					</div>
					<div className='min-h-[28rem] flex flex-col gap-3 my-5 p-5 bg-dark-50 rounded-2xl'>
						<h6 className='f6 mb-2 text-3xl text-dark-400 font-semibold'>
							Refusing customers
						</h6>
						<div className='pill-yellow-50 p-3'>
							<div className='w-[3rem] h-[3rem]'>
									<Image
										src='/bulb.svg'
										alt='Bulb Icon'
										width={0}
										height={0}
										className='w-full h-auto'
									/>
								</div>
							<h3 className='text-xl text-gray-400 font-normal'>
								Who are the customers most likely to be refusing of this
								transformation ?
							</h3>
						</div>
						<ul className='flex flex-col gap-5'>
							{!userNonCustomers.refusingCustomers?.length &&
								!isLoading && (
									<div className='w-full flex justify-start items-center'>
										<p className='py-5 text-lg text-center italic'>
											Start adding refusing customers...
										</p>
									</div>
								)}
							<div className='w-full flex gap-5 items-center'>
								<input
									type='text'
									className='w-[69%] light-input'
									placeholder='Enter refusing Non-Customer here'
									value={refusingCustomerToBeAdded}
									onChange={(e) => {
										setRefusingCustomerToBeAdded(e.target.value);
									}}
								/>
								<button
									type='button'
									onClick={() => {
										userNonCustomers.refusingCustomers.push(
											refusingCustomerToBeAdded
										);
										setUserNonCustomers({
											...userNonCustomers,
										});
										setRefusingCustomerToBeAdded("");
									}}
									disabled={!refusingCustomerToBeAdded}
									className={
										!!refusingCustomerToBeAdded
											? "btn-primary"
											: "btn-primary-light hover:bg-primary-300 cursor-not-allowed"
									}>
									<FontAwesomeIcon
										className='w-3 h-auto cursor-pointer hover:text-gray-600'
										icon={faPlus}
									/>
									Add more
								</button>
							</div>
							{!!userNonCustomers.refusingCustomers?.length &&
								userNonCustomers.refusingCustomers.map(
									(refusingCustomer, index) => (
										<li
											key={index}
											className='relative w-[69%] flex items-center'>
											<input
												type='text'
												className='dark-input'
												value={refusingCustomer}
												readOnly
											/>
											<button
												type='button'
												onClick={() => {
													userNonCustomers.refusingCustomers =
														userNonCustomers.refusingCustomers.filter(
															(nonC, i) => i !== index
														);
													setUserNonCustomers({
														...userNonCustomers,
													});
												}}
												className='btn-delete'>
												<FontAwesomeIcon
													icon={faTimes}
													className='w-4 hover:text-rose-800'
												/>
											</button>
										</li>
									)
								)}
						</ul>
					</div>
					<div className='min-h-[28rem] flex flex-col gap-3 my-5 p-5 bg-dark-50 rounded-2xl'>
						<h6 className='f6 mb-2 text-3xl text-dark-400 font-semibold'>
							Unwanted customers
						</h6>
						<div className='pill-yellow-50 p-3'>
							<div className='w-[3rem] h-[3rem]'>
									<Image
										src='/bulb.svg'
										alt='Bulb Icon'
										width={0}
										height={0}
										className='w-full h-auto'
									/>
								</div>
							<h3 className='text-xl text-gray-400 font-normal'>
								Who are the customers you don&apos;t want in this
								transformation ?
							</h3>
						</div>

						<ul className='flex flex-col gap-5'>
							{!userNonCustomers.unwantedCustomers?.length &&
								!isLoading && (
									<div className='w-full flex justify-start items-center'>
										<p className='py-5 text-lg text-center italic'>
											Start adding unwanted customers...
										</p>
									</div>
								)}
							<div className='w-full flex gap-5 items-center'>
								<input
									type='text'
									className='w-[69%] light-input'
									placeholder='Enter refusing Non-Customer here'
									value={unwantedCustomerToBeAdded}
									onChange={(e) => {
										setUnwantedCustomerToBeAdded(e.target.value);
									}}
								/>
								<button
									type='button'
									onClick={() => {
										userNonCustomers.unwantedCustomers.push(
											unwantedCustomerToBeAdded
										);
										setUserNonCustomers({
											...userNonCustomers,
										});
										setUnwantedCustomerToBeAdded("");
									}}
									disabled={!unwantedCustomerToBeAdded}
									className={
										!!unwantedCustomerToBeAdded
											? "btn-primary"
											: "btn-primary-light hover:bg-primary-300 cursor-not-allowed"
									}>
									<FontAwesomeIcon
										className='w-3 h-auto cursor-pointer hover:text-gray-600'
										icon={faPlus}
									/>
									Add more
								</button>
							</div>
							{!!userNonCustomers.unwantedCustomers?.length &&
								userNonCustomers.unwantedCustomers.map(
									(unwantedCustomer, index) => (
										<li
											key={index}
											className='relative w-[69%] flex items-center'>
											<input
												type='text'
												className='dark-input'
												value={unwantedCustomer}
												readOnly
											/>
											<button
												type='button'
												onClick={() => {
													userNonCustomers.unwantedCustomers =
														userNonCustomers.unwantedCustomers.filter(
															(nonC, i) => i !== index
														);
													setUserNonCustomers({
														...userNonCustomers,
													});
												}}
												className='btn-delete'>
												<FontAwesomeIcon
													icon={faTimes}
													className='w-4 hover:text-rose-800'
												/>
											</button>
										</li>
									)
								)}
						</ul>
					</div>
					<div className='h-10'>
						{(isUpdatingUserNonCustomers ||
							isCreatingUserNonCustomers) && (
							<Spinner
								className='flex items-center px-1 text-xl'
								message='Saving non customers...'
							/>
						)}
					</div>
					<div className='flex flex-wrap gap-5 justify-between py-3'>
						<button
							type='button'
							onClick={() => {
								const newObj = {
									...userNonCustomers,
								};
								newObj.userId = session?.user?.id;
								if (!userNonCustomers.id) {
									createUserNonCustomers(newObj);
								} else {
									updateUserNonCustomers(newObj);
								}
							}}
							className='btn-rev'>
							Save
						</button>
						{!!userNonCustomers.id && (
							<div
								className='cursor-pointer bg-dark-200 px-7 py-3 rounded-full'
								onClick={() => {
									router.push("../org/step-up-step-down");
								}}>
								<span className='text-md text-white italic'>
									go to next →{" "}
									<span className='text-white'>
										Step-up step-down model
									</span>
								</span>
							</div>
						)}
					</div>
				</form>
			)}
		</>
	);
};

export default NonCustomersContent;
