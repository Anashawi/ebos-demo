import Chart, { ReactGoogleChartProps } from "react-google-charts";
import { IProduct } from "../../models/types";
import { useState, useEffect } from "react";

interface Props {
	product: IProduct;
}

const RedOceanProductChart = ({ product }: Props) => {
	const [chart, setChart] = useState<ReactGoogleChartProps>({
		chartType: "LineChart",
		width: "100%",
		height: "100%",
		options: {},
		data: [],
	});
	const updateChartProps = () => {
		const competitors =
			product.competitors?.filter((c) => !c.isUntapped) ?? [];

		const rows =
			product.factors?.map((factor) => {
				return [
					factor.name,
					...competitors.map((comp, index) => {
						if (factor.competitors[index]) {
							return +factor.competitors[index].value;
						}
						return 1;
					}),
				];
			}) ?? [];
		chart.data = [
			["Factor", ...(competitors?.map((comp) => comp.name) ?? [])],
			...rows,
		];
		chart.options = {
			title: `Red Ocean: ${product.name}`,
			titleTextStyle: {
				fontSize: 12, // 12, 18 whatever you want (don't specify px)
				bold: true,
			},
			is3D: false,
			backgroundColor: "#f0f0f0",
			colors: ["#046D35", "#E51061", "#0DB1D7", "orange", "#FFAA00", "gray"],
			legend: {
				position: "right",
				alignment: "start",
				textStyle: {
					fontSize: 10,
				},
			},
			tooltip: { trigger: "none" },
			bubble: {
				textStyle: {
					fontSize: 11,
				},
			},
			vAxis: {
				ticks: [
					{ v: "1", f: "Poor" },
					{ v: "2", f: "Moderate" },
					{ v: "3", f: "Good" },
					{ v: "4", f: "Excellent" },
				] as any,
				title: "Competency Level",
				textStyle: {
					fontSize: 12,
				},
			},
			hAxis: {
				title: "Competency Factors",
			},
			chartArea: {
				left: 100,
				top: 70,
				bottom: 60,
				right: 100,
				width: "100%",
				height: "100%",
			},
		};
		setChart({ ...chart });
	};

	useEffect(() => {
		if (product.competitors?.length) {
			updateChartProps();
		}
	}, [product]);

	return (
		<>
			<Chart {...chart} legendToggle />
		</>
	);
};

export default RedOceanProductChart;
