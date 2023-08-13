import { createSlice } from "@reduxjs/toolkit";

const DdaySlice = createSlice({
  name: "dday",
  initialState: {
    isEdit: false,
    isEditF: false,
    isRegist: false,
    isDelete: false,
    ddayData: [],
    ddayID: "",
  },
  reducers: {
    SET_ISEDIT(state, action) {
      state.isEdit = action.payload;
    },
    SET_ISEDITF(state, action) {
      //디데이 수정 제출했는지 확인 여부
      state.isEditF = action.payload;
    },
    SET_ISDELETE(state, action) {
      //디데이 삭제되었는지 확인 여부
      state.isDelete = action.payload;
    },
    SET_DDAYID(state, action) {
      state.ddayID = action.payload;
    },
    //axios에서 받아온 데이터(배열)
    SET_DDAY_DATA(state, action) {
      state.ddayData = action.payload;
    },
    ADD_DDAY_DATA(state, action) {
      state.ddayData.push(action.payload);
    },
    SET_ISREGIST(state, action) {
      state.isRegist = action.payload;
    },
  },
});

export const {
  SET_ISEDIT,
  SET_DDAY_DATA,
  ADD_DDAY_DATA,
  SET_DDAYID,
  SET_ISREGIST,
  SET_ISEDITF,
  SET_ISDELETE,
} = DdaySlice.actions;
export default DdaySlice.reducer;
