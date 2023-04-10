import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import Spinner from "../common/spinner";

import ideas_dummy from "../../samples/ideas.json";
import { Idea } from "../../models/idea.model";
import { NextPage } from "next";

type Props = {
   isOpen: boolean;
   toggle: () => void;
};

const IdeasModal: NextPage<Props> = ({ isOpen, toggle }) => {
   const [ideas, setIdeas] = useState(ideas_dummy);

   if (!isOpen) return <></>;

   return (
      <>
         <div
            className='fixed inset-0 z-[1030] bg-gray-battleship modal-center modal-overlay backdrop-blur'
            data-trigger='.openideas'>
            <div className='fixed inset-0 overflow-hidden outline-none z-[1040px] dr-window'>
               <div className='relative w-auto m-6 pointer-events-none flex items-center h-[calc(100vh_-_1.5rem_*_2)] md:max-w-[700px] md:ml-auto md:mr-auto'>
                  <div className='p-5 modal-content dr-content shadow-2xl'>
                     <div className='flex justify-between p-3 h-12 mb-10'>
                        <div className='modal-title mb-10'>
                           <h2 className='mb-4 text-[2.8rem]'>Ideas</h2>
                           <h3 className='mb-6 f6 text-gray-gunmetal'>
                              Add your ideas
                           </h3>
                        </div>
                        <button
                           type='button'
                           className='modal-close dr-close'
                           onClick={toggle}
                           aria-label='Close'></button>
                     </div>
                     <div
                        className='mt-10 relative flex-auto p-3 overflow-auto'
                        id='ideas-app'>
                        <div className='idea-list'>
                           {!!ideas.length && (
                              <ul className='flex flex-col gap-3 mb-5'>
                                 {ideas.map((idea: Idea, index: number) => (
                                    <li key={index}>
                                       <span> {idea.text} </span>
                                       <button
                                          onClick={() => {
                                             console.log(
                                                "delete idea ",
                                                idea.id
                                             );
                                          }}
                                          type='button'>
                                          remove
                                       </button>
                                    </li>
                                 ))}
                              </ul>
                           )}
                        </div>
                        <Formik
                           initialValues={{
                              idea: "",
                           }}
                           validationSchema={Yup.object({
                              idea: Yup.object({
                                 id: Yup.string(),
                                 name: Yup.string().required("required"),
                              }),
                           })}
                           onSubmit={(values) => {
                              console.log(values);
                           }}
                           validateOnMount>
                           {({ values, isSubmitting, isValid }) => (
                              <Form>
                                 <div>
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
                                 <div className='flex justify-end pt-10'>
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
                                 </div>
                                 {isSubmitting && (
                                    <Spinner
                                       className=''
                                       message='Saving Ideas'
                                    />
                                 )}
                              </Form>
                           )}
                        </Formik>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default IdeasModal;
