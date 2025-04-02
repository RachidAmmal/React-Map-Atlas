import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBorderCountries = createAsyncThunk(
  "countries/fetchCountries",
  async alphaCodes => {
    const response = await axios.get(
      `https://restcountries.com/v3.1/alpha?codes=${alphaCodes.join(",")}`
    );
    return response.data.map(country => ({
      name: country.name.common,
      flag: country.flags.png
    }));
  }
);

const borderSlice = createSlice({
  name: "countries",
  initialState: {
    countries: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchBorderCountries.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBorderCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload;
      })
      .addCase(fetchBorderCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default borderSlice.reducer;
