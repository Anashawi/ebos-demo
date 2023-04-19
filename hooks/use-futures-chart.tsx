import { useEffect, useState } from "react";
import { ReactGoogleChartProps } from "react-google-charts";
import { IProduct } from "../models/types";

const useFuturesChart = (product: IProduct) => {
	const [chart, setChart] = useState<ReactGoogleChartProps>({
		chartType: "BubbleChart",
		width: "100%",
		height: "100%",
		options: [],
		data: [],
	});

	useEffect(() => {
		updateChartProps();
	}, [product]);

	const updateChartProps = () => {
		const rows = product.futures
			.sort((a, b) => {
				if (a.year < b.year) return -1;
				return 1;
			})
			.map((n, i) => {
				return ["", i + 1, +n.level, n.sales];
			});

		chart.data = [["Product", "Year", "Level", "Sales"], ...rows];
		const ticks: any = product.futures?.map((future, i) => {
			return {
				v: i + 1,
				f: future.year.toString(),
			};
		});
		const vAxisTicks: any = [
			{
				v: 1,
				f: "Settler",
			},
			{
				v: 2,
				f: "Migrate",
			},
			{
				v: 3,
				f: "Pioneer",
			},
		];

		chart.options = {
			title: product.name,
			colors: ["#FFDA57", "#FDC10E", "#1CE6A1"],
			legend: {
				position: "right",
				textStyle: {
					fontSize: 14,
				},
			},
			tooltip: {
				trigger: "none",
			},
			hAxis: {
				textStyle: {
					bold: true,
				},
				allowContainerBoundaryTextCutoff: false,
				gridlines: {
					color: "#eee",
				},
				baseline: 0,
				maxValue: product.futures?.length + 1,
				ticks: ticks,
			},
			vAxis: {
				baseline: 0,
				maxValue: 4,
				ticks: vAxisTicks,
				gridlines: {
					color: "#eee",
				},
			},
			bubble: {
				textStyle: {
					fontSize: 11,
				},
			},
			chartArea: {
				left: 80,
				top: 0,
				width: "100%",
				height: "90%",
			},
		};
		setChart({ ...chart });
	};

	return [chart];
};

export default useFuturesChart;
