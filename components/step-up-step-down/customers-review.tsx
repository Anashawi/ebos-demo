import { IUserAnalysis } from "../../models/user-analysis";
import Spinner from "../common/spinner";

interface Props {
	userAnalysis: IUserAnalysis;
	isLoading: boolean;
}

const StepUpStepDownCustomersReview = ({ userAnalysis, isLoading }: Props) => {
	return (
		<>
			{isLoading && (
				<Spinner
					className='flex items-center px-1 text-2xl'
					message='Loading customers...'
				/>
			)}
			{!isLoading && (
				<div className='flex flex-col gap-10 p-5 bg-dark-50 rounded-2xl'>
					<div className='flex flex-col gap-5'>
						<h6 className='text-dark-400 text-2xl font-semibold'>
							10% above
						</h6>
						<ul className='flex flex-col gap-5'>
							{!!userAnalysis.above?.length &&
								userAnalysis.above.map((item, index) => (
									<li
										key={index}
										className='relative w-[69%] flex items-center'>
										<input
											type='text'
											className='dark-input'
											value={item}
											readOnly
										/>
									</li>
								))}
						</ul>
					</div>
					<div className='flex flex-col gap-5'>
						<h6 className='text-dark-400 text-2xl font-semibold'>
							Your Customers
						</h6>
						<ul className='flex flex-col gap-5'>
							{!!userAnalysis.customers?.length &&
								userAnalysis.customers.map((item, index) => (
									<li
										key={index}
										className='relative w-[69%] flex items-center'>
										<input
											type='text'
											className='dark-input'
											value={item}
											readOnly
										/>
									</li>
								))}
						</ul>
					</div>
					<div className='flex flex-col gap-5'>
						<h6 className='text-dark-400 text-2xl font-semibold'>
							10% below
						</h6>
						<ul className='flex flex-col gap-5'>
							{!!userAnalysis.below?.length &&
								userAnalysis.below.map((item, index) => (
									<li
										key={index}
										className='relative w-[69%] flex items-center'>
										<input
											type='text'
											className='dark-input'
											value={item}
											readOnly
										/>
									</li>
								))}
						</ul>
					</div>
				</div>
			)}
		</>
	);
};

export default StepUpStepDownCustomersReview;
