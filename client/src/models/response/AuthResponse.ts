import { IUser } from "../IUser";
import { IUserData } from "./IUserData";


export interface AuthResponse {
    refreshToken: string,
    accessToken: string,
    user: IUser,
    userData: IUserData
}