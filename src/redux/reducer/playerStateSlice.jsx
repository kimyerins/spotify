import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/useApi.jsx";

export const fetchPlayerState = createAsyncThunk(
  "playerState/fetchPlayerState",
  async (token, { rejectWithValue }) => {
    try {
      const response = await api.get("/me/player", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const playerStateSlice = createSlice({
  name: "playerState",
  initialState: {
    data: null,
    status: "idle",
    error: null,
    lastFetchTime: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlayerState.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPlayerState.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.lastFetchTime = Date.now();
      })
      .addCase(fetchPlayerState.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default playerStateSlice.reducer;
