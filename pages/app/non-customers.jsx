import Link from "next/link";

const NonCustomers = () => {
   return (
      <>
         <div className='homepage-bg-gradient w-screen bg-white'>
            <form action='/'>
               <div className='p-12 mx-0 my-auto md:w-[calc(1300px_-_1.5_*_2)] lg:w-[960px_-_1.5rem_*_2] xl:w-[1300_-_1.5rem_*_2]'>
                  <div className='flex flex-wrap'>
                     <div className='md-4 bg-white p-12 relative'>
                        <div className='pb-5'>
                           <strong>Mustafa Khairy </strong> |
                           <Link href='http://bo.adpadelhouse.com/logout'>
                              logout
                           </Link>
                        </div>

                        <h3 className='text-[2.52rem] mb-6 text-yellow-green'>Non customers</h3>

                        <div className='mb-6'>
                           <h6 className='f6  mb-6'>Soon to be non customers</h6>
                           <ul className='alist non'>
                              <li>
                                 <input
                                    type='text '
                                    className='w-full p-3 bg-gray-200 outline-none caret-dark-blue border-none nonCustomers'
                                    autocomplete='off'
                                 />
                                 <Link className='deletebtn deleteItem'> X </Link>
                              </li>
                           </ul>
                           <div>
                              <a id='non' href='#' className='btn'>
                                 Add
                              </a>
                           </div>
                        </div>
                        <div className='mb-6'>
                           <h6 className='f6  mb-6'>Refusing customers</h6>
                           <ul className='alist ref'>
                              <li>
                                 <input
                                    type='text '
                                    className='w-full p-3 bg-gray-200 outline-none caret-dark-blue border-none refusingCustomers'
                                    autocomplete='off'
                                 />
                                 <a className='deletebtn deleteItem'> X </a>
                              </li>
                           </ul>
                           <div>
                              <a id='ref' className='btn'>
                                 Add
                              </a>
                           </div>
                        </div>
                        <div className='mb-6'>
                           <h6 className='f6  mb-6'>Unwanted customers</h6>
                           <ul className='alist unwant'>
                              <li>
                                 <input
                                    type='text '
                                    className='w-full p-3 bg-gray-200 outline-none caret-dark-blue border-none unwantedCustomers'
                                    autocomplete='off'
                                 />
                                 <a className='deletebtn deleteItem'> X </a>
                              </li>
                           </ul>
                           <div>
                              <a id='unwant' className='btn'>
                                 Add
                              </a>
                           </div>
                        </div>
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

                        <div className='box box-grey-light c-12'>
                           <div className='box doublespaced box-lighter c-12'>
                              <div className='box doublespaced box-text-yellow-green-light c-12'>
                                 <h6 className='f6 mb-6'>
                                    Soon to be non customers
                                 </h6>
                                 <ul className='normal mb-6 noncustomersli'></ul>
                              </div>

                              <h6 className='f6 mb-6'>Refusing customers</h6>
                              <ul className='normal mb-6 refusingcustomersli'></ul>
                           </div>

                           <h6 className='f6 mb-6'>Unwanted customers</h6>
                           <ul className='normal mb-6 unwantedcustomersli'></ul>
                        </div>

                        <div className='breath'>
                           <button
                              className='btn consultant'
                              data-name='Non customers'
                              id='theSubmitBtn'>
                              <strong>Request </strong> for consultant review
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </form>
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

export default NonCustomers;
