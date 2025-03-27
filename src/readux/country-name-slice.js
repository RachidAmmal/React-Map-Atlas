import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { GEOCODE_API_KEY } from "../constants/API_KEYS";

const initialState = { 
  data: null, 
  loading: false, 
  error: null 
}

export const fetchCountry = createAsyncThunk(
  "country/fetchDetails",
  async (_, { getState, rejectWithValue }) => {
    try {
      
      const { lat, lng } = getState().map.loc;

      const response = await axios.get("https://api.geocodify.com/v2/reverse", {
        params: {
          api_key: GEOCODE_API_KEY,
          lat,
          lng,
        },
      });

      const countryData = response.data?.response?.features[0]?.properties;
      
      if (!countryData) throw new Error("No data found");

      return {
        name: countryData.country,
        code: countryData.country_code,
        continent: countryData.continent,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountry.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCountry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default countrySlice.reducer;