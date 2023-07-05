import { useRouter } from "next/router";
import { navbarNodesEnum } from "../../models/enums";
import { NavbarNode } from "../../models/types";

interface Props {
	selectedNode: navbarNodesEnum;
}

const Navbar = ({ selectedNode }: Props) => {
	const nodes: NavbarNode[] = [
		{
			title: navbarNodesEnum.visualizeSuccess,
			step: "Step One",
			url: "org/goals",
			icon: "",
		} as NavbarNode,
		{
			title: navbarNodesEnum.pioneerMigratorSettler,
			step: "Step Two",
			url: "org/products",
			icon: "",
		} as NavbarNode,
		{
			title: navbarNodesEnum.marketPotential,
			step: "Step Three",
			url: "org/market-potential",
			icon: "",
		} as NavbarNode,
		{
			title: navbarNodesEnum.redOceanCanvas,
			step: "Step Four",
			url: "org/red-ocean",
			icon: "",
		} as NavbarNode,
		{
			title: navbarNodesEnum.disruption,
			step: "Step Five",
			url: "org/videos",
			icon: "",
		} as NavbarNode,
		{
			title: navbarNodesEnum.voiceOfCustomers,
			step: "Step Six",
			url: "org/customers",
			icon: "",
		} as NavbarNode,
		{
			title: navbarNodesEnum.blueOcean,
			step: "Step Seven",
			url: "org/blue-ocean",
			icon: "",
		} as NavbarNode,
		{
			title: navbarNodesEnum.nonCustomers,
			step: "Step Eight",
			url: "org/non-customers",
			icon: "",
		} as NavbarNode,
		{
			title: navbarNodesEnum.stepUpStepDownModel,
			step: "Step Nine",
			url: "org/step-up-step-down",
			icon: "",
		} as NavbarNode,
		{
			title: navbarNodesEnum.roadMap,
			step: "Step Ten",
			url: "org/road-map",
			icon: "",
		} as NavbarNode,
	];

	const router = useRouter();

	return (
		<nav className='flex-wrap w-full flex gap-5 mb-5'>
			{nodes.map((node, index) => (
				<div key={index}>
					{node.title === selectedNode && (
						<li className='grow max-w-[450px] flex gap-5'>
							<div className='flex gap-5 min-w-[200px]'>
								<div
									className='cursor-pointer'
									onClick={() => {
										router.push("../" + node.url);
									}}>
									{node.icon} icon
								</div>
								<div>
									<p className='text-[1.2rem]'>{node.step}</p>
									<p className='text-[1.2rem]'>{node.title}</p>
								</div>
							</div>
							{/* <div className='w-[60%] h-[2px] self-center border-dashed border border-black'></div> */}
							<div className='grow self-center flex gap-3 overflow-hidden'>
								{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
									(dash, dashIndex) => (
										<div
											key={dashIndex}
											className='w-[1rem] h-[1px] border border-gray-400 text-4xl'></div>
									)
								)}
							</div>
						</li>
					)}
					{node.title !== selectedNode && (
						<li className='min-w-[120px]'>
							<div
								className='cursor-pointer'
								onClick={() => {
									router.push("../" + node.url);
								}}>
								{node.icon} icon
							</div>
						</li>
					)}
				</div>
			))}
		</nav>
	);
};

export default Navbar;
