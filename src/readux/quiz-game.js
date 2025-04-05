import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const startQuizAsync = createAsyncThunk(
  "quiz/fetchCountriesByName",
  async ({ countryNames, mode }, thunkAPI) => {
    try {
      // إعداد المدة والمحاولات حسب الوضع
      let duration = 0;
      let attempts = 0;

      if (mode === 1) {
        duration = 5 * 60;
        attempts = Infinity;
      } else if (mode === 2) {
        duration = 10 * 60;
        attempts = 10;
      } else if (mode === 3) {
        duration = 15 * 60;
        attempts = 10;
      }

      // جلب بيانات الدول حسب الاسم
      const countriesData = await Promise.all(
        countryNames.map(async name => {
          const response = await axios.get(
            `https://restcountries.com/v3.1/name/${encodeURIComponent(
              name
            )}?fullText=true`
          );

          const country = response.data[0];
          return {
            name: country.name.common,
            flag: country.flags.png
          };
        })
      );

      // إرجاع كل القيم المطلوبة
      return {
        countries: countriesData,
        duration,
        attempts
      };
    } catch (error) {
      console.error("Error loading country data:", error);
      return thunkAPI.rejectWithValue("Failed to load country data");
    }
  }
);

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    countries: [],
    duration: 0,
    attempts: 0,
    loading: false,
    error: null,
    status: "idle"
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(startQuizAsync.pending, state => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(startQuizAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.countries = action.payload.countries;
        state.duration = action.payload.duration;
        state.attempts = action.payload.attempts;
      })
      .addCase(startQuizAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.status = "failed";
      });
  }
});

export default quizSlice.reducer;
