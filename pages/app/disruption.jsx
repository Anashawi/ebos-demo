import Link from "next/link";
import IdeasModal from "../../components/app/ideas-modal";
import useToggler from "../../components/hooks/useToggler";

const Disruption = () => {
   const [isIdeasModalOpen, toggleIdeasModal] = useToggler();

   return (
      <>
         <IdeasModal isOpen={isIdeasModalOpen} toggle={toggleIdeasModal} />

         <div className='homepage-bg-gradient w-screen bg-white'>
            <div className='video-popup'>
               <div className='popup-bg'></div>
               <div className='popup-content'>
                  <p className='popup-title'></p>
                  <iframe src='' className='video'></iframe>
                  <button className='close-btn'>close</button>
               </div>
            </div>
            <div className='px-12 mx-0 my-auto md:w-[calc(1300px_-_1.5_*_2)] lg:w-[960px_-_1.5rem_*_2] xl:w-[1300_-_1.5rem_*_2]'>
               <div className='flex flex-wrap'>
                  <div className='md-8 bg-white p-12 relative'>
                     <div className='pb-5'>
                        <strong>Mustafa Khairy </strong> |
                        <a href='http://bo.adpadelhouse.com/logout'> logout </a>
                     </div>

                     <h3 className='text-[2.52rem] mb-6 text-yellow-green'>
                        Disruption
                     </h3>

                     <h3 className='text-[2.52rem] mb-6 font-normal'>
                        10 Comprehensives
                     </h3>
                     <p>
                        Watch help videos then update your ideas accordingly.
                        Submit for feedback.
                     </p>
                     <div className='row-mb-6'>
                        <div className='col c-6'>
                           <h4 className='f4 mb-6'>Scale</h4>
                           <ul className='flex flex-col gap-3 mb-5'>
                              <li
                                 data-key='Staff on Demand'
                                 className='box box-grey-light'>
                                 <a
                                    className='popup-btn small r'
                                    target='_blank'
                                    data-video='1'>
                                    Watch video
                                 </a>
                                 Staff on Demand
                              </li>
                              <li
                                 data-key='Community and Crowd'
                                 className='box box-grey-light'>
                                 <a
                                    data-video='1'
                                    className='popup-btn small r'
                                    target='_blank'>
                                    Watch video
                                 </a>
                                 Community and Crowd
                              </li>
                              <li
                                 data-key='Algorithms'
                                 className='box box-grey-light'>
                                 <a
                                    data-video=' 1'
                                    className='popup-btn small r'
                                    target='_blank'>
                                    Watch video
                                 </a>
                                 Algorithms
                              </li>
                              <li
                                 data-key='Leveraged Assets'
                                 className='box box-grey-light'>
                                 <a
                                    data-video=' 1'
                                    className='popup-btn small r'
                                    target='_blank'>
                                    Watch video
                                 </a>
                                 Leveraged Assets
                              </li>
                              <li
                                 data-key='Engagement'
                                 className='box box-grey-light'>
                                 <a
                                    data-video=' 1'
                                    className='popup-btn small r'
                                    target='_blank'>
                                    Watch video
                                 </a>
                                 Engagement
                              </li>
                           </ul>
                        </div>
                        <div className='col c-6'>
                           <h4 className='f4 mb-6'>Ideas</h4>

                           <ul className='flex flex-col gap-3 mb-5'>
                              <li
                                 data-key='Interface'
                                 className='box box-grey-light'>
                                 <a
                                    data-video=' 1'
                                    className='popup-btn small r'
                                    target='_blank'>
                                    Watch video
                                 </a>
                                 Interface
                              </li>
                              <li
                                 data-key='Dashboard'
                                 className='box box-grey-light'>
                                 <a
                                    data-video=' 1'
                                    className='popup-btn small r'
                                    target='_blank'>
                                    Watch video
                                 </a>
                                 Dashboard
                              </li>
                              <li
                                 data-key='Experimentation'
                                 className='box box-grey-light'>
                                 <a
                                    data-video=' 1'
                                    className='popup-btn small r'
                                    target='_blank'>
                                    Watch video
                                 </a>
                                 Experimentation
                              </li>
                              <li
                                 data-key='Autonomy'
                                 className='box box-grey-light'>
                                 <a
                                    data-video=' 1'
                                    className='popup-btn small r'
                                    target='_blank'>
                                    Watch video
                                 </a>
                                 Autonomy
                              </li>
                              <li
                                 data-key='Social Platforms'
                                 className='box box-grey-light'>
                                 <a
                                    data-video=' 1'
                                    className='popup-btn small r'
                                    target='_blank'>
                                    Watch video
                                 </a>
                                 Social Platforms
                              </li>
                           </ul>
                        </div>
                     </div>
                     <a href='/ebos' className='btn text-black-eerie'>
                        <strong>Back To Dashboard</strong>
                     </a>
                  </div>
                  <div className='md-4 pane-right-gradient min-h-screen p-12'>
                     <div className=''>
                        <button
                           type='button'
                           className='btn text-black-eerie'
                           onClick={toggleIdeasModal}>
                           My ideas
                        </button>
                     </div>
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

                     <h4 className='f4 mb-6'>7 Practical &amp; Quick</h4>

                     <ul className='flex flex-col gap-3 mb-5'>
                        <li
                           data-key='Eco Systems'
                           className='box box-grey-light'>
                           <a
                              data-video=' 1'
                              className='popup-btn small r'
                              target='_blank'>
                              Watch video
                           </a>
                           Eco Systems
                        </li>
                        <li
                           data-key='Info is Power'
                           className='box box-grey-light'>
                           <a
                              data-video=' 1'
                              className='popup-btn small r'
                              target='_blank'>
                              Watch video
                           </a>
                           Info is Power
                        </li>
                        <li data-key='OTCR' className='box box-grey-light'>
                           <a
                              data-video=' 1'
                              className='popup-btn small r'
                              target='_blank'>
                              Watch video
                           </a>
                           OTCR
                        </li>
                        <li
                           data-key='Value Destruction'
                           className='box box-grey-light'>
                           <a
                              data-video=' 1'
                              className='popup-btn small r'
                              target='_blank'>
                              Watch video
                           </a>
                           Value Destruction
                        </li>
                        <li
                           data-key='Customer Journey'
                           className='box box-grey-light'>
                           <a
                              data-video=' 1'
                              className='popup-btn small r'
                              target='_blank'>
                              Watch video
                           </a>
                           Customer Journey
                        </li>
                        <li
                           data-key='Digital Platforms'
                           className='box box-grey-light'>
                           <a
                              data-video=' 1'
                              className='popup-btn small r'
                              target='_blank'>
                              Watch video
                           </a>
                           Digital Platforms
                        </li>
                        <li
                           data-key='Building Capacity'
                           className='box box-grey-light'>
                           <a
                              data-video=' 1'
                              className='popup-btn small r'
                              target='_blank'>
                              Watch video
                           </a>
                           Building Capacity
                        </li>
                     </ul>

                     <div className='breath'>
                        <button
                           className='btn text-black-eerie'
                           data-name='Disruption'
                           id='theSubmitBtn'>
                           <strong>Request </strong> for consultant review
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default Disruption;
