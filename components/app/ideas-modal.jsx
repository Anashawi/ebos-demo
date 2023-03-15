const IdeasModal = ({ isOpen, toggle }) => {
   if (!isOpen) return;

   return (
      <>
         <div
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
                           <h3 className='mb-6 f6 text-gray-gunmetal mb-5'>
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
                        className='relative flex-auto p-3 overflow-auto'
                        id='ideas-app'>
                        <div className='idea-list'>
                           <ul className='flex flex-col gap-3 mb-5'>
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
         </div>
      </>
   );
};

export default IdeasModal;
