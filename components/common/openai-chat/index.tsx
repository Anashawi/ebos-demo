import { useContext, useEffect, useRef, useState } from 'react';

import { AIAssistant, ChatIs } from '../../../models/enums';
import { appContextData } from '../../../context';

import OpenAI from 'openai';
import {
    Avatar,
    Button,
    ChatContainer,
    ConversationHeader,
    MainContainer,
    Message,
    MessageInput,
    MessageList,
    TypingIndicator,
} from '@chatscope/chat-ui-kit-react';
import { faComment, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

enum MessageSentBy {
    ChatGpt = 'ChatGPT',
    You = 'You',
}
enum MessageDirection {
    Incoming = 'incoming',
    Outgoing = 'outgoing',
}
type Message = {
    content: string;
    sentTime: number;
    sender: MessageSentBy;
    direction: MessageDirection;
};

enum ChatCompletionRequestMessageRoleEnum {
    System = 'system',
    User = 'user',
    Assistant = 'assistant',
    Function = 'function',
}

enum ChatGPTIs {
    Idle = 'idle',
    Learning = 'learning',
    Typing = 'typing',
}

export default function OpenAIChat({
    initialMessage,
}: {
    initialMessage: string;
}) {
    const CHATGPT_MODEL = 'gpt-3.5-turbo-1106';

    const openai = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPEN_AI_KEY,
        dangerouslyAllowBrowser: true,
    });

    const { appContext, setAppContext } = useContext(appContextData);
    const messageInput = useRef<HTMLDivElement>(null);

    // history of all chat messages between system/user/AI [required for AI]
    const [openAIMessages, setOpenAIMessages] = useState<
        OpenAI.Chat.Completions.ChatCompletionMessageParam[]
    >([]);
    // only the chat messages that are displayed in the chat box
    const [displayedMessages, setDisplayedMessages] = useState<Message[]>([]);
    const [chatGPTState, setChatGPTState] = useState<ChatGPTIs>(ChatGPTIs.Idle);

    useEffect(() => {
        if (chatGPTState === ChatGPTIs.Idle) {
            messageInput.current?.focus();
        }
    }, [chatGPTState]);

    useEffect(() => {
        if (appContext.AIAssistant === AIAssistant.ManualLearning) return;

        if (initialMessage) {
            // console.log(initialMessage);
            sendHiddenSystemMessage(initialMessage);
        }
    }, [initialMessage]);

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
                model: 'gpt-3.5-turbo-1106',
                messages: [...newOpenAIMessages], // openAI requires all old msgs
            });
            return chatRepsonse['choices'][0]['message']['content'] ?? '';
        } catch (error) {
            let errorMessage =
                'Oops, something unexpected went wrong... try again later';
            const newDisplayedMessages = [...displayedMessages];
            if (error instanceof OpenAI.APIError) {
                if (error.status === 429)
                    errorMessage =
                        'Rate limit reached. Limit: 3 / min. Please try again in 20s';

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
                sender: MessageSentBy.ChatGpt,
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
            name: 'TestName',
        };
        newOpenAIMessages.push(newOpenAIMessage);
        setOpenAIMessages([...newOpenAIMessages]);

        const newDisplayedMessage: Message = {
            content: textContent,
            sentTime: Math.floor(Date.now() / 1000),
            sender: MessageSentBy.You,
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
            content: '',
            sentTime: Math.floor(Date.now() / 1000),
            sender: MessageSentBy.ChatGpt,
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
                    ].content += part.choices[0]?.delta.content ?? '';
                    setDisplayedMessages([...newDisplayedMessages]);
                }
            } catch (err) {
                console.error('The stream had an error', err);
            }
        } catch (error) {
            if (error instanceof OpenAI.APIError) {
                if (error.status === 429)
                    newDisplayedMessages[
                        newDisplayedMessages.length - 1
                    ].content =
                        'Rate limit reached. Limit: 3 / min. Please try again in 20s';
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
            name: '',
        };
        newOpenAIMessages.push(newOpenAIMessage);
        setOpenAIMessages([...newOpenAIMessages]);
    };

    return (
        <>
            {appContext.chatIs === ChatIs.Maximized && (
                <MainContainer className="chatgpt-main-container">
                    <ChatContainer>
                        <ConversationHeader className="chatgpt-header">
                            <Avatar
                                src="/chatgpt-icon.svg"
                                name="ChatGPT"
                            />
                            <ConversationHeader.Content
                                className="chatgpt-header"
                                userName="ChatGPT Assistant"
                                info={`model ${CHATGPT_MODEL}`}
                            />
                        </ConversationHeader>
                        <MessageList
                            className="chatgpt-messages-container"
                            typingIndicator={
                                (chatGPTState === ChatGPTIs.Typing ||
                                    chatGPTState === ChatGPTIs.Learning) && (
                                    <TypingIndicator
                                        content={`ChatGPT is ${chatGPTState}`}
                                    />
                                )
                            }
                        >
                            {displayedMessages.map((message, index) => {
                                return (
                                    <Message
                                        key={index}
                                        model={{
                                            message: message.content,
                                            sentTime: `${message.sentTime}`,
                                            sender: message.sender,
                                            direction: message.direction,
                                            position: 'single',
                                            type: 'text',
                                        }}
                                    />
                                );
                            })}
                        </MessageList>
                        <MessageInput
                            className="chatpgt-message-input relative"
                            placeholder="Enter your message"
                            onSend={sendShownUserMessage}
                            autoFocus={true}
                            attachButton={false}
                            sendButton={true}
                            disabled={
                                chatGPTState === ChatGPTIs.Typing ||
                                chatGPTState === ChatGPTIs.Learning
                            }
                            ref={messageInput}
                        />
                    </ChatContainer>
                </MainContainer>
            )}
            <Button
                className="chatgpt-button"
                title={
                    appContext.chatIs === ChatIs.Minimized
                        ? 'Open Chat'
                        : 'Hide Chat'
                }
                onClick={() =>
                    setAppContext({
                        ...appContext,
                        chatIs:
                            appContext.chatIs === ChatIs.Minimized
                                ? ChatIs.Maximized
                                : ChatIs.Minimized,
                    })
                }
                icon={
                    <div className="flex flex-row justify-center">
                        <FontAwesomeIcon
                            className="w-10 h-10"
                            icon={
                                appContext.chatIs === ChatIs.Minimized
                                    ? faComment
                                    : faTimes
                            }
                        />
                    </div>
                }
            ></Button>
        </>
    );
}
