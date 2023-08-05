import { createSlice } from "@reduxjs/toolkit";

const calendarDetailSlice = createSlice({
  name: "calendarDetail",
  initialState: {
    data: [],
  },
  reducers: {
    SET_CALENDAR_DATA(state, action) {
      state.data = action.payload;
    },
  },
});

export const { SET_CALENDAR_DATA } = calendarDetailSlice.actions;
export default calendarDetailSlice.reducer;
