import { createContext, useState, ReactNode } from "react";
import { AIAssistant, ChatIs, stepNamesEnum } from "../models/enums";
import { OpenAI } from "openai";

type AppContext = {
  openAIMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[];
  chatIs: ChatIs;
  AIAssistant: AIAssistant;
  activeStep: stepNamesEnum;
};
export type AppContextType = {
  appContext: AppContext;
  setAppContext: React.Dispatch<React.SetStateAction<AppContext>>;
};

export const appContextData = createContext<AppContextType>({} as AppContextType);

function Context({ children }: { children: ReactNode }) {
  const [appContext, setAppContext] = useState<AppContext>({
    openAIMessages: [],
    chatIs: ChatIs.Minimized,
    AIAssistant: AIAssistant.AutoLearning,
    activeStep: stepNamesEnum.home,
  } as AppContext);

  return <appContextData.Provider value={{ appContext, setAppContext }}>{children}</appContextData.Provider>;
}

export default Context;
