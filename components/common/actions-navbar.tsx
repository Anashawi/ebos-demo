import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import { stepNamesEnum, tooltipDirectionsEnum } from "../../models/enums";

import ConsultantReview from "./consultant-review";
import Tooltip from "./tooltip";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

interface Props {
    selectedStepTitle: stepNamesEnum;
}

const ActionsNavbar = ({ selectedStepTitle: displayedPageTitle }: Props) => {
    const { data: session }: any = useSession();

    return (
        <nav className="main-navigation">
            <main className="nav-section-ul">
                <li>
                    <Image
                        width="55"
                        height="55"
                        src="/cp.svg"
                        alt="CaseInPoint"
                    />
                </li>
                <li className="group relative hover:animate-shake">
                    <Link href="/">
                        <Image
                            width="42"
                            height="42"
                            src="/dashboard.svg"
                            alt="Dashboard"
                        />
                    </Link>
                    {/* the parent of Tooltip must have the following css classes: "group relative" to work properly */}
                    <Tooltip dir={tooltipDirectionsEnum.bottom}>
                        Dashboard
                    </Tooltip>
                </li>
                <li className="group relative hover:animate-shake">
                    <ConsultantReview pageTitle={displayedPageTitle}>
                        <Image
                            width="45"
                            height="45"
                            src="/consultations.svg"
                            alt="Consultations"
                        />
                    </ConsultantReview>
                    {/* the parent of Tooltip must have the following css classes: "group relative" to work properly */}
                    <Tooltip dir={tooltipDirectionsEnum.bottom}>
                        <p className="w-max">
                            <strong>Request </strong> for consultant review
                        </p>
                    </Tooltip>
                </li>
            </main>
            <ul className="nav-section-ul">
                <li>
                    <p className="text-center font-hero-semibold text-[1.3rem] text-[#4e79b2]">
                        {session?.user?.fullName}
                    </p>
                </li>
                <li
                    className="group relative w-[4rem] h-[4rem] p-4 bg-icons-gray rounded-full hover:p-4 hover:btn-danger hover:cursor-pointer transition duration-200"
                    onClick={() => {
                        signOut({
                            callbackUrl: "/",
                        });
                    }}
                >
                    <FontAwesomeIcon
                        icon={faArrowRightFromBracket}
                        className="text-white"
                    />
                    {/* the parent of Tooltip must have the following css classes: "group relative" to work properly */}
                    <Tooltip dir={tooltipDirectionsEnum.bottom}>Logout</Tooltip>
                </li>
            </ul>
        </nav>
    );
};

export default ActionsNavbar;
