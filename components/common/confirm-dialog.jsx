import { useState } from "react";
import Modal from "./modal";
import Spinner from "./spinner";

const ConfirmModal = ({ config }) => {
   const [isLoading, setIsLoading] = useState(false);

   return (
      <Modal
         config={{
            isShown: config.isShown,
            closeCallback: config.closeCallback,
         }}
         className='flex flex-col gap-5'>
         <div className='min-w-[500px] flex flex-col gap-10 p-10'>
            <h2 className='text-3xl'>{config.title}</h2>
            <p className='text-gray-800'>{config.confirmMessage}</p>
         </div>
         <div className='flex justify-end gap-3 p-5'>
            {isLoading && (
               <div className='flex grow'>
                  <Spinner message='Delete Category ...' />
               </div>
            )}
            <button
               className='btn btn-rev text-gray-800 px-7 font-semibold'
               onClick={config.closeCallback}>
               {config.cancelBtnText}
            </button>
            <button
               className='btn text-gray-800 px-7 font-semibold'
               onClick={async () => {
                  setIsLoading((prevVal) => true);
                  await config.okCallback();
                  setIsLoading((prevVal) => false);
                  config.closeCallback();
               }}>
               {config.okBtnText}
            </button>
         </div>
      </Modal>
   );
};

export default ConfirmModal;
