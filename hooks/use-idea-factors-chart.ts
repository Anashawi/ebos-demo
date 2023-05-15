import { useEffect, useState } from "react";
import { ReactGoogleChartProps } from "react-google-charts";
import { ICompetitor, IProduct } from "../models/types";

const useIdeaFactorsChart = (product: IProduct) => {
	const [chart, setChart] = useState<ReactGoogleChartProps>({
		chartType: "LineChart",
		width: "100%",
		height: "100%",
		options: {},
		data: [],
	});
	const updateChartProps = () => {

		const competitors = product.competitors?.filter(c => !c.isUntapped) ?? [];

		const rows =
			product.ideaFactors?.map((ideaFactor) => {
				return [
					ideaFactor.name,
					...competitors.map(
						(comp: ICompetitor, index) => {
							if (ideaFactor.competitors[index]) {
								return +ideaFactor.competitors[index].value;
							}
							return 1;
						}
					),
				];
			}) ?? [];
		chart.data = [
			["IdeaFactor", ...(competitors?.map((comp) => comp.name) ?? [])],
			...rows,
		];
		chart.options = {
			title: `Blue Ocean: ${product.name}`,
			titleTextStyle: {
				fontSize: 12, // 12, 18 whatever you want (don't specify px),
			},
			is3D: false,
			backgroundColor: "#eee",
			colors: [
				"#046D35",
				"#E51061",
				"#0DB1D7",
				"orange",
				"#FFAA00",
				"gray",
			],
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
				// title: "Competency Level",
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

	return [chart];
};

export default useIdeaFactorsChart;
