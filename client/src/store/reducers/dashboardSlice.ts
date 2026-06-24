import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { currentActiveTypes, DashboardState } from "../../models/IDashboardState";


const initialState: DashboardState = {
    currentActive: 'Main'
}

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState, 
    reducers: {
        setCurrentPage: (state, action: PayloadAction<currentActiveTypes>) => {
            state.currentActive = action.payload
        }

    }
})

export const dashboardReducer = dashboardSlice.reducer