import { configureStore } from "@reduxjs/toolkit";
import mapReducer from "./map-slice";
import countryReducer from "./country-name-slice";
import centerReducer from "./centering-theMap-slice";

export const store = configureStore({
  reducer: {
    map: mapReducer,
    country: countryReducer,
    center: centerReducer
  }
});
