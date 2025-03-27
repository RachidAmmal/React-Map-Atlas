import { configureStore } from '@reduxjs/toolkit'
import mapReducer from './map-slice'
import countryReducer from './country-name-slice'

export const store = configureStore({
  reducer: { map: mapReducer, country: countryReducer }
})
