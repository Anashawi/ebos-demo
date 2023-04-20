import { useEffect, useState } from "react";
import { ReactGoogleChartProps } from "react-google-charts";
import { IProduct } from "../models/types";

const useCompetitorsChart = (product: IProduct) => {
	const [chart, setChart] = useState<ReactGoogleChartProps>({
		chartType: "PieChart",
		width: "100%",
		height: "100%",
		options: [],
		data: [],
	});
	const updateChartProps = () => {
		const rows =
			product.competitors?.map((comp) => [comp.name, comp.marketShare]) ??
			[];
		chart.data = [["Competitor", "Market share"], ...rows];

		chart.options = {
			title: product.name,
			titleTextStyle: {
				// color: <string>,    // any HTML string color ('red', '#cc00cc')
				// fontName: <string>, // i.e. 'Times New Roman'
				fontSize: 16, // 12, 18 whatever you want (don't specify px)
				// {/* bold: <boolean>,    // true or false
				// italic: <boolean>   // true of false */}
			},
			is3D: true,
			legend: {
				position: "right",
				alignment: "start",
				textStyle: {
					fontSize: 14,
				},
			},
			tooltip: { trigger: "none" },
			bubble: {
				textStyle: {
					fontSize: 11,
				},
			},
			chartArea: { left: 50, top: 70, width: "100%", height: "100%" },
		};
		setChart({ ...chart });
	};

	useEffect(() => {
		updateChartProps();
	}, [product]);

	return [chart];
};

export default useCompetitorsChart;
