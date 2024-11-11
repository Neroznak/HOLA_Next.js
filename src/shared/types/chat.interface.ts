import {IUser} from "@/shared/types/user.interface";

export interface IChat {
    id: number;
    chatName: string;
    showChatName: string;
    isGroup: boolean;
    isDeleted: boolean;
    lastMessage: string;
    users: IUserChat[]
}

export interface IChatContext {
    selectedChatId: number | null;
    selectedChatName: string | null;
    setChat: (chat: IChat) => void;
    myChat:IChat |null;
    updateMessage: (message:string|null) => void;

}

export interface IUserChat {
    id: number;
    User: IUser
}


export interface ChildComponentProps {
    onChatSelect: (chat: IChat) => void;
}


export interface ICreateGroupChat extends  Pick<IChat, 'id' | 'chatName'| 'users'> {}

export interface IUpdateGroupChat extends  Pick<IChat, 'chatName'> {}

export interface IChangeMembersChat extends  Pick<IChat, 'users'> {}

export interface IUpdateLastMessageChat extends  Pick<IChat, 'lastMessage'> {}
