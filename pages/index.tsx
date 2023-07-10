import { signOut, useSession } from "next-auth/react";
import Login from "../components/auth/login";
import Signup from "../components/auth/signup";
import Modal from "../components/common/modal";
import useModalToggler from "../hooks/use-modal-toggler";
import { faCirclePlay, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
	const { data: session }: any = useSession();

	const [isSignupOn, toggleSignupModal] = useModalToggler();
	const [isLoginOn, toggleLoginModal] = useModalToggler();

	const router = useRouter();

	useEffect(() => {
		if (session?.user?.id) {
			router.push("/org/goals");
		}
	}, [session]);

	return (
		<>
			<div className='flex flex-col items-center bg-dark-50 h-screen'>
				<div className='w-[93.45vw] h-screen m-auto pb-10 flex bg-white rounded-3xl'>
					<div className='xl:w-[50%] px-10 py-10'>
						<div className='w-[70%] mx-auto flex flex-col gap-[4rem]'>
							<Image
								src='/CIP-Logo-Grey.svg'
								width={120}
								height={70}
								alt='CIP Logo'
							/>
							<div className='flex flex-col gap-10'>
								<h1 className='text-[5rem] text-onyx font-hero-medium leading-[5.75rem]'>
									Exponential Project Tracking & Management
								</h1>
								<h4 className='text-dark-300 text-3xl leading-[2.9rem]'>
									Take full control of your project goals and tasks and
									achieve exponential growth with the EBOS tool
								</h4>
								<div className='w-[90%] p-3 flex gap-9 items-center rounded-full bg-dark'>
									<div className='w-[6rem] h-[6rem] rounded-full'>
										<Image
											src='/bulb.svg'
											alt='Introductory Video'
											width='100'
											height='100'
										/>
									</div>
									<p className='grow text-white'>
										Watch Introductory Video
									</p>
									<div className='cursor-pointer hover:scale-[110%] transition duration-100 pr-5'>
										<FontAwesomeIcon
											className='w-[4rem] h-auto text-dark bg-white rounded-full p-[1.3px]'
											icon={faCirclePlay}
										/>
									</div>
								</div>
								<div className='w-[90%] gap-7 flex justify-between'>
									<div
										onClick={() => toggleSignupModal()}
										className='w-[55%] pl-10 pr-5 py-[0.8rem] flex gap-10 items-center rounded-full bg-primary-400 cursor-pointer hover:shadow-lg transition duration-200'>
										<p className='grow text-white'>Register</p>
										<div className='p-2 bg-primary-400 rounded-full border border-gray-200'>
											<FontAwesomeIcon
												className='w-[1rem] h-[1rem] text-gray-200 rounded-full'
												icon={faAngleRight}
											/>
										</div>
									</div>
									<div
										onClick={() => toggleLoginModal()}
										className='w-[45%] pl-10 pr-5 py-[0.8rem] flex gap-10 items-center rounded-full bg-dark-200 cursor-pointer hover:shadow-lg transition duration-200'>
										<p className='grow text-white'>Log In</p>
										<div className='p-2 bg-dark-200 rounded-full border border-gray-200'>
											<FontAwesomeIcon
												className='w-[1rem] h-[1rem] text-gray-200 rounded-full'
												icon={faAngleRight}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='hidden xl:block w-[50%] bg-[url("/Bars.svg")] bg-no-repeat bg-cover'></div>
				</div>
			</div>

			{/* login modal */}
			<Modal
				config={{
					isShown: isLoginOn,
					closeCallback: () => toggleLoginModal(false),
					className: "w-full min-w-[320px] max-w-[700px] p-5",
				}}>
				<Login
					closeCallback={() => {
						toggleLoginModal(false);
					}}
				/>
			</Modal>

			{/* signup modal */}
			<Modal
				config={{
					isShown: isSignupOn,
					closeCallback: () => toggleSignupModal(false),
					className: "w-full min-w-[320px] max-w-[700px]",
				}}>
				<Signup closeCallback={() => toggleSignupModal(false)} />
			</Modal>
		</>
	);
}
