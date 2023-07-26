import { createSlice } from "@reduxjs/toolkit";

const SelectRoutineSlice = createSlice({
  name: "SelectRoutine",
  initialState: [],
  reducers: {
    addRoutine(state, action) {
      const { routineId, routineContent, routineImg } = action.payload;
      state.push({ routineId, routineContent, routineImg });
    },
    deleteRoutine(state, action) {
      const { routineId } = action.payload;
      return state.filter((item) => item.routineId !== routineId);
    },
  },
});

export const { addRoutine, deleteRoutine } = SelectRoutineSlice.actions;
export default SelectRoutineSlice.reducer;
