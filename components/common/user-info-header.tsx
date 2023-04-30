import { signOut, useSession } from "next-auth/react";
import { Router, useRouter } from "next/router";

interface Props {
	className?: string;
}

const UserInfoHeader = ({ className }: Props) => {
	const { data: session } = useSession();
	const router = useRouter();

	return (
		<div className={className ?? ""}>
			<strong className='mr-1'>{(session?.user as any)?.fullName}</strong>
			<span> | </span>
			<a
				onClick={async () => {
					await signOut();
					router.push("/redirect");
				}}>
				logout
			</a>
		</div>
	);
};

export default UserInfoHeader;
