import { FieldArray, Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import IdeasModal from "../../components/app/ideas-modal";
import useModalToggler from "../../hooks/use-modal-toggler";
import * as Yup from "yup";
import products_dummy from "../../samples/products.json";
import { useState } from "react";
import CompetitorsProduct from "../../components/competitors/product";
import { ProductModel } from "../../models/products/product.model";

const Competitors = () => {
   const [isIdeasModalOpen, toggleIdeasModal] = useModalToggler();

   const [lookupProducts, setLookupProducts] = useState(
      products_dummy.slice(1, 3)
   );

   return (
      <>
         <IdeasModal isOpen={isIdeasModalOpen} toggle={toggleIdeasModal} />

         <div className='market-potential-gradient w-screen bg-white'>
            <div className='min-h-screen px-12 mx-0 my-auto md:w-[calc(1300px_-_1.5_*_2)] lg:w-[960px_-_1.5rem_*_2] xl:w-[1300_-_1.5rem_*_2]'>
               <div className='flex flex-wrap'>
                  <div className='flex flex-col gap-7 w-full p-12 relative'>
                     <div className='flex items-center'>
                        <div className='w-[66%]'>
                           <strong className='mr-1'>Mustafa Khairy </strong> |
                           <Link href='http://bo.adpadelhouse.com/logout'>
                              logout
                           </Link>
                        </div>
                        <div className='flex justify-between items-center gap-5 w-[34%]'>
                           <div className='ml-5'>
                              <button
                                 type='button'
                                 onClick={toggleIdeasModal}
                                 className='btn text-black-eerie'>
                                 My ideas
                              </button>
                           </div>
                           <Link href='/' className='logo-pane mb-0'>
                              <h4 className='text-[3rem] text-white'>20X</h4>
                              <span className='relative -translate-x-[1.2rem]'>
                                 revenue BY
                              </span>
                              <div className='w-[110px] h-[33px]'>
                                 <Image
                                    width='55'
                                    height='30'
                                    src='/ilogo.webp'
                                    alt='CaseInPoint'
                                 />
                              </div>
                           </Link>
                        </div>
                     </div>
                     <div className='flex'>
                        <div className='md:w-[66%] flex gap-12 justify-between pr-12'>
                           <h3 className='text-[2.52rem] text-yellow-green'>
                              Market potential
                           </h3>
                        </div>
                     </div>
                     <Formik
                        initialValues={{
                           products: products_dummy.filter(
                              (prod: any) =>
                                 !lookupProducts.some(
                                    (lookupProd) => lookupProd.id === prod.id
                                 )
                           ),
                        }}
                        validationSchema={Yup.object({
                           products: Yup.array(
                              Yup.object({
                                 competitors: Yup.array(
                                    Yup.object({
                                       id: Yup.string().required("required"),
                                       name: Yup.string().required("required"),
                                       marketShare: Yup.number()
                                          .required("required")
                                          .min(
                                             0,
                                             "Market share must be 0 or greater"
                                          )
                                          .max(
                                             100,
                                             "Market share must be less than 100"
                                          ),
                                    })
                                 )
                                    .test((competitors: any) => {
                                       const sum = competitors.reduce(
                                          (acc: number, curr: any) =>
                                             curr.marketShare + acc,
                                          0
                                       );
                                       if (sum !== 100) {
                                          return new Yup.ValidationError(
                                             `The sum of product market shares must be 100% but you have ${sum}%`,
                                             undefined,
                                             "competitors"
                                          );
                                       }
                                       return true;
                                    })
                                    .required(
                                       "Must provide at least one competitor !"
                                    )
                                    .min(
                                       1,
                                       "Must provide at least one competitor !"
                                    ),
                              })
                           ),
                        })}
                        onSubmit={(values) => {
                           console.log(values);
                        }}
                        validateOnMount>
                        {({ values, isSubmitting, isValid, errors }) => {
                           return (
                              <Form>
                                 <FieldArray name='products'>
                                    {({ push, remove }) => {
                                       return (
                                          <div className='flex flex-col gap-12'>
                                             <div className='flex flex-col gap-20'>
                                                {!values.products?.length && (
                                                   <p className='text-rose-300'>
                                                      make a selection to view
                                                      products !
                                                   </p>
                                                )}
                                                {!!values.products.length &&
                                                   values.products.map(
                                                      (
                                                         product,
                                                         productIndex
                                                      ) => (
                                                         <div
                                                            key={productIndex}>
                                                            <CompetitorsProduct
                                                               product={product}
                                                               index={
                                                                  productIndex   
                                                               }
                                                               onRemove={() => {
                                                                  setLookupProducts(
                                                                     (
                                                                        prevValue
                                                                     ) => [
                                                                        ...prevValue,
                                                                        product,
                                                                     ]
                                                                  );
                                                                  remove(
                                                                     productIndex
                                                                  );
                                                               }}
                                                               formUtilities={{
                                                                  isSubmitting,
                                                                  isValid,
                                                                  errors,
                                                               }}
                                                            />
                                                         </div>
                                                      )
                                                   )}
                                             </div>
                                             <div className='py-10 md:w-[66%] pr-12 flex items-center gap-5'>
                                                <label className='text-yellow-green font-semibold text-3xl'>
                                                   Show more products
                                                </label>
                                                <select
                                                   className='min-w-[200px] grow p-3 bg-gray-100 outline-none caret-dark-blue border-none'
                                                   value={0}
                                                   onChange={(e) => {
                                                      const productToBeShown =
                                                         products_dummy.find(
                                                            (prod) =>
                                                               prod.id ===
                                                               e.target.value
                                                         );
                                                      push(productToBeShown);
                                                      setLookupProducts(
                                                         (prevValue) =>
                                                            prevValue.filter(
                                                               (prod) =>
                                                                  prod.id !==
                                                                  e.target.value
                                                            )
                                                      );
                                                   }}>
                                                   <option value={0}>
                                                      select a product to be
                                                      displayed
                                                   </option>
                                                   {lookupProducts.map(
                                                      (product, index) => (
                                                         <option
                                                            key={index}
                                                            value={product.id}>
                                                            {product.name}
                                                         </option>
                                                      )
                                                   )}
                                                </select>
                                             </div>
                                          </div>
                                       );
                                    }}
                                 </FieldArray>
                              </Form>
                           );
                        }}
                     </Formik>
                  </div>
               </div>
               <div className='pl-12 pb-10'>
                  <Link
                     href='/'
                     className='btn text-black-eerie hover:text-blue-ncs'>
                     <strong>Back To Dashboard</strong>
                  </Link>
               </div>
            </div>
         </div>
      </>
   );
};

export default Competitors;
