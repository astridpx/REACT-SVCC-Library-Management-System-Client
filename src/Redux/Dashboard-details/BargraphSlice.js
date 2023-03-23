import { createSlice } from "@reduxjs/toolkit";

export const BarGraphSlice = createSlice({
  name: "graphSlice",
  initialState: {
    D1: 0,
    D2: 0,
    D3: 0,
    D4: 0,
    D5: 0,
    D6: 0,
    D7: 0,
  },

  reducers: {
    D1reducer: (state, action) => {
      state.D1 = action.payload.D1;
    },
    D2reducer: (state, action) => {
      state.D2 = action.payload.D2;
    },
    D3reducer: (state, action) => {
      state.D3 = action.payload.D3;
    },
    D4reducer: (state, action) => {
      state.D4 = action.payload.D4;
    },
    D5reducer: (state, action) => {
      state.D5 = action.payload.D5;
    },
    D6reducer: (state, action) => {
      state.D6 = action.payload.D6;
    },
    D7reducer: (state, action) => {
      state.D7 = action.payload.D7;
    },
  },
});

export const {
  D1reducer,
  D2reducer,
  D3reducer,
  D4reducer,
  D5reducer,
  D6reducer,
  D7reducer,
} = BarGraphSlice.actions;

export default BarGraphSlice.reducer;
