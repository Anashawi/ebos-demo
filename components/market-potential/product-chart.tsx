import Chart, { ReactGoogleChartProps } from "react-google-charts";
import { IProduct } from "../../models/types";
import { useState, useEffect } from "react";

interface Props {
	product: IProduct;
}

const MarketPotentialProductChart = ({ product }: Props) => {
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
				fontSize: 16, // 12, 18 whatever you want (don't specify px)
			},
			is3D: false,
			backgroundColor: "#eee",
			colors: ["#25AC54", "#3F6BAA", "#FACC15", "orange", "gray"],
			pieHole: 0.4,
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
			chartArea: {
				left: 10,
				top: 40,
				bottom: 40,
				width: "100%",
				height: "100%",
			},
		};
		setChart({ ...chart });
	};

	useEffect(() => {
		updateChartProps();
	}, [product]);

	return (
		<>
			<Chart {...chart} legendToggle />
		</>
	);
};

export default MarketPotentialProductChart;
