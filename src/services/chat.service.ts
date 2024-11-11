import {axiosWithAuth} from '@/api/api.interceptors'

import {API_URL} from '@/config/api.config'
import {
    IChangeMembersChat,
    IChat,
    ICreateGroupChat,
    IUpdateGroupChat,
    IUpdateLastMessageChat
} from "@/shared/types/chat.interface";

class ChatService {

    async getById(chatId:number) {
        const { data: chat } = await axiosWithAuth<IChat>({
            url: API_URL.chats(`/by-id/${chatId}`),
            method: 'GET'
        })
        return chat || []
    }

    async getChatsByUser() {
        const { data: chats } = await axiosWithAuth<IChat[]>({
            url: API_URL.chats(),
            method: 'GET'
        })
        return chats || []
    }

    async delete(chatId:number) {
        const { data: deletedChat } = await axiosWithAuth<IChat[]>({
            url: API_URL.chats(`/${chatId}/delete`),
            method: 'Patch'
        })
        return deletedChat || []
    }

    async createDirectChat(friendId:number) {
        const { data: newDirectChat } = await axiosWithAuth<IChat[]>({
            url: API_URL.chats(`/create-direct/${friendId}`),
            method: 'Post'
        })
        return newDirectChat || []
    }

    async createGroupChat(data:ICreateGroupChat) {
        const { data: newGroupChat } = await axiosWithAuth<ICreateGroupChat>({
            url: API_URL.chats(`/create-group`),
            method: 'Post'
        })
        return newGroupChat || []
    }

    async addUserToChat(chatId: number,  data:IChangeMembersChat) {
        const { data: updatedChat } = await axiosWithAuth<IChangeMembersChat>({
            url: API_URL.chats(`/${chatId}/add`),
            method: 'Patch'
        })
        return updatedChat || []
    }

    async removeUserToChat(chatId: number,  data:IChangeMembersChat) {
        const { data: updatedChat } = await axiosWithAuth<IChangeMembersChat>({
            url: API_URL.chats(`/${chatId}/remove`),
            method: 'Patch'
        })
        return updatedChat || []
    }

    async updateLastMessage(chatId: number, lastMessage:string ) {
        const { data:  updatedChat} = await axiosWithAuth<IUpdateLastMessageChat>({
            url: API_URL.chats(`/${chatId}/lastMessage`),
            method: 'Put',
            data: { lastMessage } // Добавляем lastMessage в тело запроса

        })
        return updatedChat || []
    }



}

export const chatService = new ChatService()
