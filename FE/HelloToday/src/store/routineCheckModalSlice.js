import { createSlice } from "@reduxjs/toolkit";

const routineCheckModalSlice = createSlice({
  name: "routineCheck",
  initialState: false,
  reducers: {
    routineCheck(state, action) {
      return action.payload;
    },
  },
});

export const { routineCheck } = routineCheckModalSlice.actions;
export default routineCheckModalSlice.reducer;
