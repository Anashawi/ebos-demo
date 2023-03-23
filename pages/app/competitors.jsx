import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import IdeasModal from "../../components/app/ideas-modal";
import useModalToggler from "../../hooks/use-modal-toggler";
import * as Yup from "yup";
import Spinner from "../../components/common/spinner";
import products_dummy from "../../samples/products.json";
import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

class Competitor {
   id;
   name;
   marketShare;
}
const competitors_dummy = [
   {
      id: 1,
      name: "Competitor (ME)",
      marketShare: 230000,
   },
   {
      id: 2,
      name: "First Competitor",
      marketShare: 230000,
   },
   {
      id: 3,
      name: "Second Competitor",
      marketShare: 90125,
   },
   {
      id: 4,
      name: "Third Competitor",
      marketShare: 110500,
   },
];

const Competitors = () => {
   const [isIdeasModalOpen, toggleIdeasModal] = useModalToggler();
   const [lookupProducts, setLookupProducts] = useState(
      products_dummy.slice(1, 3)
   );
   let productsFieldArrPush;
   const generalizeProductsPush = (productsPush) => {
      productsFieldArrPush = productsPush;
   };

   const emptyCompetitor = useMemo(() => {
      return {
         id: "0",
         name: "",
         marketShare: 0,
      };
   }, []);

   return (
      <>
         <IdeasModal isOpen={isIdeasModalOpen} toggle={toggleIdeasModal} />

         <div className='market-potential-gradient w-screen bg-white'>
            <div className='px-12 mx-0 my-auto md:w-[calc(1300px_-_1.5_*_2)] lg:w-[960px_-_1.5rem_*_2] xl:w-[1300_-_1.5rem_*_2]'>
               <div className='flex flex-wrap'>
                  <div className='flex flex-col gap-7 w-full p-12 relative'>
                     <div>
                        <strong className='mr-1'>Mustafa Khairy </strong> |
                        <a href='http://bo.adpadelhouse.com/logout'> logout </a>
                     </div>
                     <div className='flex'>
                        <div className='md:w-[66%] flex gap-12 justify-between pr-12'>
                           <h3 className='text-[2.52rem] text-yellow-green'>
                              Market potential
                           </h3>
                           <div className='flex flex-col'>
                              <label>Products</label>
                              <select
                                 className='min-w-[200px] p-3 bg-gray-100 outline-none caret-dark-blue border-none'
                                 value={0}
                                 onChange={(e) => {
                                    productsFieldArrPush(
                                       products_dummy.find(
                                          (prod) => prod.id === e.target.value
                                       )
                                    );
                                    setLookupProducts((prevValue) =>
                                       prevValue.filter(
                                          (prod) => prod.id !== e.target.value
                                       )
                                    );
                                 }}>
                                 <option value={0}>
                                    select a product to be displayed
                                 </option>
                                 {lookupProducts.map((product, index) => (
                                    <option key={index} value={product.id}>
                                       {product.name}
                                    </option>
                                 ))}
                              </select>
                           </div>
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
                           products: Yup.object({
                              competitors: Yup.array(
                                 Yup.object({
                                    id: Yup.string().required("required"),
                                    name: Yup.string().required("required"),
                                    marketShare: Yup.number()
                                       .required("required")
                                       .min(
                                          1,
                                          "Market share must be greater than 0"
                                       ),
                                 })
                              )
                                 .required("Must provide at least one goal !")
                                 .min(1, "Must provide at least one goal !"),
                           }),
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
                                       generalizeProductsPush(push);
                                       return (
                                          <div className='flex flex-col gap-10'>
                                             {!values.products?.length && (
                                                <p>
                                                   You have no Products yet !
                                                </p>
                                             )}
                                             {!!values.products.length &&
                                                values.products.map(
                                                   (product, productIndex) => (
                                                      <div
                                                         key={productIndex}
                                                         className='flex justify-between'>
                                                         <div className='md:w-[66%] pr-12'>
                                                            <div
                                                               key={
                                                                  productIndex
                                                               }
                                                               className='border shadow p-5'>
                                                               <div className='flex justify-end'>
                                                                  <FontAwesomeIcon
                                                                     onClick={() => {
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
                                                                     className='w-9 cursor-pointer text-rose-200 hover:text-rose-500'
                                                                     icon={
                                                                        faEyeSlash
                                                                     }
                                                                  />
                                                               </div>
                                                               <FieldArray
                                                                  name={`products.${productIndex}.competitors`}>
                                                                  {({
                                                                     remove,
                                                                     push,
                                                                     form,
                                                                  }) => (
                                                                     <>
                                                                        <ul className='flex flex-col gap-5 mb-10'>
                                                                           {!!product
                                                                              .competitors
                                                                              ?.length &&
                                                                              product.competitors.map(
                                                                                 (
                                                                                    comp,
                                                                                    compIndex
                                                                                 ) => (
                                                                                    <li
                                                                                       key={
                                                                                          compIndex
                                                                                       }
                                                                                       className='flex items-center flex-wrap gap-5 border-b border-gray-400 pb-7 spacedout'>
                                                                                       {compIndex >
                                                                                          0 && (
                                                                                          <>
                                                                                             <div className='grow'>
                                                                                                <label>
                                                                                                   Competitor{" "}
                                                                                                   {
                                                                                                      compIndex
                                                                                                   }
                                                                                                </label>
                                                                                                <Field
                                                                                                   type='text'
                                                                                                   placeholder='name'
                                                                                                   className='w-full comp-name p-3 bg-gray-100 outline-none caret-dark-blue border-none'
                                                                                                   name={`products.${productIndex}.competitors.${compIndex}.name`}
                                                                                                />
                                                                                                <ErrorMessage
                                                                                                   name={`products.${productIndex}.competitors.${compIndex}.name`}>
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
                                                                                          </>
                                                                                       )}
                                                                                       {compIndex ===
                                                                                          0 && (
                                                                                          <>
                                                                                             <div className='grow'>
                                                                                                <label>
                                                                                                   My
                                                                                                   Product
                                                                                                </label>
                                                                                                <Field
                                                                                                   type='text'
                                                                                                   placeholder='product name'
                                                                                                   className='opacity-60 pointer-events-none w-full comp-name p-3 bg-gray-100 outline-none caret-dark-blue border-none'
                                                                                                   name={`products.${productIndex}.name`}
                                                                                                   readOnly
                                                                                                />
                                                                                             </div>
                                                                                          </>
                                                                                       )}
                                                                                       <div className='grow'>
                                                                                          <label>
                                                                                             {compIndex ===
                                                                                             0 ? (
                                                                                                <span>
                                                                                                   My
                                                                                                </span>
                                                                                             ) : null}{" "}
                                                                                             Market
                                                                                             share
                                                                                             (USD)
                                                                                          </label>
                                                                                          <div className='flex flex-wrap'>
                                                                                             <span className='inline-block p-3 bg-yellow-jasmine rounded-prefix'>
                                                                                                $
                                                                                             </span>
                                                                                             <Field
                                                                                                type='number'
                                                                                                placeholder='percentage'
                                                                                                className='grow comp-share p-3 bg-gray-100 outline-none caret-dark-blue border-none'
                                                                                                name={`competitors.${compIndex}.marketShare`}
                                                                                             />
                                                                                             <ErrorMessage
                                                                                                name={`competitors.${compIndex}.marketShare`}>
                                                                                                {(
                                                                                                   msg
                                                                                                ) => (
                                                                                                   <div className='w-full text-lg text-rose-500'>
                                                                                                      {
                                                                                                         msg
                                                                                                      }
                                                                                                   </div>
                                                                                                )}
                                                                                             </ErrorMessage>
                                                                                          </div>
                                                                                       </div>
                                                                                    </li>
                                                                                 )
                                                                              )}
                                                                           <div className='flex justify-center'>
                                                                              <button
                                                                                 type='button'
                                                                                 onClick={() => {
                                                                                    push(
                                                                                       emptyCompetitor
                                                                                    );
                                                                                 }}
                                                                                 className='inline-flex items-center gap-3 text-lg p-3 btn blue-gradient text-black-eerie hover:text-white'>
                                                                                 <span>
                                                                                    Add
                                                                                    new
                                                                                    competitor
                                                                                 </span>
                                                                                 <FontAwesomeIcon
                                                                                    className='w-7 h-auto cursor-pointer text-white'
                                                                                    icon={
                                                                                       faCirclePlus
                                                                                    }
                                                                                 />
                                                                              </button>
                                                                           </div>
                                                                        </ul>
                                                                        <div className='flex justify-between items-center'>
                                                                           <div className='flex gap-3'>
                                                                              <button
                                                                                 type='submit'
                                                                                 className={
                                                                                    isSubmitting ||
                                                                                    !isValid
                                                                                       ? "btn-rev btn-disabled"
                                                                                       : "btn-rev"
                                                                                 }
                                                                                 disabled={
                                                                                    isSubmitting ||
                                                                                    !isValid
                                                                                 }>
                                                                                 Generate
                                                                              </button>
                                                                              <a
                                                                                 href='/'
                                                                                 className='btn text-black-eerie hover:text-blue-ncs'>
                                                                                 <strong>
                                                                                    Back
                                                                                    To
                                                                                    Dashboard
                                                                                 </strong>
                                                                              </a>
                                                                           </div>
                                                                           {isSubmitting && (
                                                                              <Spinner message='Saving Competitors' />
                                                                           )}
                                                                        </div>
                                                                     </>
                                                                  )}
                                                               </FieldArray>
                                                            </div>
                                                         </div>
                                                         <div className='md:w-[34%] p-10'>
                                                            chartt!!!
                                                         </div>
                                                      </div>
                                                   )
                                                )}
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
            </div>
         </div>
      </>
   );
};

export default Competitors;
