import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from '../store/reducers/dashboardSlice'
import { registerReducer } from "../modules/RegisterForm";
import { loginReducer } from "../modules/LoginForm";


export const store = configureStore({
    reducer: {
        loginReducer,
        registerReducer,
        dashboardReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch