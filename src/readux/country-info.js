// src/redux/countrySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://restcountries.com/v3.1/name/";

// Async thunk to fetch country data
export const fetchCountryInfo = createAsyncThunk(
  "country/fetchCountry",
  async (countryName, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}${countryName}`);
      return response.data[0]; // Extract first result
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch country");
    }
  }
);

const countryInfoSlice = createSlice({
  name: "country",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountryInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountryInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCountryInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default countryInfoSlice.reducer;
