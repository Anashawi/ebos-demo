import router from "next/router";
import { IUserNonCustomers } from "../../models/user-non-customers";

interface Props {
	userNonCustomers: IUserNonCustomers;
	isLoading: boolean;
}

const NonCustomersReview = ({ userNonCustomers, isLoading }: Props) => {
	return (
		<>
			<div className='flex flex-col'>
				<div className='flex flex-col gap-5 my-5 p-5 bg-dark-50 rounded-2xl'>
					<h6 className='f6 mb-2 text-3xl text-dark-400 font-semibold'>
						Soon to be non-customers
					</h6>
					<ul className='flex flex-col gap-5'>
						{!userNonCustomers.soonNonCustomers?.length && !isLoading && (
							<div className='w-full flex justify-start items-center'>
								<p className='py-5 text-lg text-center italic'>
									Start adding soon non customers...
								</p>
							</div>
						)}
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
									</li>
								)
							)}
					</ul>
				</div>
				<div className='min-h-[28rem] flex flex-col gap-3 my-5 p-5 bg-dark-50 rounded-2xl'>
					<h6 className='f6 mb-2 text-3xl text-dark-400 font-semibold'>
						Refusing non-customers
					</h6>
					<ul className='flex flex-col gap-5'>
						{!userNonCustomers.refusingCustomers?.length &&
							!isLoading && (
								<div className='w-full flex justify-start items-center'>
									<p className='py-5 text-lg text-center italic'>
										Start adding refusing non-customers...
									</p>
								</div>
							)}
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
									</li>
								)
							)}
					</ul>
				</div>
				<div className='min-h-[28rem] flex flex-col gap-3 my-5 p-5 bg-dark-50 rounded-2xl'>
					<h6 className='f6 mb-2 text-3xl text-dark-400 font-semibold'>
						Unwanted non-customers
					</h6>

					<ul className='flex flex-col gap-5'>
						{!userNonCustomers.unwantedCustomers?.length &&
							!isLoading && (
								<div className='w-full flex justify-start items-center'>
									<p className='py-5 text-lg text-center italic'>
										Start adding unwanted non-customers...
									</p>
								</div>
							)}
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
									</li>
								)
							)}
					</ul>
				</div>
				{!!userNonCustomers.id && (
					<div
						className='cursor-pointer bg-dark-200 px-9 py-3 rounded-full'
						onClick={() => {
							router.push("../org/step-up-step-down");
						}}>
						<span className='text-xl text-md text-white'>
							Go to next -{" "}
							<span className='text-white'>Step-up step-down model</span>
						</span>
					</div>
				)}
			</div>
		</>
	);
};

export default NonCustomersReview;
