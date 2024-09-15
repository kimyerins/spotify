import {createSlice} from "@reduxjs/toolkit";

let initialState = {
    genre:[],
    artists:{},
    tracks:{}
};

const homepageSlice = createSlice({
    name : "homepage",
    initialState,
    reducers : {
        setGenre(state,action){
            state.genre = action.payload;
        },
        setArtists(state,action){
            state.artists = action.payload;
        },
        setTracks(state,action){
            state.tracks = action.payload;
        }
    }
})

export const homepageActions = homepageSlice.actions;
export default homepageSlice.reducer;