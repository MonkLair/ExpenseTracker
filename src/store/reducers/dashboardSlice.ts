import { createSlice } from "@reduxjs/toolkit";
import { DashboardState } from "../../models/IDashboardState";


const initialState: DashboardState = {
    currentActive: 'Main'
}

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState, 
    reducers: {

    }
})

export default dashboardSlice.reducer