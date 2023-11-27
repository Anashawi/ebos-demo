import { createContext, useState, ReactNode } from "react";
import { ChatIs } from "../models/enums";

export interface ChatBoxStateContextType {
    chatBoxState: ChatIs;
    setChatBoxState: React.Dispatch<React.SetStateAction<ChatIs>>;
}

export const chatBoxStateData = createContext<ChatBoxStateContextType>(
    {} as ChatBoxStateContextType
);

function Context({ children }: { children: ReactNode }) {
    const [chatBoxState, setChatBoxState] = useState(ChatIs.Minimized);

    const contextValue: ChatBoxStateContextType = {
        chatBoxState,
        setChatBoxState,
    };

    return (
        <chatBoxStateData.Provider value={contextValue}>
            {children}
        </chatBoxStateData.Provider>
    );
}

export default Context;
