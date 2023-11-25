import { useEffect, useRef, useState } from "react";

import OpenAI from "openai";
import {
    Button,
    ChatContainer,
    ConversationHeader,
    MainContainer,
    Message,
    MessageInput,
    MessageList,
    TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import {
    faComment,
    faAngleDown,
    faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

enum MessageSendBy {
    ChatGpt = "ChatGPT",
    You = "You",
}
enum MessageDirection {
    Incoming = "incoming",
    Outgoing = "outgoing",
}
type Message = {
    content: string;
    sentTime: number;
    sender: MessageSendBy;
    direction: MessageDirection;
};

enum ChatCompletionRequestMessageRoleEnum {
    System = "system",
    User = "user",
    Assistant = "assistant",
    Function = "function",
}

enum ChatGPTIs {
    Idle = "idle",
    Learning = "learning",
    Typing = "typing",
}
enum ChatIs {
    Minimized = "minimized",
    Maximized = "maximized",
    Disabled = "disabled",
}

export default function Chat({ initialMessage }: { initialMessage: string }) {
    const CHATGPT_MODEL = "gpt-3.5-turbo-1106";

    const openai = new OpenAI({
        apiKey: "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",
        dangerouslyAllowBrowser: true,
    });
    const messageInput = useRef<HTMLDivElement>(null);
    // history of all chat messages between system/user/AI [required for AI]
    const [openAIMessages, setOpenAIMessages] = useState<
        OpenAI.Chat.Completions.ChatCompletionMessageParam[]
    >([]);
    // only the chat messages that are displayed in the chat box
    const [displayedMessages, setDisplayedMessages] = useState<Message[]>([]);
    const [state, setState] = useState<ChatIs>(ChatIs.Minimized);
    const [chatGPTState, setChatGPTState] = useState<ChatGPTIs>(ChatGPTIs.Idle);

    useEffect(() => {
        if (chatGPTState === ChatGPTIs.Idle) {
            messageInput.current?.focus();
        }
    }, [chatGPTState]);

    useEffect(() => {
        if (state !== ChatIs.Disabled && initialMessage) {
            sendHiddenSystemMessage(initialMessage);
        }
    }, [state, initialMessage]);

    // Feature: system messages/response are not displayed on the chat ui
    const sendHiddenSystemMessage = async (
        automaticallyGenSystemMsg: string
    ) => {
        const newOpenAIMessages = [...openAIMessages];

        // outgoing AI message
        const newOpenAIMessage = {
            role: ChatCompletionRequestMessageRoleEnum.System,
            content: automaticallyGenSystemMsg,
        } as OpenAI.Chat.Completions.ChatCompletionMessageParam;
        newOpenAIMessages.push(newOpenAIMessage);
        setOpenAIMessages([...newOpenAIMessages]);

        setChatGPTState(ChatGPTIs.Learning);
        newOpenAIMessages.push({
            role: ChatCompletionRequestMessageRoleEnum.Assistant,
            content: await sendMessagesAndGetResponse(newOpenAIMessages),
        } as OpenAI.Chat.Completions.ChatCompletionMessageParam);
        setOpenAIMessages([...newOpenAIMessages]);
        setChatGPTState(ChatGPTIs.Idle);
    };

    const sendMessagesAndGetResponse = async (
        newOpenAIMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[]
    ): Promise<string> => {
        try {
            const chatRepsonse = await openai.chat.completions.create({
                model: "gpt-3.5-turbo-1106",
                messages: [...newOpenAIMessages], // openAI requires all old msgs
            });
            return chatRepsonse["choices"][0]["message"]["content"] ?? "";
        } catch (error) {
            let errorMessage =
                "Oops, something unexpected went wrong... try again later";
            const newDisplayedMessages = [...displayedMessages];
            if (error instanceof OpenAI.APIError) {
                if (error.status === 429)
                    errorMessage =
                        "Rate limit reached. Limit: 3 / min. Please try again in 20s";

                console.error(error.status); // e.g. 401
                console.error(error.message); // e.g. The authentication token you passed was invalid...
                console.error(error.code); // e.g. 'invalid_api_key'
                console.error(error.type); // e.g. 'invalid_request_error'
            } else {
                // Non-API error
                console.log(error);
            }
            setDisplayedMessages([...newDisplayedMessages]);
            newDisplayedMessages.push({
                content: errorMessage,
                sentTime: Math.floor(Date.now() / 1000),
                sender: MessageSendBy.ChatGpt,
                direction: MessageDirection.Incoming,
            } as Message);
            return errorMessage;
        }
    };

    const sendShownUserMessage = async (
        innerHtml: string,
        textContent: string,
        innerText: string,
        nodes: NodeList | null
    ) => {
        const newOpenAIMessages = [...openAIMessages];
        const newDisplayedMessages = [...displayedMessages];

        const newOpenAIMessage = {
            role: ChatCompletionRequestMessageRoleEnum.User,
            content: textContent,
        };
        newOpenAIMessages.push(newOpenAIMessage);
        setOpenAIMessages([...newOpenAIMessages]);

        const newDisplayedMessage: Message = {
            content: textContent,
            sentTime: Math.floor(Date.now() / 1000),
            sender: MessageSendBy.You,
            direction: MessageDirection.Outgoing,
        };
        newDisplayedMessages.push(newDisplayedMessage);
        setDisplayedMessages([...newDisplayedMessages]);

        setChatGPTState(ChatGPTIs.Typing);
        await streamResponse(newOpenAIMessages, newDisplayedMessages);
        setChatGPTState(ChatGPTIs.Idle);
    };

    const streamResponse = async (
        newOpenAIMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[],
        newDisplayedMessages: Message[]
    ) => {
        const newDisplayedMessageResponse: Message = {
            content: "",
            sentTime: Math.floor(Date.now() / 1000),
            sender: MessageSendBy.ChatGpt,
            direction: MessageDirection.Incoming,
        };
        newDisplayedMessages.push(newDisplayedMessageResponse);

        try {
            const stream = await openai.chat.completions.create({
                model: CHATGPT_MODEL,
                messages: [...newOpenAIMessages],
                stream: true,
            });
            try {
                for await (const part of stream) {
                    newDisplayedMessages[
                        newDisplayedMessages.length - 1
                    ].content += part.choices[0]?.delta.content ?? "";
                    setDisplayedMessages([...newDisplayedMessages]);
                }
            } catch (err) {
                console.error("The stream had an error", err);
            }
        } catch (error) {
            if (error instanceof OpenAI.APIError) {
                if (error.status === 429)
                    newDisplayedMessages[
                        newDisplayedMessages.length - 1
                    ].content =
                        "Rate limit reached. Limit: 3 / min. Please try again in 20s";
                console.error(error.status); // e.g. 401
                console.error(error.message); // e.g. The authentication token you passed was invalid...
                console.error(error.code); // e.g. 'invalid_api_key'
                console.error(error.type); // e.g. 'invalid_request_error'
            } else {
                // Non-API error
                console.log(error);
            }
        }

        // incoming AI message
        const newOpenAIMessage = {
            role: ChatCompletionRequestMessageRoleEnum.Assistant,
            content:
                newDisplayedMessages[newDisplayedMessages.length - 1].content,
        };
        newOpenAIMessages.push(newOpenAIMessage);
        setOpenAIMessages([...newOpenAIMessages]);
    };

    return (
        <>
            {state === ChatIs.Maximized && (
                <div className="chatgpt-outer-container">
                    <div className="chatgpt-wrapper">
                        <div className="chatgpt-container">
                            <MainContainer>
                                <ChatContainer>
                                    <ConversationHeader>
                                        <ConversationHeader.Content
                                            userName="AI Chat Assistant"
                                            info={`model ${CHATGPT_MODEL}`}
                                        />
                                        <ConversationHeader.Actions>
                                            <Button
                                                title="Minimize Chat"
                                                onClick={() =>
                                                    setState(ChatIs.Minimized)
                                                }
                                                icon={
                                                    <FontAwesomeIcon
                                                        icon={faAngleDown}
                                                        className="w-9 px-2"
                                                    />
                                                }
                                            ></Button>
                                            <Button
                                                title="Close Chat"
                                                onClick={() =>
                                                    setState(ChatIs.Disabled)
                                                }
                                                icon={
                                                    <FontAwesomeIcon
                                                        icon={faTimes}
                                                        className="w-8 px-2"
                                                    />
                                                }
                                            ></Button>
                                        </ConversationHeader.Actions>
                                    </ConversationHeader>
                                    <MessageList
                                        typingIndicator={
                                            (chatGPTState ===
                                                ChatGPTIs.Typing ||
                                                chatGPTState ===
                                                    ChatGPTIs.Learning) && (
                                                <TypingIndicator
                                                    content={`ChatGPT is ${chatGPTState}`}
                                                />
                                            )
                                        }
                                    >
                                        {displayedMessages.map(
                                            (message, index) => {
                                                return (
                                                    <Message
                                                        key={index}
                                                        model={{
                                                            message:
                                                                message.content,
                                                            sentTime: `${message.sentTime}`,
                                                            sender: message.sender,
                                                            direction:
                                                                message.direction,
                                                            position: "single",
                                                            type: "text",
                                                        }}
                                                    />
                                                );
                                            }
                                        )}
                                    </MessageList>
                                    <MessageInput
                                        placeholder="Type message here"
                                        onSend={sendShownUserMessage}
                                        autoFocus={true}
                                        attachButton={false}
                                        sendButton={false} // if true, it needs width 40px to work
                                        disabled={
                                            chatGPTState === ChatGPTIs.Typing ||
                                            chatGPTState === ChatGPTIs.Learning
                                        }
                                        ref={messageInput}
                                    />
                                </ChatContainer>
                            </MainContainer>
                        </div>
                    </div>
                </div>
            )}
            {state === ChatIs.Minimized && (
                <Button
                    title="Open Chat"
                    className="chatgpt-button"
                    onClick={() => setState(ChatIs.Maximized)}
                    border
                    icon={<FontAwesomeIcon icon={faComment} className="w-14" />}
                ></Button>
            )}
        </>
    );
}
