// formDataSlice.js
import { createSlice } from "@reduxjs/toolkit";

const formDataSlice = createSlice({
  name: "formData",
  initialState: {},
  reducers: {
    setFormData: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearFormData: () => ({}), // Clear form data
  },
});

export const { setFormData, clearFormData } = formDataSlice.actions;
export default formDataSlice.reducer;
