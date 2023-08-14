import { createSlice } from "@reduxjs/toolkit";

const allRoutineCheckFlagSlice = createSlice({
    name: "allRoutineCheck",
    initialState: false,
    reducers: {
        allRoutineCheck(state, action) {
            return action.payload;
        },
    },
});

export const {allRoutineCheck} = allRoutineCheckFlagSlice.actions;
export default allRoutineCheckFlagSlice.reducer;