import Image from "next/image";
import Link from "next/link";
import IdeasModal from "../../components/app/ideas-modal";
import useModalToggler from "../../hooks/use-modal-toggler";

const Goals = () => {
   const [isIdeasModalOpen, toggleIdeasModal] = useModalToggler();

   return (
      <>
         <IdeasModal isOpen={isIdeasModalOpen} toggle={toggleIdeasModal} />

         <div className='homepage-bg-gradient w-screen bg-white'>
            <div className='px-12 mx-0 my-auto md:w-[calc(1300px_-_1.5_*_2)] lg:w-[960px_-_1.5rem_*_2] xl:w-[1300_-_1.5rem_*_2]'>
               <div className='flex flex-wrap'>
                  <div className='md:w-1/2 bg-white p-12 relative'>
                     <div className='pb-5'>
                        <strong className='mr-1'>Mustafa Khairy </strong> |
                        <a href='http://bo.adpadelhouse.com/logout'> logout </a>
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
                           className='p-3 bg-gray-100 outline-none caret-dark-blue border-none p-3 grow'
                           value=''
                        />
                     </h3>
                     <h3 className='text-[2.52rem] mb-6 font-normal'>
                        Visualize success on this date, What does it look like
                     </h3>
                     <h2 className='text-[4.2rem] mb-6 text-yellow-green'>
                        Celebrating Unequivocal Success!
                     </h2>
                     <p className='mb-5'>Things you want to be celebrating:</p>
                     <div id='goals-app'>
                        <ul className='flex flex-col gap-3 mb-10'>
                           <li>
                              <input
                                 type='text'
                                 className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none goals'
                                 data-id='21'
                                 name='goals[]'
                                 value='5 Consulting Engagement Signed (250,000 JOD)'
                                 placeholder='Enter goal and add another'
                              />
                              <a
                                 data-id='21'
                                 className='deleteGoal btn-delete mt-2'>
                                 x
                              </a>
                           </li>
                           <li>
                              <input
                                 type='text'
                                 className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none goals'
                                 data-id='22'
                                 name='goals[]'
                                 value='A stable training income disruptive'
                                 placeholder='Enter goal and add another'
                              />
                              <a
                                 data-id='22'
                                 className='deleteGoal btn-delete mt-2'>
                                 x
                              </a>
                           </li>
                           <li>
                              <input
                                 type='text'
                                 className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none goals'
                                 data-id='20'
                                 name='goals[]'
                                 value='EBOS / Others - 10,000 Users'
                                 placeholder='Enter goal and add another'
                              />
                              <a
                                 data-id='20'
                                 className='deleteGoal btn-delete mt-2'>
                                 x
                              </a>
                           </li>
                           <li>
                              <input
                                 type='text'
                                 className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none goals'
                                 data-id='19'
                                 name='goals[]'
                                 value='100 Contingent workforce deployed'
                                 placeholder='Enter goal and add another'
                              />
                              <a
                                 data-id='19'
                                 className='deleteGoal btn-delete mt-2'>
                                 x
                              </a>
                           </li>
                           <li>
                              <input
                                 type='text'
                                 className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none goals'
                                 data-id='18'
                                 name='goals[]'
                                 value='MC Platform - 250,000 Candidates'
                                 placeholder='Enter goal and add another'
                              />
                              <a
                                 data-id='18'
                                 className='deleteGoal btn-delete mt-2'>
                                 x
                              </a>
                           </li>
                           <li>
                              <input
                                 type='text'
                                 className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none goals'
                                 name='goals[]'
                                 placeholder='Enter goal and add another'
                              />
                              <a className='deleteGoal btn-delete  mt-2'>x</a>
                           </li>
                        </ul>
                        <div className='flex gap-3'>
                           <a id='add-goal' className='btn blue-gradient text-black-eerie hover:text-white'>
                             + Add
                           </a>
                           <button
                              type='button'
                              className='btn-rev'
                              id='submit'>
                              Save and submit
                           </button>
                           <a href='/ebos' className='btn text-black-eerie hover:text-blue-ncs'>
                              <strong>Back To Dashboard</strong>
                           </a>
                        </div>
                     </div>
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
                              height='0'
                              src='http://bo.adpadelhouse.com/assets/images/ilogo.png'
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
