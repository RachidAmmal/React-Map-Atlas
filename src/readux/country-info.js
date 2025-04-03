import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://restcountries.com/v3.1/name/";

export const fetchCountryInfo = createAsyncThunk(
  "country/fetchCountry",
  async (countryName, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}${countryName}`);
      return response.data[0]; 
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
    searching: false
  },
  reducers: {
    showMySearch: (state, action) => {
      state.searching = action.payload.searching;
    }
  },
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

export const { showMySearch } = countryInfoSlice.actions;
export default countryInfoSlice.reducer;
