import Link from "next/link";
import { useEffect, useState } from "react";

const DesktopHomepage = ({
   nodes,
   originalScreenWidth,
   currentScreenWidth,
}) => {
   // Quadratic curve essential points (used inside the svg element "path" property)
   const curve = {
      p_0: {
         x: 50,
         y: 500,
      },
      p_1: {
         x: 1100,
         y: 500,
      },
      p_2: {
         x: 1200,
         y: 0,
      },
      getWidth: function () {
         return this.p_2.x - this.p_0.x;
      },
      getHeight: function () {
         return this.p_2.y - this.p_0.y;
      },
   };

   const delta_x = curve.getWidth() / (nodes.length + 2 - 1); // curve width / number of gaps between nodes [nodes.length + 2 other nodes (the first node and the last node)]
   const t_1 = 0.2 / nodes.length;
   const t_values = [t_1];

   const getX = (t) =>
      Math.round(
         Math.pow(1 - t, 2) * curve.p_0.x +
            2 * (1 - t) * t * curve.p_1.x +
            Math.pow(t, 2) * curve.p_2.x
      );
   const getY = (t) =>
      Math.round(
         Math.pow(1 - t, 2) * curve.p_0.y +
            2 * (1 - t) * t * curve.p_1.y +
            Math.pow(t, 2) * curve.p_2.y
      );

   const getRelativeXInPixels = (x_pos) => {
      return (
         Math.round((x_pos * currentScreenWidth) / originalScreenWidth) || 0
      );
   };

   const getDelta_T = (curr_T) => {
      const linearEquation_1 = curve.p_0.x - 2 * curve.p_1.x + curve.p_2.x;
      const linearEquation_2 = curve.p_1.x - curve.p_0.x;
      const numerator =
         -1 * (curr_T * linearEquation_1 + linearEquation_2) +
         Math.sqrt(
            Math.pow(curr_T * linearEquation_1 + linearEquation_2, 2) +
               linearEquation_1 * delta_x
         );
      const denominator = linearEquation_1;

      const delta_T = numerator / denominator;
      const next_T = curr_T + delta_T;
      if (!t_values.some((val) => val === next_T)) t_values.push(next_T);
      return delta_T;
   };

   return (
      <>
         <div
            className='flex flex-col pl-[2.8rem] backdrop-opacity-25 bg-black/15 custom-blur rounded-4xl flex-grow lg:w-75 max-w-[1300px] max-h-[600px] mx-auto'
            style={{
               width: getRelativeXInPixels(curve.getWidth() + 175) + "px",
            }}>
            <div className='flex h-min text-[11rem]'>
               <strong className='text-white text-bolder font-black leading-[12rem]'>
                  20X
               </strong>
               <div className='-translate-x-[0.61ch] translate-y-[0.5ch] flex flex-col'>
                  <span className='text-[5rem] font-hero-light'>revenue</span>
                  <span className='self-end text-[2rem] -translate-y-9 font-extrabold'>
                     Journey
                  </span>
               </div>
            </div>
            <div className='h-full relative'>
               <div className='translate-x-[7rem] translate-y-[2.5rem] flex flex-col gap-3 w-1/4 z-[99999]'>
                  <p className='text-2xl text-white'>
                     Every project is successful
                  </p>
                  <p className='italic text-sm'>
                     Live and on-demand training, virtual reporting, assistance,
                     and online expert advice.
                  </p>
               </div>
               <div className='absolute bottom-0 w-full h-[39rem] border-slate-600'>
                  <div className='absolute top-[575px] left-[15px] bg-gray-battleship text-white text-sm pl-3 pr-6 py-1 rounded-full'>
                     Free. No subscription needed
                  </div>
                  <span className='absolute top-[575px] left-[280px] text-white font-bold text-lg'>
                     Subscribers only
                  </span>
                  <div
                     className='-translate-x-1/2 -translate-y-1/2 absolute flex items-center justify-center w-[8rem] aspect-square p-2 lg:p-3 break-words bg-aquamarine drop-shadow-lg rounded-full z-[99999]'
                     style={{
                        left: getRelativeXInPixels(curve.p_0.x) + "px",
                        top: curve.p_0.y,
                     }}>
                     <div href='' className='text-center'>
                        <div className='text-slate-700'>Start here</div>
                        <Link
                           href='registration/signup'
                           className='text-center'>
                           <div className='font-bold text-white'>Register</div>
                        </Link>
                        <div className='text-slate-700 font-bold'>Or</div>
                        <Link href='registration/login' className='text-center'>
                           <div className='font-bold text-white'>Login</div>
                        </Link>
                     </div>
                  </div>
                  {nodes.map((node, index) => (
                     <div
                        key={index}
                        className='-translate-x-1/2 -translate-y-1/2 absolute flex items-center justify-center w-[105px] aspect-square p-2 lg:p-3 break-words bg-white drop-shadow-lg rounded-full z-[9999]'
                        style={{
                           left:
                              getRelativeXInPixels(
                                 getX(
                                    t_values[index] +
                                       getDelta_T(t_values[index])
                                 )
                              ) + "px",
                           top: getY(
                              t_values[index] + getDelta_T(t_values[index])
                           ),
                        }}>
                        <Link
                           href={node.url}
                           className='text-center text-yellow-green'>
                           {node.text}
                        </Link>
                     </div>
                  ))}
                  <div
                     className='absolute -translate-x-[50%] -translate-y-[50%] w-40 h-40 flex flex-col justify-center items-center text-center bg-gray-800 text-white rounded-full border-aquamarine border-[5px] z-[999]'
                     style={{
                        left: getRelativeXInPixels(getX(1)) + "px",
                        top: getY(1),
                     }}>
                     <h5 className='font-bold text-3xl'>2-20X</h5>
                     <div className='font-light'>Your Revenue</div>
                     <div className='font-bold'>in one year</div>
                  </div>
               </div>
               <svg className='home-line absolute bottom-0 w-full h-[39rem] z-[1]'>
                  <path
                     className='stroke-[5px] stroke-gunmetal fill-none'
                     d={`M ${getRelativeXInPixels(curve.p_0.x)} ${
                        curve.p_0.y
                     } Q ${getRelativeXInPixels(curve.p_1.x)} ${
                        curve.p_1.y
                     } ${getRelativeXInPixels(curve.p_2.x)} ${
                        curve.p_2.y
                     }`}></path>
                  <path
                     className='stroke-[5px] stroke-white fill-none'
                     d={`M 55 270 L 55 515 L ${getRelativeXInPixels(
                        curve.p_2.x
                     )} 515`}></path>
                  <circle
                     className='fill-black'
                     cx='220'
                     cy='590'
                     r='4'></circle>
                  <path
                     className='custom-stroke-dasharray stroke-[1px] stroke-gunmetal fill-none'
                     d='M 220 590 L 247 590 L 247 451'></path>
               </svg>
            </div>
         </div>
      </>
   );
};

export default DesktopHomepage;
