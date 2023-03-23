import Image from "next/image";
import Link from "next/link";
import IdeasModal from "../../components/app/ideas-modal";
import useModalToggler from "../../hooks/use-modal-toggler";

const Customers = () => {
   const [isIdeasModalOpen, toggleIdeasModal] = useModalToggler();

   return (
      <>
         <IdeasModal isOpen={isIdeasModalOpen} toggle={toggleIdeasModal} />

         <div className='homepage-bg-gradient w-screen bg-white'>
            <form
               method='post'
               action='http://bo.adpadelhouse.com/app/customers'
               enctype='multipart/form-data'>
               <input
                  type='hidden'
                  name='_token'
                  value='E6vydmJoblEw5asasVKo4Ehneri0ZmjnuHJ03vSY'
               />
               <div className='px-12 mx-0 my-auto md:w-[calc(1300px_-_1.5_*_2)] lg:w-[960px_-_1.5rem_*_2] xl:w-[1300_-_1.5rem_*_2]'>
                  <div className='flex flex-wrap'>
                     <div className='grow md:w-4/12 bg-white p-12 relative'>
                        <div className='pb-5'>
                           <strong className='mr-1'>Mustafa Khairy </strong> |
                           <a href='http://bo.adpadelhouse.com/logout'>
                              logout
                           </a>
                        </div>
                        <h3 className='mt-10 text-[2.52rem] doublespacedplus text-yellow-green'>
                           Voice of customers
                        </h3>
                        <h4 className='text-[2.1rem] font-normal mb-6'>
                           Top customer categories
                        </h4>
                        <ul className='flex flex-col gap-5 mb-5'>
                           <li>
                              <input
                                 type='text'
                                 name='name[]'
                                 className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none'
                              />
                           </li>
                           <li>
                              <input
                                 type='text'
                                 name='name[]'
                                 className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none'
                              />
                           </li>
                           <li>
                              <input
                                 type='text'
                                 name='name[]'
                                 className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none'
                              />
                           </li>
                           <li>
                              <input
                                 type='text'
                                 name='name[]'
                                 className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none'
                              />
                           </li>
                           <li>
                              <input
                                 type='text'
                                 name='name[]'
                                 className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none'
                              />
                           </li>
                        </ul>
                        <div className='flex gap-5 py-3'>
                           <button
                              type='submit'
                              className='btn submit'
                              id='addNewProduct'>
                              Submit
                           </button>
                           <a href='/ebos' className='btn text-black-eerie hover:text-blue-ncs'>
                              <strong>Back To Dashboard</strong>
                           </a>
                        </div>
                     </div>
                     <div className='grow md:w-8/12 pane-right-gradient min-h-screen p-12'>
                        <div className=''>
                           <button
                              type='button'
                              className='btn text-black-eerie'>
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
                        <div className='flex flex-wrap gap-5'>
                           <div className='col-1/2 grow'>
                              <h4 className='text-[2.1rem] font-normal mb-6'>
                                 What do they want
                              </h4>
                              <ul className='flex flex-col gap-5 mb-5'>
                                 <li>
                                    <input
                                       type='text'
                                       name='target[]'
                                       className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none'
                                    />
                                 </li>
                                 <li>
                                    <input
                                       type='text'
                                       name='target[]'
                                       className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none'
                                    />
                                 </li>
                                 <li>
                                    <input
                                       type='text'
                                       name='target[]'
                                       className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none'
                                    />
                                 </li>
                                 <li>
                                    <input
                                       type='text'
                                       name='target[]'
                                       className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none'
                                    />
                                 </li>
                                 <li>
                                    <input
                                       type='text'
                                       name='target[]'
                                       className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none'
                                    />
                                 </li>
                              </ul>
                           </div>
                           <div className='col-1/2 grow'>
                              <h4 className='text-[2.1rem] font-normal mb-6'>
                                 How to fulfill it
                              </h4>
                              <ul className='flex flex-col gap-5 mb-5'>
                                 <li>
                                    <input
                                       type='text'
                                       name='fulfill[]'
                                       className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none'
                                    />
                                 </li>
                                 <li>
                                    <input
                                       type='text'
                                       name='fulfill[]'
                                       className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none'
                                    />
                                 </li>
                                 <li>
                                    <input
                                       type='text'
                                       name='fulfill[]'
                                       className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none'
                                    />
                                 </li>
                                 <li>
                                    <input
                                       type='text'
                                       name='fulfill[]'
                                       className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none'
                                    />
                                 </li>
                                 <li>
                                    <input
                                       type='text'
                                       name='fulfill[]'
                                       className='w-full p-3 bg-gray-100 outline-none caret-dark-blue border-none'
                                    />
                                 </li>
                              </ul>
                           </div>
                        </div>
                        <div className='py-3'>
                           <button
                              className='btn text-black-eerie'
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
      </>
   );
};

export default Customers;
