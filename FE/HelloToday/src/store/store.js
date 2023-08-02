// store.js
import { configureStore } from "@reduxjs/toolkit";
import SelectRoutineReducer from "./SelectRoutineSlice";
import tokenReducer from "./TokenSlice";
import loginReducer from "./LoginSlice";

const store = configureStore({
  reducer: {
    selectRoutine: SelectRoutineReducer,
    authToken: tokenReducer,
    login: loginReducer,
  },
});

export default store;
