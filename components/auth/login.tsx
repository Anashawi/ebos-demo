import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPage } from "next";
import { useState } from "react";

type Props = {
   closeLoginScreen: () => void;
};
const Login: NextPage<Props> = ({ closeLoginScreen }) => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   return (
      <>
         <div
            className='block fixed inset-0 z-[1030] bg-gray-battleship backdrop-blur'
            data-trigger='.login-link'>
            <div
               className='fixed inset-0 overflow-hidden outline-none dr-window'
               role='dialog'
               aria-labelledby='modaltitle'
               tabIndex={-1}>
               <div className='relative flex items-center p-0 mx-auto my-[1.5rem] max-w-[700px] w-auto text-black-eerie pointer-events-none h-[calc(100vh_-_1.5rem_*_2)] z-[1040]'>
                  <div className='relative flex flex-col gap-3 p-3 w-full pointer-events-auto outline-none text-white drop-shadow-sm shadow-2xl bg-clip-padding max-h-[calc(100vh_-_1.5rem_*_2)] bg-transparent'>
                     <div className='flex items-center justify-between min-h-[58px] p-3'>
                        <div className='flex flex-col gap-3'>
                           <h2 className='text-5xl'>Register now</h2>
                           <h3 className='text-2xl text-gray-gunmetal'>
                              to start your free sessions
                           </h3>
                        </div>
                        <button
                           type='button'
                           onClick={closeLoginScreen}
                           className='self-start border-none bg-transparent cursor-pointer w-[1rem] dr-close'
                           aria-label='Close'>
                           <FontAwesomeIcon icon={faTimes} />
                        </button>
                     </div>
                     <div className='relative flex-auto p-3 overflow-auto'>
                        <div id='validation-errors2'></div>
                        {/* submit form then redirect to app/goals */}
                        <form
                           method='POST'
                           className='text-gray-700'
                           action='http://bo.adpadelhouse.com/login'>
                           <input
                              type='hidden'
                              name='_token'
                              value='flLpueuWiW4yYQhFv42duLSPTHXIub8XYUjHG5lR'
                           />
                           <div className='mb-6'>
                              <input
                                 id='email'
                                 type='email'
                                 placeholder='Email'
                                 className='w-full p-3 bg-gray-100 outline-none border-none caret-dark-blue'
                                 name='email'
                                 value={email}
                                 onChange={(e) => {
                                    setEmail(e.target.value);
                                 }}
                                 required
                                 autoComplete='email'
                                 autoFocus
                              />
                           </div>
                           <div className='mb-6'>
                              <input
                                 id='password'
                                 type='password'
                                 placeholder='Password'
                                 className='w-full p-3 bg-gray-100 outline-none border-none caret-dark-blue'
                                 name='password'
                                 value={password}
                                 onChange={(e) => {
                                    setPassword(e.target.value);
                                 }}
                                 required
                                 autoComplete='new-password'
                              />
                           </div>
                           <div className='mb-6'>
                              <button className='w-full p-2 text-gray-900 bg-yellow-green bg-repeat-x bg-gradient-to-b from-mustard to-yellow-yellow-mikado rounded-full'>
                                 Login
                              </button>
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
