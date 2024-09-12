import { configureStore } from "@reduxjs/toolkit";
import userInfoReducer from './reducer/userInfoSlice.jsx'

export const store = configureStore({
    reducer:{
        userInfo:userInfoReducer
    }
})

export default store;