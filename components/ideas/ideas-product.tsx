import { NextPage } from "next";
import { ProductModel } from "../../models/products/product.model";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Spinner from "../common/spinner";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { useMemo, useState } from "react";
import { ProductIdeaFactor } from "../../models/products/idea-factor.model";

type Props = {
   product: ProductModel;
};

const IdeasProduct: NextPage<Props> = ({ product }) => {
   const [ideaFactors, setIdeaFactors] = useState(product.ideaFactors);
   const emptyIdea = useMemo(() => {
      return {
         id: "",
         name: "",
         competitors: [
            {
               id: "",
               value: 0,
            },
         ],
      };
   }, []);
   return (
      <>
         <div className='relative flex-auto p-3'>
            <h1 className='py-5 text-gray-600'>{product.name}</h1>
            {!!ideaFactors.length && (
               <ul className='flex flex-col gap-2 mb-10'>
                  {ideaFactors.map((idea: ProductIdeaFactor, index: number) => (
                     <li
                        key={index}
                        className='flex gap-5 justify-between text-gray-800 '>
                        <span> {idea.name} </span>
                        <button
                           onClick={() => {
                              setIdeaFactors(
                                 ideaFactors.filter(
                                    (factor) => factor.id !== idea.id
                                 )
                              );
                           }}
                           className='flex items-center gap-3 text-lg p-3 text-rose-200 hover:text-rose-500'
                           type='button'>
                           <FontAwesomeIcon
                              className='w-7 h-auto cursor-pointer hover:text-rose-500'
                              icon={faMinusCircle}
                           />
                        </button>
                     </li>
                  ))}
               </ul>
            )}
            <Formik
               initialValues={{
                  idea: emptyIdea,
               }}
               validationSchema={Yup.object({
                  idea: Yup.object({
                     id: Yup.string(),
                     name: Yup.string().required("required"),
                  }),
               })}
               onSubmit={(values) => {
                  console.log(values);
                  const newIdea = emptyIdea;
                  newIdea.name = values.idea.name;
                  setIdeaFactors([...ideaFactors, newIdea]);
               }}
               validateOnMount>
               {({ values, isSubmitting, isValid }) => (
                  <Form>
                     <div className='flex flex-wrap gap-5 items-start'>
                        <div className='grow'>
                           <Field
                              type='text'
                              className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none'
                              placeholder='New idea'
                              name='idea.name'
                           />
                           <ErrorMessage name={`idea.name`}>
                              {(msg) => (
                                 <div className='text-lg text-rose-500'>
                                    {msg}
                                 </div>
                              )}
                           </ErrorMessage>
                        </div>
                        <div className='flex justify-end'>
                           <button
                              type='submit'
                              className={
                                 isSubmitting || !isValid
                                    ? "btn-rev btn-disabled"
                                    : "btn-rev"
                              }
                              disabled={isSubmitting || !isValid}>
                              Add New Idea
                           </button>
                        </div>
                        {/* {isSubmitting && (
                           <Spinner className='' message='Saving Ideas' />
                        )} */}
                     </div>
                  </Form>
               )}
            </Formik>
         </div>
      </>
   );
};

export default IdeasProduct;
