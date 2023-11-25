import ActionsNavbar from "../common/actions-navbar";
import StepsNavbar from "../common/steps-navbar";

export default function Layout({
    children,
    stepTitle,
}: {
    children: React.ReactNode;
    stepTitle: any;
}) {
    return (
        <div className="content-container">
            <header className="left-side-main-navigation">
                <ActionsNavbar selectedStepTitle={stepTitle} />
            </header>
            <main className="right-side-step-content">
                <nav className="top-navigation">
                    <StepsNavbar selectedNodeTitle={stepTitle} />
                </nav>
                {children}
            </main>
        </div>
    );
}
