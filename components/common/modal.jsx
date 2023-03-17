import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Modal = ({ children, config = {} }) => {
   const {
      className,
      isShown,
      closeCallback
   } = config;

   if (!isShown) return;

   return (
      <div className='z-[99999] fixed inset-0 flex justify-center items-center bg-neutral-900 bg-opacity-60'>
         <div className={`relative min-h-[10rem] min-w-[30rem] max-w-[65rem] rounded-md bg-white ${className ?? ''}`}>
            <span
               onClick={closeCallback}
               className='absolute right-0 top-0 inline flex items-center p-2 text-policeblue text-lg hover:text-xl cursor-pointer'
            ><FontAwesomeIcon icon={faTimes} className='me-3 mt-3 text-xl font-bold' />
            </span>
            {children}
         </div>
      </div>
   );
}

export default Modal;