// src/redux/features/search/searchSlice.js
import { createSlice } from '@reduxjs/toolkit'

// Define the initial state
const initialState = {
    query: '', // Default search query is an empty string
}

// Create the search slice
const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchQuery: (state, action) => {
            state.query = action.payload // Update the search query
        },
    },
})

// Export the action so it can be dispatched
export const { setSearchQuery } = searchSlice.actions

// Export the reducer to be used in the store
export default searchSlice.reducer
