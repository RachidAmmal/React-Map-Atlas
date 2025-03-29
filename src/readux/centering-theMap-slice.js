import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTheCenter = createAsyncThunk(
  "map/fetchTheCenter",
  async (name, { getState, rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search`,
        {
          params: { q: name, format: "json", limit: 1 }
        }
      );

      console.log("🔍 data API:", response.data);

      if (response.data.length > 0) {
        return {
          countryCenter: {
            lat: parseFloat(response.data[0].lat),
            lng: parseFloat(response.data[0].lon)
          }
        };
      } else {
        return rejectWithValue(`❌ No coordinates found for country: ${name}`);
      }
    } catch (error) {
      console.error("⚠️ Error while fetching country data: ", error);
      return rejectWithValue("⚠️ An error occurred while calling API.");
    }
  }
);

const centerSlice = createSlice({
  name: "center",
  initialState: {
    center: { lat: 0, lng: 0 }
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTheCenter.fulfilled, (state, action) => {
        if (action.payload) {
          state.center = action.payload.countryCenter;
        }
      })
      .addCase(fetchTheCenter.rejected, (state, action) => {
        state.error = action.payload || "An unknown error occurred.";
      });
  }
});

export default centerSlice.reducer;
