import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
	className?: string;
}

const UserInfoHeader = ({ className }: Props) => {
	const { data: session } = useSession();
	const router = useRouter();

	return (
		<div className={`${className} flex justify-between items-center`}>
			<Link
				href='/'
				className='hover:text-black-eerie text-blue-ncs'>
				<strong>Back To Dashboard</strong>
			</Link>
			<div className="mr-5">
				<strong className='mr-1'>{(session?.user as any)?.fullName.toUpperCase()}</strong>
				<span> | </span>
				<button
					className=" p-2 rounded-md text-blue-800"
					onClick={() => {
						signOut({
							callbackUrl: "/",
						});
					}}>
					Logout
				</button>
			</div>

		</div>
	);
};

export default UserInfoHeader;
