import Login from '@/components/auth/login';
import Signup from '@/components/auth/signup';
import DesktopHomepage from '@/components/homepage/desktop-homepage';
import PhabletHomepage from '@/components/homepage/phablet-homepage';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {

  const nodes = [
    {
      text: "Visualize success",
      url: "app/goals",
    },
    {
      text: "Pioneer Migrater Settler",
      url: "app/products",
    },
    {
      text: "Market potential",
      url: "app/competitors",
    },
    {
      text: "Red ocean canvas",
      url: "app/factors",
    },
    {
      text: "Disruption",
      url: "app/disruption",
    },
    {
      text: "Voice of customers",
      url: "app/customers",
    },
    {
      text: "Blue ocean",
      url: "app/idea-factors",
    },
    {
      text: "Non customers",
      url: "app/non-customers",
    },
    {
      text: "Step-up, Step-down model",
      url: "app/analysis",
    },
    {
      text: "Road map",
      url: "app/roadmap",
    },
  ];


  const [currentScreenWidth, setCurrentScreenWidth] = useState(0);
  const [originalScreenWidth, setOriginalScreenWidth] = useState(0);
  const [isScreenSmall, setIsScreenSmall] = useState(false);
  const [isLoginScreen, setIsLoginScreen] = useState(false);
  const [isSignupScreen, setIsSignupScreen] = useState(false);

  useEffect(() => {
    setOriginalScreenWidth(window.screen.width);
    setCurrentScreenWidth(window.innerWidth);
    if (currentScreenWidth <= 1200) {
      setIsScreenSmall(true);
    } else {
      setIsScreenSmall(false);
    }
    window.addEventListener('resize', () => {
      setCurrentScreenWidth(window.innerWidth);
      if (currentScreenWidth <= 1250) {
        setIsScreenSmall(true);
      } else {
        setIsScreenSmall(false);
      }
    });
  });

  return (
    <>
      <div className='relative flex flex-col justify-center items-center homepage-bg-gradient py-5 w-screen h-screen mx-auto'>
        <div className='self-start ml-[10vw] w-[10rem] mx-12 pb-5'>
          <Image
            width='160'
            height='99'
            src='http://bo.adpadelhouse.com/assets/images/ilogo.png'
            alt='CaseInPoint'
            className='scale-[1.1]'
          />
        </div>
        {
          isScreenSmall && (
            <PhabletHomepage
              nodes={nodes}
            />
          )
        }
        {
          !isScreenSmall &&
          (<DesktopHomepage
            nodes={nodes}
            originalScreenWidth={originalScreenWidth}
            currentScreenWidth={currentScreenWidth}
            openLoginScreen={() => { setIsLoginScreen(true) }}
            openSignupScreen={() => { setIsSignupScreen(true) }}
          />)
        }
        {
          isLoginScreen && (
            <Login closeLoginScreen={() => { setIsLoginScreen(false) }}></Login>
          )
        }
        {
          isSignupScreen && (
            <Signup closeSignupScreen={() => { setIsSignupScreen(false) }}></Signup>
          )
        }
      </div>
    </>
  )
}