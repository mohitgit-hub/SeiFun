import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    address: null,
    balance: null,
    transaction: [],
    isLoading: false,
    error: null,
}

const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        setAddress: (state, action) => {
            state.address = action.payload
        },
        setBalance: (state, action) => {
            state.balance = action.payload
        },
        setTransaction: (state, action) => {
            state.transaction = action.payload
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        },
    },
})

export const { setAddress, setBalance, setTransaction, setLoading, setError } = walletSlice.actions

export default walletSlice.reducer
