import Link from "next/link";

const Analysis = () => {
   return (
      <>
         <div className='split '>
            <div className='page '>
               <div className='row'>
                  <div className='md-4 pane-left'>
                     <div className='pb-5'>
                        <strong>Mustafa Khairy </strong> |
                        <a href='http://bo.adpadelhouse.com/logout'> logout </a>
                     </div>

                     <h3 className='f3 spaced yellow'>Step-up step-down</h3>

                     <h6 className='f6 spaced'>10% above</h6>

                     <ul className='alist above'>
                        <li>
                           <input
                              type='text'
                              className='w100 text-input is_above'
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

                     <h6 className='f6 spaced'>10% below</h6>

                     <ul className='alist below'>
                        <li>
                           <input
                              type='text'
                              className='w100 text-input is_below'
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
                  <div className='md-8 pane-right'>
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
                        <div className='box box-grey-light spaced'>
                           <div className='box spaced'>
                              <h6 className='f6 spaced'>10% Above</h6>
                              <ul className='normal spaced is_aboveli'></ul>
                           </div>
                           <div className='box box-grey-dark'>Your customer</div>
                           <div className='box spaced'>
                              <h6 className='f6 spaced'>10% below</h6>
                              <ul className='normal spaced is_belowli'></ul>
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
                           <h3 className='spaced f6 grey-dark'>Add your ideas</h3>
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
                                 className='w100 text-input newIdea'
                                 placeholder='New idea'
                              />
                           </li>
                        </div>

                        <div className='spaced'>
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
