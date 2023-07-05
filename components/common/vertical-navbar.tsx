import Image from "next/image";
import Link from "next/link";

const VerticalNavbar = () => {
	return (
		<nav className='h-[85%] flex flex-col gap-10 justify-between items-center p-5 py-12 bg-white rounded-full'>
			<ul className='flex flex-col gap-10 items-center'>
				<li>
					<Link href='/'>
						<Image
							width='50'
							height='30'
							src='/ilogo.webp'
							alt='CaseInPoint'
						/>
					</Link>
				</li>
				<li>
					<Link href='/'>Another Page</Link>
				</li>
			</ul>
			<li className='rounded-full bg-slate-400 w-[5rem] h-[5rem]'>
				{/* <Image src='' alt='Profile Pic' /> */}
			</li>
		</nav>
	);
};

export default VerticalNavbar;
