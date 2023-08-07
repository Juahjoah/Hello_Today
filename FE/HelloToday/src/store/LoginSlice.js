import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
};

const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    Loginstate: (state, action) => {
      state.isLogin = true;
    },
    Logoutstate: (state, action) => {
      state.isLogin = false;
    },
  },
});

export const { Loginstate, Logoutstate } = LoginSlice.actions;

export default LoginSlice.reducer;
