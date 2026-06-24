import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser";
import AuthService from "../../services/AuthService";
import { AuthState, loginProps, registerProps, Reply, updateEmailProps, updateNameProps, updatePasswordProps } from "../../models/sliceModels/AuthModels";
import { AuthResponse } from "../../models/response/AuthResponse";
import { AxiosError } from "axios";
import { dataSlice } from "./dataSlice";

const initialState: AuthState = {
    user: {} as IUser,
    isAuth: false,
    loginApiError: '',
    registerApiError: ''
}

function loginAndRegisterHandler(state: AuthState, action: PayloadAction<AuthResponse>) {
    state.isAuth = true
    state.user = action.payload?.user
}

function loginRejectHandler(state: AuthState, action: PayloadAction<unknown>) {
    const data = action.payload as Reply
    state.loginApiError = data.message
}

function registerRejectHandler(state: AuthState, action: PayloadAction<unknown>) {
    const data = action.payload as Reply
    state.registerApiError = data.message
}

function updateDataHandler(state: AuthState, action: PayloadAction<IUser>) {
    state.user = action.payload
}


export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }: loginProps, { rejectWithValue, dispatch }) => {
        try {
            const response = await AuthService.login(email, password)
            localStorage.setItem('token', response.data.accessToken)
            dispatch(authSlice.actions.clear())
            dispatch(dataSlice.actions.setData(
                {
                    user: response.data.userData.user,
                    data: response.data.userData.data,
                    currency: response.data.userData.currency
                }))
            return response.data
        } catch (e) {
            if (e instanceof AxiosError && e.response) {
                return rejectWithValue(e.response.data)
            }
            throw e
        }
    },
)

export const register = createAsyncThunk(
    'auth/register',
    async ({ name, email, password }: registerProps, { rejectWithValue, dispatch }) => {
        try {
            const response = await AuthService.register(name, email, password)
            localStorage.setItem('token', response.data.accessToken)
            dispatch(authSlice.actions.clear())
            return response.data
        } catch (e) {
            if (e instanceof AxiosError && e.response) {
                return rejectWithValue(e.response.data)
            }
            throw e
        }
    },
)

export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        try {
            await AuthService.logout()
            localStorage.removeItem('token')
        } catch (e) {
            console.log(e)
        }

    },
)

export const checkAuth = createAsyncThunk(
    'auth/checkAuth',
    async (_arg, { rejectWithValue, dispatch }) => {
        try {
            const response = await AuthService.refresh()
            localStorage.setItem('token', response.data.accessToken)
            dispatch(dataSlice.actions.setData(
                {
                    user: response.data.userData.user,
                    data: response.data.userData.data,
                    currency: response.data.userData.currency
                }))
            return response.data
        } catch (e) {
            if (e instanceof AxiosError && e.response) {
                return rejectWithValue(e.response.data)
            }
            throw e
        }

    },
)

export const updatePassword = createAsyncThunk(
    'auth/updatePassword',
    async ({ password, newPassword, email }: updatePasswordProps, { rejectWithValue }) => {
        try {
            const response = await AuthService.updatePassword(password, newPassword, email)
            return response.data
        } catch (e) {
            if (e instanceof AxiosError && e.response) {
                return rejectWithValue(e.response.data)
            }
            throw e
        }
    }
)

export const updateName = createAsyncThunk(
    'auth/updateName',
    async ({ newName, email }: updateNameProps, { rejectWithValue }) => {
        try {
            const response = await AuthService.updateName(newName, email)
            return response.data
        } catch (e) {
            if (e instanceof AxiosError && e.response) {
                return rejectWithValue(e.response.data)
            }
            throw e
        }
    }
)

export const updateEmail = createAsyncThunk(
    'auth/updateEmail',
    async ({ newEmail, email }: updateEmailProps, { rejectWithValue }) => {
        try {
            const response = await AuthService.updateEmail(newEmail, email)
            return response.data
        } catch (e) {
            if (e instanceof AxiosError && e.response) {
                return rejectWithValue(e.response.data)
            }
            throw e
        }
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clear(state) {
            return {
                ...state,
                loginApiError: '',
                registerApiError: ''
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, loginAndRegisterHandler)
        builder.addCase(login.rejected, loginRejectHandler)
        builder.addCase(register.fulfilled, loginAndRegisterHandler)
        builder.addCase(register.rejected, registerRejectHandler)
        builder.addCase(logout.fulfilled, (store) => {
            store.isAuth = false
            store.user = {} as IUser
        })
        builder.addCase(checkAuth.fulfilled, loginAndRegisterHandler)
        builder.addCase(updatePassword.fulfilled, updateDataHandler)
        builder.addCase(updateName.fulfilled, updateDataHandler)
        builder.addCase(updateEmail.fulfilled, updateDataHandler)
    }
})

export const authReducer = authSlice.reducer