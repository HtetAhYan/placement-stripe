import { createSlice } from '@reduxjs/toolkit';
import { toggleCheckbox } from './checkboxSlice';

const btnSlice = createSlice({
    name: 'btn',
    initialState: {
        isClicked: true,
        isConfirmed: false,
    },
    reducers: {
        toggleBtn: (state) => {
            state.isClicked = state.isClicked=false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(toggleCheckbox, (state) => {
            state.isConfirmed = !state.isConfirmed; // Toggle isConfirmed
        });
    },
});

export const { toggleBtn } = btnSlice.actions;
export default btnSlice.reducer;
