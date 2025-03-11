import { useEffect, useState } from "react";

import { IUserTakeaways } from "../../models/user-takeaways";
import { ITakeaway } from "../../models/types";
import { takeawayTypeEnums } from "../../models/enums";

import TakeawaysNotes from "./takeaways-notes";
import Spinner from "../common/spinner";

interface Props {
    userTakeaways: IUserTakeaways;
    dispatchUserTakeaways: (takeawaysCallback: any) => void;
    isLoading: boolean;
    className?: string;
}

const DisruptionTakeaways = ({
    userTakeaways,
    dispatchUserTakeaways,
    isLoading,
    className,
}: Props) => {


    return (
        <>
            <div className={`${className ?? ""} `}>
                {isLoading && (
                    <Spinner
                        message="Loading on scale takeaways..."
                        className=""
                    />
                )}
                {!isLoading && (
                    <TakeawaysNotes
                        title="Takeaways on Scale"
                        userTakeaways={userTakeaways}
                        type={takeawayTypeEnums.scale}
                        dispatchUserTakeaways={dispatchUserTakeaways}
                    />
                )}
                {isLoading && (
                    <Spinner
                        message="Loading on ideas takeaways..."
                        className=""
                    />
                )}
                {!isLoading && (
                    <TakeawaysNotes
                        title="Takeaways on Ideas"
                        userTakeaways={userTakeaways}
                        type={takeawayTypeEnums.ideas}
                        dispatchUserTakeaways={dispatchUserTakeaways}
                    />
                )}
            </div>
        </>
    );
};

export default DisruptionTakeaways;
