// store.js
import { configureStore } from "@reduxjs/toolkit";
import SelectRoutineReducer from "./SelectRoutineSlice";
import LoginReducer from "./LoginSlice";

const store = configureStore({
  reducer: {
    selectRoutine: SelectRoutineReducer,
    login : LoginReducer,
  },
});

export default store;
