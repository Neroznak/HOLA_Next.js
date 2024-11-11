import React, {createContext, useContext, useState} from 'react';
import {IChat, IChatContext} from "@/shared/types/chat.interface";
import {chatService} from "@/services/chat.service";


const ChatContext = createContext<IChatContext | undefined>(undefined);

export const ChatProvider: React.FC<React.PropsWithChildren<{}>> = ({children}) => {
    const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
    const [selectedChatName, setSelectedChatName] = useState<string | null>(null);
    const [lastMessage, setLastMessage] = useState<string | null>(null);
    const [myChat, setMyChat] = useState<IChat | null>(null);


    const setChat = (chat: IChat) => {
        setSelectedChatId(chat.id);
        setSelectedChatName(chat.showChatName)
        setMyChat(chat);
    };

    const updateMessage = (message: string | null) => {
        setLastMessage(message);
        if (message && myChat) {
            myChat.lastMessage = message;
            chatService.updateLastMessage(myChat.id, message);
        }
    }


    return (
        <ChatContext.Provider value={{selectedChatId, selectedChatName, setChat, updateMessage, myChat}}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChatContext = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error("useChatContext must be used within a ChatProvider");
    }
    return context;
};
