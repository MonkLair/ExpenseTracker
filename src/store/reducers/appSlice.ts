import { createSlice } from "@reduxjs/toolkit"
import { AppState } from "../../models/IApp"



const initialState: AppState = {
    currentCurrency: 'Main'
}

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState, 
    reducers: {

    }
})

export default dashboardSlice.reducer