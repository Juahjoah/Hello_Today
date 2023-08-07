// store.js
import { configureStore } from "@reduxjs/toolkit";
import SelectRoutineReducer from "./SelectRoutineSlice";
import haveActiveRoutineReducer from "./haveActiveRoutine";
import tokenReducer from "./TokenSlice";
import loginReducer from "./LoginSlice";
import calendarReducer from "./calendarDetailSlice";
import ddayReducer from "./ddaySlice";

const store = configureStore({
  reducer: {
    selectRoutine: SelectRoutineReducer,
    haveActiveRoutine: haveActiveRoutineReducer,
    authToken: tokenReducer,
    login: loginReducer,
    calendarDetail: calendarReducer,
    dday: ddayReducer,
  },
});

export default store;
