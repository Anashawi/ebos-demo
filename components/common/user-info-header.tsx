import Link from "next/link";

interface Props {
	className?: string;
}

const UserInfoHeader = ({ className }: Props) => {
	return (
		<div className={className ?? ""}>
			<strong className='mr-1'>Mustafa Khairy </strong>
			<span> | </span>
			<Link href='http://bo.adpadelhouse.com/logout'>logout</Link>
		</div>
	);
};

export default UserInfoHeader;
