import { useEffect, useState } from "react";
import { ReactGoogleChartProps } from "react-google-charts";
import { IIdea } from "../models/types";

const useRoadMapChart = (ideas: IIdea[]) => {
	const [chart, setChart] = useState<ReactGoogleChartProps>({
		chartType: "Timeline",
		width: "100%",
		height: "100%",
		options: {},
		data: [],
	});
	const updateChartProps = () => {
		const rows =
			ideas?.map((idea) => {
				const startMonthDate = new Date(idea.startMonth);
				const endMonthDate = new Date(idea.startMonth).setMonth(startMonthDate.getMonth() + +idea.durationInMonths)
				return [
					idea.name,
					startMonthDate,
					endMonthDate,
				];
			}) ?? [];
		chart.data = [
			["Idea", "Start Month", "End Month"],
			...rows,
		];
		chart.options = {
			title: "Ideas Timeline",
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
		if (ideas?.length) {
			updateChartProps();
		}
	}, [ideas]);

	return [chart];
};

export default useRoadMapChart;
