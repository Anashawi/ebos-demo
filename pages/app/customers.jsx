import Link from "next/link";

const Customers = () => {
   return (
      <>
         <div className='split '>
            <form
               method='post'
               action='http://bo.adpadelhouse.com/app/customers'
               enctype='multipart/form-data'>
               <input
                  type='hidden'
                  name='_token'
                  value='E6vydmJoblEw5asasVKo4Ehneri0ZmjnuHJ03vSY'
               />
               <div className='page '>
                  <div className='row'>
                     <div className='md-4 pane-left'>
                        <div className='pb-5'>
                           <strong>Mustafa Khairy </strong> |
                           <a href='http://bo.adpadelhouse.com/logout'>
                              logout
                           </a>
                        </div>

                        <h3 className='f3 doublespacedplus yellow'>
                           Voice of customers
                        </h3>

                        <h4 className='f4 weight-normal spaced'>
                           Top customer categories
                        </h4>

                        <ul className='alist'>
                           <li>
                              <input
                                 type='text'
                                 name='name[]'
                                 className='w100 text-input'
                              />
                           </li>
                           <li>
                              <input
                                 type='text'
                                 name='name[]'
                                 className='w100 text-input'
                              />
                           </li>
                           <li>
                              <input
                                 type='text'
                                 name='name[]'
                                 className='w100 text-input'
                              />
                           </li>
                           <li>
                              <input
                                 type='text'
                                 name='name[]'
                                 className='w100 text-input'
                              />
                           </li>
                           <li>
                              <input
                                 type='text'
                                 name='name[]'
                                 className='w100 text-input'
                              />
                           </li>
                        </ul>

                        <div className='breath'>
                           <button
                              type='submit'
                              className='btn submit'
                              id='addNewProduct'>
                              Submit
                           </button>
                           <a href='/ebos' className='btn'>
                              <strong>Back To Dashboard</strong>
                           </a>
                        </div>
                     </div>

                     <div className='md-8 pane-right'>
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

                        <div className='row-spaced'>
                           <div className='col c-6'>
                              <h4 className='f4 weight-normal spaced'>
                                 What do they want
                              </h4>

                              <ul className='alist'>
                                 <li>
                                    <input
                                       type='text'
                                       name='target[]'
                                       className='w100 text-input'
                                    />
                                 </li>
                                 <li>
                                    <input
                                       type='text'
                                       name='target[]'
                                       className='w100 text-input'
                                    />
                                 </li>
                                 <li>
                                    <input
                                       type='text'
                                       name='target[]'
                                       className='w100 text-input'
                                    />
                                 </li>
                                 <li>
                                    <input
                                       type='text'
                                       name='target[]'
                                       className='w100 text-input'
                                    />
                                 </li>
                                 <li>
                                    <input
                                       type='text'
                                       name='target[]'
                                       className='w100 text-input'
                                    />
                                 </li>
                              </ul>
                           </div>
                           <div className='col c-6'>
                              <h4 className='f4 weight-normal spaced'>
                                 How to fulfill it
                              </h4>

                              <ul className='alist'>
                                 <li>
                                    <input
                                       type='text'
                                       name='fulfill[]'
                                       className='w100 text-input'
                                    />
                                 </li>
                                 <li>
                                    <input
                                       type='text'
                                       name='fulfill[]'
                                       className='w100 text-input'
                                    />
                                 </li>
                                 <li>
                                    <input
                                       type='text'
                                       name='fulfill[]'
                                       className='w100 text-input'
                                    />
                                 </li>
                                 <li>
                                    <input
                                       type='text'
                                       name='fulfill[]'
                                       className='w100 text-input'
                                    />
                                 </li>
                                 <li>
                                    <input
                                       type='text'
                                       name='fulfill[]'
                                       className='w100 text-input'
                                    />
                                 </li>
                              </ul>
                           </div>
                        </div>

                        <div className='breath'>
                           <button
                              className='btn consultant'
                              data-name='Voice Of Customers'
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

export default Customers;
