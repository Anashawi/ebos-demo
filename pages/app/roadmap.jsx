import Image from "next/image";
import Link from "next/link";

const Roadmap = () => {
   return (
      <>
         <div className='split-h'>
            <form action='http://bo.adpadelhouse.com/app/roadmap' method='POST'>
               <input
                  type='hidden'
                  name='_token'
                  value='E6vydmJoblEw5asasVKo4Ehneri0ZmjnuHJ03vSY'
               />
               <div className='pane-upper'>
                  <div className='px-12 py-8'>
                     <div className='flex gap-5 justify-between items-center pb-5'>
                        <div>
                           <strong className='mr-1'>Mustafa Khairy </strong> |
                           <a href='http://bo.adpadelhouse.com/logout'>
                              logout
                           </a>
                        </div>
                        <Link href='/' className='logo-pane mb-0'>
                           <h4 className='text-[3rem] text-yellow-green'>
                              20X
                           </h4>
                           <span className='relative -translate-x-[1.2rem]'>
                              revenue BY
                           </span>
                           <div className='w-[110px] h-[33px]'>
                              <Image
                                 width='55'
                                 height='30'
                                 src='http://bo.adpadelhouse.com/assets/images/ilogo.png'
                                 alt='CaseInPoint'
                              />
                           </div>
                        </Link>
                     </div>
                     <h3 className='text-[2.52rem] mb-6 text-yellow-green'>
                        Roadmap
                     </h3>
                     <h4 className='text-[2.1rem] mb-6'>
                        Create a timeline for your ideas
                     </h4>
                     <div className='flex g-1 gap-5 mb-10'>
                        <div>Start date</div>
                        <div className='grow'>
                           <select
                              name=''
                              id='startDate'
                              className='w-full grow px-[1.6rem] py-[1rem] bg-gray-100 outline-none caret-dark-blue border-none'>
                              <option value='2023-03-01 00:00:00'>
                                 Mar 2023
                              </option>
                              <option value='2023-04-01 00:00:00'>
                                 Apr 2023
                              </option>
                              <option value='2023-05-01 00:00:00'>
                                 May 2023
                              </option>
                              <option value='2023-06-01 00:00:00'>
                                 Jun 2023
                              </option>
                              <option value='2023-07-01 00:00:00'>
                                 Jul 2023
                              </option>
                              <option value='2023-08-01 00:00:00'>
                                 Aug 2023
                              </option>
                              <option value='2023-09-01 00:00:00'>
                                 Sep 2023
                              </option>
                              <option value='2023-10-01 00:00:00'>
                                 Oct 2023
                              </option>
                              <option value='2023-11-01 00:00:00'>
                                 Nov 2023
                              </option>
                              <option value='2023-12-01 00:00:00'>
                                 Dec 2023
                              </option>
                              <option value='2024-01-01 00:00:00'>
                                 Jan 2024
                              </option>
                              <option value='2024-02-01 00:00:00'>
                                 Feb 2024
                              </option>
                              <option value='2024-03-01 00:00:00'>
                                 Mar 2024
                              </option>
                              <option value='2024-04-01 00:00:00'>
                                 Apr 2024
                              </option>
                              <option value='2024-05-01 00:00:00'>
                                 May 2024
                              </option>
                              <option value='2024-06-01 00:00:00'>
                                 Jun 2024
                              </option>
                           </select>
                        </div>
                     </div>
                     <ul className='flex flex-col gap-3 mb-5'>
                        <li className='flex gap-5 items-start'>
                           <div className='flex flex-col'>
                              <div>Idea</div>
                              <select
                                 name='ideas[]'
                                 id=''
                                 className='w-full grow px-[1.6rem] py-[1rem] bg-gray-100 outline-none caret-dark-blue border-none'>
                                 <option value='1' selected='selected'>
                                    some ideas
                                 </option>
                                 <option value='2'> idea 2 </option>
                                 <option value='3'> idea 3 </option>
                              </select>
                           </div>
                           <div className='grow md:flex gap-5 items-start'>
                              <div className='grow'>
                                 <div>Start (month)</div>
                                 <select
                                    name='start[]'
                                    id='start'
                                    className='w-full grow px-[1.6rem] py-[1rem] bg-gray-100 outline-none caret-dark-blue border-none'>
                                    <option
                                       value='2023-03-01 00:00:00'
                                       selected='selected'>
                                       Mar 2023
                                    </option>
                                    <option value='2023-04-01 00:00:00'>
                                       Apr 2023
                                    </option>
                                    <option value='2023-05-01 00:00:00'>
                                       May 2023
                                    </option>
                                    <option value='2023-06-01 00:00:00'>
                                       Jun 2023
                                    </option>
                                    <option value='2023-07-01 00:00:00'>
                                       Jul 2023
                                    </option>
                                    <option value='2023-08-01 00:00:00'>
                                       Aug 2023
                                    </option>
                                    <option value='2023-09-01 00:00:00'>
                                       Sep 2023
                                    </option>
                                    <option value='2023-10-01 00:00:00'>
                                       Oct 2023
                                    </option>
                                    <option value='2023-11-01 00:00:00'>
                                       Nov 2023
                                    </option>
                                    <option value='2023-12-01 00:00:00'>
                                       Dec 2023
                                    </option>
                                    <option value='2024-01-01 00:00:00'>
                                       Jan 2024
                                    </option>
                                    <option value='2024-02-01 00:00:00'>
                                       Feb 2024
                                    </option>
                                    <option value='2024-03-01 00:00:00'>
                                       Mar 2024
                                    </option>
                                    <option value='2024-04-01 00:00:00'>
                                       Apr 2024
                                    </option>
                                    <option value='2024-05-01 00:00:00'>
                                       May 2024
                                    </option>
                                    <option value='2024-06-01 00:00:00'>
                                       Jun 2024
                                    </option>
                                 </select>
                              </div>
                              <div className='grow'>
                                 <div>Duration (months)</div>
                                 <input
                                    type='range'
                                    min='1'
                                    max='12'
                                    value='4'
                                    name='end[]'
                                    list='duration'
                                    className='w-full grow bg-gray-100 outline-none caret-dark-blue border-none'
                                    step='1'
                                 />
                                 <datalist
                                    id='duration'
                                    className='flex items-center justify-between text-lg w-full'>
                                    <option
                                       value='1'
                                       label='01'
                                       className='text-[1.12rem]'></option>
                                    <option
                                       value='2'
                                       label='02'
                                       className='text-[1.12rem]'></option>
                                    <option
                                       value='3'
                                       label='03'
                                       className='text-[1.12rem]'></option>
                                    <option
                                       value='4'
                                       label='04'
                                       className='text-[1.12rem]'></option>
                                    <option
                                       value='5'
                                       label='05'
                                       className='text-[1.12rem]'></option>
                                    <option
                                       value='6'
                                       label='06'
                                       className='text-[1.12rem]'></option>
                                    <option
                                       value='7'
                                       label='07'
                                       className='text-[1.12rem]'></option>
                                    <option
                                       value='8'
                                       label='08'
                                       className='text-[1.12rem]'></option>
                                    <option
                                       value='9'
                                       label='09'
                                       className='text-[1.12rem]'></option>
                                    <option
                                       value='10'
                                       label='10'
                                       className='text-[1.12rem]'></option>
                                    <option
                                       value='11'
                                       label='11'
                                       className='text-[1.12rem]'></option>
                                    <option
                                       value='12'
                                       label='12'
                                       className='text-[1.12rem]'></option>
                                 </datalist>
                              </div>
                              <div className='col-2/12'>
                                 <div className='delete-road'>X</div>
                              </div>
                           </div>
                        </li>
                        <li className='flex gap-5 items-start'>
                           <div className='flex flex-col'>
                              <div>Idea</div>
                              <select
                                 name='ideas[]'
                                 id=''
                                 className='w-full grow px-[1.6rem] py-[1rem] bg-gray-100 outline-none caret-dark-blue border-none'>
                                 <option value='1'> some ideas </option>
                                 <option value='2' selected='selected'>
                                    idea 2
                                 </option>
                                 <option value='3'> idea 3 </option>
                              </select>
                           </div>
                           <div className='grow md:flex gap-5 items-start'>
                              <div className='grow'>
                                 <div>Start (month)</div>
                                 <select
                                    name='start[]'
                                    id='start'
                                    className='w-full grow px-[1.6rem] py-[1rem] bg-gray-100 outline-none caret-dark-blue border-none'>
                                    <option
                                       value='2023-03-01 00:00:00'
                                       selected='selected'>
                                       Mar 2023
                                    </option>
                                    <option value='2023-04-01 00:00:00'>
                                       Apr 2023
                                    </option>
                                    <option value='2023-05-01 00:00:00'>
                                       May 2023
                                    </option>
                                    <option value='2023-06-01 00:00:00'>
                                       Jun 2023
                                    </option>
                                    <option value='2023-07-01 00:00:00'>
                                       Jul 2023
                                    </option>
                                    <option value='2023-08-01 00:00:00'>
                                       Aug 2023
                                    </option>
                                    <option value='2023-09-01 00:00:00'>
                                       Sep 2023
                                    </option>
                                    <option value='2023-10-01 00:00:00'>
                                       Oct 2023
                                    </option>
                                    <option value='2023-11-01 00:00:00'>
                                       Nov 2023
                                    </option>
                                    <option value='2023-12-01 00:00:00'>
                                       Dec 2023
                                    </option>
                                    <option value='2024-01-01 00:00:00'>
                                       Jan 2024
                                    </option>
                                    <option value='2024-02-01 00:00:00'>
                                       Feb 2024
                                    </option>
                                    <option value='2024-03-01 00:00:00'>
                                       Mar 2024
                                    </option>
                                    <option value='2024-04-01 00:00:00'>
                                       Apr 2024
                                    </option>
                                    <option value='2024-05-01 00:00:00'>
                                       May 2024
                                    </option>
                                    <option value='2024-06-01 00:00:00'>
                                       Jun 2024
                                    </option>
                                 </select>
                              </div>
                              <div className='grow'>
                                 <div>Duration (months)</div>
                                 <input
                                    type='range'
                                    min='1'
                                    max='12'
                                    value='7'
                                    name='end[]'
                                    list='duration'
                                    className='w-full grow bg-gray-100 outline-none caret-dark-blue border-none'
                                    step='1'
                                 />
                                 <datalist
                                    id='duration'
                                    className='flex items-center justify-between text-lg w-full'>
                                    <option
                                       value='1'
                                       label='01'
                                       className='text-[1.12rem]'></option>
                                    <option
                                       value='2'
                                       label='02'
                                       className='text-[1.12rem]'></option>
                                    <option
                                       value='3'
                                       label='03'
                                       className='text-[1.12rem]'></option>
                                    <option
                                       value='4'
                                       label='04'
                                       className='text-[1.12rem]'></option>
                                    <option
                                       value='5'
                                       label='05'
                                       className='text-[1.12rem]'></option>
                                    <option
                                       value='6'
                                       label='06'
                                       className='text-[1.12rem]'></option>
                                    <option
                                       value='7'
                                       label='07'
                                       className='text-[1.12rem]'></option>
                                    <option
                                       value='8'
                                       label='08'
                                       className='text-[1.12rem]'></option>
                                    <option
                                       value='9'
                                       label='09'
                                       className='text-[1.12rem]'></option>
                                    <option
                                       value='10'
                                       label='10'
                                       className='text-[1.12rem]'></option>
                                    <option
                                       value='11'
                                       label='11'
                                       className='text-[1.12rem]'></option>
                                    <option
                                       value='12'
                                       label='12'
                                       className='text-[1.12rem]'></option>
                                 </datalist>
                              </div>

                              <div className='col-2/12'>
                                 <div className='delete-road'>X</div>
                              </div>
                           </div>
                        </li>
                        <li className='flex gap-5 items-start'>
                           <div className='flex flex-col'>
                              <div>Idea</div>
                              <select
                                 name='ideas[]'
                                 id=''
                                 className='w-full grow px-[1.6rem] py-[1rem] bg-gray-100 outline-none caret-dark-blue border-none'>
                                 <option value='1'> some ideas </option>
                                 <option value='2'> idea 2 </option>
                                 <option value='3' selected='selected'>
                                    idea 3
                                 </option>
                              </select>
                           </div>
                           <div className='grow md:flex gap-5 items-start'>
                              <div className='grow'>
                                 <div>Start (month)</div>
                                 <select
                                    name='start[]'
                                    id='start'
                                    className='w-full grow px-[1.6rem] py-[1rem] bg-gray-100 outline-none caret-dark-blue border-none'>
                                    <option value='2023-03-01 00:00:00'>
                                       Mar 2023
                                    </option>
                                    <option value='2023-04-01 00:00:00'>
                                       Apr 2023
                                    </option>
                                    <option
                                       value='2023-05-01 00:00:00'
                                       selected='selected'>
                                       May 2023
                                    </option>
                                    <option value='2023-06-01 00:00:00'>
                                       Jun 2023
                                    </option>
                                    <option value='2023-07-01 00:00:00'>
                                       Jul 2023
                                    </option>
                                    <option value='2023-08-01 00:00:00'>
                                       Aug 2023
                                    </option>
                                    <option value='2023-09-01 00:00:00'>
                                       Sep 2023
                                    </option>
                                    <option value='2023-10-01 00:00:00'>
                                       Oct 2023
                                    </option>
                                    <option value='2023-11-01 00:00:00'>
                                       Nov 2023
                                    </option>
                                    <option value='2023-12-01 00:00:00'>
                                       Dec 2023
                                    </option>
                                    <option value='2024-01-01 00:00:00'>
                                       Jan 2024
                                    </option>
                                    <option value='2024-02-01 00:00:00'>
                                       Feb 2024
                                    </option>
                                    <option value='2024-03-01 00:00:00'>
                                       Mar 2024
                                    </option>
                                    <option value='2024-04-01 00:00:00'>
                                       Apr 2024
                                    </option>
                                    <option value='2024-05-01 00:00:00'>
                                       May 2024
                                    </option>
                                    <option value='2024-06-01 00:00:00'>
                                       Jun 2024
                                    </option>
                                 </select>
                              </div>
                              <div className='grow'>
                                 <div>Duration (months)</div>
                                 <input
                                    type='range'
                                    min='1'
                                    max='12'
                                    value='9'
                                    name='end[]'
                                    list='duration'
                                    className='w-full grow bg-gray-100 outline-none caret-dark-blue border-none'
                                    step='1'
                                 />
                                 <datalist
                                    id='duration'
                                    className='flex items-center justify-between text-lg w-full'>
                                    <option
                                       value='1'
                                       label='01'
                                       className='text-[1.12rem]'></option>
                                    <option
                                       value='2'
                                       label='02'
                                       className='text-[1.12rem]'></option>
                                    <option
                                       value='3'
                                       label='03'
                                       className='text-[1.12rem]'></option>
                                    <option
                                       value='4'
                                       label='04'
                                       className='text-[1.12rem]'></option>
                                    <option
                                       value='5'
                                       label='05'
                                       className='text-[1.12rem]'></option>
                                    <option
                                       value='6'
                                       label='06'
                                       className='text-[1.12rem]'></option>
                                    <option
                                       value='7'
                                       label='07'
                                       className='text-[1.12rem]'></option>
                                    <option
                                       value='8'
                                       label='08'
                                       className='text-[1.12rem]'></option>
                                    <option
                                       value='9'
                                       label='09'
                                       className='text-[1.12rem]'></option>
                                    <option
                                       value='10'
                                       label='10'
                                       className='text-[1.12rem]'></option>
                                    <option
                                       value='11'
                                       label='11'
                                       className='text-[1.12rem]'></option>
                                    <option
                                       value='12'
                                       label='12'
                                       className='text-[1.12rem]'></option>
                                 </datalist>
                              </div>

                              <div className='col-2/12'>
                                 <div className='delete-road'>X</div>
                              </div>
                           </div>
                        </li>
                     </ul>
                     <div className='flex gap-5 my-10'>
                        <a className='btn blue-gradient text-black-eerie hover:text-white'>
                           + Add another
                        </a>
                        <button className='btn-rev'>Generate</button>
                        <a
                           href='/ebos'
                           className='btn text-black-eerie hover:text-blue-ncs'>
                           <strong>Back To Dashboard</strong>
                        </a>
                     </div>
                  </div>
               </div>
               <div className='pane-lower-gradient'>
                  <div className='px-12 py-8'>
                     <div className='chart-wrapper'>
                        <div id='thechart' className='chart'>
                           <div className='relative'>
                              <div
                                 dir='ltr'
                                 className='relative w-[1192px] h-[400px]'>
                                 <div
                                    aria-label='A chart.'
                                    className='absolute left-0 top-0 w-full h-full'>
                                    <svg
                                       width='1192'
                                       height='400'
                                       aria-label='A chart.'
                                       className='overflow-hidden'>
                                       <defs id='_ABSTRACT_RENDERER_ID_0'></defs>
                                       <g>
                                          <rect
                                             x='0'
                                             y='0'
                                             width='1192'
                                             height='40.992'
                                             stroke='none'
                                             stroke-width='0'
                                             fill='#ffffff'></rect>
                                          <path
                                             d='M0,0L0,40.992'
                                             stroke='#e6e6e6'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M80.68122270742359,0L80.68122270742359,40.992'
                                             stroke='#e6e6e6'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M158.75982532751092,0L158.75982532751092,40.992'
                                             stroke='#e6e6e6'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M239.4410480349345,0L239.4410480349345,40.992'
                                             stroke='#e6e6e6'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M317.51965065502185,0L317.51965065502185,40.992'
                                             stroke='#e6e6e6'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M398.2008733624454,0L398.2008733624454,40.992'
                                             stroke='#e6e6e6'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M478.882096069869,0L478.882096069869,40.992'
                                             stroke='#e6e6e6'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M556.9606986899563,0L556.9606986899563,40.992'
                                             stroke='#e6e6e6'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M637.64192139738,0L637.64192139738,40.992'
                                             stroke='#e6e6e6'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M715.7205240174673,0L715.7205240174673,40.992'
                                             stroke='#e6e6e6'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M796.4017467248908,0L796.4017467248908,40.992'
                                             stroke='#e6e6e6'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M877.0829694323145,0L877.0829694323145,40.992'
                                             stroke='#e6e6e6'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M952.5589519650655,0L952.5589519650655,40.992'
                                             stroke='#e6e6e6'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M1033.240174672489,0L1033.240174672489,40.992'
                                             stroke='#e6e6e6'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M1111.3187772925764,0L1111.3187772925764,40.992'
                                             stroke='#e6e6e6'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M1192,0L1192,40.992'
                                             stroke='#e6e6e6'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <rect
                                             x='0'
                                             y='40.992'
                                             width='1192'
                                             height='40.992'
                                             stroke='none'
                                             stroke-width='0'
                                             fill='#e6e6e6'></rect>
                                          <path
                                             d='M0,40.992L0,81.984'
                                             stroke='#ffffff'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M80.68122270742359,40.992L80.68122270742359,81.984'
                                             stroke='#ffffff'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M158.75982532751092,40.992L158.75982532751092,81.984'
                                             stroke='#ffffff'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M239.4410480349345,40.992L239.4410480349345,81.984'
                                             stroke='#ffffff'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M317.51965065502185,40.992L317.51965065502185,81.984'
                                             stroke='#ffffff'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M398.2008733624454,40.992L398.2008733624454,81.984'
                                             stroke='#ffffff'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M478.882096069869,40.992L478.882096069869,81.984'
                                             stroke='#ffffff'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M556.9606986899563,40.992L556.9606986899563,81.984'
                                             stroke='#ffffff'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M637.64192139738,40.992L637.64192139738,81.984'
                                             stroke='#ffffff'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M715.7205240174673,40.992L715.7205240174673,81.984'
                                             stroke='#ffffff'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M796.4017467248908,40.992L796.4017467248908,81.984'
                                             stroke='#ffffff'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M877.0829694323145,40.992L877.0829694323145,81.984'
                                             stroke='#ffffff'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M952.5589519650655,40.992L952.5589519650655,81.984'
                                             stroke='#ffffff'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M1033.240174672489,40.992L1033.240174672489,81.984'
                                             stroke='#ffffff'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M1111.3187772925764,40.992L1111.3187772925764,81.984'
                                             stroke='#ffffff'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M1192,40.992L1192,81.984'
                                             stroke='#ffffff'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <rect
                                             x='0'
                                             y='81.984'
                                             width='1192'
                                             height='40.992'
                                             stroke='none'
                                             stroke-width='0'
                                             fill='#ffffff'></rect>
                                          <path
                                             d='M0,81.984L0,122.976'
                                             stroke='#e6e6e6'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M80.68122270742359,81.984L80.68122270742359,122.976'
                                             stroke='#e6e6e6'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M158.75982532751092,81.984L158.75982532751092,122.976'
                                             stroke='#e6e6e6'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M239.4410480349345,81.984L239.4410480349345,122.976'
                                             stroke='#e6e6e6'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M317.51965065502185,81.984L317.51965065502185,122.976'
                                             stroke='#e6e6e6'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M398.2008733624454,81.984L398.2008733624454,122.976'
                                             stroke='#e6e6e6'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M478.882096069869,81.984L478.882096069869,122.976'
                                             stroke='#e6e6e6'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M556.9606986899563,81.984L556.9606986899563,122.976'
                                             stroke='#e6e6e6'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M637.64192139738,81.984L637.64192139738,122.976'
                                             stroke='#e6e6e6'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M715.7205240174673,81.984L715.7205240174673,122.976'
                                             stroke='#e6e6e6'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M796.4017467248908,81.984L796.4017467248908,122.976'
                                             stroke='#e6e6e6'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M877.0829694323145,81.984L877.0829694323145,122.976'
                                             stroke='#e6e6e6'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M952.5589519650655,81.984L952.5589519650655,122.976'
                                             stroke='#e6e6e6'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M1033.240174672489,81.984L1033.240174672489,122.976'
                                             stroke='#e6e6e6'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M1111.3187772925764,81.984L1111.3187772925764,122.976'
                                             stroke='#e6e6e6'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M1192,81.984L1192,122.976'
                                             stroke='#e6e6e6'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <rect
                                             x='0'
                                             y='122.976'
                                             width='1192'
                                             height='40.992'
                                             stroke='none'
                                             stroke-width='0'
                                             fill='#e6e6e6'></rect>
                                          <path
                                             d='M0,122.976L0,163.968'
                                             stroke='#ffffff'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M80.68122270742359,122.976L80.68122270742359,163.968'
                                             stroke='#ffffff'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M158.75982532751092,122.976L158.75982532751092,163.968'
                                             stroke='#ffffff'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M239.4410480349345,122.976L239.4410480349345,163.968'
                                             stroke='#ffffff'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M317.51965065502185,122.976L317.51965065502185,163.968'
                                             stroke='#ffffff'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M398.2008733624454,122.976L398.2008733624454,163.968'
                                             stroke='#ffffff'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M478.882096069869,122.976L478.882096069869,163.968'
                                             stroke='#ffffff'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M556.9606986899563,122.976L556.9606986899563,163.968'
                                             stroke='#ffffff'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M637.64192139738,122.976L637.64192139738,163.968'
                                             stroke='#ffffff'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M715.7205240174673,122.976L715.7205240174673,163.968'
                                             stroke='#ffffff'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M796.4017467248908,122.976L796.4017467248908,163.968'
                                             stroke='#ffffff'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M877.0829694323145,122.976L877.0829694323145,163.968'
                                             stroke='#ffffff'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M952.5589519650655,122.976L952.5589519650655,163.968'
                                             stroke='#ffffff'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M1033.240174672489,122.976L1033.240174672489,163.968'
                                             stroke='#ffffff'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M1111.3187772925764,122.976L1111.3187772925764,163.968'
                                             stroke='#ffffff'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M1192,122.976L1192,163.968'
                                             stroke='#ffffff'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M0,40.992L1192,40.992'
                                             stroke='#b7b7b7'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M0,81.984L1192,81.984'
                                             stroke='#b7b7b7'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <path
                                             d='M0,122.976L1192,122.976'
                                             stroke='#b7b7b7'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></path>
                                          <rect
                                             x='0'
                                             y='0'
                                             width='1192'
                                             height='163.968'
                                             stroke='#9a9a9a'
                                             stroke-width='1'
                                             fill-opacity='1'
                                             fill='none'></rect>
                                       </g>
                                       <g>
                                          <text
                                             text-anchor='start'
                                             x='0'
                                             y='185.018'
                                             font-family='Arial'
                                             font-size='13'
                                             font-weight='bold'
                                             stroke='none'
                                             stroke-width='0'
                                             fill='#000000'>
                                             Mar
                                          </text>
                                          <text
                                             text-anchor='start'
                                             x='0'
                                             y='200.018'
                                             font-family='Arial'
                                             font-size='13'
                                             font-weight='bold'
                                             stroke='none'
                                             stroke-width='0'
                                             fill='#000000'>
                                             2023
                                          </text>
                                          <text
                                             text-anchor='middle'
                                             x='80.68122270742359'
                                             y='185.018'
                                             font-family='Arial'
                                             font-size='13'
                                             stroke='none'
                                             stroke-width='0'
                                             fill='#000000'>
                                             Apr
                                          </text>
                                          <text
                                             text-anchor='middle'
                                             x='158.75982532751092'
                                             y='185.018'
                                             font-family='Arial'
                                             font-size='13'
                                             stroke='none'
                                             stroke-width='0'
                                             fill='#000000'>
                                             May
                                          </text>
                                          <text
                                             text-anchor='middle'
                                             x='239.4410480349345'
                                             y='185.018'
                                             font-family='Arial'
                                             font-size='13'
                                             stroke='none'
                                             stroke-width='0'
                                             fill='#000000'>
                                             Jun
                                          </text>
                                          <text
                                             text-anchor='middle'
                                             x='317.51965065502185'
                                             y='185.018'
                                             font-family='Arial'
                                             font-size='13'
                                             stroke='none'
                                             stroke-width='0'
                                             fill='#000000'>
                                             Jul
                                          </text>
                                          <text
                                             text-anchor='middle'
                                             x='398.2008733624454'
                                             y='185.018'
                                             font-family='Arial'
                                             font-size='13'
                                             stroke='none'
                                             stroke-width='0'
                                             fill='#000000'>
                                             Aug
                                          </text>
                                          <text
                                             text-anchor='middle'
                                             x='478.882096069869'
                                             y='185.018'
                                             font-family='Arial'
                                             font-size='13'
                                             stroke='none'
                                             stroke-width='0'
                                             fill='#000000'>
                                             Sep
                                          </text>
                                          <text
                                             text-anchor='middle'
                                             x='556.9606986899563'
                                             y='185.018'
                                             font-family='Arial'
                                             font-size='13'
                                             stroke='none'
                                             stroke-width='0'
                                             fill='#000000'>
                                             Oct
                                          </text>
                                          <text
                                             text-anchor='middle'
                                             x='637.64192139738'
                                             y='185.018'
                                             font-family='Arial'
                                             font-size='13'
                                             stroke='none'
                                             stroke-width='0'
                                             fill='#000000'>
                                             Nov
                                          </text>
                                          <text
                                             text-anchor='middle'
                                             x='715.7205240174673'
                                             y='185.018'
                                             font-family='Arial'
                                             font-size='13'
                                             stroke='none'
                                             stroke-width='0'
                                             fill='#000000'>
                                             Dec
                                          </text>
                                          <text
                                             text-anchor='middle'
                                             x='796.4017467248908'
                                             y='185.018'
                                             font-family='Arial'
                                             font-size='13'
                                             font-weight='bold'
                                             stroke='none'
                                             stroke-width='0'
                                             fill='#000000'>
                                             Jan
                                          </text>
                                          <text
                                             text-anchor='middle'
                                             x='796.4017467248908'
                                             y='200.018'
                                             font-family='Arial'
                                             font-size='13'
                                             font-weight='bold'
                                             stroke='none'
                                             stroke-width='0'
                                             fill='#000000'>
                                             2024
                                          </text>
                                          <text
                                             text-anchor='middle'
                                             x='877.0829694323145'
                                             y='185.018'
                                             font-family='Arial'
                                             font-size='13'
                                             stroke='none'
                                             stroke-width='0'
                                             fill='#000000'>
                                             Feb
                                          </text>
                                          <text
                                             text-anchor='middle'
                                             x='952.5589519650655'
                                             y='185.018'
                                             font-family='Arial'
                                             font-size='13'
                                             stroke='none'
                                             stroke-width='0'
                                             fill='#000000'>
                                             Mar
                                          </text>
                                          <text
                                             text-anchor='middle'
                                             x='1033.240174672489'
                                             y='185.018'
                                             font-family='Arial'
                                             font-size='13'
                                             stroke='none'
                                             stroke-width='0'
                                             fill='#000000'>
                                             Apr
                                          </text>
                                          <text
                                             text-anchor='middle'
                                             x='1111.3187772925764'
                                             y='185.018'
                                             font-family='Arial'
                                             font-size='13'
                                             stroke='none'
                                             stroke-width='0'
                                             fill='#000000'>
                                             May
                                          </text>
                                          <text
                                             text-anchor='end'
                                             x='1192'
                                             y='185.018'
                                             font-family='Arial'
                                             font-size='13'
                                             stroke='none'
                                             stroke-width='0'
                                             fill='#000000'>
                                             Jun
                                          </text>
                                       </g>
                                       <g></g>
                                       <g>
                                          <rect
                                             x='1'
                                             y='9'
                                             width='1190'
                                             height='22.991999999999997'
                                             stroke='none'
                                             stroke-width='0'
                                             fill-opacity='0'
                                             fill='#ffffff'></rect>
                                          <rect
                                             x='1'
                                             y='49.992'
                                             width='315.51965065502185'
                                             height='22.991999999999997'
                                             stroke='#ffc400'
                                             stroke-width='1'
                                             fill='#ffc400'></rect>
                                          <text
                                             text-anchor='start'
                                             x='10'
                                             y='65.688'
                                             font-family='Arial'
                                             font-size='12'
                                             stroke='none'
                                             stroke-width='0'
                                             fill='#202020'>
                                             some ideas
                                          </text>
                                          <rect
                                             x='1'
                                             y='90.984'
                                             width='554.9606986899563'
                                             height='22.991999999999997'
                                             stroke='#ffc400'
                                             stroke-width='1'
                                             fill='#ffc400'></rect>
                                          <text
                                             text-anchor='start'
                                             x='10'
                                             y='106.67999999999999'
                                             font-family='Arial'
                                             font-size='12'
                                             stroke='none'
                                             stroke-width='0'
                                             fill='#202020'>
                                             idea 2
                                          </text>
                                          <rect
                                             x='159.75982532751092'
                                             y='131.976'
                                             width='716.3231441048035'
                                             height='22.991999999999997'
                                             stroke='#ffc400'
                                             stroke-width='1'
                                             fill='#ffc400'></rect>
                                          <text
                                             text-anchor='start'
                                             x='168.75982532751092'
                                             y='147.672'
                                             font-family='Arial'
                                             font-size='12'
                                             stroke='none'
                                             stroke-width='0'
                                             fill='#202020'>
                                             idea 3
                                          </text>
                                       </g>
                                       <g></g>
                                       <g></g>
                                       <g></g>
                                       <g></g>
                                    </svg>
                                    <div
                                       aria-label='A tabular representation of the data in the chart.'
                                       className='absolute left-[-10000px] top-auto w-px h-px overflow-hidden'>
                                       <table>
                                          <thead>
                                             <tr>
                                                <th>Span</th>
                                                <th>Name</th>
                                                <th>Start</th>
                                                <th>End</th>
                                             </tr>
                                          </thead>
                                          <tbody>
                                             <tr>
                                                <td>0</td>
                                                <td></td>
                                                <td>Mar 1, 2023</td>
                                                <td>Jun 1, 2024</td>
                                             </tr>
                                             <tr>
                                                <td>1</td>
                                                <td>some ideas</td>
                                                <td>Mar 1, 2023</td>
                                                <td>Jul 1, 2023</td>
                                             </tr>
                                             <tr>
                                                <td>2</td>
                                                <td>idea 2</td>
                                                <td>Mar 1, 2023</td>
                                                <td>Oct 1, 2023</td>
                                             </tr>
                                             <tr>
                                                <td>3</td>
                                                <td>idea 3</td>
                                                <td>May 1, 2023</td>
                                                <td>Feb 1, 2024</td>
                                             </tr>
                                          </tbody>
                                       </table>
                                    </div>
                                 </div>
                              </div>
                              <div
                                 aria-hidden='true'
                                 className='hidden absolute top-[410px] left-[1202px] whitespace-no-wrap font-sans text-xs'>
                                 Mar
                              </div>
                              <div></div>
                           </div>
                        </div>
                     </div>

                     <button
                        className='btn text-black-eerie'
                        data-name='Road Map'
                        id='theSubmitBtn'>
                        <strong>Request </strong> for consultant review
                     </button>
                  </div>
               </div>
            </form>
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
                           <h3 className='mb-6 f6 text-gray-gunmetal mb-5'>
                              Add your ideas
                           </h3>
                        </div>
                        <button
                           type='button'
                           className='modal-close dr-close'
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
                                 className='w-full grow px-[1.6rem] py-[1rem] bg-gray-100 outline-none caret-dark-blue border-none p-3 bg-gray-100 outline-none caret-dark-blue border-none newIdea'
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

export default Roadmap;
