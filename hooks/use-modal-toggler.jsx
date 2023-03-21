import { useState } from "react";

const useModalToggler = () => {
   const [isShown, setToggler] = useState(false);

   const toggle = () => {
      setToggler(!isShown);
   };

   return [isShown, toggle];
};

export default useModalToggler;
