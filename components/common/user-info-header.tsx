import { useSession } from "next-auth/react";
import Link from "next/link";

interface Props {
	className?: string;
}

const UserInfoHeader = ({ className }: Props) => {
	const { data: session } = useSession();
	return (
		<div className={className ?? ""}>
			<strong className='mr-1'>{(session?.user as any)?.fullName}</strong>
			<span> | </span>
			<Link href='http://bo.adpadelhouse.com/logout'>logout</Link>
		</div>
	);
};

export default UserInfoHeader;
