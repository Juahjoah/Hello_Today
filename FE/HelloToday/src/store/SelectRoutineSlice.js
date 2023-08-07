import { createSlice } from "@reduxjs/toolkit";

const SelectRoutineSlice = createSlice({
  name: "SelectRoutine",
  initialState: [],
  reducers: {
    addRoutine(state, action) {
      const { routineId, routineContent, routineImg } = action.payload;
      state.push({
        routineDetailId: routineId,
        content: routineContent,
        imgPath: routineImg,
      });
    },
    deleteRoutine(state, action) {
      const { routineId } = action.payload;
      return state.filter((item) => item.routineDetailId !== routineId);
    },
    resetRoutine() {
      return [];
    },
  },
});

export const { addRoutine, deleteRoutine, resetRoutine } =
  SelectRoutineSlice.actions;
export default SelectRoutineSlice.reducer;
