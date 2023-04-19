import { useState } from "react";
import Modal from "./modal";
import Spinner from "./spinner";
import { ConfirmDialog } from "../../models/types";

interface Props {
	config: ConfirmDialog;
	toggle: () => void;
}

const ConfirmModal = ({ config, toggle }: Props) => {
	const [isLoading, setIsLoading] = useState(false);

	console.log("delete dialog from inside", config);

	return (
		<Modal
			config={{
				isShown: config.isShown,
				closeCallback: toggle,
				className: "flex flex-col gap-5 justify-between",
			}}>
			<div className='min-w-[500px] flex flex-col gap-10 p-10'>
				<h2 className='text-3xl'>{config.title}</h2>
				<p className='text-gray-800'>{config.confirmMessage}</p>
			</div>
			<div className='flex justify-end gap-3 p-10'>
				{isLoading && (
					<div className='flex grow'>
						<Spinner className='' message='Delete Category ...' />
					</div>
				)}
				<button
					type='button'
					className='btn btn-rev text-gray-800 px-7 font-semibold'
					onClick={toggle}>
					{config.cancelBtnText}
				</button>
				<button
					type='button'
					className='btn text-gray-800 px-7 font-semibold'
					onClick={async () => {
						setIsLoading((prevVal) => true);
						await config.okCallback();
						setIsLoading((prevVal) => false);
						toggle();
					}}>
					{config.okBtnText}
				</button>
			</div>
		</Modal>
	);
};

export default ConfirmModal;
