import { createSlice } from '@reduxjs/toolkit';

const checkboxSlice = createSlice({
  name: 'checkbox',
  initialState: {
    isChecked: false,
  },
  reducers: {
    toggleCheckbox: (state) => {
      state.isChecked = !state.isChecked;
    },
  },
});

export const { toggleCheckbox } = checkboxSlice.actions;
export default checkboxSlice.reducer;
