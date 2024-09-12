import { configureStore } from "@reduxjs/toolkit";
import userIdReducer from './reducer/userIdSlice.jsx'

export const store = configureStore({
    reducer:{
        userId:userIdReducer
    }
})

export default store;