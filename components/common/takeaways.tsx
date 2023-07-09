import { takeawayTypeEnums } from "../../models/enums";

interface Props {
	type: takeawayTypeEnums;
	className?: string;
}

const Takeaways = ({ type, className }: Props) => {
	return (
		<>
			<div className={`${className ?? ""} `}>
				<div className='grow flex flex-col gap-3'>
					<label className='text-dark-400 text-[1.75rem]'>
						Takeaways on Scale
					</label>
					<input
						type='text'
						placeholder='Write your notes here'
						className='light-input'
					/>
				</div>
				<div className='grow flex flex-col gap-3'>
					<label className='text-dark-400 text-[1.75rem]'>
						Takeaways on Ideas
					</label>
					<input
						type='text'
						placeholder='Write your notes here'
						className='light-input'
					/>
				</div>
			</div>
		</>
	);
};

export default Takeaways;
