import { createContext, useState, ReactNode } from "react";
import { ChatIs, stepNamesEnum } from "../models/enums";

export type ChatBoxStateContextType = {
    chatBoxState: ChatIs;
    setChatBoxState: React.Dispatch<React.SetStateAction<ChatIs>>;
};
export type activeStepContextType = {
    activeStep: stepNamesEnum;
    setActiveStep: React.Dispatch<React.SetStateAction<stepNamesEnum>>;
};

export const chatBoxStateData = createContext<ChatBoxStateContextType>({} as ChatBoxStateContextType);
export const activeStepData = createContext<activeStepContextType>({} as activeStepContextType);

function Context({ children }: { children: ReactNode }) {
    const [chatBoxState, setChatBoxState] = useState<ChatIs>(ChatIs.Minimized);
    const [activeStep, setActiveStep] = useState<stepNamesEnum>(stepNamesEnum.home);

    return (
        <chatBoxStateData.Provider value={{ chatBoxState, setChatBoxState }}>
            <activeStepData.Provider value={{ activeStep, setActiveStep }}>{children}</activeStepData.Provider>
        </chatBoxStateData.Provider>
    );
}

export default Context;
