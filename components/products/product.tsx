import objectPath from "object-path";
import { ProductModel } from "../../models/products/product.model";
import { NextPage } from "next";
import { ErrorMessage, Field, FieldArray } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Chart, { ReactGoogleChartProps } from "react-google-charts";
import {
   faCirclePlus,
   faMinusCircle,
   faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useMemo, useState } from "react";
import { ConfirmDialog } from "../../models/common/confirm-dialog.model";
import useConfirmDialog from "../../hooks/use-confirm-dialog";
import ConfirmModal from "../common/confirm-dialog";

type Props = {
   product: ProductModel;
   index: number;
   onRemove: any;
};

const Product: NextPage<Props> = ({ product, index, onRemove }) => {
   let deleteConfig: ConfirmDialog = {
      isShown: false,
      title: "Delete Product",
      confirmMessage: "Are you sure to delete this product ?",
      okBtnText: "Delete",
      cancelBtnText: "Cancel",
      okCallback: () => {},
      closeCallback: () => {},
   };
   const [deleteDialogConfig, toggleDeleteDialog] = useConfirmDialog();

   const emptyFuture = useMemo(() => {
      return {
         id: 0,
         product_id: 0,
         year: (product.futures[product.futures.length - 1]?.year ?? 2022) + 1,
         level: 2,
         sales: 50,
      };
   }, []);

   const [chart, setChart] = useState<ReactGoogleChartProps>({
      chartType: "BubbleChart",
      width: "100%",
      height: "100%",
      options: [],
      data: [],
   });

   const updateChartProps = () => {
      const rows = product.futures
         .sort((a, b) => {
            if (a.year < b.year) return -1;
            return 1;
         })
         .map((n, i) => {
            return ["", i + 1, n.level, n.sales];
         });

      chart.data = [["Product", "Year", "Level", "Sales"], ...rows];
      const ticks: any = product.futures.map((future, i) => {
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
            f: "Poineer",
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
            maxValue: product.futures.length + 1,
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
      console.log("product with chart: ", product);
   };

   useEffect(() => {
      updateChartProps();
   }, [product]);

   return (
      <>
         <div key={index} className='flex'>
            <div className='flex-1 pr-10'>
               <div className='p-5 lg:p-7 shadow border bg-white flex flex-col gap-5 h-[480px]'>
                  <div className='flex flex-col gap-3 border-b border-gray-300 pb-5 spacedout'>
                     <div className='flex items-center gap-5'>
                        <div className='grow'>
                           <label>Product name</label>
                           <Field
                              type='text'
                              className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none'
                              placeholder='Name'
                              name={`products.${index}.name`}
                           />
                           <ErrorMessage name={`products.${index}.name`}>
                              {(msg) => (
                                 <div className='text-lg text-rose-500'>
                                    {msg}
                                 </div>
                              )}
                           </ErrorMessage>
                        </div>
                        {/* <FontAwesomeIcon
                           onClick={() => {
                              deleteConfig.closeCallback = toggleDeleteDialog;
                              deleteConfig.okCallback = () => {
                                 remove(index);
                              };
                              toggleDeleteDialog(deleteConfig);
                           }}
                           className='w-7 h-auto cursor-pointer text-rose-200 hover:text-rose-800'
                           icon={faTrash}
                        /> */}
                        <div className='flex justify-end mb-5'>
                           <FontAwesomeIcon
                              onClick={onRemove}
                              className='w-7 cursor-pointer text-rose-200 hover:text-rose-500'
                              icon={faTrash}
                           />
                        </div>
                     </div>
                  </div>
                  <FieldArray name={`products.${index}.futures`}>
                     {({ remove, push, form }) => {
                        // addFutureCallback(product, push);
                        return (
                           <div className='overflow-y-auto'>
                              {!!product.futures?.length &&
                                 product.futures.map((future, futureIndex) => {
                                    return (
                                       <div
                                          key={futureIndex}
                                          className='flex flex-col border-b border-gray-300 pb-3 spacedout'>
                                          <div className='flex'>
                                             <div className='grow p-2'>
                                                <label>
                                                   {futureIndex === 0
                                                      ? `Present`
                                                      : `Future ${futureIndex}`}{" "}
                                                </label>
                                                <Field
                                                   type='number'
                                                   min='2023'
                                                   max='2099'
                                                   className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none'
                                                   placeholder='year'
                                                   name={`products.${index}.futures.${futureIndex}.year`}
                                                />
                                                <ErrorMessage
                                                   name={`products.${index}.futures.${futureIndex}.year`}>
                                                   {(msg) => (
                                                      <div className='text-lg text-rose-500'>
                                                         {msg}
                                                      </div>
                                                   )}
                                                </ErrorMessage>
                                             </div>
                                             <div className='grow p-2'>
                                                <label className='rbreath'>
                                                   Level
                                                </label>
                                                <Field
                                                   as='select'
                                                   name={`products.${index}.futures.${futureIndex}.level`}
                                                   className='accent-blue-true w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none'>
                                                   <option value={1}>
                                                      Settler
                                                   </option>
                                                   <option value={2}>
                                                      Migrator
                                                   </option>
                                                   <option value={3}>
                                                      Pioneer
                                                   </option>
                                                </Field>
                                                <ErrorMessage
                                                   name={`products.${index}.futures.${futureIndex}.level`}>
                                                   {(msg) => (
                                                      <div className='text-lg text-rose-500'>
                                                         {msg}
                                                      </div>
                                                   )}
                                                </ErrorMessage>
                                             </div>
                                             <div className='grow p-2'>
                                                <label>Sales (%)</label>
                                                <Field
                                                   as='select'
                                                   name={`products.${index}.futures.${futureIndex}.sales`}
                                                   min='0'
                                                   max='100'
                                                   className='accent-blue-true w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none'>
                                                   <option value={0}>0</option>
                                                   <option value={10}>
                                                      10
                                                   </option>
                                                   <option value={20}>
                                                      20
                                                   </option>
                                                   <option value={30}>
                                                      30
                                                   </option>
                                                   <option value={40}>
                                                      40
                                                   </option>
                                                   <option value={50}>
                                                      50
                                                   </option>
                                                   <option value={60}>
                                                      60
                                                   </option>
                                                   <option value={70}>
                                                      70
                                                   </option>
                                                   <option value={80}>
                                                      80
                                                   </option>
                                                   <option value={90}>
                                                      90
                                                   </option>
                                                   <option value={100}>
                                                      100
                                                   </option>
                                                </Field>
                                                <ErrorMessage
                                                   name={`products.${index}.futures.${futureIndex}.sales`}>
                                                   {(msg) => (
                                                      <div className='text-lg text-rose-500'>
                                                         {msg}
                                                      </div>
                                                   )}
                                                </ErrorMessage>
                                             </div>
                                          </div>
                                       </div>
                                    );
                                 })}
                              {!product.futures.length &&
                                 !!objectPath.get(
                                    form,
                                    `errors.products.${index}.futures`
                                 ) && (
                                    <div className='w-full flex items-center'>
                                       <p className='grow text-lg p-3 text-center bg-rose-50 text-rose-500'>
                                          {objectPath.get(
                                             form,
                                             `errors.products.${index}.futures`
                                          )}
                                       </p>
                                    </div>
                                 )}
                              <div className='flex justify-between w-full pr-3 py-5 gap-5'>
                                 {product.futures.length > 0 && (
                                    <button
                                       type='button'
                                       onClick={() => {
                                          remove(product.futures.length - 1);
                                       }}
                                       className='inline-flex items-center gap-3 text-lg p-5 btn text-rose-400 hover:text-rose-500'>
                                       <span>remove last Future</span>
                                       <FontAwesomeIcon
                                          className='w-7 h-auto cursor-pointer hover:text-rose-500'
                                          icon={faMinusCircle}
                                       />
                                    </button>
                                 )}
                                 <button
                                    type='button'
                                    onClick={() => {
                                       push(emptyFuture);
                                    }}
                                    className='inline-flex items-center gap-3 text-lg p-5 btn blue-gradient text-black-eerie hover:text-white'>
                                    <FontAwesomeIcon
                                       className='w-7 h-auto cursor-pointer text-white'
                                       icon={faCirclePlus}
                                    />
                                 </button>
                              </div>
                           </div>
                        );
                     }}
                  </FieldArray>
               </div>
            </div>
            <div className='md:w-1/2 pl-10'>
               <Chart {...chart} legendToggle />
            </div>
         </div>

         <ConfirmModal config={deleteDialogConfig}></ConfirmModal>
      </>
   );
};

export default Product;
