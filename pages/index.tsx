import Login from "../components/auth/login";
import Signup from "../components/auth/signup";
import Modal from "../components/common/modal";
import DesktopHomepage from "../components/homepage/desktop-homepage";
import PhabletHomepage from "../components/homepage/phablet-homepage";
import { useEffect, useState } from "react";
import useModalToggler from "../hooks/use-modal-toggler";

export default function Home() {
	const nodes = [
		{
			text: "Visualize success",
			url: "app/goals",
		},
		{
			text: "Pioneer Migrator Settler",
			url: "app/products",
		},
		{
			text: "Market potential",
			url: "app/market-potential",
		},
		{
			text: "Red ocean canvas",
			url: "app/red-ocean",
		},
		{
			text: "Disruption",
			url: "app/videos",
		},
		{
			text: "Voice of customers",
			url: "app/customers",
		},
		{
			text: "Blue ocean",
			url: "app/blue-ocean",
		},
		{
			text: "Non customers",
			url: "app/non-customers",
		},
		{
			text: "Step-up, Step-down model",
			url: "app/step-up-step-down",
		},
		{
			text: "Road map",
			url: "app/road-map",
		},
	];

	const [currentScreenWidth, setCurrentScreenWidth] = useState(0);
	const [originalScreenWidth, setOriginalScreenWidth] = useState(0);
	const [isScreenSmall, setIsScreenSmall] = useState(false);

	useEffect(() => {
		setOriginalScreenWidth(window.screen.width);
		setCurrentScreenWidth(window.innerWidth);
		if (currentScreenWidth <= 1200) {
			setIsScreenSmall(true);
		} else {
			setIsScreenSmall(false);
		}
		window.addEventListener("resize", () => {
			setCurrentScreenWidth(window.innerWidth);
			if (currentScreenWidth <= 1250) {
				setIsScreenSmall(true);
			} else {
				setIsScreenSmall(false);
			}
		});
	});

	const [isSignupOn, toggleSignupModal] = useModalToggler();
	const [isLoginOn, toggleLoginModal] = useModalToggler();

	return (
		<>
			<div className='relative flex flex-col justify-center items-center homepage-bg-gradient pt-[10rem] pb-5 h-screen mx-auto'>
				{isScreenSmall && <PhabletHomepage nodes={nodes} />}
				{!isScreenSmall && (
					<DesktopHomepage
						nodes={nodes}
						originalScreenWidth={originalScreenWidth}
						currentScreenWidth={currentScreenWidth}
						openLoginScreen={() => {
							toggleLoginModal(true);
						}}
						openSignupScreen={() => {
							toggleSignupModal(true);
						}}
					/>
				)}

				{/* login modal */}
				<Modal
					config={{
						isShown: isLoginOn,
						closeCallback: toggleLoginModal,
						className: "w-full min-w-[320px] max-w-[700px] p-5",
					}}>
					<Login closeCallback={toggleLoginModal} />
				</Modal>

				{/* signup modal */}
				<Modal
					config={{
						isShown: isSignupOn,
						closeCallback: toggleSignupModal,
						className: "w-full min-w-[320px] max-w-[700px]",
					}}>
					<Signup closeCallback={toggleSignupModal} />
				</Modal>
			</div>
		</>
	);
}
