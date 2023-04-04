import {
   faCirclePlus,
   faMinusCircle,
   faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import Chart, { ReactGoogleChartProps } from "react-google-charts";
import IdeasModal from "../../components/app/ideas-modal";
import useModalToggler from "../../hooks/use-modal-toggler";
import * as Yup from "yup";
import useConfirmDialog from "../../hooks/use-confirm-dialog";
import ConfirmModal from "../../components/common/confirm-dialog";
import objectPath from "object-path";
import products_dummy from "../../samples/products.json";
import { Product } from "../../models/products/product";
import { ConfirmDialog } from "../../models/common/confirm-dialog";

const Products = () => {
   const [isIdeasModalOpen, toggleIdeasModal] = useModalToggler();
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

   let futurePopCallbacks: any[] = [];
   const [futureAddCallbacks, setFutureAddCallbacks] = useState<any[]>([]);

   const updateChartProps = (product: Product) => {
      const rows = product.futures
         .sort((a, b) => {
            if (a.year < b.year) return -1;
            return 1;
         })
         .map((n, i) => {
            return ["", i + 1, n.level, n.sales];
         });

      const chart: ReactGoogleChartProps = {
         chartType: "PieChart",
         width: "100%",
         height: "400px",
         options: [],
         data: [],
      };

      chart.data = [["Product", "Year", "Level", "Sales"], ...rows];
      console.log("product.name :", product.name);
      console.log("product chart data:", chart.data);
      const ticks: any = product.futures.map((future, i) => {
         return {
            v: i + 1,
            f: future.year.toString(),
         };
      });

      chart.options = {
         title: "Product future",
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
            maxValue: 4,
            ticks: ticks,
         },
         vAxis: {
            baseline: 0,
            maxValue: 4,
            // ticks: [
            //    {
            //       v: 1,
            //       f: "Settler",
            //    },
            //    {
            //       v: 2,
            //       f: "Migrate",
            //    },
            //    {
            //       v: 3,
            //       f: "Poineer",
            //    },
            // ],
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
      product.chart = chart;
      console.log("product with chart: ", product);
   };

   useEffect(() => {
      products_dummy.map((prod: Product) => {
         updateChartProps(prod);
      });
   }, []);

   const emptyFuture = useMemo(() => {
      return {
         id: 0,
         product_id: 0,
         year: 0,
         level: 2,
         sales: 50,
      };
   }, []);
   const emptyProduct = {
      id: "0",
      name: "",
      futures: [],
      competitors: [],
      hasAddFutureCallback: false,
   };

   const productsFutures: any = useRef([]);

   let addProductCallback = useMemo(() => {
      return (productsFieldArrPush: any) => {
         const newProduct = emptyProduct;
         newProduct.futures = productsFutures.current;
         updateChartProps(newProduct);
         productsFieldArrPush(emptyProduct);
      };
   }, []);

   let addFutureCallback = useMemo(() => {
      return (currProduct: Product, futuresFieldArrPush: any) => {
         if (currProduct.hasAddFutureCallback) {
            return;
         }
         futureAddCallbacks.push(() => {
            futuresFieldArrPush(emptyFuture);
         });
         setFutureAddCallbacks([...futureAddCallbacks]);
         currProduct.hasAddFutureCallback = !currProduct.hasAddFutureCallback;
      };
   }, []);

   return (
      <>
         <IdeasModal isOpen={isIdeasModalOpen} toggle={toggleIdeasModal} />

         <div className='products-gradient w-screen bg-white'>
            <div className='px-12 mx-0 my-auto md:w-[calc(1300px_-_1.5_*_2)] lg:w-[960px_-_1.5rem_*_2] xl:w-[1300_-_1.5rem_*_2]'>
               <div>
                  <div className='p-12 relative mx-auto max-w-[1920px]'>
                     <div className='pb-5'>
                        <strong className='mr-1'>Mustafa Khairy </strong> |
                        <a href='http://bo.adpadelhouse.com/logout'> logout </a>
                     </div>
                     <h3 className='text-[2.52rem] mb-10 text-yellow-green'>
                        Pioneer, Migrator, Settler
                     </h3>
                     <Formik
                        initialValues={{
                           products: products_dummy,
                        }}
                        validationSchema={Yup.object({
                           products: Yup.array(
                              Yup.object({
                                 // id: Yup.string("must be a string").required(
                                 //    "required"
                                 // ),
                                 name: Yup.string().required(
                                    "Name is required"
                                 ),
                                 futures: Yup.array(
                                    Yup.object({
                                       // product_id:
                                       //    Yup.string(
                                       //       "must be a string"
                                       //    ).required("required"),
                                       year: Yup.number()
                                          .typeError("you must specify a year")
                                          .min(2023, "min year is 2023")
                                          .max(2099, "max year is 2099")
                                          .required("Year is required"),
                                       level: Yup.number().required(
                                          "Level is required"
                                       ),
                                       sales: Yup.number().required(
                                          "sales percentage is required"
                                       ),
                                    })
                                 )
                                    .required(
                                       "Must provide at least one future !"
                                    )
                                    .min(
                                       1,
                                       "Must provide at least one future !"
                                    ),
                              })
                           )
                              .required("Must provide at least one product !")
                              .min(1, "Must provide at least one product !"),
                        })}
                        onSubmit={(values) => {
                           console.log(values);
                        }}
                        validateOnMount>
                        {({ values, isSubmitting, isValid }) => {
                           return (
                              <Form>
                                 <FieldArray name='products'>
                                    {({ push, remove, form }) => {
                                       productsFutures.current =
                                          values.products[0].futures.map(
                                             () => emptyFuture
                                          );
                                       return (
                                          <>
                                             <div className='py-5 flex flex-col gap-10'>
                                                {!!values.products.length &&
                                                   values.products.map(
                                                      (
                                                         product,
                                                         productIndex
                                                      ) => {
                                                         futurePopCallbacks =
                                                            [];
                                                         return (
                                                            <div
                                                               key={
                                                                  productIndex
                                                               }
                                                               className='flex'>
                                                               <div className='flex-1 pr-10'>
                                                                  <div className='p-5 lg:p-7 shadow border bg-white flex flex-col gap-5'>
                                                                     <div className='flex flex-col gap-3 border-b border-gray-300 pb-5 spacedout'>
                                                                        <div className='flex items-center gap-5'>
                                                                           <div className='grow'>
                                                                              <label>
                                                                                 Product
                                                                                 name
                                                                              </label>
                                                                              <Field
                                                                                 type='text'
                                                                                 className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none'
                                                                                 name={`products.${productIndex}.name`}
                                                                              />
                                                                              <ErrorMessage
                                                                                 name={`products.${productIndex}.name`}>
                                                                                 {(
                                                                                    msg
                                                                                 ) => (
                                                                                    <div className='text-lg text-rose-500'>
                                                                                       {
                                                                                          msg
                                                                                       }
                                                                                    </div>
                                                                                 )}
                                                                              </ErrorMessage>
                                                                           </div>
                                                                           <FontAwesomeIcon
                                                                              onClick={() => {
                                                                                 deleteConfig.closeCallback =
                                                                                    toggleDeleteDialog;
                                                                                 deleteConfig.okCallback =
                                                                                    () => {
                                                                                       remove(
                                                                                          productIndex
                                                                                       );
                                                                                    };
                                                                                 toggleDeleteDialog(
                                                                                    deleteConfig
                                                                                 );
                                                                              }}
                                                                              className='w-7 h-auto cursor-pointer text-rose-200 hover:text-rose-800'
                                                                              icon={
                                                                                 faTrash
                                                                              }
                                                                           />
                                                                        </div>
                                                                     </div>
                                                                     <FieldArray
                                                                        name={`products.${productIndex}.futures`}>
                                                                        {({
                                                                           remove,
                                                                           push,
                                                                           form,
                                                                        }) => {
                                                                           addFutureCallback(
                                                                              product,
                                                                              push
                                                                           );
                                                                           return (
                                                                              <div className='overflow-y-auto'>
                                                                                 {!!product
                                                                                    .futures
                                                                                    ?.length &&
                                                                                    product.futures.map(
                                                                                       (
                                                                                          future,
                                                                                          futureIndex
                                                                                       ) => {
                                                                                          if (
                                                                                             futureIndex ===
                                                                                             product
                                                                                                .futures
                                                                                                .length -
                                                                                                1
                                                                                          ) {
                                                                                             futurePopCallbacks.push(
                                                                                                () => {
                                                                                                   if (
                                                                                                      product
                                                                                                         .futures
                                                                                                         ?.length >
                                                                                                      1
                                                                                                   ) {
                                                                                                      remove(
                                                                                                         futureIndex
                                                                                                      ); // to pop the last future
                                                                                                   }
                                                                                                }
                                                                                             );
                                                                                          }
                                                                                          return (
                                                                                             <div
                                                                                                key={
                                                                                                   futureIndex
                                                                                                }
                                                                                                className='flex flex-col border-b border-gray-300 pb-3 spacedout'>
                                                                                                <div className='flex'>
                                                                                                   <div className='grow p-2'>
                                                                                                      <label>
                                                                                                         {futureIndex ===
                                                                                                         0
                                                                                                            ? `Present`
                                                                                                            : `Future ${futureIndex}`}{" "}
                                                                                                      </label>
                                                                                                      <Field
                                                                                                         type='number'
                                                                                                         min='2023'
                                                                                                         max='2099'
                                                                                                         className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none'
                                                                                                         placeholder='year'
                                                                                                         name={`products.${productIndex}.futures.${futureIndex}.year`}
                                                                                                      />
                                                                                                      <ErrorMessage
                                                                                                         name={`products.${productIndex}.futures.${futureIndex}.year`}>
                                                                                                         {(
                                                                                                            msg
                                                                                                         ) => (
                                                                                                            <div className='text-lg text-rose-500'>
                                                                                                               {
                                                                                                                  msg
                                                                                                               }
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
                                                                                                         name={`products.${productIndex}.futures.${futureIndex}.level`}
                                                                                                         className='accent-blue-true w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none'>
                                                                                                         <option
                                                                                                            value={
                                                                                                               1
                                                                                                            }>
                                                                                                            Settler
                                                                                                         </option>
                                                                                                         <option
                                                                                                            value={
                                                                                                               2
                                                                                                            }>
                                                                                                            Migrator
                                                                                                         </option>
                                                                                                         <option
                                                                                                            value={
                                                                                                               3
                                                                                                            }>
                                                                                                            Pioneer
                                                                                                         </option>
                                                                                                      </Field>
                                                                                                      <ErrorMessage
                                                                                                         name={`products.${productIndex}.futures.${futureIndex}.level`}>
                                                                                                         {(
                                                                                                            msg
                                                                                                         ) => (
                                                                                                            <div className='text-lg text-rose-500'>
                                                                                                               {
                                                                                                                  msg
                                                                                                               }
                                                                                                            </div>
                                                                                                         )}
                                                                                                      </ErrorMessage>
                                                                                                   </div>
                                                                                                   <div className='grow p-2'>
                                                                                                      <label>
                                                                                                         Sales
                                                                                                         (%)
                                                                                                      </label>
                                                                                                      <Field
                                                                                                         as='select'
                                                                                                         name={`products.${productIndex}.futures.${futureIndex}.sales`}
                                                                                                         min='0'
                                                                                                         max='100'
                                                                                                         className='accent-blue-true w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none'>
                                                                                                         <option
                                                                                                            value={
                                                                                                               0
                                                                                                            }>
                                                                                                            0
                                                                                                         </option>
                                                                                                         <option
                                                                                                            value={
                                                                                                               10
                                                                                                            }>
                                                                                                            10
                                                                                                         </option>
                                                                                                         <option
                                                                                                            value={
                                                                                                               20
                                                                                                            }>
                                                                                                            20
                                                                                                         </option>
                                                                                                         <option
                                                                                                            value={
                                                                                                               30
                                                                                                            }>
                                                                                                            30
                                                                                                         </option>
                                                                                                         <option
                                                                                                            value={
                                                                                                               40
                                                                                                            }>
                                                                                                            40
                                                                                                         </option>
                                                                                                         <option
                                                                                                            value={
                                                                                                               50
                                                                                                            }>
                                                                                                            50
                                                                                                         </option>
                                                                                                         <option
                                                                                                            value={
                                                                                                               60
                                                                                                            }>
                                                                                                            60
                                                                                                         </option>
                                                                                                         <option
                                                                                                            value={
                                                                                                               70
                                                                                                            }>
                                                                                                            70
                                                                                                         </option>
                                                                                                         <option
                                                                                                            value={
                                                                                                               80
                                                                                                            }>
                                                                                                            80
                                                                                                         </option>
                                                                                                         <option
                                                                                                            value={
                                                                                                               90
                                                                                                            }>
                                                                                                            90
                                                                                                         </option>
                                                                                                         <option
                                                                                                            value={
                                                                                                               100
                                                                                                            }>
                                                                                                            100
                                                                                                         </option>
                                                                                                      </Field>
                                                                                                      <ErrorMessage
                                                                                                         name={`products.${productIndex}.futures.${futureIndex}.sales`}>
                                                                                                         {(
                                                                                                            msg
                                                                                                         ) => (
                                                                                                            <div className='text-lg text-rose-500'>
                                                                                                               {
                                                                                                                  msg
                                                                                                               }
                                                                                                            </div>
                                                                                                         )}
                                                                                                      </ErrorMessage>
                                                                                                   </div>
                                                                                                </div>
                                                                                             </div>
                                                                                          );
                                                                                       }
                                                                                    )}
                                                                                 {!product
                                                                                    .futures
                                                                                    .length &&
                                                                                    !!objectPath.get(
                                                                                       form,
                                                                                       `errors.products.${productIndex}.futures`
                                                                                    ) && (
                                                                                       <div className='w-full flex items-center'>
                                                                                          <p className='grow text-lg p-3 text-center bg-rose-50 text-rose-500'>
                                                                                             {objectPath.get(
                                                                                                form,
                                                                                                `errors.products.${productIndex}.futures`
                                                                                             )}
                                                                                          </p>
                                                                                       </div>
                                                                                    )}
                                                                              </div>
                                                                           );
                                                                        }}
                                                                     </FieldArray>
                                                                  </div>
                                                               </div>
                                                               <div className='md:w-1/2 pl-10'>
                                                                  <div className='chart-wrapper'>
                                                                     <Chart
                                                                        chartType='BubbleChart'
                                                                        width='100%'
                                                                        height='400px'
                                                                        options={
                                                                           objectPath.get(
                                                                              product,
                                                                              "chart"
                                                                           )
                                                                              ?.options
                                                                        }
                                                                        data={
                                                                           objectPath.get(
                                                                              product,
                                                                              "chart"
                                                                           )
                                                                              ?.data
                                                                        }
                                                                        legendToggle
                                                                     />
                                                                  </div>
                                                                  <div className='py-3'>
                                                                     <button
                                                                        className='btn text-black-eerie mt-10'
                                                                        data-name='Pioneer, Migrate, Settler'
                                                                        id='theSubmitBtn'>
                                                                        <strong>
                                                                           Request{" "}
                                                                        </strong>{" "}
                                                                        for
                                                                        consultant
                                                                        review
                                                                     </button>
                                                                  </div>
                                                               </div>
                                                            </div>
                                                         );
                                                      }
                                                   )}
                                                {!values.products.length &&
                                                   form.errors?.products && (
                                                      <div className='w-full flex justify-center items-center'>
                                                         <p className='text-2xl p-10 text-center bg-rose-50 text-rose-500'>
                                                            <>
                                                               {
                                                                  form.errors
                                                                     .products
                                                               }
                                                            </>
                                                         </p>
                                                      </div>
                                                   )}
                                             </div>
                                             <div className='flex gap-5 justify-around py-10 my-12 products-revese-gradient border shadow-lg'>
                                                {productsFutures.current
                                                   .length > 1 && (
                                                   <button
                                                      type='button'
                                                      onClick={() => {
                                                         futurePopCallbacks.forEach(
                                                            (callback) => {
                                                               callback();
                                                            }
                                                         );
                                                      }}
                                                      className='inline-flex items-center gap-3 text-lg p-5 btn text-rose-400 hover:text-rose-500'>
                                                      <span>
                                                         remove last Future
                                                      </span>
                                                      <FontAwesomeIcon
                                                         className='w-7 h-auto cursor-pointer hover:text-rose-500'
                                                         icon={faMinusCircle}
                                                      />
                                                   </button>
                                                )}
                                                <button
                                                   type='button'
                                                   onClick={() => {
                                                      futureAddCallbacks.forEach(
                                                         (callback) => {
                                                            callback();
                                                         }
                                                      );
                                                   }}
                                                   className='inline-flex items-center gap-3 text-lg p-5 btn blue-gradient text-black-eerie hover:text-white'>
                                                   <span>Add a Future</span>
                                                   <FontAwesomeIcon
                                                      className='w-7 h-auto cursor-pointer text-white'
                                                      icon={faCirclePlus}
                                                   />
                                                </button>
                                                <a
                                                   onClick={() => {
                                                      addProductCallback(push);
                                                   }}
                                                   className='inline-flex items-center gap-3 btn blue-gradient p-5 text-black-eerie hover:text-white text-2xl'>
                                                   <b>+</b> Add new product
                                                </a>
                                             </div>
                                          </>
                                       );
                                    }}
                                 </FieldArray>
                                 <div className='flex gap-3 justify-between mt-10'>
                                    <div className='flex gap-3'>
                                       <button
                                          type='submit'
                                          className={
                                             isSubmitting || !isValid
                                                ? "btn-rev btn-disabled"
                                                : "btn-rev"
                                          }
                                          disabled={isSubmitting || !isValid}>
                                          Save and generate{" "}
                                       </button>
                                       <Link
                                          href='/'
                                          className='btn text-black-eerie hover:text-blue-ncs'>
                                          <strong>Back To Dashboard</strong>
                                       </Link>
                                    </div>
                                 </div>
                              </Form>
                           );
                        }}
                     </Formik>
                  </div>
                  {/* <div className='md:w-1/2 pane-right-gradient min-h-screen p-12'>
                     <div className=''>
                        <button
                           type='button'
                           className='btn text-black-eerie'
                           onClick={toggleIdeasModal}>
                           My ideas
                        </button>
                     </div>
                     <Link href='/' className='logo-pane'>
                        <h4 className='text-[3rem] text-white'>20X</h4>
                        <span className='relative -translate-x-[1.2rem]'>
                           revenue BY
                        </span>
                        <div className='w-[110px] h-[33px]'>
                           <Image
                              width='55'
                              height='20'
                              src='http://bo.adpadelhouse.com/assets/images/ilogo.png'
                              alt='CaseInPoint'
                           />
                        </div>
                     </Link>
                  </div> */}
               </div>
            </div>
         </div>

         <ConfirmModal config={deleteDialogConfig}></ConfirmModal>
      </>
   );
};

export default Products;
