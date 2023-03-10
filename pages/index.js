import Head from 'next/head'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const nodes = [
    {
      text: "Visualize success",
      url: "",
    },
    {
      text: "Pioneer Migrater Settler",
      url: "",
    },
    {
      text: "Market potential",
      url: "",
    },
    {
      text: "Red ocean canvas",
      url: "",
    },
    {
      text: "Disruption",
      url: "",
    },
    {
      text: "Voice of customers",
      url: "",
    },
    {
      text: "Blue ocean",
      url: "",
    },
    {
      text: "Non customers",
      url: "",
    },
    {
      text: "Step-up, Step-down model",
      url: "",
    },
    {
      text: "Road map",
      url: "",
    },
  ];

  // Quadratic curve essential points (used inside the svg element "path" property)
  const p_0 = {
    x: 25,
    y: 500,
  }
  const p_1 = {
    x: 850,
    y: 500,
  }
  const p_2 = {
    x: 1175,
    y: 0,
  }

  const getX = (t) => Math.round(Math.pow((1 - t), 2) * p_0.x + 2 * (1 - t) * t * p_1.x + Math.pow(t, 2) * p_2.x) + 'px';
  const getY = (t) => Math.round(Math.pow((1 - t), 2) * p_0.y + 2 * (1 - t) * t * p_1.y + Math.pow(t, 2) * p_2.y) + 'px';



  console.log(getX(0.4));

  return (
    <>
      <div className='relative flex flex-col homepage-bg-gradient px-[9rem] py-5 h-screen'>
        <div className="w-[10rem] mx-12 pb-5">
          <img src="http://bo.adpadelhouse.com/assets/images/ilogo.png" alt="CaseInPoint" />
        </div>
        <div className='flex flex-col backdrop-opacity-25 bg-black/15 custom-blur rounded-4xl flex-grow'>
          <div className='flex justify-between pl-[2.8rem]'>
            <div className='flex h-min text-[11rem]'>
              <strong className='text-white text-bolder font-hero-bold leading-[12rem]'>20X</strong>
              <div className='-translate-x-[0.61ch] translate-y-[0.5ch] flex flex-col'>
                <span className='text-[5rem] font-hero-light'>revenue</span>
                <span className='self-end text-[2rem] -translate-y-9 font-hero-bold'>Journey</span>
              </div>
            </div>
            <div className="-translate-x-[1.5rem] -translate-y-[50%] w-40 h-40 flex flex-col justify-center items-center text-center bg-gray-800 text-white rounded-full border-[#1CE6A1] border-[5px]">
              <h5 className="f3">
                2-20X
              </h5>
              <div className="small weight-light">
                Your Revenue
              </div>
              <div className="small weight-bold">in one year</div>
            </div>
          </div>
          <div className='h-full relative'>
            <div className="translate-x-[7rem] translate-y-[2.5rem] flex flex-col gap-3 w-1/3 z-[99999]">
              <p className="text-xl text-white">
                Every project is successful
              </p>
              <p className="italic text-sm">
                Live and on-demand training, virtual reporting, assistance, and online expert advice.
              </p>
            </div>
            <div className='absolute bottom-0 w-full h-[39rem] border-slate-600'>
              {
                nodes.map((node, index) =>
                (<div key={index} className='-translate-x-1/2 -translate-y-1/2 absolute flex items-center justify-center w-[6.5rem] aspect-square p-2 lg:p-3 break-words bg-white drop-shadow-lg rounded-full z-[9999]' style={{
                  left: getX((index + 1) / (nodes.length * 1.19)),
                  top: getY((index + 1) / (nodes.length * 1.19)),
                }
                }>
                  <Link href={node.url} className='text-center text-[#86bf44]'>{node.text}</Link>
                </div>)
                )
              }
            </div>
            <svg className='home-line absolute bottom-0 w-full h-[39rem] z-[1]'>
              <path className='stroke-[5px] stroke-[#263238] fill-none' d={`M ${p_0.x} ${p_0.y} Q ${p_1.x} ${p_1.y} ${p_2.x} ${p_2.y}`}></path>
              <path className='stroke-[5px] stroke-white fill-none' d={`M 55 220 L 55 515 L ${p_2.x} 515`}></path>
              <circle className='fill-black' cx='180' cy='570' r='4'></circle>
              <path className='custom-stroke-dasharray stroke-[1px] stroke-[#263238] fill-none' d='M 180 570 L 200 570 L 200 451'></path>
            </svg>
          </div>
        </div>
      </div>
    </>
  )
}