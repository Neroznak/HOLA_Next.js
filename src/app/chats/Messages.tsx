"use client"

import React, {FC, useEffect, useState} from 'react';
import {useRef} from 'react';
import {io} from "socket.io-client";
import {IMessage} from "@/shared/types/message.interface";
import {useProfile} from "@/hooks/useProfile";
import {useChatContext} from "@/app/chats/ChatContext";
import {messageService} from "@/services/message.service";

const socket = io('http://192.168.18.3:5006/messages'); // Замените URL на ваш сервер

const Messages: FC = () => {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const {user} = useProfile()
    if (!user) return null
    const {selectedChatId} = useChatContext();

    //Сокет для мгновенного отображения сообщений в чате
    useEffect(() => {
        // Обработка получения нового сообщения
        socket.on('sendMessage', (newMessage: IMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        // Очистка обработчика при размонтировании
        return () => {
            socket.off('sendMessage');
        };
    }, []);

    //Получаю все сообщения для выбранного чата
    useEffect(() => {
        const fetchMessages = async () => {
            if (!selectedChatId) return;
            try {
                const fetchedMessages = await messageService.getMessagesByChat(selectedChatId);
                setMessages(fetchedMessages);
            } catch (error) {
                console.error("Ошибка загрузки сообщений:", error);
            }
        };
        fetchMessages();
    }, [selectedChatId]); // теперь useEffect реагирует на изменение selectedChatId

    // Отматывает вниз
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({behavior: 'auto'});
        }
    }, [messages]);

    return (
        <div className={"flex flex-col h-full w-full mb-auto items-center overflow-auto"}>
            {messages.length === 0? ( // Добавленная проверка
                <div className="h-screen w-full flex justify-center items-center">
                    <span className="text-center">Пора начать диалог!</span>
                </div>
            ) : (
                <div className={"flex flex-col w-3/4"}>
                    {messages.map(message => (
                        <div key={message.messageId}
                             className={` message ${message.userId === user.id ? 'sent' : 'received'}`}>
                            {message.content}
                        </div>
                    ))}
                </div>

            )}
            <div ref={messagesEndRef}/>
        </div>
    );
};

export default Messages;
