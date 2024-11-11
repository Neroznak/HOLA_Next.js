import { IUser } from './user.interface'

export interface IAuthForm {
    username:string,
    email: string
    passwordHash: string
}

export interface IAuthResponse {
    user: IUser
    accessToken: string
}
