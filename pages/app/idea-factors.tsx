import { FieldArray, Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import IdeasModal from "../../components/app/ideas-modal";
import useModalToggler from "../../hooks/use-modal-toggler";
import * as Yup from "yup";
import products_dummy from "../../samples/products.json";
import { useState } from "react";
import IdeaFactorsProduct from "../../components/idea-factors/product";

const IdeaFactors = () => {
   const [isIdeasModalOpen, toggleIdeasModal] = useModalToggler();

   const [lookupProducts, setLookupProducts] = useState(
      products_dummy.slice(1, 3)
   );

   return (
      <>
         <IdeasModal isOpen={isIdeasModalOpen} toggle={toggleIdeasModal} />

         <div className='factors-gradient w-screen bg-white'>
            <div className='min-h-screen px-12 mx-0 my-auto md:w-[calc(1300px_-_1.5_*_2)] lg:w-[960px_-_1.5rem_*_2] xl:w-[1300_-_1.5rem_*_2]'>
               <div className='flex flex-wrap'>
                  <div className='flex flex-col gap-7 w-full p-12 relative'>
                     <div className='flex gap-5 items-center'>
                        <div className='w-1/2'>
                           <strong className='mr-1'>Mustafa Khairy </strong>
                           <span> | </span>
                           <Link href='http://bo.adpadelhouse.com/logout'>
                              logout
                           </Link>
                        </div>
                        <div className='flex justify-between items-center gap-5 w-1/2'>
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
                                    src='http://bo.adpadelhouse.com/assets/images/ilogo.png'
                                    alt='CaseInPoint'
                                 />
                              </div>
                           </Link>
                        </div>
                     </div>
                     <div className='flex'>
                        <div className='md:w-1/2 flex gap-12 justify-between pr-12'>
                           <h3 className='text-[2.52rem] text-yellow-green'>
                              Blue Ocean Canvas
                           </h3>
                        </div>
                     </div>
                     <Formik
                        initialValues={{
                           products: products_dummy.filter(
                              (prod) =>
                                 !lookupProducts.some(
                                    (lookupProd) => lookupProd.id === prod.id
                                 )
                           ),
                        }}
                        validationSchema={Yup.object({
                           products: Yup.array(
                              Yup.object({
                                 ideaFactors: Yup.array(
                                    Yup.object({
                                       id: Yup.string().required("required"),
                                       name: Yup.string().required("required"),
                                    })
                                 )
                                    .required(
                                       "Must provide at least one idea factor !"
                                    )
                                    .min(
                                       1,
                                       "Must provide at least one idea factor !"
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
                                                            <IdeaFactorsProduct
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
                                             <div className='py-10 md:w-1/2 pr-12 flex items-center gap-5'>
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
                                 <div className='flex gap-5 py-10'>
                                    {!!products_dummy.filter(
                                       (prod) =>
                                          !lookupProducts.some(
                                             (lookupProd) =>
                                                lookupProd.id === prod.id
                                          )
                                    ).length && (
                                       <button
                                          type='submit'
                                          className={
                                             isSubmitting || !isValid
                                                ? "btn-rev btn-disabled"
                                                : "btn-rev"
                                          }
                                          disabled={isSubmitting || !isValid}>
                                          Save and submit
                                       </button>
                                    )}
                                    <Link
                                       href='/'
                                       className='btn text-black-eerie hover:text-blue-ncs'>
                                       <strong>Back To Dashboard</strong>
                                    </Link>
                                 </div>
                              </Form>
                           );
                        }}
                     </Formik>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default IdeaFactors;
