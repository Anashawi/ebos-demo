import {
   faEyeSlash,
   faTrash,
   faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FieldArray, Field, ErrorMessage } from "formik";
import Chart, { ReactGoogleChartProps } from "react-google-charts";
import Spinner from "../common/spinner";
import { ProductModel } from "../../models/products/product.model";
import { NextPage } from "next";
import { useEffect, useMemo, useState } from "react";
import { ProductCompetitor } from "../../models/products/competitor.model";
import factorValueOptions from "../../samples/lookups/factor-value-options.json";

type Props = {
   product: ProductModel;
   index: number;
   onRemove: any;
   formUtilities: any;
};

const FactorsProduct: NextPage<Props> = ({
   product,
   index,
   onRemove,
   formUtilities,
}) => {
   const [chart, setChart] = useState<ReactGoogleChartProps>({
      chartType: "Line",
      width: "100%",
      height: "400px",
      options: [],
      data: [],
   });
   const updateChartProps = () => {
      const rows = product.factors?.map((factor) => {
         console.log([
            factor.name,
            ...factor.competitors.map((comp) => comp.value),
         ]);
         return [factor.name, ...factor.competitors.map((comp) => +comp.value)];
      });
      chart.data = [
         ["Factor", ...product.competitors.map((comp) => comp.name)],
         ...rows,
      ];
      console.log(chart.data);
      const hAxisTicks: any = [
         {
            v: "1",
            f: "Speed",
         },
         {
            v: "2",
            f: "Network",
         },
         {
            v: "3",
            f: "Price",
         },
      ];
      const vAxisTicks: any = [
         {
            v: 1,
            f: "poor",
         },
         {
            v: 2,
            f: "migrator",
         },
         {
            v: 3,
            f: "settler",
         },
      ];
      chart.options = {
         title: "",
         hAxis: {
            minValue: 1,
            maxValue: 15,
            ticks: hAxisTicks,
         },
         vAxis: {
            minValue: 1,
            maxValue: 20,
            ticks: vAxisTicks,
         },
         tooltip: { trigger: "none" },
         chartArea: { left: 50, top: 20, width: "100%", height: "100%" },
      };
      setChart({ ...chart });
   };

   useEffect(() => {
      updateChartProps();
   }, [product]);

   const emptyFactor = useMemo(() => {
      return {
         id: "0",
         name: "",
         competitors: product.competitors.map((comp) => {
            return {
               id: "0",
               value: 1,
            };
         }),
      };
   }, []);

   return (
      <div className='flex justify-between'>
         <div className='md:w-1/2 pr-12'>
            <div key={index} className='border shadow p-10'>
               <div className='flex justify-between mb-10'>
                  <h2 className='text-2xl font-normal'>{product.name}</h2>
                  <FontAwesomeIcon
                     onClick={onRemove}
                     className='w-9 cursor-pointer text-rose-200 hover:text-rose-500'
                     icon={faEyeSlash}
                  />
               </div>
               <FieldArray name={`products.${index}.factors`}>
                  {({ remove, push }) => (
                     <>
                        <ul className='flex flex-col gap-5 mb-10 pr-5 bg-white h-[350px] overflow-y-auto'>
                           {!!product.factors?.length &&
                              product.factors.map((factor, factorIndex) => (
                                 <li
                                    key={factorIndex}
                                    className='flex gap-5 items-start border-b border-gray-400 pb-7 spacedout'>
                                    <div className=''>
                                       <label>Factor</label>
                                       <Field
                                          type='text'
                                          placeholder='name'
                                          className='w-full factor-name p-3 bg-gray-100 outline-none caret-dark-blue border-none'
                                          name={`products.${index}.factors.${factorIndex}.name`}
                                       />
                                       <ErrorMessage
                                          name={`products.${index}.factors.${factorIndex}.name`}>
                                          {(msg) => (
                                             <div className='text-lg text-rose-500'>
                                                {msg}
                                             </div>
                                          )}
                                       </ErrorMessage>
                                    </div>
                                    <div className='flex-1 flex gap-5'>
                                       {product.competitors.map(
                                          (
                                             comp: ProductCompetitor,
                                             compIndex: number
                                          ) => (
                                             <div
                                                key={compIndex}
                                                className='flex-1 flex flex-col'>
                                                <label>{comp.name}</label>
                                                <Field
                                                   as='select'
                                                   placeholder={`products.${index}.factors.${factorIndex}.competitors.${index}.value`}
                                                   className='grow p-3 bg-gray-100 outline-none caret-dark-blue border-none'
                                                   name={`products.${index}.factors.${factorIndex}.competitors.${compIndex}.value`}>
                                                   {factorValueOptions.map(
                                                      (option: any) => (
                                                         <option
                                                            key={option.id}
                                                            value={
                                                               +option.value
                                                            }>
                                                            {
                                                               option.displayValue
                                                            }
                                                         </option>
                                                      )
                                                   )}
                                                </Field>
                                                <ErrorMessage
                                                   name={`products.${index}.factors.${factorIndex}.competitors.${index}.value`}>
                                                   {(msg) => (
                                                      <div className='w-full text-lg text-rose-500'>
                                                         {msg}
                                                      </div>
                                                   )}
                                                </ErrorMessage>
                                             </div>
                                          )
                                       )}
                                    </div>

                                    <FontAwesomeIcon
                                       icon={faTrash}
                                       onClick={() => {
                                          remove(factorIndex);
                                       }}
                                       className='self-center w-5 h-auto cursor-pointer text-rose-200 hover:text-rose-800'
                                    />
                                 </li>
                              ))}
                           <div className='flex justify-center'>
                              <button
                                 type='button'
                                 onClick={() => {
                                    console.log("emptyFactor", emptyFactor);
                                    push(emptyFactor);
                                 }}
                                 className='inline-flex items-center gap-3 mb-5 text-lg p-3 btn blue-gradient text-black-eerie hover:text-white'>
                                 <FontAwesomeIcon
                                    className='w-7 h-auto cursor-pointer text-white'
                                    icon={faCirclePlus}
                                 />
                              </button>
                           </div>
                        </ul>
                     </>
                  )}
               </FieldArray>
            </div>
         </div>
         <div className='flex flex-col justify-between gap-12 md:w-1/2 px-10'>
            <h1 className='text-white text-4xl'>{product.name}</h1>
            <Chart {...chart} legendToggle />
         </div>
      </div>
   );
};

export default FactorsProduct;
