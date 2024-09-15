import { configureStore } from "@reduxjs/toolkit";
import userInfoReducer from "./reducer/userInfoSlice.jsx";
import homepageReducer from "./reducer/homepageSlice.jsx";
import playerStateReducer from "./reducer/playerStateSlice";

export const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
    homepage: homepageReducer,
    playerState: playerStateReducer,
  },
});

export default store;
