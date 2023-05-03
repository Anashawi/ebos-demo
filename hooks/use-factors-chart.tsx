import { useEffect, useState } from "react";
import { ReactGoogleChartProps } from "react-google-charts";
import { ICompetitor, IFactorCompetitor, IProduct } from "../models/types";
import { title } from "process";

const useFactorsChart = (product: IProduct) => {
	const [chart, setChart] = useState<ReactGoogleChartProps>({
		chartType: "LineChart",
		width: "100%",
		height: "100%",
		options: {},
		data: [],
	});
	const updateChartProps = () => {
		const rows =
			product.factors?.map((factor) => {
				return [
					factor.name,
					...(product.competitors ?? ([] as ICompetitor[])).map(
						(comp: ICompetitor, index) => {
							if (factor.competitors[index]) {
								return +factor.competitors[index].value;
							}
							return 1;
						}
					),
				];
			}) ?? [];
		chart.data = [
			["Factor", ...(product.competitors?.map((comp) => comp.name) ?? [])],
			...rows,
		];
		chart.options = {
			title: `Red Ocean: ${product.name}`,
			titleTextStyle: {
				fontSize: 12, // 12, 18 whatever you want (don't specify px),
			},
			is3D: false,
			backgroundColor: "#eee",
			colors: ["#046D35", "#E51061", "#0DB1D7", "#E51061", "#FFAA00", "gray"],
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
				ticks: [{ v: "1", f: "Poor" }, { v: "2", f: "Moderate" }, { v: "3", f: "Good" }, { v: "4", f: "Excellent" }] as any,
				title: "Competency Level",
			},
			hAxis: {
				title: "Competency Factors"
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

export default useFactorsChart;
