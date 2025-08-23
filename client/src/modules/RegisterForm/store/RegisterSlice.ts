import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { errorType } from "../../../models/IErrorTypes"


export interface RegisterState {
    errorType: errorType
}


const initialState: RegisterState = {
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