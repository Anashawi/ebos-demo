import { useContext } from "react";

import { stepNamesEnum } from "../../models/enums";
import { activeStepData } from "../../context";

import ActionsNavbar from "../common/actions-navbar";
import StepsNavbar from "../common/steps-navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { activeStep } = useContext(activeStepData);
    return (
        <>
            {activeStep === stepNamesEnum.home ? (
                children
            ) : (
                <div className="content-container">
                    <header className="left-side-main-navigation">
                        <ActionsNavbar selectedStepTitle={activeStep} />
                    </header>
                    <main className="right-side-step-content">
                        <nav className="top-navigation">
                            <StepsNavbar selectedNodeTitle={activeStep} />
                        </nav>
                        {children}
                    </main>
                </div>
            )}
        </>
    );
}
