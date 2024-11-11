"use client";

import React, {useEffect, useState} from 'react';
import {IChat} from "@/shared/types/chat.interface";
import {useProfile} from "@/hooks/useProfile";
import {chatService} from "@/services/chat.service";
import {useChatContext} from "@/app/chats/ChatContext";

export const Chats = () => {
    const [chats, setChats] = useState<IChat[]>([]);
    const {user} = useProfile()
    if (!user) return null

    // Получаем чаты так, ибо в сервисе ассинхронная функция - её значение нужно доставать так
    useEffect(() => {
        const fetchChats = async () => {
            const fetchedChats = await chatService.getChatsByUser();
            setChats(fetchedChats);
        };
        fetchChats();
    }, []);

    // Функция для вывода названия чата. Она отличается в зависимости от пользователя поэтому выделена в отдельную функцию
    const getChatName = (chat: IChat) => {
        return chat.isGroup
            ? chat.chatName
            : chat.users.find(userChat => userChat.User.id !== user.id)?.User.displayName || 'Неизвестный пользователь';
    };

    // Загружаем константу, которая будет инициализировать контекст
    const {setChat} = useChatContext();


    // Получаем выбранный чат и сохраняем его в контекст
    const handleChatSelect = (chat: IChat) => {
        chat.showChatName = getChatName(chat)
        setChat(chat)
    };


    return (
        <div className="overflow-y-auto flex flex-col">
            {chats.map(chat => (
                <button
                    className="flex flex-row h-20 rounded items-center hover:bg-gray-100"
                    onClick={() => handleChatSelect(chat)}
                    key={chat.id}>
                    <div className="flex rounded-3xl w-12 ml-3 h-12 bg-blue-300"></div>
                    <div className="flex flex-col">
                        <h2 className="flex text-center items-center font-bold ml-2">
                            {getChatName(chat)}
                        </h2>
                        <h6 className="flex ml-2 text-ellipsis">{chat.lastMessage}</h6>
                    </div>
                </button>
            ))
            }
        </div>
    );
};



