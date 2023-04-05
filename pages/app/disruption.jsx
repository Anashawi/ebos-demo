import Image from "next/image";
import Link from "next/link";
import IdeasModal from "../../components/app/ideas-modal";
import Modal from "../../components/common/modal";
import useModalToggler from "../../hooks/use-modal-toggler";

const Disruption = () => {
   const [isIdeasModalOpen, toggleIdeasModal] = useModalToggler();
   const [isDisplayVideoModal, toggleVideoModal] = useModalToggler();

   return (
      <>
         <IdeasModal isOpen={isIdeasModalOpen} toggle={toggleIdeasModal} />

         <div className='homepage-bg-gradient w-screen bg-white'>
            <Modal
               config={{
                  isShown: isDisplayVideoModal,
                  closeCallback: toggleVideoModal,
               }}>
               <div class='video-popup'>
                  <div class='popup-bg'></div>
                  <div class='popup-content'>
                     <p class='popup-title'></p>
                     <iframe src='' class='video'></iframe>
                     <button class='close-btn' onClick={toggleVideoModal}>
                        close
                     </button>
                  </div>
               </div>
            </Modal>
            <div className='px-12 mx-0 my-auto md:w-[calc(1300px_-_1.5_*_2)] lg:w-[960px_-_1.5rem_*_2] xl:w-[1300_-_1.5rem_*_2]'>
               <div className='flex flex-wrap'>
                  <div className='flex flex-col md:w-8/12 bg-white p-12 relative'>
                     <div className='pb-5'>
                        <strong className='mr-1'>Mustafa Khairy </strong> |
                        <a href='http://bo.adpadelhouse.com/logout'> logout </a>
                     </div>

                     <h3 className='text-[2.52rem] mb-6 text-yellow-green'>
                        Disruption
                     </h3>

                     <h3 className='text-[2.52rem] mb-6 font-normal'>
                        10 Comprehensives
                     </h3>
                     <p className='mb-10'>
                        Watch help videos then update your ideas accordingly.
                        Submit for feedback.
                     </p>
                     <div className='flex flex-wrap gap-5'>
                        <div className='col-1/2 grow'>
                           <h4 className='text-[2.1rem] mb-6'>Scale</h4>
                           <ul className='flex flex-col gap-3 mb-5'>
                              <li
                                 data-key='Staff on Demand'
                                 className='flex gap-5 justify-between items-center p-5 relative rounded-lg bg-gray-100 text-gray-800'>
                                 Staff on Demand
                                 <a
                                    className='ml-5 text-[1.2rem]'
                                    target='_blank'
                                    data-video='1'
                                    onClick={toggleVideoModal}>
                                    Watch video
                                 </a>
                              </li>
                              <li
                                 data-key='Community and Crowd'
                                 className='flex gap-5 justify-between items-center p-5 relative rounded-lg bg-gray-100 text-gray-800'>
                                 Community and Crowd
                                 <a
                                    data-video='1'
                                    className='ml-5 text-[1.2rem]'
                                    target='_blank'
                                    onClick={toggleVideoModal}>
                                    Watch video
                                 </a>
                              </li>
                              <li
                                 data-key='Algorithms'
                                 className='flex gap-5 justify-between items-center p-5 relative rounded-lg bg-gray-100 text-gray-800'>
                                 Algorithms
                                 <a
                                    data-video=' 1'
                                    className='ml-5 text-[1.2rem]'
                                    target='_blank'
                                    onClick={toggleVideoModal}>
                                    Watch video
                                 </a>
                              </li>
                              <li
                                 data-key='Leveraged Assets'
                                 className='flex gap-5 justify-between items-center p-5 relative rounded-lg bg-gray-100 text-gray-800'>
                                 Leveraged Assets
                                 <a
                                    data-video=' 1'
                                    className='ml-5 text-[1.2rem]'
                                    target='_blank'
                                    onClick={toggleVideoModal}>
                                    Watch video
                                 </a>
                              </li>
                              <li
                                 data-key='Engagement'
                                 className='flex gap-5 justify-between items-center p-5 relative rounded-lg bg-gray-100 text-gray-800'>
                                 Engagement
                                 <a
                                    data-video=' 1'
                                    className='ml-5 text-[1.2rem]'
                                    target='_blank'
                                    onClick={toggleVideoModal}>
                                    Watch video
                                 </a>
                              </li>
                           </ul>
                        </div>
                        <div className='col-1/2 grow'>
                           <h4 className='text-[2.1rem] mb-6'>Ideas</h4>

                           <ul className='flex flex-col gap-3 mb-5'>
                              <li
                                 data-key='Interface'
                                 className='flex gap-5 justify-between items-center p-5 relative rounded-lg bg-gray-100 text-gray-800'>
                                 Interface
                                 <a
                                    data-video=' 1'
                                    className='ml-5 text-[1.2rem]'
                                    target='_blank'
                                    onClick={toggleVideoModal}>
                                    Watch video
                                 </a>
                              </li>
                              <li
                                 data-key='Dashboard'
                                 className='flex gap-5 justify-between items-center p-5 relative rounded-lg bg-gray-100 text-gray-800'>
                                 Dashboard
                                 <a
                                    data-video=' 1'
                                    className='ml-5 text-[1.2rem]'
                                    target='_blank'
                                    onClick={toggleVideoModal}>
                                    Watch video
                                 </a>
                              </li>
                              <li
                                 data-key='Experimentation'
                                 className='flex gap-5 justify-between items-center p-5 relative rounded-lg bg-gray-100 text-gray-800'>
                                 Experimentation
                                 <a
                                    data-video=' 1'
                                    className='ml-5 text-[1.2rem]'
                                    target='_blank'
                                    onClick={toggleVideoModal}>
                                    Watch video
                                 </a>
                              </li>
                              <li
                                 data-key='Autonomy'
                                 className='flex gap-5 justify-between items-center p-5 relative rounded-lg bg-gray-100 text-gray-800'>
                                 Autonomy
                                 <a
                                    data-video=' 1'
                                    className='ml-5 text-[1.2rem]'
                                    target='_blank'
                                    onClick={toggleVideoModal}>
                                    Watch video
                                 </a>
                              </li>
                              <li
                                 data-key='Social Platforms'
                                 className='flex gap-5 justify-between items-center p-5 relative rounded-lg bg-gray-100 text-gray-800'>
                                 Social Platforms
                                 <a
                                    data-video=' 1'
                                    className='ml-5 text-[1.2rem]'
                                    target='_blank'
                                    onClick={toggleVideoModal}>
                                    Watch video
                                 </a>
                              </li>
                           </ul>
                        </div>
                     </div>
                     <Link
                        href='/'
                        className='btn text-black-eerie hover:text-blue-ncs w-max'>
                        <strong>Back To Dashboard</strong>
                     </Link>
                  </div>
                  <div className='md:w-4/12 pane-right-gradient min-h-screen p-12'>
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
                           <Image
                              width='55'
                              height='30'
                              src='http://bo.adpadelhouse.com/assets/images/ilogo.png'
                              alt='CaseInPoint'
                           />
                        </div>
                     </Link>

                     <h4 className='text-[2.1rem] mb-6'>
                        7 Practical &amp; Quick
                     </h4>

                     <ul className='flex flex-col gap-3 mb-5'>
                        <li
                           data-key='Eco Systems'
                           className='flex gap-5 justify-between items-center p-5 relative rounded-lg bg-gray-100 text-gray-800'>
                           Eco Systems
                           <a
                              data-video=' 1'
                              className='ml-5 text-[1.2rem]'
                              target='_blank'>
                              Watch video
                           </a>
                        </li>
                        <li
                           data-key='Info is Power'
                           className='flex gap-5 justify-between items-center p-5 relative rounded-lg bg-gray-100 text-gray-800'>
                           Info is Power
                           <a
                              data-video=' 1'
                              className='ml-5 text-[1.2rem]'
                              target='_blank'>
                              Watch video
                           </a>
                        </li>
                        <li
                           data-key='OTCR'
                           className='flex gap-5 justify-between items-center p-5 relative rounded-lg bg-gray-100 text-gray-800'>
                           OTCR
                           <a
                              data-video=' 1'
                              className='ml-5 text-[1.2rem]'
                              target='_blank'>
                              Watch video
                           </a>
                        </li>
                        <li
                           data-key='Value Destruction'
                           className='flex gap-5 justify-between items-center p-5 relative rounded-lg bg-gray-100 text-gray-800'>
                           Value Destruction
                           <a
                              data-video=' 1'
                              className='ml-5 text-[1.2rem]'
                              target='_blank'>
                              Watch video
                           </a>
                        </li>
                        <li
                           data-key='Customer Journey'
                           className='flex gap-5 justify-between items-center p-5 relative rounded-lg bg-gray-100 text-gray-800'>
                           Customer Journey
                           <a
                              data-video=' 1'
                              className='ml-5 text-[1.2rem]'
                              target='_blank'>
                              Watch video
                           </a>
                        </li>
                        <li
                           data-key='Digital Platforms'
                           className='flex gap-5 justify-between items-center p-5 relative rounded-lg bg-gray-100 text-gray-800'>
                           Digital Platforms
                           <a
                              data-video=' 1'
                              className='ml-5 text-[1.2rem]'
                              target='_blank'>
                              Watch video
                           </a>
                        </li>
                        <li
                           data-key='Building Capacity'
                           className='flex gap-5 justify-between items-center p-5 relative rounded-lg bg-gray-100 text-gray-800'>
                           Building Capacity
                           <a
                              data-video=' 1'
                              className='ml-5 text-[1.2rem]'
                              target='_blank'>
                              Watch video
                           </a>
                        </li>
                     </ul>

                     <div className='py-3'>
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
