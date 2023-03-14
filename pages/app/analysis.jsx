import Link from "next/link";

const Analysis = () => {
   return (
      <>
         <div className='homepage-bg-gradient w-screen bg-white'>
            <div className='p-12 mx-0 my-auto md:w-[calc(1300px_-_1.5_*_2)] lg:w-[960px_-_1.5rem_*_2] xl:w-[1300_-_1.5rem_*_2]'>
               <div className='flex flex-wrap'>
                  <div className='md-4 bg-white p-12 relative'>
                     <div className='pb-5'>
                        <strong>Mustafa Khairy </strong> |
                        <a href='http://bo.adpadelhouse.com/logout'> logout </a>
                     </div>

                     <h3 className='text-[2.52rem] mb-6 text-yellow-green'>Step-up step-down</h3>

                     <h6 className='f6 mb-6'>10% above</h6>

                     <ul className='alist above'>
                        <li>
                           <input
                              type='text'
                              className='w-full p-3 bg-gray-200 outline-none caret-dark-blue border-none is_above'
                           />
                           <a className='deletebtn deleteItem'> X </a>
                        </li>
                     </ul>
                     <div>
                        <a id='above' href='#' className='btn'>
                           Add
                        </a>
                     </div>
                     <br />

                     <h6 className='f6 mb-6'>10% below</h6>

                     <ul className='alist below'>
                        <li>
                           <input
                              type='text'
                              className='w-full p-3 bg-gray-200 outline-none caret-dark-blue border-none is_below'
                           />
                           <a className='deletebtn deleteItem'> X </a>
                        </li>
                     </ul>
                     <div>
                        <a id='below' href='#' className='btn'>
                           Add
                        </a>
                     </div>

                     <br />
                     <div>
                        <button id='generate' className='btn'>
                           Save
                        </button>
                        <a href='/ebos' className='btn'>
                           <strong>Back To Dashboard</strong>
                        </a>
                     </div>
                  </div>
                  <div className='md-8 pane-right-gradient min-h-screen p-12'>
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

                     <div className='breath'>
                        <div className='box box-grey-light mb-6'>
                           <div className='box mb-6'>
                              <h6 className='f6 mb-6'>10% Above</h6>
                              <ul className='normal mb-6 is_aboveli'></ul>
                           </div>
                           <div className='box box-grey-dark'>Your customer</div>
                           <div className='box mb-6'>
                              <h6 className='f6 mb-6'>10% below</h6>
                              <ul className='normal mb-6 is_belowli'></ul>
                           </div>
                        </div>

                        <button className='btn consultant' data-name='Goals' id=''>
                           <strong>Request </strong> for consultant review
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         {/* modal */}
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
                           <h3 className='mb-6 f6 grey-dark'>Add your ideas</h3>
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
                                    data-id='1'
                                    type='button'>
                                    remove
                                 </button>
                              </li>
                              <li>
                                 <span> idea 2 </span>
                                 <button
                                    className='deleteIdea'
                                    data-id='2'
                                    type='button'>
                                    remove
                                 </button>
                              </li>
                              <li>
                                 <span> idea 3 </span>
                                 <button
                                    className='deleteIdea'
                                    data-id='3'
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

export default Analysis;
