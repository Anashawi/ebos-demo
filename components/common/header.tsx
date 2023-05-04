import Image from "next/image";
import Link from "next/link";
import ConsultantReview from "./consultant-review";

interface Props {
	toggleIdeasModal?: () => void;
	className?: string;
}

const Header = ({ toggleIdeasModal, className }: Props) => {
	return (
		<div
			className={`flex justify-between items-center gap-5 ${className ?? ""
				}`}>
			{!!toggleIdeasModal && (
				<div className='ml-5'>
					<button
						type='button'
						onClick={toggleIdeasModal}
						className='btn text-black-eerie hover:text-blue-ncs mr-5 shadow-md'>
						<strong>My Ideas</strong>
					</button>

				</div>
			)}
			<Link href='/' className='logo-pane mb-0 flex'>
				<h4 className='text-[3rem] text-white drop-shadow-lg'>20X</h4>
				<span className='relative -translate-x-[1.2rem]'>revenue BY</span>
				<div className='w-[110px] h-[33px]'>
					<Image
						width='200'
						height='30'
						className="-translate-y-7"
						src='/ilogo.webp'
						alt='CaseInPoint'
					/>
				</div>
			</Link>
		</div>
	);
};

export default Header;
