import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import COUNTRY_NAMES_LIST from "../constants/COUNTRY_NAMES_LIST";

export const fetchTheRandom = createAsyncThunk(
  "map/fetchTheCenter",
  async (_, { getState, rejectWithValue }) => {
    try {
      const randomIndex = Math.floor(Math.random() * COUNTRY_NAMES_LIST.length);
      const selectedCountry = COUNTRY_NAMES_LIST[randomIndex];
      const commonName = Array.isArray(selectedCountry.common)
        ? selectedCountry.common[0]
        : selectedCountry.common;

      //const commonName = selectedCountry?.common?.[0] || selectedCountry?.common || "Unknown";

      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search`,
        {
          params: { q: commonName, format: "json", limit: 1 }
        }
      );

      if (response.data.length > 0) {
        const lat = parseFloat(response.data[0].lat);
        const lng = parseFloat(response.data[0].lon);

        return { countryRandom: { lat, lng }, country: commonName };
      } else {
        return rejectWithValue(
          `❌ No coordinates found for country: ${commonName}`
        );
      }
    } catch (error) {
      console.error("⚠️ Error while fetching country data: ", error);
      return rejectWithValue("⚠️ An error occurred while calling API.");
    }
  }
);

const randomSlice = createSlice({
  name: "center",
  initialState: {
    random: { lat: null, lng: null },
    country: "",
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTheRandom.fulfilled, (state, action) => {
        if (action.payload) {
          state.random = action.payload.countryRandom;
          state.country = action.payload.country;
          state.error = null;
        }
      })
      .addCase(fetchTheRandom.rejected, (state, action) => {
        state.error = action.payload || "An unknown error occurred.";
      });
  }
});

export default randomSlice.reducer;
