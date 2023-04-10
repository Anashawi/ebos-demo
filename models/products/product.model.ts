import { ReactGoogleChartProps } from "react-google-charts";
import { ProductCompetitor } from "./competitor.model";
import { ProductFuture } from "./future.model";
import { ProductFactor } from "./factor.model";

export interface ProductModel {
   id: string;
   name: string;
   competitors: ProductCompetitor[];
   futures: ProductFuture[];
   factors: ProductFactor[];
   chart?: ReactGoogleChartProps;
}
