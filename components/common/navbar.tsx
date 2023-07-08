import { useRouter } from "next/router";
import { navbarNodesEnum } from "../../models/enums";
import { NavbarNode } from "../../models/types";
import Image from "next/image";

interface Props {
	selectedNode: navbarNodesEnum;
}

const Navbar = ({ selectedNode }: Props) => {
	const nodes: NavbarNode[] = [
		{
			title: navbarNodesEnum.visualizeSuccess,
			step: "Step One",
			url: "org/goals",
			iconPath: "/1.svg",
			selectedIconPath: "/selected-1.svg",
		} as NavbarNode,
		{
			title: navbarNodesEnum.pioneerMigratorSettler,
			step: "Step Two",
			url: "org/products",
			iconPath: "/2.svg",
			selectedIconPath: "/selected-2.svg",
		} as NavbarNode,
		{
			title: navbarNodesEnum.marketPotential,
			step: "Step Three",
			url: "org/market-potential",
			iconPath: "/3.svg",
			selectedIconPath: "/selected-3.svg",
		} as NavbarNode,
		{
			title: navbarNodesEnum.redOceanCanvas,
			step: "Step Four",
			url: "org/red-ocean",
			iconPath: "/4.svg",
			selectedIconPath: "/selected-4.svg",
		} as NavbarNode,
		{
			title: navbarNodesEnum.disruption,
			step: "Step Five",
			url: "org/disruption",
			iconPath: "/5.svg",
			selectedIconPath: "/selected-5.svg",
		} as NavbarNode,
		{
			title: navbarNodesEnum.voiceOfCustomers,
			step: "Step Six",
			url: "org/voice-of-customers",
			iconPath: "/6.svg",
			selectedIconPath: "/selected-6.svg",
		} as NavbarNode,
		{
			title: navbarNodesEnum.blueOceanCanvas,
			step: "Step Seven",
			url: "org/blue-ocean",
			iconPath: "/7.svg",
			selectedIconPath: "/selected-7.svg",
		} as NavbarNode,
		{
			title: navbarNodesEnum.nonCustomers,
			step: "Step Eight",
			url: "org/non-customers",
			iconPath: "/8.svg",
			selectedIconPath: "/selected-8.svg",
		} as NavbarNode,
		{
			title: navbarNodesEnum.stepUpStepDownModel,
			step: "Step Nine",
			url: "org/step-up-step-down",
			iconPath: "/9.svg",
			selectedIconPath: "/selected-9.svg",
		} as NavbarNode,
		{
			title: navbarNodesEnum.roadMap,
			step: "Step Ten",
			url: "org/roadmap",
			iconPath: "/10.svg",
			selectedIconPath: "/selected-10.svg",
		} as NavbarNode,
	];

	const router = useRouter();

	const renderSelectedIcon = (node: NavbarNode, isLastIcon: boolean) => {
		return (
			<li className='flex gap-5 animate-fade-in'>
				<div className='flex gap-2 items-center'>
					<div
						className='cursor-pointer'
						onClick={() => {
							router.push("../" + node.url);
						}}>
						<Image
							src={node.selectedIconPath}
							alt='icon'
							width={85}
							height={85}
						/>
					</div>
					<div>
						<p className='leading-[1.57rem] text-[1.3rem] text-navbar-gray font-semibold'>
							{node.step}
						</p>
						<p className='leading-[1.57rem] text-[1.3rem] font-semibold text-navbar-primary-title'>
							{node.title}
						</p>
					</div>
				</div>
				<div className='max-w-[135px] self-center flex justify-center overflow-hidden'>
					<div className='flex gap-2'>
						{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((dash, dashIndex) => (
							<div
								key={dashIndex}
								className={
									!isLastIcon
										? "w-[0.75rem] h-[1px] border border-primary-300"
										: "w-[0.75rem] h-0"
								}></div>
						))}
					</div>
				</div>
			</li>
		);
	};

	const renderUnselectedIcon = (node: NavbarNode) => {
		return (
			<li
				className='cursor-pointer'
				onClick={() => {
					router.push("../" + node.url);
				}}>
				<Image src={node.iconPath} alt='icon' width={85} height={85} />
			</li>
		);
	};

	return (
		<nav className='w-full flex gap-1 justify-between mb-5'>
			{nodes.map((node, index) => (
				<>
					{node.title === selectedNode && (
						<div className='grow flex items-center'>
							{renderSelectedIcon(node, index === nodes.length - 1)}
						</div>
					)}
					{node.title !== selectedNode && (
						<div className='grow flex items-center'>
							{renderUnselectedIcon(node)}
						</div>
					)}
				</>
			))}
		</nav>
	);
};

export default Navbar;
