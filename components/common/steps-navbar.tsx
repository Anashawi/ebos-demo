import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import { stepNamesEnum } from "../../models/enums";
import { NavbarNode } from "../../models/types";

interface Props {
    selectedNodeTitle: stepNamesEnum;
}

const StepsNavbar = ({ selectedNodeTitle }: Props) => {
    const router = useRouter();

    const steps: NavbarNode[] = [
        {
            title: stepNamesEnum.visualizeSuccess,
            step: "Step One",
            url: "org/goals",
            iconPath: "/1.svg",
            selectedIconPath: "/selected-1.svg",
        } as NavbarNode,
        {
            title: stepNamesEnum.pioneerMigratorSettler,
            step: "Step Two",
            url: "org/products",
            iconPath: "/2.svg",
            selectedIconPath: "/selected-2.svg",
        } as NavbarNode,
        {
            title: stepNamesEnum.marketPotential,
            step: "Step Three",
            url: "org/market-potential",
            iconPath: "/3.svg",
            selectedIconPath: "/selected-3.svg",
        } as NavbarNode,
        {
            title: stepNamesEnum.redOceanCanvas,
            step: "Step Four",
            url: "org/red-ocean",
            iconPath: "/4.svg",
            selectedIconPath: "/selected-4.svg",
        } as NavbarNode,
        {
            title: stepNamesEnum.disruption,
            step: "Step Five",
            url: "org/disruption",
            iconPath: "/5.svg",
            selectedIconPath: "/selected-5.svg",
        } as NavbarNode,
        {
            title: stepNamesEnum.voiceOfCustomers,
            step: "Step Six",
            url: "org/voice-of-customers",
            iconPath: "/6.svg",
            selectedIconPath: "/selected-6.svg",
        } as NavbarNode,
        {
            title: stepNamesEnum.blueOceanCanvas,
            step: "Step Seven",
            url: "org/blue-ocean",
            iconPath: "/7.svg",
            selectedIconPath: "/selected-7.svg",
        } as NavbarNode,
        {
            title: stepNamesEnum.nonCustomers,
            step: "Step Eight",
            url: "org/non-customers",
            iconPath: "/8.svg",
            selectedIconPath: "/selected-8.svg",
        } as NavbarNode,
        {
            title: stepNamesEnum.stepUpStepDownModel,
            step: "Step Nine",
            url: "org/step-up-step-down",
            iconPath: "/9.svg",
            selectedIconPath: "/selected-9.svg",
        } as NavbarNode,
        {
            title: stepNamesEnum.roadMap,
            step: "Step Ten",
            url: "org/roadmap",
            iconPath: "/10.svg",
            selectedIconPath: "/selected-10.svg",
        } as NavbarNode,
    ];

    const renderSelectedIcon = (node: NavbarNode, isLastIcon: boolean) => {
        return (
            <li className="flex gap-4 hover:animate-vertical-shake">
                <div className="flex gap-2 items-center">
                    <div
                        className="cursor-pointer"
                        onClick={() => {
                            router.push(`../${node.url}`);
                        }}
                    >
                        <Link href={`../${node.url}`}>
                            <Image
                                src={node.selectedIconPath}
                                alt="icon"
                                width={82}
                                height={82}
                            />
                        </Link>
                    </div>
                    <hgroup>
                        <h1 className="leading-[1.57rem] text-[1.3rem] text-navbar-gray font-hero-semibold">
                            {node.step}
                        </h1>
                        <h2 className="leading-[1.57rem] text-[1.3rem] font-hero-semibold text-navbar-primary-title">
                            {node.title}
                        </h2>
                    </hgroup>
                </div>
                <div className="max-w-[135px] self-center flex justify-center overflow-hidden">
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                            (dash, dashIndex) => (
                                <div
                                    key={dashIndex}
                                    className={
                                        !isLastIcon
                                            ? "w-[0.75rem] h-[1px] border border-primary-300"
                                            : "w-[0.75rem] h-0"
                                    }
                                ></div>
                            )
                        )}
                    </div>
                </div>
            </li>
        );
    };

    const renderUnselectedIcon = (node: NavbarNode) => {
        return (
            <li className="cursor-pointer hover:animate-vertical-shake">
                <Link href={`../${node.url}`}>
                    <Image
                        src={node.iconPath}
                        alt="icon"
                        width={82}
                        height={82}
                    />
                </Link>
            </li>
        );
    };

    return (
        <ul className="steps-list">
            {steps.map((step, index) => (
                <React.Fragment key={index}>
                    {step.title === selectedNodeTitle
                        ? renderSelectedIcon(step, index === steps.length - 1)
                        : renderUnselectedIcon(step)}
                </React.Fragment>
            ))}
        </ul>
    );
};

export default StepsNavbar;
