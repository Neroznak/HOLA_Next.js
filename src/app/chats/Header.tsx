"use client"

import {FC} from 'react';
import {useChatContext} from "@/app/chats/ChatContext";

const Header: FC = () => {
    const { selectedChatName, selectedChatId} = useChatContext();
    return (
    (!selectedChatId ? <></> :
     <div className={"bg-white border-l w-full p-4 h-16 shadow-2xl"}>{selectedChatName}</div>))
};

export default Header;
