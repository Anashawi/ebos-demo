import Link from "next/link";

interface Props {
	className?: string;
}
const ZeroProductsWarning = ({ className }: Props) => {
	return (
		<div
			className={`flex flex-col gap-10 w-1/2 h-full pr-10 ${className ?? ""
				}`}>
			<p className='text-2xl p-10 text-center bg-yellow-50 text-yellow-900'>
				You still did not define your products!
			</p>
			<Link
				href='./products'
				className='text-2xl text-center hover:text-black-eerie text-blue-ncs italic'>
				let us start defining them?
			</Link>
		</div>
	);
};

export default ZeroProductsWarning;
