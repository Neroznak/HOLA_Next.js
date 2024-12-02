import { IUser } from './user.interface'

export interface IAuthForm {
    phoneNumber: string
    password: string
}

export interface IAuthResponse {
    user: IUser
    accessToken: string
}
