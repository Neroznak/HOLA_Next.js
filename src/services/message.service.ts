import {axiosWithAuth} from '@/api/api.interceptors'

import {API_URL} from '@/config/api.config'
import {IMessage} from "@/shared/types/message.interface";

// Нужно прописать функцию для каждой функции в контроллере backend'а
class MessageService {

    async getMessagesByChat(chatId:number) {
        const { data: messages } = await axiosWithAuth<IMessage[]>({
            url: API_URL.messages(`/${chatId}`),
            method: 'GET'
        })
        return messages || []
    }
}

export const messageService = new MessageService()
