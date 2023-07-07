import Image from "next/image";
import Link from "next/link";

const VerticalNavbar = () => {
	return (
		<nav className='h-[85%] w-[100px] flex flex-col gap-10 justify-between items-center p-5 py-12 bg-white rounded-full'>
			<ul className='flex flex-col gap-5 items-center'>
				<li className='w-full'>
					<Link href='/'>
						<Image
							width='100'
							height='100'
							src='/ilogo.webp'
							alt='CaseInPoint'
							className='w-full h-auto'
						/>
					</Link>
				</li>
				<li className='w-full'>
					<Link href='/'>
						<Image
							width='100'
							height='100'
							src='/dashboard.svg'
							alt='Dashboard'
							className='w-full h-auto'
						/>
					</Link>
				</li>
				<li className='w-full'>
					<Link href='/'>
						<Image
							width='100'
							height='100'
							src='/dashboard.svg'
							alt='Dashboard'
							className='w-full h-auto'
						/>
					</Link>
				</li>
				<li className='w-full'>
					<Link href='/'>
						<Image
							width='100'
							height='100'
							src='/dashboard.svg'
							alt='Dashboard'
							className='w-full h-auto'
						/>
					</Link>
				</li>
			</ul>
			<li className='rounded-full bg-slate-400 w-[5rem] h-[5rem]'>
				{/* <Image src='' alt='Profile Pic' /> */}
			</li>
		</nav>
	);
};

export default VerticalNavbar;
