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
import { ProductModel } from "../../models/products/product";
import { ConfirmDialog } from "../../models/common/confirm-dialog";
import Product from "../../components/products/product";

const Products = () => {
   const [isIdeasModalOpen, toggleIdeasModal] = useModalToggler();

   const emptyProduct = {
      id: "0",
      name: "",
      futures: [],
      competitors: [],
      hasAddFutureCallback: false,
   };

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
                                       // productsFutures.current =
                                       //    values.products[0].futures.map(
                                       //       () => emptyFuture
                                       //    );
                                       return (
                                          <>
                                             <div className='py-5 flex flex-col gap-12'>
                                                {!!values.products.length &&
                                                   values.products.map(
                                                      (
                                                         product,
                                                         productIndex
                                                      ) => (
                                                         <div
                                                            key={productIndex}>
                                                            <Product
                                                               product={product}
                                                               index={
                                                                  productIndex
                                                               }
                                                               remove={remove}
                                                            />
                                                         </div>
                                                      )
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
                                             <div
                                                className='flex gap-5 justify-around py-10 my-12 
                                                   products-revese-gradient border shadow-lg'>
                                                <a
                                                   onClick={() => {
                                                      push(emptyProduct);
                                                   }}
                                                   className='inline-flex items-center gap-3 btn blue-gradient 
                                                      p-5 text-black-eerie hover:text-white text-2xl'>
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
                                          Save
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
      </>
   );
};

export default Products;
