export interface IUserService {
    username?: string
    user_id?: string
    password?: string
}

export interface IMessage {
    error?: string
    message?: string
}

export interface IUserProps {
    status: number
    error?: string
    message?: string | IMessage
}

export interface IUpdate {
    username: string
    user_id: string
    password: string
}