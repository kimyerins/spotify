import { configureStore } from "@reduxjs/toolkit";
import userInfoReducer from './reducer/userInfoSlice.jsx'
import homepageReducer from "./reducer/homepageSlice.jsx";

export const store = configureStore({
    reducer:{
        userInfo:userInfoReducer,
        homepage:homepageReducer
    }
})

export default store;