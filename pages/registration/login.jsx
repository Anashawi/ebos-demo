const Login = () => {
   return (
      <>
         <div
            className='fixed inset-0 z-[1030] bg-gray-battleship custom-blur'
            data-trigger='.login-link'
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
                        <div id='validation-errors2'></div>
                        {/* submit form then redirect to app/goals */}
                        <form
                           method='POST'
                           className='login-form'
                           action='http://bo.adpadelhouse.com/login'>
                           <input
                              type='hidden'
                              name='_token'
                              value='flLpueuWiW4yYQhFv42duLSPTHXIub8XYUjHG5lR'
                           />
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
                              <button className='w-full btn-rev'>Login</button>
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

export default Login;
