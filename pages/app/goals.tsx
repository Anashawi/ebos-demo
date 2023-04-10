import { Field, FieldArray, Form, Formik, ErrorMessage } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import IdeasModal from "../../components/app/ideas-modal";
import useModalToggler from "../../hooks/use-modal-toggler";
import * as Yup from "yup";
import Spinner from "../../components/common/spinner";

const goals_dummy = [
   "5 Consulting Engagement Signed (250,000 JOD)",
   "A stable training income disruptive",
   "100 Contingent workforce deployed",
   "MC Platform - 250,000 Candidates",
];

const Goals = () => {
   const [isIdeasModalOpen, toggleIdeasModal] = useModalToggler();
   const [targetDate, setTargetDate] = useState();

   return (
      <>
         <IdeasModal isOpen={isIdeasModalOpen} toggle={toggleIdeasModal} />

         <div className='homepage-bg-gradient w-screen bg-white'>
            <div className='px-12 mx-0 my-auto md:w-[calc(1300px_-_1.5_*_2)] lg:w-[960px_-_1.5rem_*_2] xl:w-[1300_-_1.5rem_*_2]'>
               <div className='flex flex-wrap'>
                  <div className='md:w-1/2 bg-white p-12 relative'>
                     <div className='pb-5'>
                        <strong className='mr-1'>Mustafa Khairy </strong> |
                        <Link href='http://bo.adpadelhouse.com/logout'>
                           {" "}
                           logout{" "}
                        </Link>
                     </div>
                     <h3 className='text-[2.52rem] mb-6 text-yellow-green'>
                        Goals
                     </h3>
                     <h3 className='flex gap-5 flex-wrap items-start text-[2.52rem] mb-6 font-normal'>
                        <p>Choose a target date</p>
                        <input
                           id='datepicker'
                           type='date'
                           placeholder='31-12-2020'
                           className='p-3 bg-gray-100 outline-none caret-dark-blue border-none grow'
                           value={targetDate}
                           onChange={(e: any) => {
                              setTargetDate(e.target.value);
                           }}
                        />
                     </h3>
                     <h3 className='text-[2.52rem] mb-6 font-normal'>
                        Visualize success on this date, What does it look like
                     </h3>
                     <h2 className='text-[4.2rem] mb-6 text-yellow-green'>
                        Celebrating Unequivocal Success!
                     </h2>
                     <p className='mb-5'>Things you want to be celebrating:</p>
                     <Formik
                        initialValues={{
                           goals: goals_dummy,
                        }}
                        validationSchema={Yup.object({
                           goals: Yup.array(
                              Yup.string().required(
                                 "the goal field must not be empty !"
                              )
                           )
                              .required("Must provide at least one goal !")
                              .min(1, "Must provide at least one goal !"),
                        })}
                        onSubmit={(values) => {
                           console.log(values);
                        }}
                        validateOnMount>
                        {({ values, isSubmitting, isValid, errors }) => (
                           <Form>
                              <FieldArray name='goals'>
                                 {({ remove, push, form }) => (
                                    <>
                                       <ul className='flex flex-col gap-3 mb-10'>
                                          {!!values.goals.length &&
                                             values.goals.map((goal, index) => (
                                                <div key={index}>
                                                   <li>
                                                      <Field
                                                         type='text'
                                                         className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none goals'
                                                         name={`goals.${index}`}
                                                         placeholder='Enter goal and add another'
                                                      />
                                                      <Link
                                                         href=''
                                                         onClick={() => {
                                                            remove(index);
                                                         }}
                                                         className='btn-delete mt-2'>
                                                         x
                                                      </Link>
                                                   </li>
                                                   <ErrorMessage
                                                      name={`goals.${index}`}>
                                                      {(msg) => (
                                                         <div className='text-lg text-rose-500'>
                                                            {msg}
                                                         </div>
                                                      )}
                                                   </ErrorMessage>
                                                </div>
                                             ))}
                                          {!values.goals.length &&
                                             form.errors?.goals && (
                                                <p className='p-3 text-center bg-rose-50 text-lg text-rose-500'>
                                                   <>{form.errors.goals}</>
                                                </p>
                                             )}
                                       </ul>
                                       <div className='flex justify-between items-center'>
                                          <div className='flex gap-3'>
                                             <Link
                                                href=''
                                                onClick={() => {
                                                   push("");
                                                }}
                                                className='btn blue-gradient text-black-eerie hover:text-white'>
                                                + Add
                                             </Link>
                                             <button
                                                type='submit'
                                                className={
                                                   isSubmitting || !isValid
                                                      ? "btn-rev btn-disabled"
                                                      : "btn-rev"
                                                }
                                                disabled={
                                                   isSubmitting || !isValid
                                                }>
                                                Save and submit
                                             </button>
                                             <Link
                                                href='/'
                                                className='btn text-black-eerie hover:text-blue-ncs'>
                                                <strong>
                                                   Back To Dashboard
                                                </strong>
                                             </Link>
                                          </div>
                                          {isSubmitting && (
                                             <Spinner
                                                className=''
                                                message='Saving Goals'
                                             />
                                          )}
                                       </div>
                                    </>
                                 )}
                              </FieldArray>
                           </Form>
                        )}
                     </Formik>
                     {/* <script src="/modules/goals.js"></script> */}
                  </div>
                  <div className='md:w-1/2 pane-right-gradient min-h-screen p-12'>
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
                              height='30'
                              src='/ilogo.webp'
                              alt='CaseInPoint'
                           />
                        </div>
                     </Link>
                     <div className='p-5 relative rounded-lg bg-gray-100 text-gray-800 h-3 mb-10'>
                        <iframe width='530' height='315' src='1'></iframe>
                     </div>
                     <div className='mx-auto text-center'>
                        <button
                           className='btn text-black-eerie mt-10'
                           data-name='Goals'
                           id='theSubmitBtn'>
                           <strong>Request </strong> for consultant review
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default Goals;
