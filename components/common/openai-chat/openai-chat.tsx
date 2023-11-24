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
import { faComment, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "../../../styles/Chat.module.css";

type Message = {
    content: string;
    sentTime: number;
    sender: string;
    direction: "incoming" | "outgoing";
};

enum ChatCompletionRequestMessageRoleEnum {
    System = "system",
    User = "user",
    Assistant = "assistant",
    Function = "function",
}

const CHATGPT_USER = "ChatGPT";
const CHATGPT_MODEL = "gpt-3.5-turbo-1106";

export default function Chat({ initialMessage }: { initialMessage: string }) {
    const openai = new OpenAI({
        apiKey: "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",
        dangerouslyAllowBrowser: true,
    });
    const messageInput = useRef<HTMLDivElement>(null);

    // chat messages between system/user/AI [required for AI]
    const [openAIMessages, setOpenAIMessages] = useState<
        OpenAI.Chat.Completions.ChatCompletionMessageParam[]
    >([]);
    // chat messages that are displayed in the chat box
    const [displayedMessages, setDisplayedMessages] = useState<Message[]>([]);
    const [isChatVisible, setIsChatVisible] = useState(false);
    const [waitingForResponse, setWaitingForResponse] = useState(false);
    const [isAILearning, setIsAILearning] = useState(false);

    useEffect(() => {
        if (!waitingForResponse) {
            messageInput.current?.focus();
        }
    }, [waitingForResponse]);

    useEffect(() => {
        if (initialMessage) {
            sendSystemMessage(initialMessage);
        }
    }, [initialMessage]);

    // Feature: system messages/response are not displayed on the chat ui
    const sendSystemMessage = async (automaticallyGenSystemMsg: string) => {
        const newOpenAIMessages = [...openAIMessages];

        // outgoing AI message
        const newOpenAIMessage = {
            role: ChatCompletionRequestMessageRoleEnum.System,
            content: automaticallyGenSystemMsg,
        };
        newOpenAIMessages.push(newOpenAIMessage);
        setOpenAIMessages([...newOpenAIMessages]);

        setIsAILearning(true);
        await sendMessagesAndGetResponse(newOpenAIMessages);
        setIsAILearning(false);
        setTimeout(() => console.log(openAIMessages), 500);
    };

    const sendMessagesAndGetResponse = async (
        newOpenAIMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[]
    ) => {
        try {
            const chatRepsonse = await openai.chat.completions.create({
                model: "gpt-3.5-turbo-1106",
                messages: [...newOpenAIMessages], // openAI requires all old msgs
            });
            const newOpenAIMessage = {
                role: ChatCompletionRequestMessageRoleEnum.Assistant,
                content: chatRepsonse["choices"][0]["message"]["content"] ?? "",
            };
            newOpenAIMessages.push(newOpenAIMessage);
            setOpenAIMessages([...newOpenAIMessages]);
        } catch (error) {
            if (error instanceof OpenAI.APIError) {
                if (error.status === 429) {
                    const newDisplayedMessages = [...displayedMessages];
                    newDisplayedMessages.push({
                        content:
                            "Rate limit reached. Limit: 3 / min. Please try again in 20s",
                        sentTime: Math.floor(Date.now() / 1000),
                        sender: CHATGPT_USER,
                        direction: "incoming",
                    } as Message);
                    setDisplayedMessages([...newDisplayedMessages]);
                }
                console.error(error.status); // e.g. 401
                console.error(error.message); // e.g. The authentication token you passed was invalid...
                console.error(error.code); // e.g. 'invalid_api_key'
                console.error(error.type); // e.g. 'invalid_request_error'
            } else {
                // Non-API error
                console.log(error);
            }
        }
    };

    const sendUserMessage = async (
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
            sender: "You",
            direction: "outgoing",
        };
        newDisplayedMessages.push(newDisplayedMessage);
        setDisplayedMessages([...newDisplayedMessages]);

        setWaitingForResponse(true);
        await streamResponse(newOpenAIMessages, newDisplayedMessages);
        setWaitingForResponse(false);
        setTimeout(() => console.log(openAIMessages), 500);
    };

    const streamResponse = async (
        newOpenAIMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[],
        newDisplayedMessages: Message[]
    ) => {
        const newDisplayedMessageResponse: Message = {
            content: "",
            sentTime: Math.floor(Date.now() / 1000),
            sender: CHATGPT_USER,
            direction: "incoming",
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
            {isChatVisible && (
                <div className={styles.container}>
                    <div className={styles.chatWrapper}>
                        <div className={styles.chatContainer}>
                            <MainContainer>
                                <ChatContainer>
                                    <ConversationHeader>
                                        <ConversationHeader.Content
                                            userName="AI Chat Assistant"
                                            info={`model ${CHATGPT_MODEL}`}
                                        />
                                        <ConversationHeader.Actions>
                                            <Button
                                                title="Close Chat"
                                                onClick={() =>
                                                    setIsChatVisible(
                                                        !isChatVisible
                                                    )
                                                }
                                                icon={
                                                    <FontAwesomeIcon
                                                        icon={faAngleDown}
                                                        className="w-4"
                                                    />
                                                }
                                            ></Button>
                                        </ConversationHeader.Actions>
                                    </ConversationHeader>
                                    <MessageList
                                        typingIndicator={
                                            (waitingForResponse ||
                                                isAILearning) && (
                                                <TypingIndicator
                                                    content={`ChatGPT is ${
                                                        isAILearning
                                                            ? `learning`
                                                            : `typing`
                                                    }`}
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
                                        onSend={sendUserMessage}
                                        autoFocus={true}
                                        attachButton={false}
                                        sendButton={false} // if true, it needs width 40px to work
                                        disabled={waitingForResponse}
                                        ref={messageInput}
                                    />
                                </ChatContainer>
                            </MainContainer>
                        </div>
                    </div>
                </div>
            )}
            {!isChatVisible && (
                <Button
                    title="Open Chat"
                    className={styles.chatButton}
                    onClick={() => setIsChatVisible(!isChatVisible)}
                    border
                    icon={<FontAwesomeIcon icon={faComment} className="w-14" />}
                ></Button>
            )}
        </>
    );
}
