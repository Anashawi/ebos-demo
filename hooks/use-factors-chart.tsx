import { useEffect, useState } from "react";
import { ReactGoogleChartProps } from "react-google-charts";
import { ICompetitor, IFactorCompetitor, IProduct } from "../models/types";

const useFactorsChart = (product: IProduct) => {
	const [chart, setChart] = useState<ReactGoogleChartProps>({
		chartType: "Line",
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
			title: product.name,
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
		if (product.competitors?.length) {
			updateChartProps();
		}
	}, [product]);

	return [chart];
};

export default useFactorsChart;
