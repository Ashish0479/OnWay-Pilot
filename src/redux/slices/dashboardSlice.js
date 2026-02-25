import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";

export const fetchDashboard = createAsyncThunk(
  "pilot/fetchDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/rider/dashboard");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

const pilotSlice = createSlice({
  name: "pilot",
  initialState: {
    totalRides: 0,
    totalEarnings: 0,
    todaysEarnings: 0,
    rideHistory: [],
    status: "idle"
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.totalRides = action.payload.totalRides;
        state.totalEarnings = action.payload.totalEarnings;
        state.todaysEarnings = action.payload.todaysEarnings;
        state.rideHistory = action.payload.rideHistory;
      });
  }
});

export default pilotSlice.reducer;