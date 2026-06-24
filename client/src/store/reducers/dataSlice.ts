import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { expenseOperation, incomeOperation, IUserData } from "../../models/response/IUserData";
import DataService from "../../services/DataService";


const initialState: IUserData = {
    user: '',
    data: [{
        incomes: {
            lastMonthSummary: 0,
            thisMonthSummary: 0,
            operations: []
        },
        expenses: {
            lastMonthSummary: 0,
            thisMonthSummary: 0,
            operations: []
        }
    }],
    currency: ''
}

interface UpdateProps {
    userId: string,
    operation: incomeOperation | expenseOperation,
    type: 'expense' | 'income'
}

interface ChangeCurrencyProps {
    newCurrency: string,
    userId: string
}

export const update = createAsyncThunk(
    'data/update',
    async ({ userId, operation, type }: UpdateProps, { rejectWithValue }) => {
        try {
            const response = await DataService.update(userId, operation, type)
            return response.data
        } catch (e) {
            rejectWithValue(e)
        }
    }
)

export const changeCurrency = createAsyncThunk(
    'data/changeCurrency',
    async ({newCurrency, userId}: ChangeCurrencyProps) => {
        try {
            const response = await DataService.changeCurrency(newCurrency, userId)
            return response.data
        } catch (e) {
            console.log(e)
            throw e
        }
    }
)

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        clear: () => {
            return initialState
        },
        setData: (state, action: PayloadAction<IUserData>) => {
            state.user = action.payload.user
            state.data = action.payload.data
            state.currency = action.payload.currency
        }
    },
    extraReducers: (builder) => {
        builder.addCase(update.fulfilled, (state, action) => {
            if (!action.payload) {
                throw new Error('no payload')
            }
            state.user = action.payload.user
            state.data = action.payload.data
        })
        builder.addCase(update.rejected, () => {
            throw new Error('update rejected')
        })
        builder.addCase(changeCurrency.fulfilled, (state, action: PayloadAction<IUserData>) => {
            state.currency = action.payload.currency
        })
    }
})

export const dataReducer = dataSlice.reducer