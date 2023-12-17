import { useContext } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import { stepNamesEnum, tooltipDirectionsEnum, ChatIs } from "../../models/enums";
import { chatBoxStateData } from "../../context";

import ConsultantReview from "./consultant-review";
import Tooltip from "./tooltip";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faComment, faCommentSlash } from "@fortawesome/free-solid-svg-icons";

interface Props {
    selectedStepTitle: stepNamesEnum;
}

const ActionsNavbar = ({ selectedStepTitle: displayedPageTitle }: Props) => {
    const { data: session }: any = useSession();

    const { chatBoxState, setChatBoxState } = useContext(chatBoxStateData);

    return (
        <nav className="main-navigation">
            {/* the parent of Tooltip must have the following css classes: "group relative" to work properly */}
            <main className="nav-section-ul">
                <li>
                    <Image width="55" height="55" src="/cp.svg" alt="CaseInPoint" />
                </li>
                <li className="group relative hover:animate-shake">
                    <Link href="/">
                        <Image width="42" height="42" src="/dashboard.svg" alt="Dashboard" />
                    </Link>
                    <Tooltip dir={tooltipDirectionsEnum.bottom}>Dashboard</Tooltip>
                </li>
                <li className="group relative hover:animate-shake">
                    <ConsultantReview pageTitle={displayedPageTitle}>
                        <Image width="45" height="45" src="/consultations.svg" alt="Consultations" />
                    </ConsultantReview>
                    <Tooltip dir={tooltipDirectionsEnum.bottom}>
                        <p className="w-max">
                            <strong>Request </strong> for consultant review
                        </p>
                    </Tooltip>
                </li>
            </main>
            <ul className="nav-section-ul">
                <li>
                    <p className="text-center font-hero-semibold text-4 text-[#4e79b2]">{session?.user?.fullName}</p>
                </li>
                <li
                    className={`group relative w-16 h-16 p-4 flex leading-7 bg-icons-gray rounded-full cursor-pointer ${
                        chatBoxState === ChatIs.Disabled ? `hover:bg-blue-900` : `hover:bg-red-600`
                    } transition duration-200`}
                    onClick={() => {
                        chatBoxState === ChatIs.Disabled
                            ? setChatBoxState(ChatIs.Minimized)
                            : setChatBoxState(ChatIs.Disabled);
                    }}
                >
                    {chatBoxState === ChatIs.Disabled ? (
                        <>
                            <FontAwesomeIcon icon={faComment} className="w-8 h-8 text-white" />
                            <Tooltip dir={tooltipDirectionsEnum.bottom}>Enable Chat</Tooltip>
                        </>
                    ) : (
                        <>
                            <FontAwesomeIcon icon={faCommentSlash} className="w-8 h-8 text-white" />
                            <Tooltip dir={tooltipDirectionsEnum.bottom}>Disable Chat</Tooltip>
                        </>
                    )}
                </li>
                <li
                    className="group relative w-16 h-16 p-4 bg-icons-gray rounded-full cursor-pointer hover:bg-red-600 transition duration-200"
                    onClick={() => {
                        signOut({
                            callbackUrl: "/",
                        });
                    }}
                >
                    <FontAwesomeIcon icon={faArrowRightFromBracket} className="text-white" />
                    <Tooltip dir={tooltipDirectionsEnum.bottom}>Logout</Tooltip>
                </li>
            </ul>
        </nav>
    );
};

export default ActionsNavbar;
