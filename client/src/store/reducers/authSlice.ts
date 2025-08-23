import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser";
import AuthService from "../../services/AuthService";
import { AuthState, loginProps, registerProps, Reply } from "../../models/sliceModels/AuthModels";
import { AuthResponse } from "../../models/response/AuthResponse";
import $api, { API_URL } from "../../http";
import { AxiosError } from "axios";

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

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }: loginProps, { rejectWithValue, dispatch }) => {
        try {
            const response = await AuthService.login(email, password)
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
    async (arg, { rejectWithValue }) => {
        try {
            const response = await $api.get<AuthResponse>(`${API_URL}/refresh`)
            localStorage.setItem('token', response.data.accessToken)
            return response.data
        } catch (e) {
            if (e instanceof AxiosError && e.response) {
                return rejectWithValue(e.response.data)
            }
            throw e
        }

    },
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
    }
})

export const authReducer = authSlice.reducer