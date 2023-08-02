import { createSlice } from "@reduxjs/toolkit";

const haveActiveRoutineSlice = createSlice({
  name: "haveActiveRoutine",
  initialState: false,
  reducers: {
    haveRoutine(state, action) {
      return action.payload;
    },
  },
});

export const { haveRoutine } = haveActiveRoutineSlice.actions;
export default haveActiveRoutineSlice.reducer;
