import {createSlice} from "@reduxjs/toolkit";

let initialState = {
    id:'',
    authenticate:false
};

const userIdSlice = createSlice({
    name : "userId",
    initialState,
    reducers : {
        login(state,action){
            state.id = action.payload;
            state.authenticate = true;
        },
        logout(state){
            state.id='';
            state.authenticate = false;
        }
    }
})

export const userIdActions = userIdSlice.actions;
export default userIdSlice.reducer;