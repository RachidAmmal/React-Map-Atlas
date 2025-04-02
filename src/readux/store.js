import { configureStore } from "@reduxjs/toolkit";
import mapReducer from "./map-slice";
import countryReducer from "./country-name-slice";
import centerReducer from "./centering-theMap-slice";
import randomSlice from "./random-country";
import countryInfoSlice from "./country-info";
import borderSlice from "./bordering-countries";

export const store = configureStore({
  reducer: {
    map: mapReducer,
    country: countryReducer,
    center: centerReducer,
    random: randomSlice,
    countryInfo: countryInfoSlice,
    border: borderSlice
  }
});
