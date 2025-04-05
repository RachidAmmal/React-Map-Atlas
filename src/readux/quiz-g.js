import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import COUNTRY_NAMES_LIST from "../constants/COUNTRY_NAMES_LIST";



export const startQuizAsync = createAsyncThunk(
  "quiz/startQuizAsync",
  async ({ mode }, thunkAPI) => {
    let selectedCountries = [];

    const shuffle = (array) => {
      const copy = [...array];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    }

    if (mode === 1) {
      
      selectedCountries = shuffle(COUNTRY_NAMES_LIST).slice(0, 50);
    } else if (mode === 2) {
      selectedCountries = COUNTRY_NAMES_LIST.filter(c => c.isUN);
    } else if (mode === 3) {
      selectedCountries = COUNTRY_NAMES_LIST;
    }

    // 2. جلب بيانات REST لكل دولة
    const promises = selectedCountries.map(async (country) => {
      const name = Array.isArray(country.common)
        ? country.common[0]
        : country.common;

      try {
        const res = await axios.get(
          `https://restcountries.com/v3.1/name/${encodeURIComponent(name)}?fullText=false&fields=name,flags`
        );

        const apiData = res.data[0];
        return {
          ...country,
          flag: apiData.flags?.png || apiData.flags?.svg || "",
          common: Array.isArray(country.common)
            ? country.common.map(n => n.toLowerCase())
            : [country.common.toLowerCase()]
        };
      } catch (err) {
        return {
          ...country,
          flag: "",
          common: Array.isArray(country.common)
            ? country.common.map(n => n.toLowerCase())
            : [country.common.toLowerCase()]
        };
      }
    });

    const enrichedCountries = await Promise.all(promises);

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

    return {
      quizCountries: enrichedCountries,
      duration,
      attempts
    };
  }
);


const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    quizCountries: [],
    score: 0,
    attemptsLeft: null,
    timeLeft: 0,
    isStarted: false,
    answered: [],
    loading: false,
    error: null
  },
  reducers: {
    submitAnswer: (state, action) => {
      const input = action.payload.toLowerCase().trim();

      const match = state.quizCountries.find((country) =>
        country.common.includes(input)
      );

      if (match && !state.answered.includes(match.official)) {
        state.score += 1;
        state.answered.push(match.official);
      }

      if (state.attemptsLeft !== Infinity) {
        state.attemptsLeft -= 1;
      }
    },
    decrementTime: (state) => {
      if (state.timeLeft > 0) state.timeLeft -= 1;
    },
    endQuiz: (state) => {
      state.isStarted = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(startQuizAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startQuizAsync.fulfilled, (state, action) => {
        const { quizCountries, duration, attempts } = action.payload;
        state.quizCountries = quizCountries;
        state.timeLeft = duration;
        state.attemptsLeft = attempts;
        state.score = 0;
        state.answered = [];
        state.isStarted = true;
        state.loading = false;
      })
      .addCase(startQuizAsync.rejected, (state) => {
        state.error = "فشل في تحميل بيانات الدول.";
        state.loading = false;
      });
  }
});

export const { startQuiz, submitAnswer, endQuiz, decrementTime } = quizSlice.actions;
export default quizSlice.reducer;