import { useEffect, useState } from "react";
import { ReactGoogleChartProps } from "react-google-charts";
import { IProduct } from "../models/types";

const useFuturesChart = (products: IProduct[]) => {
	const [chart, setChart] = useState<ReactGoogleChartProps>({
		chartType: "BubbleChart",
		width: "100%",
		height: "100%",
		options: [],
		data: [],
	});

	useEffect(() => {
		if (products) {
			updateChartProps();
		}
	}, [products]);

	const updateChartProps = () => {
		const rows =
			[...products].map(prod => [...prod.futures ?? []]
				?.sort((a, b) => {
					if (a.year < b.year) return -1;
					return 1;
				})
				.map((future, i) => {
					return [prod.name, i + 1, +future.level, prod.name, future.sales];
				}) ?? []
			).flat(1);

		chart.data = [["Product Name", "Year", "Level", "Product Name", "Sales"], ...rows];

		const ticks: any = products.map(prod => prod.futures?.map((future, i) => {
			return { v: i + 2, f: future.year + "" };
		})).flat();
		console.log("ticks before", ticks);
		const minFutureYear = Math.min(...ticks.map((t: any) => +t.f));
		const maxFutureYear = Math.max(...ticks.map((t: any) => +t.f));

		ticks.unshift({ v: 0, f: minFutureYear - 1 + "" });
		ticks.push({ v: ticks.length + 1, f: maxFutureYear + 1 + "" });
		console.log("ticks after", ticks);

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
			title: "Products",
			legend: {
				position: "right",
				textStyle: {
					fontSize: 14,
				},
			},
			colors: [
				"#046D35",
				"#E51061",
				"#0DB1D7",
				"orange",
				"#FFAA00",
				"gray",
			],
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
				top: 80,
				bottom: 60,
				right: 100,
				width: "100%",
				height: "90%",
			},
		};
		setChart({ ...chart });
	};

	return [chart];
};

export default useFuturesChart;
