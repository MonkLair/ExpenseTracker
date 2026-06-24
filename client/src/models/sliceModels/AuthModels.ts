import { IUser } from "../IUser"

export interface AuthState {
    user: IUser,
    isAuth: boolean,
    loginApiError: string,
    registerApiError: string
}

export interface loginProps {
    email: string,
    password: string
}

export interface registerProps {
    name: string
    email: string,
    password: string
}

export interface Reply {
    message: string,
    errors: []
}

export interface updatePasswordProps {
    password: string,
    newPassword: string,
    email: string
}

export interface updateNameProps {
    newName: string,
    email: string
}

export interface updateEmailProps {
    newEmail: string,
    email: string
}