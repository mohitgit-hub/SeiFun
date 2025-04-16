// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit'
import searchReducer from './features/search/searchSlice'

// Create the Redux store and combine reducers (you can add other reducers here as the app grows)
const store = configureStore({
    reducer: {
        search: searchReducer, // Use the search slice in the Redux store
    },
})

export default store
