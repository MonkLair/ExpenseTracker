import { configureStore } from "@reduxjs/toolkit";
import { registerReducer } from "../modules/RegisterForm";
import { loginReducer } from "../modules/LoginForm";
import { dashboardReducer } from "./reducers/dashboardSlice";
import { authReducer } from "./reducers/authSlice";


export const store = configureStore({
    reducer: {
        loginReducer,
        registerReducer,
        dashboardReducer,
        authReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch