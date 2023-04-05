import { ReactGoogleChartProps } from "react-google-charts";
import { ProductCompetitor } from "./competitor";
import { ProductFuture } from "./future";

export class ProductModel {
   id!: string;
   name!: string;
   competitors!: ProductCompetitor[];
   futures!: ProductFuture[];
   hasAddFutureCallback!: boolean;
   chart?: ReactGoogleChartProps;
}
