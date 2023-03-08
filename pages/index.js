import Head from 'next/head'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <div className='homepage-bg-gradient px-[4rem] py-5 h-screen'>
        <div class="w-[10rem] mx-12 py-5">
          <img src="http://bo.adpadelhouse.com/assets/images/ilogo.png" alt="CaseInPoint" />
        </div>
        <div className='self-stretch flex flex-col'>
          <div className='flex justify-between h-[70vh] backdrop-opacity-25 bg-black/15 custom-blur rounded-4xl pl-[2.4rem]'>
            <div className='flex text-[11rem]'>
              <strong className='text-white text-bolder font-hero-bold leading-[14rem]'>20X</strong>
              <div className='-translate-x-[0.61ch] translate-y-[0.5ch] flex flex-col'>
                <span className='text-[5rem] font-hero-light'>revenue</span>
                <span className='self-end text-[2rem] -translate-y-9 font-hero-bold'>Journey</span>
              </div>
            </div>
            <div class="-translate-x-[1.5rem] -translate-y-[50%] w-40 h-40 flex flex-col justify-center items-center text-center bg-gray-800 text-white rounded-full border-[#1CE6A1] border-[5px]">
              <h5 class="f3">
                2-20X
              </h5>
              <div class="small weight-light">
                Your Revenue
              </div>
              <div class="small weight-bold">in one year</div>
            </div>
          </div>
          <div>
            <div class="w-1/3 z-[99999]">
              <span class="txt1">

                Every project is successful
              </span>
              <span class="txt2">
                Live and on-demand training, virtual reporting, assistance, and online expert advice.

              </span>
            </div>
            <svg class="home-line">
              <path class="home-Path" d="M 0 500 Q 1100 500 1100 100 L 1100 0 "></path>
              <path class="grid-path" d="M 25 250 L 25 515 L 1100 515 "></path>
              <circle class="dashed-dot" cx="180" cy="570" r="4"></circle>
              <path class="dashed-path" d="M 180 570 L 200 570 L 200 451 "></path>
            </svg>
          </div>
        </div>
      </div>
    </>
  )
}