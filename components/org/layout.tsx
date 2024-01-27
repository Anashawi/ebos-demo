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
        <div className="content-container">
          <header className="left-side-main-navigation">
            <ActionsNavbar selectedStepTitle={appContext.activeStep} />
          </header>
          <main className="right-side-step-content">
            <nav className="top-navigation">
              {
                appContext.activeStep !== stepNamesEnum.admin &&
                <StepsNavbar selectedNodeTitle={appContext.activeStep} />
              }
            </nav>
            {children}
          </main>
        </div>
      )}
    </>
  );
}
