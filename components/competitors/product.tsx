import {
   faEyeSlash,
   faTrash,
   faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FieldArray, Field, ErrorMessage } from "formik";
import Chart, { ReactGoogleChartProps } from "react-google-charts";
import Spinner from "../common/spinner";
import { ProductModel } from "../../models/products/product";
import { NextPage } from "next";
import { useEffect, useMemo, useState } from "react";

type Props = {
   product: ProductModel;
   index: number;
   onRemove: any;
   formUtilities: any;
};

const CompetitorsProduct: NextPage<Props> = ({
   product,
   index,
   onRemove,
   formUtilities,
}) => {
   const [chart, setChart] = useState<ReactGoogleChartProps>({
      chartType: "PieChart",
      width: "100%",
      height: "400px",
      options: [],
      data: [],
   });
   const updateChartProps = () => {
      const rows = product.competitors?.map((comp) => [
         comp.name,
         comp.marketShare,
      ]);
      chart.data = [["Competitor", "Market share"], ...rows];

      chart.options = {
         title: "",
         is3D: true,
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
         chartArea: { left: 50, top: 20, width: "100%", height: "100%" },
      };
      setChart({ ...chart });
   };

   useEffect(() => {
      updateChartProps();
   }, [product]);

   const emptyCompetitor = useMemo(() => {
      return {
         id: "0",
         name: "",
         marketShare: 0,
      };
   }, []);

   return (
      <div className='flex justify-between'>
         <div className='md:w-[66%] pr-12'>
            <div key={index} className='border shadow p-10'>
               <div className='flex justify-end mb-10'>
                  <FontAwesomeIcon
                     onClick={onRemove}
                     className='w-9 cursor-pointer text-rose-200 hover:text-rose-500'
                     icon={faEyeSlash}
                  />
               </div>
               <FieldArray name={`products.${index}.competitors`}>
                  {({ remove, push }) => (
                     <>
                        <ul className='flex flex-col gap-5 mb-10 pr-5 bg-white h-[315px] overflow-y-auto'>
                           {!!product.competitors?.length &&
                              product.competitors.map((comp, compIndex) => (
                                 <li
                                    key={compIndex}
                                    className='flex gap-5 border-b border-gray-400 pb-7 spacedout'>
                                    {compIndex > 0 && (
                                       <>
                                          <div className='w-full md:w-1/2'>
                                             <label>
                                                Competitor {compIndex}
                                             </label>
                                             <Field
                                                type='text'
                                                placeholder='name'
                                                className='w-full comp-name p-3 bg-gray-100 outline-none caret-dark-blue border-none'
                                                name={`products.${index}.competitors.${compIndex}.name`}
                                             />
                                             <ErrorMessage
                                                name={`products.${index}.competitors.${compIndex}.name`}>
                                                {(msg) => (
                                                   <div className='text-lg text-rose-500'>
                                                      {msg}
                                                   </div>
                                                )}
                                             </ErrorMessage>
                                          </div>
                                       </>
                                    )}
                                    {compIndex === 0 && (
                                       <>
                                          <div className='w-full md:w-1/2'>
                                             <label>My Product</label>
                                             <Field
                                                type='text'
                                                placeholder='product name'
                                                className='opacity-60 pointer-events-none w-full comp-name p-3 bg-gray-100 outline-none caret-dark-blue border-none'
                                                name={`products.${index}.name`}
                                                readOnly
                                             />
                                          </div>
                                       </>
                                    )}
                                    <div className='w-full md:w-1/2'>
                                       <label>
                                          {compIndex === 0 ? (
                                             <span>My</span>
                                          ) : null}{" "}
                                          Market share (USD)
                                       </label>
                                       <div className='flex flex-wrap'>
                                          <span className='inline-block p-3 bg-yellow-jasmine rounded-prefix'>
                                             $
                                          </span>
                                          <Field
                                             type='number'
                                             placeholder='percentage'
                                             className='grow comp-share p-3 bg-gray-100 outline-none caret-dark-blue border-none'
                                             name={`products.${index}.competitors.${compIndex}.marketShare`}
                                             min='0'
                                             max='100'
                                          />
                                          <ErrorMessage
                                             name={`products.${index}.competitors.${compIndex}.marketShare`}>
                                             {(msg) => (
                                                <div className='w-full text-lg text-rose-500'>
                                                   {msg}
                                                </div>
                                             )}
                                          </ErrorMessage>
                                       </div>
                                    </div>
                                    {compIndex > 0 && (
                                       <FontAwesomeIcon
                                          icon={faTrash}
                                          onClick={() => {
                                             remove(compIndex);
                                          }}
                                          className='w-5 h-auto cursor-pointer text-rose-200 hover:text-rose-800'
                                       />
                                    )}
                                 </li>
                              ))}
                           <div>
                              {typeof formUtilities.errors?.competitors ===
                                 "string" && (
                                 <p className='text-rose-500'>
                                    {formUtilities.errors.competitors}
                                 </p>
                              )}
                           </div>
                           <div className='flex justify-center'>
                              <button
                                 type='button'
                                 onClick={() => {
                                    push(emptyCompetitor);
                                 }}
                                 className='inline-flex items-center gap-3 text-lg p-3 mb-7 btn blue-gradient text-black-eerie hover:text-white'>
                                 <FontAwesomeIcon
                                    className='w-7 h-auto cursor-pointer text-white'
                                    icon={faCirclePlus}
                                 />
                              </button>
                           </div>
                        </ul>
                        <div className='flex justify-between items-center'>
                           <button
                              type='submit'
                              className={
                                 formUtilities.isSubmitting ||
                                 !formUtilities.isValid
                                    ? "btn-rev btn-disabled"
                                    : "btn-rev"
                              }
                              disabled={
                                 formUtilities.isSubmitting ||
                                 !formUtilities.isValid
                              }>
                              Generate
                           </button>
                           {formUtilities.isSubmitting && (
                              <Spinner
                                 className=''
                                 message='Saving Competitors'
                              />
                           )}
                        </div>
                     </>
                  )}
               </FieldArray>
            </div>
         </div>
         <div className='flex flex-col justify-between gap-12 md:w-[34%] px-10'>
            <h1 className='text-white text-4xl'>{product.name}</h1>
            <Chart {...chart} legendToggle />
         </div>
      </div>
   );
};

export default CompetitorsProduct;
