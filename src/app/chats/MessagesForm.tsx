import React, {useState, useEffect} from 'react';
import {io, Socket} from 'socket.io-client';
import {useProfile} from "@/hooks/useProfile";
import {useChatContext} from "@/app/chats/ChatContext";

const MessageForm: React.FC = () => {
    const [content, setContent] = useState('');
    const [socket, setSocket] = useState<Socket | null>(null);
    const {user} = useProfile()
    if (!user) return null
    const {selectedChatId} = useChatContext();
    const {updateMessage} = useChatContext()

    //Отправка сообщений
    const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (socket && selectedChatId && content.trim()) {
            const messageData = {
                content,
                userId: user.id,
                chatId: selectedChatId
            };
            socket.emit('newMessage', messageData);
            updateMessage (content);
            setContent('');
        }
    };

    // Подключение к Socket.IO серверу
    useEffect(() => {
        const socket = io('http://192.168.18.3:5006/messages');
        setSocket(socket);
        socket.on('connect', () => {
            console.log('Socket.IO connection established');
        });
        socket.on('disconnect', (reason) => {
            console.log('Socket.IO disconnected:', reason);
        });
        socket.on('error', (error) => {
            console.error('Socket.IO error:', error);
        });
        // Обработка событий, например, получение сообщений
        socket.on('newMessage', (msg) => {
            console.log('Message from server:', msg);
        });
        // Закрыть соединение при размонтировании компонента
        return () => {
            socket.disconnect();
        };
    }, []);


    return (
        !selectedChatId ? <></> : (
            <form onSubmit={handleSendMessage} className="w-3/4 p-4 bg-white flex mt-2 items-center rounded-2xl mb-4">
                <button className="text-gray-500 hover:text-gray-700 focus:outline-none mr-2">
                    😊
                </button>
                <input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Message..."
                    className="w-full h-8 rounded-lg focus:outline-none text-sm"
                />
                <button className="text-gray-500 hover:text-gray-700 focus:outline-none ml-2">
                    📎
                </button>
                <button type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg ml-2 focus:outline-none">
                    ➤
                </button>
            </form>
        ));
};

export default MessageForm;
