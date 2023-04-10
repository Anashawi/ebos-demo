import { FieldArray, Form, Formik } from "formik";
import Link from "next/link";
import IdeasModal from "../../components/app/ideas-modal";
import useModalToggler from "../../hooks/use-modal-toggler";
import * as Yup from "yup";
import products_dummy from "../../samples/products.json";
import Product from "../../components/products/product";
import { useState } from "react";
import Image from "next/image";

const Products = () => {
   const [isIdeasModalOpen, toggleIdeasModal] = useModalToggler();

   const [lookupProducts, setLookupProducts] = useState(
      products_dummy.slice(1, 3)
   );

   return (
      <>
         <IdeasModal isOpen={isIdeasModalOpen} toggle={toggleIdeasModal} />

         <div className='products-gradient w-screen bg-white'>
            <div className='px-12 mx-0 my-auto md:w-[calc(1300px_-_1.5_*_2)] lg:w-[960px_-_1.5rem_*_2] xl:w-[1300_-_1.5rem_*_2]'>
               <div>
                  <div className='p-12 relative mx-auto max-w-[1920px]'>
                     <div className='flex justify-between gap-5 pb-5'>
                        <div className='flex gap-2 items-center'>
                           <strong className='mr-1'>Mustafa Khairy </strong> |
                           <a href='http://bo.adpadelhouse.com/logout'>
                              {" "}
                              logout{" "}
                           </a>
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
                                    src='/ilogo.webp'
                                    alt='CaseInPoint'
                                 />
                              </div>
                           </Link>
                        </div>
                     </div>
                     <h3 className='text-[2.52rem] mb-10 text-yellow-green'>
                        Pioneer, Migrator, Settler
                     </h3>
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
                                       return (
                                          <div className='flex flex-col gap-12'>
                                             <div className='py-5 flex flex-col gap-20'>
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
                                             <div className='w-1/2 flex gap-5 items-center pr-5 md:pr-10 py-10'>
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
               </div>
            </div>
         </div>
      </>
   );
};

export default Products;
