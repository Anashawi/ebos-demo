import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const VerticalNavbar = () => {
	const { data: session }: any = useSession();
	console.log("session", session);
	return (
		<nav className='h-[85%] w-[102px] flex flex-col gap-10 justify-between items-center px-5 py-10 bg-white rounded-full'>
			<ul className='flex flex-col gap-10'>
				<li className='flex justify-center hover:animate-shake'>
					<Link href='/'>
						<Image
							width='55'
							height='55'
							src='/cp.svg'
							alt='CaseInPoint'
						/>
					</Link>
				</li>
				<li className='flex justify-center hover:animate-shake'>
					<Link href='/'>
						<Image
							width='42'
							height='42'
							src='/dashboard.svg'
							alt='Dashboard'
						/>
					</Link>
				</li>
				<li className='flex justify-center hover:animate-shake'>
					<Link href='/'>
						<Image
							width='42'
							height='42'
							src='/settings.svg'
							alt='Settings'
						/>
					</Link>
				</li>
				<li className='flex justify-center hover:animate-shake'>
					<Link href='/'>
						<Image
							width='45'
							height='45'
							src='/consultations.svg'
							alt='Consultations'
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
						width={42}
						height={42}
					/>
				)}
			</li>
		</nav>
	);
};

export default VerticalNavbar;
