import { createSlice } from "@reduxjs/toolkit";

const DdaySlice = createSlice({
  name: "dday",
  initialState: {
    isEdit: false,
    ddayData: [],
  },
  reducers: {
    SET_ISEDIT(state, action) {
      state.isEdit = true;
    },
    //axios에서 받아온 데이터(배열)
    SET_DDAY_DATA(state, action) {
      state.ddayData = action.payload;
    },
    ADD_DDAY_DATA(state, action){
      state.ddayData.push(action.payload)
    }
   
  },
});

export const { SET_ISEDIT, SET_DDAY_DATA,ADD_DDAY_DATA} = DdaySlice.actions;
export default DdaySlice.reducer;