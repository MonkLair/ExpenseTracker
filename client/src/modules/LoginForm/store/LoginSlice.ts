import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { emailErrorType, errorType, passwordErrorType } from "../../../models/IErrorTypes"

type loginErrorType = Pick<errorType, 'email' | 'password'>

export interface LoginState {
    errorType: loginErrorType
}

const initialState: LoginState = {
    errorType: {
        email:'',
        password: '',
    }
}


export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setEmailErrorType: (state, action: PayloadAction<emailErrorType>) => {
            state.errorType.email = action.payload
        },
        setPasswordErrorType: (state, action: PayloadAction<passwordErrorType>) => {
            state.errorType.password = action.payload
        },
        clearAll: () => {
            return initialState
        }
    }
})

export const loginReducer = loginSlice.reducer