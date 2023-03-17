import { useState } from "react";

const useModalToggler = () => {
   const [isOn, setToggler] = useState(false);

   function toggle() {
      setToggler(!isOn);
   }

   return [isOn, toggle];
};

export default useModalToggler;
