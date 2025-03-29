import { createSlice } from "@reduxjs/toolkit";

const mapInitialState = {
  m: false,
  zoom: 4,
  loc: {
    lat: 45,
    lng: 15
  },
  clickedLocationMap: null
};

const mapSlice = createSlice({
  name: "map",
  initialState: mapInitialState,
  reducers: {
    showMyCountry: (state, action) => {
      state.m = action.payload.m;
      state.zoom = action.payload.zoom;
      state.loc = action.payload.loc;
    }
  }
});

export const { showMyCountry } = mapSlice.actions;
export default mapSlice.reducer;
