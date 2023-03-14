import Link from "next/link";

const Goals = () => {
   return (
      <>
         <div className='homepage-bg-gradient w-screen bg-white'>
            <div className='p-12 mx-0 my-auto md:w-[calc(1300px_-_1.5_*_2)] lg:w-[960px_-_1.5rem_*_2] xl:w-[1300_-_1.5rem_*_2]'>
               <div className='flex flex-wrap'>
                  <div className='md:w-1/2 bg-white p-12 relative'>
                     <div className='pb-5'>
                        <strong>Mustafa Khairy </strong> |
                        <a href='http://bo.adpadelhouse.com/logout'> logout </a>
                     </div>
                     <h3 className='text-[2.52rem] mb-6 text-yellow-green'>Goals</h3>

                     <h3 className='text-[2.52rem] mb-6 font-normal'>
                        Choose a target date
                        <input
                           id='datepicker'
                           placeholder='31-12-2020'
                           className='p-3 bg-gray-200 outline-none caret-dark-blue border-none p-3'
                           value=''
                        />
                     </h3>
                     <h3 className='text-[2.52rem] mb-6 font-normal'>
                        Visualize success on this date, What does it look like
                     </h3>

                     <h2 className='text-[4.2rem] mb-6 text-yellow-green'>
                        Celebrating Unequivocal Success!
                     </h2>
                     <p>Things you want to be celebrating:</p>

                     <div id='goals-app'>
                        <ul className='alist'>
                           <li>
                              <input
                                 type='text'
                                 className='w-full p-3 bg-gray-200 outline-none caret-dark-blue border-none goals'
                                 data-id='21'
                                 name='goals[]'
                                 value='5 Consulting Engagement Signed (250,000 JOD)'
                                 placeholder='Enter goal and add another'
                              />
                              <a
                                 data-id='21'
                                 className='deleteGoal deletebtn mt-2'>
                                 x
                              </a>
                           </li>
                           <li>
                              <input
                                 type='text'
                                 className='w-full p-3 bg-gray-200 outline-none caret-dark-blue border-none goals'
                                 data-id='22'
                                 name='goals[]'
                                 value='A stable training income disruptive'
                                 placeholder='Enter goal and add another'
                              />
                              <a
                                 data-id='22'
                                 className='deleteGoal deletebtn mt-2'>
                                 x
                              </a>
                           </li>
                           <li>
                              <input
                                 type='text'
                                 className='w-full p-3 bg-gray-200 outline-none caret-dark-blue border-none goals'
                                 data-id='20'
                                 name='goals[]'
                                 value='EBOS / Others - 10,000 Users'
                                 placeholder='Enter goal and add another'
                              />
                              <a
                                 data-id='20'
                                 className='deleteGoal deletebtn mt-2'>
                                 x
                              </a>
                           </li>
                           <li>
                              <input
                                 type='text'
                                 className='w-full p-3 bg-gray-200 outline-none caret-dark-blue border-none goals'
                                 data-id='19'
                                 name='goals[]'
                                 value='100 Contingent workforce deployed'
                                 placeholder='Enter goal and add another'
                              />
                              <a
                                 data-id='19'
                                 className='deleteGoal deletebtn mt-2'>
                                 x
                              </a>
                           </li>
                           <li>
                              <input
                                 type='text'
                                 className='w-full p-3 bg-gray-200 outline-none caret-dark-blue border-none goals'
                                 data-id='18'
                                 name='goals[]'
                                 value='MC Platform - 250,000 Candidates'
                                 placeholder='Enter goal and add another'
                              />
                              <a
                                 data-id='18'
                                 className='deleteGoal deletebtn mt-2'>
                                 x
                              </a>
                           </li>
                           <li>
                              <input
                                 type='text'
                                 className='w-full p-3 bg-gray-200 outline-none caret-dark-blue border-none goals'
                                 name='goals[]'
                                 placeholder='Enter goal and add another'
                              />
                              <a className='deleteGoal deletebtn  mt-2'>x</a>
                           </li>
                        </ul>
                        <a id='add-goal' className='btn'>
                           Add
                        </a>

                        <button type='button' className='btn-rev' id='submit'>
                           Save and submit
                        </button>
                        <a href='/ebos' className='btn'>
                           <strong>Back To Dashboard</strong>
                        </a>
                     </div>
                     {/* <script src="/modules/goals.js"></script> */}
                  </div>
                  <div className='md:w-1/2 pane-right-gradient min-h-screen p-12'>
                     <div className=''>
                        <button type='button' className='btn openideas'>
                           My ideas
                        </button>
                     </div>
                     <Link href='/' className='logo-pane'>
                        <h4>20X</h4>
                        <span className='rev'>revenue BY</span>
                        <div className='logo'>
                           <img
                              src='http://bo.adpadelhouse.com/assets/images/ilogo.png'
                              alt='CaseInPoint'
                           />
                        </div>
                     </Link>

                     <div className='box box-grey-light h-3 doublespaced'>
                        <iframe width='530' height='315' src='1'></iframe>
                     </div>

                     <div className='center txt-c'>
                        <button
                           className='btn consultant'
                           data-name='Goals'
                           id='theSubmitBtn'>
                           <strong>Request </strong> for consultant review
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div
            className='dr-modal-overlay modal-center modal-overlay modal-backdrop'
            data-trigger='.openideas'>
            <div
               className='modal dr-window'
               role='dialog'
               aria-labelledby='modaltitle'
               tabindex='-1'>
               <div className='modal-dialog'>
                  <div className='modal-content dr-content'>
                     <div className='modal-header'>
                        <div className='modal-title '>
                           <h2 className='f2 '>Ideas</h2>
                           <h3 className='mb-6 f6 grey-dark'>
                              Add your ideas
                           </h3>
                        </div>
                        <button
                           type='button'
                           className='modal-close dr-close'
                           aria-label='Close'></button>
                     </div>
                     <div className='modal-body' id='ideas-app'>
                        <div className='idea-list'>
                           <ul className='alist'>
                              <li>
                                 <span> some ideas </span>
                                 <button
                                    className='deleteIdea'
                                    data-id={1}
                                    type='button'>
                                    remove
                                 </button>
                              </li>
                              <li>
                                 <span> idea 2 </span>
                                 <button
                                    className='deleteIdea'
                                    data-id={2}
                                    type='button'>
                                    remove
                                 </button>
                              </li>
                              <li>
                                 <span> idea 3 </span>
                                 <button
                                    className='deleteIdea'
                                    data-id={3}
                                    type='button'>
                                    remove
                                 </button>
                              </li>
                           </ul>
                           <li>
                              <input
                                 type='text'
                                 className='w-full p-3 bg-gray-200 outline-none caret-dark-blue border-none newIdea'
                                 placeholder='New idea'
                              />
                           </li>
                        </div>

                        <div className='mb-6'>
                           <br />
                           <button
                              type='button'
                              id='saveIdea'
                              className='add-idea btn-rev'>
                              Save
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default Goals;
