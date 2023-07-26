// store.js
import { configureStore } from "@reduxjs/toolkit";
import SelectRoutineReducer from "./SelectRoutineSlice";

const store = configureStore({
  reducer: {
    selectRoutine: SelectRoutineReducer,
  },
});

export default store;
