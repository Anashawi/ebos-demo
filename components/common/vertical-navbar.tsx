import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const VerticalNavbar = () => {
	const { data: session }: any = useSession();
	console.log("session", session);
	return (
		<nav className='h-[85%] w-[100px] flex flex-col gap-10 justify-between items-center p-5 py-12 bg-white rounded-full'>
			<ul className='flex flex-col gap-5 items-center'>
				<li className='w-full flex justify-center'>
					<Link href='/'>
						<Image
							width='55'
							height='55'
							src='/cp.svg'
							alt='CaseInPoint'
						/>
					</Link>
				</li>
				<li className='w-full flex justify-center'>
					<Link href='/'>
						<Image
							width='55'
							height='55'
							src='/dashboard.svg'
							alt='Dashboard'
							className='w-full h-auto'
						/>
					</Link>
				</li>
				<li className='w-full flex justify-center'>
					<Link href='/'>
						<Image
							width='55'
							height='55'
							src='/settings.svg'
							alt='Settings'
							className='w-full h-auto'
						/>
					</Link>
				</li>
				<li className='w-full flex justify-center'>
					<Link href='/'>
						<Image
							width='55'
							height='55'
							src='/consultations.svg'
							alt='Consultations'
							className='w-full h-auto'
						/>
					</Link>
				</li>
			</ul>
			<li
				onClick={() => {
					signOut({
						callbackUrl: "/",
					});
				}}
				className='rounded-full bg-slate-400 w-[5rem] h-[5rem]'>
				{session?.user?.profilePic && (
					<Image
						src={session.user.profilePic}
						alt='Profile Pic'
						width={55}
						height={55}
					/>
				)}
			</li>
		</nav>
	);
};

export default VerticalNavbar;
