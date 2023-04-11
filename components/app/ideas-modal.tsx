import { useState } from "react";
import Spinner from "../common/spinner";

import products_dummy from "../../samples/products.json";
import { NextPage } from "next";
import Modal from "../common/modal";
import IdeasProduct from "../ideas/ideas-product";
import { ProductModel } from "../../models/products/product.model";

type Props = {
   isOpen: boolean;
   toggle: () => void;
};

const IdeasModal: NextPage<Props> = ({ isOpen, toggle }) => {
   const [products, setProducts] = useState(products_dummy);

   if (!isOpen) return <></>;

   return (
      <>
         <Modal
            config={{
               className:
                  "p-5 lg:p-10 modal-content w-2/3 max-w-[900px] h-[90%] max-h-[650px]",
               isShown: isOpen,
               closeCallback: toggle,
            }}>
            <div className='flex flex-col gap-7'>
               <h2 className='text-4xl text-gray-700'>Products Ideas</h2>
               <h3 className='text-gray-400 text-2xl'>
                  Add ideas to your products
               </h3>
            </div>
            {!products.length && (
               <p className='text-rose-300'>You Have No Products yet !</p>
            )}
            {!!products.length && (
               <div className='h-[90%] overflow-auto'>
                  {products.map((product: ProductModel, index: number) => (
                     <div key={index} className='border-b'>
                        <IdeasProduct product={product} />
                     </div>
                  ))}
               </div>
            )}
         </Modal>
      </>
   );
};

export default IdeasModal;
