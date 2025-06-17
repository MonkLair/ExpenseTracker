import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { errorType } from "../../../models/IErrorTypes"


export interface RegisterState {
    emailValue: string,
    passwordValue: string,
    nameValue: string,
    confirmPasswordValue: string,
    errorType: errorType
}


const initialState: RegisterState = {
    confirmPasswordValue: '',
    emailValue: '',
    nameValue: '',
    passwordValue: '',
    errorType: {
        email:'',
        password: '',
        name: '',
        confirm: ''
    }
}


export const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        changeEmailValue: (state, action: PayloadAction<string>) => {
            state.emailValue = action.payload
        },
        changePasswordValue: (state, action: PayloadAction<string>) => {
            state.passwordValue = action.payload
        },
        changeNameValue: (state, action: PayloadAction<string>) => {
            state.nameValue = action.payload
        },
        changeConfirmPasswordValue: (state, action: PayloadAction<string>) => {
            state.confirmPasswordValue = action.payload
        },
        setEmailErrorType: (state, action: PayloadAction<'emptyError' | 'unvalidEmailError' | ''>) => {
            state.errorType.email = action.payload
        },
        setPasswordErrorType: (state, action: PayloadAction<'emptyError' | 'shortPasswordError' | ''>) => {
            state.errorType.password = action.payload
        },
        setNameErrorType: (state, action: PayloadAction<'emptyError' | 'shortNameError' | ''>) => {
            state.errorType.name = action.payload
        },        
        setConfirmErrorType: (state, action: PayloadAction<'emptyError' | 'matchError' | ''>) => {
            state.errorType.confirm = action.payload
        },
        clearAll: () => {
            return initialState
        }
    }
})

export const registerReducer = registerSlice.reducer