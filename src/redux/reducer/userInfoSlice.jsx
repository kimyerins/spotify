import {createSlice} from "@reduxjs/toolkit";

let initialState = {
    user: {},
    authenticate:false
};

const userInfoSlice = createSlice({
    name : "userInfo",
    initialState,
    reducers : {
        login(state,action){
            state.user = action.payload;
            state.authenticate = true;
        },
        logout(state){
            state.user= {};
            state.authenticate = false;
        }
    }
})

export const userInfoActions = userInfoSlice.actions;
export default userInfoSlice.reducer;