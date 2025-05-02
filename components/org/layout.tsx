import { useContext } from "react";

import { stepNamesEnum } from "../../models/enums";
import { appContextData } from "../../context";

import ActionsNavbar from "../common/actions-navbar";
import StepsNavbar from "../common/steps-navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { appContext } = useContext(appContextData);
  return (
    <>
      {appContext.activeStep === stepNamesEnum.home ? (
        children
      ) : (
        <div className="content-container ">
          <header className="left-side-main-navigation">
            <ActionsNavbar selectedStepTitle={appContext.activeStep} />
          </header>
          <main className="right-side-step-content">
            <nav className="top-navigation">
              {appContext.activeStep !== stepNamesEnum.admin && (
                <StepsNavbar selectedNodeTitle={appContext.activeStep} />
              )}
            </nav>
            {children}
            <footer className="mt-auto w-full bg-white shadow-inner border-t border-gray-200 py-8 px-6 text-center text-gray-600 ">
              <div className="max-w-4xl mx-auto text-lg font-bold">
                <p className="text-base md:text-lg leading-relaxed font-medium">
                  <span className="italic text-gray-700 ">
                    *The EBOSS framework
                  </span>{" "}
                  draws inspiration from renowned strategic models like{" "}
                  <em className="text-gray-700">Blue Ocean Strategy</em> (Kim
                  &amp; Mauborgne) and{" "}
                  <em className="text-gray-700">Exponential Organizations</em>{" "}
                  (Ismail et al.). This framework is independently developed and
                  holds no affiliation, licensing, or endorsement from the
                  original authors or publishers.
                </p>
              </div>
            </footer>
          </main>
        </div>
      )}
    </>
  );
}
