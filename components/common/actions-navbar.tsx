import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import {
    navbarDirectionsEnum,
    stepNamesEnum,
    tooltipDirectionsEnum,
} from "../../models/enums";

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
        <nav className="grow flex flex-col flex-wrap justify-between gap-8">
            <ul className={`flex flex-col items-center gap-8`}>
                <li className="flex justify-center">
                    <Image
                        width="55"
                        height="55"
                        src="/cp.svg"
                        alt="CaseInPoint"
                    />
                </li>
                <li className="group relative flex justify-center hover:animate-shake">
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
                <li className="group relative flex justify-center hover:animate-shake">
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
            </ul>
            <ul className="flex flex-col items-center gap-8">
                <li>
                    <p className="text-center font-hero-semibold text-[1.3rem] text-[#4e79b2]">
                        {session?.user?.fullName}
                    </p>
                </li>
                <li
                    onClick={() => {
                        signOut({
                            callbackUrl: "/",
                        });
                    }}
                    className="group relative rounded-full w-[4rem] h-[4rem] p-4 bg-icons-gray hover:p-4 hover:btn-danger hover:cursor-pointer transition duration-200"
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
