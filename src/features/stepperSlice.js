// stepperSlice.js
import { createSlice } from "@reduxjs/toolkit";

const stepperSlice = createSlice({
  name: "stepper",
  initialState: {
    activeStep: 0,
    isLastStep: false,
    isFirstStep: true,
  },
  reducers: {
    setActiveStep: (state, action) => {
      state.activeStep = action.payload;
      state.isFirstStep = action.payload === 0;
      state.isLastStep = action.payload === 2; // Update this based on your total number of steps
    },
  },
});

export const { setActiveStep } = stepperSlice.actions;
export default stepperSlice.reducer;
