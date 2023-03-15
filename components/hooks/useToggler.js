import { useState } from 'react'

const useToggler = () => {
   const [isOpen, setToggler] = useState(false);

   function toggle() {
      setToggler(!isOpen);
   }

   return [
      isOpen,
      toggle
   ];
}

export default useToggler;
