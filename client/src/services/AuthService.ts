import { AuthResponse } from "../models/response/AuthResponse";
import $api, { API_URL } from '../http/index'
import { AxiosResponse } from "axios";
import { IUser } from "../models/IUser";


export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/login', { email, password }, {})
    }
    static async register(name: string, email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/register', { email, password, name }, {})
    }
    static async logout(): Promise<void> {
        return $api.post('/logout')
    }
    static async refresh(): Promise<AxiosResponse<AuthResponse>> {
        return $api.get<AuthResponse>(`${API_URL}/refresh`)
    }
    static async updatePassword(password: string, newPassword: string, email: string): Promise<AxiosResponse<IUser>> {
        return $api.put<IUser>('/updatePassword', { password, newPassword, email }, {})
    }
    static async updateName(newName: string, email: string): Promise<AxiosResponse<IUser>> {
        return $api.put<IUser>('/updateName', { newName, email }, {})
    }
    static async updateEmail(newEmail: string, email: string): Promise<AxiosResponse<IUser>> {
        return $api.put<IUser>('/updateEmail', {newEmail, email }, {})
    }
}