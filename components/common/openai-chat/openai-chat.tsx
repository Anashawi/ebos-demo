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

export default function Chat({ initialMessage }: { initialMessage: string }) {
    const openai = new OpenAI({
        apiKey: "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",
        dangerouslyAllowBrowser: true,
    });
    const messageInput = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isVisible, setIsVisible] = useState(false);

    const [waitingForResponse, setWaitingForResponse] = useState(false);

    useEffect(() => {
        if (!waitingForResponse) {
            messageInput.current?.focus();
        }
    }, [waitingForResponse]);

    useEffect(() => {
        if (initialMessage) {
            sendMessage("", initialMessage, "", null);
        }
    }, [initialMessage]);

    const sendMessage = async (
        innerHtml: string,
        textContent: string,
        innerText: string,
        nodes: NodeList | null
    ) => {
        console.log("sendingMessage");
        const newMessageList = [...messages];
        const newMessage: Message = {
            content: textContent,
            sentTime: Math.floor(Date.now() / 1000),
            sender: "You",
            direction: "outgoing",
        };
        newMessageList.push(newMessage);
        setMessages([...newMessageList]);

        setWaitingForResponse(true);
        const newMessageResponse: Message = {
            content: "",
            sentTime: Math.floor(Date.now() / 1000),
            sender: CHATGPT_USER,
            direction: "incoming",
        };
        newMessageList.push(newMessageResponse);
        setMessages([...newMessageList]);
        await streamResponse(newMessageList);
        setWaitingForResponse(false);
    };

    const streamResponse = async (newMessageList: Message[]) => {
        const messagesHistory = newMessageList.map(message => {
            return {
                role:
                    message.sender === CHATGPT_USER
                        ? ChatCompletionRequestMessageRoleEnum.Assistant
                        : ChatCompletionRequestMessageRoleEnum.User,
                content: message.content,
            };
        });

        try {
            const stream = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [...messagesHistory],
                stream: true,
            });
            try {
                for await (const part of stream) {
                    newMessageList[newMessageList.length - 1].content +=
                        part.choices[0]?.delta.content || "";
                }
            } catch (err) {
                console.error("The stream had an error", err);
            }
        } catch (error) {
            if (error instanceof OpenAI.APIError) {
                if (error.status === 429)
                    newMessageList[newMessageList.length - 1].content =
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

        setMessages([...newMessageList]);
    };

    return (
        <div className={styles.container}>
            <div className={styles.chatWrapper}>
                <div className={styles.chatContainer}>
                    {isVisible && (
                        <MainContainer>
                            <ChatContainer>
                                <ConversationHeader>
                                    <ConversationHeader.Content
                                        userName="OpenAI"
                                        info="model gpt-3.5-turbo"
                                    />
                                    <ConversationHeader.Actions>
                                        <Button
                                            title="Close Chat"
                                            onClick={() =>
                                                setIsVisible(!isVisible)
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
                                        waitingForResponse && (
                                            <TypingIndicator content="ChatGPT is typing" />
                                        )
                                    }
                                >
                                    {messages.map((message, index) => {
                                        return (
                                            <Message
                                                key={index}
                                                model={{
                                                    message: message.content,
                                                    sentTime: `${message.sentTime}`,
                                                    sender: message.sender,
                                                    direction:
                                                        message.direction,
                                                    position: "single",
                                                    type: "text",
                                                }}
                                            />
                                        );
                                    })}
                                </MessageList>
                                <MessageInput
                                    placeholder="Type message here"
                                    onSend={sendMessage}
                                    autoFocus={true}
                                    attachButton={false}
                                    sendButton={false} // if true, it needs width 40px to work
                                    disabled={waitingForResponse}
                                    ref={messageInput}
                                />
                            </ChatContainer>
                        </MainContainer>
                    )}
                    {!isVisible && (
                        <Button
                            title="Open Chat"
                            className={styles.chatButton}
                            onClick={() => setIsVisible(!isVisible)}
                            border
                            icon={
                                <FontAwesomeIcon
                                    icon={faComment}
                                    className="w-14"
                                />
                            }
                        ></Button>
                    )}
                </div>
            </div>
        </div>
    );
}
