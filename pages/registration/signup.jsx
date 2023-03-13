const Registration = () => {
   return (
      <>
         <div
            className='fixed inset-0 z-[1030] bg-gray-battleship custom-blur'
            data-trigger='.register-link'
            style={{ display: "block" }}>
            <div
               className='modal dr-window'
               role='dialog'
               aria-labelledby='modaltitle'
               tabindex='-1'>
               <div className='modal-dialog'>
                  <div className='modal-content dr-content'>
                     <div className='modal-header'>
                        <div className='modal-title '>
                           <h2 className='f2 '>Register now</h2>
                           <h3 className='spaced f6 grey-dark'>
                              to start your free sessions
                           </h3>
                        </div>
                        <button
                           type='button'
                           className='modal-close dr-close'
                           aria-label='Close'></button>
                     </div>
                     <div className='modal-body'>
                        <div id='validation-errors'></div>
                        {/* submit form then redirect to app/goals */}
                        <form
                           method='POST'
                           className='reg-form'
                           action='http://bo.adpadelhouse.com/register'>
                           <input
                              type='hidden'
                              name='_token'
                              value='flLpueuWiW4yYQhFv42duLSPTHXIub8XYUjHG5lR'
                           />
                           <div className='spaced'>
                              <input
                                 id='name'
                                 type='text'
                                 placeholder='Name'
                                 className='w-full text-input '
                                 name='name'
                                 value=''
                                 required=''
                                 autocomplete='name'
                                 autofocus=''
                              />
                           </div>
                           <div className='spaced'>
                              <input
                                 id='email'
                                 type='email'
                                 placeholder='Email'
                                 className='w-full text-input '
                                 name='email'
                                 value=''
                                 required=''
                                 autocomplete='email'
                                 autofocus=''
                              />
                           </div>
                           <div className='spaced'>
                              <input
                                 id='phone'
                                 type='text'
                                 placeholder='Phone'
                                 className='w-full text-input '
                                 name='phone'
                                 value=''
                                 required=''
                                 autocomplete='phone'
                                 autofocus=''
                              />
                           </div>
                           <div className='spaced'>
                              <input
                                 id='password'
                                 type='password'
                                 placeholder='Password'
                                 className='w-full text-input '
                                 name='password'
                                 required=''
                                 autocomplete='new-password'
                              />
                           </div>
                           <div className='spaced'>
                              <input
                                 id='password-confirm'
                                 type='password'
                                 placeholder='Confirm Password'
                                 className='w-full text-input'
                                 name='password_confirmation'
                                 required=''
                                 autocomplete='new-password'
                              />{" "}
                           </div>
                           <div className='spaced'>
                              <button className='w-full btn-rev'>Register</button>
                           </div>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default Registration;
