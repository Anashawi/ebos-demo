import Link from "next/link";

const Analysis = () => {
   return (
      <>
         <div className='homepage-bg-gradient w-screen bg-white'>
            <div className='px-12 mx-0 my-auto md:w-[calc(1300px_-_1.5_*_2)] lg:w-[960px_-_1.5rem_*_2] xl:w-[1300_-_1.5rem_*_2]'>
               <div className='flex flex-wrap'>
                  <div className='md-4 bg-white p-12 relative'>
                     <div className='pb-5'>
                        <strong>Mustafa Khairy </strong> |
                        <a href='http://bo.adpadelhouse.com/logout'> logout </a>
                     </div>

                     <h3 className='text-[2.52rem] mb-6 text-yellow-green'>
                        Step-up step-down
                     </h3>

                     <h6 className='f6 mb-6'>10% above</h6>

                     <ul className='flex flex-col gap-3 above'>
                        <li>
                           <input
                              type='text'
                              className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none is_above'
                           />
                           <a className='btn-delete deleteItem'> X </a>
                        </li>
                     </ul>
                     <div>
                        <a id='above' href='#' className='btn'>
                           Add
                        </a>
                     </div>
                     <br />

                     <h6 className='f6 mb-6'>10% below</h6>

                     <ul className='flex flex-col gap-3 below'>
                        <li>
                           <input
                              type='text'
                              className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none is_below'
                           />
                           <a className='btn-delete deleteItem'> X </a>
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
                        <a href='/ebos' className='btn text-black-eerie'>
                           <strong>Back To Dashboard</strong>
                        </a>
                     </div>
                  </div>
                  <div className='md-8 pane-right-gradient min-h-screen p-12'>
                     <Link href='/' className='logo-pane'>
                        <h4 className='text-[3rem] text-white'>20X</h4>
                        <span className='relative -translate-x-[1.2rem]'>
                           revenue BY
                        </span>
                        <div className='w-[110px] h-[33px]'>
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
                           <div className='box box-grey-dark'>
                              Your customer
                           </div>
                           <div className='box mb-6'>
                              <h6 className='f6 mb-6'>10% below</h6>
                              <ul className='normal mb-6 is_belowli'></ul>
                           </div>
                        </div>

                        <button
                           className='btn text-black-eerie'
                           data-name='Goals'
                           id=''>
                           <strong>Request </strong> for consultant review
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         {/* modal!*/}
         {/* <div
            className='fixed inset-0 z-[1030] bg-gray-battleship modal-center modal-overlay backdrop-blur'
            data-trigger='.openideas'>
            <div
               className='fixed inset-0 overflow-hidden outline-none z-[1040px] dr-window'
               role='dialog'
               aria-labelledby='modaltitle'
               tabindex='-1'>
               <div className='relative w-auto m-6 pointer-events-none flex items-center h-[calc(100vh_-_1.5rem_*_2)] md:max-w-[700px] md:ml-auto md:mr-auto'>
                  <div className='modal-content dr-content'>
                     <div className='flex items-center justify-between p-3 h-12'>
                        <div className='modal-title'>
                           <h2 className='text-[2.8rem]'>Ideas</h2>
                           <h3 className='mb-6 f6 text-gray-gunmetal mb-5'>Add your ideas</h3>
                        </div>
                        <button
                           type='button'
                           className='modal-close dr-close'
                           aria-label='Close'></button>
                     </div>
                     <div className='relative flex-auto p-3 overflow-auto' id='ideas-app'>
                        <div className='idea-list'>
                           <ul className='flex flex-col gap-3 mb-5'>
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
                                 className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none newIdea'
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
         </div> */}
      </>
   );
};

export default Analysis;
