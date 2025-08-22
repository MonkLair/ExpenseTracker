import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { errorType } from "../../../models/IErrorTypes"

type loginErrorType = Pick<errorType, 'email' | 'password'>

export interface LoginState {
    emailValue: string,
    passwordValue: string,
    errorType: loginErrorType
}

const initialState: LoginState = {
    emailValue: '',
    passwordValue: '',
    errorType: {
        email:'',
        password: '',
    }
}


export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        changeEmailValue: (state, action: PayloadAction<string>) => {
            state.emailValue = action.payload
        },
        changePasswordValue: (state, action: PayloadAction<string>) => {
            state.passwordValue = action.payload
        },
        setEmailErrorType: (state, action: PayloadAction<'emptyError' | 'unvalidEmailError' | ''>) => {
            state.errorType.email = action.payload
        },
        setPasswordErrorType: (state, action: PayloadAction<'emptyError' | 'incorrectError' | 'shortPasswordError' | ''>) => {
            state.errorType.password = action.payload
        },
        clearAll: () => {
            return initialState
        }
    }
})

export const loginReducer = loginSlice.reducer