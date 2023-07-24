import Chart, { ReactGoogleChartProps } from "react-google-charts";
import { useState, useEffect } from "react";
import { IUserIdeas } from "../../models/user-idea";

interface Props {
	userIdeas: IUserIdeas;
}

const RoadmapChart = ({ userIdeas }: Props) => {
	const [chart, setChart] = useState<ReactGoogleChartProps>({
		chartType: "Timeline",
		width: "100%",
		height: "100%",
		options: {},
		data: [],
	});
	const updateChartProps = () => {
		const rows =
			userIdeas.ideas?.map((idea) => {
				const startMonthDate = new Date(idea.startMonth);
				const endMonthDate = new Date(idea.startMonth).setMonth(
					startMonthDate.getMonth() + +idea.durationInMonths
				);
				return [idea.name, startMonthDate, endMonthDate];
			}) ?? [];
		chart.data = [["Idea", "Start Month", "End Month"], ...rows];
		const dynamicHeight = (userIdeas.ideas?.length + 1 ?? 0) * 44 + 3;
		chart.options = {
			title: "Ideas Timeline",
			height: dynamicHeight,
			titleTextStyle: {
				// color: <string>,    // any HTML string color ('red', '#cc00cc')
				// fontName: <string>, // i.e. 'Times New Roman'
				fontSize: 16, // 12, 18 whatever you want (don't specify px)
				// {/* bold: <boolean>,    // true or false
				// italic: <boolean>   // true of false */}
			},
			colors: ["#FFDA57", "#FDC10E", "#1CE6A1"],
			vAxis: {
				ticks: [
					{ v: "1", f: "Poor" },
					{ v: "2", f: "Migrator" },
					{ v: "3", f: "Settler" },
				] as any,
			},
		};
		setChart({ ...chart });
	};

	useEffect(() => {
		if (userIdeas.ideas?.length) {
			updateChartProps();
		}
	}, [userIdeas]);

	return (
		<div className='shadow h-full'>
			<Chart {...chart} legendToggle />
		</div>
	);
};

export default RoadmapChart;
