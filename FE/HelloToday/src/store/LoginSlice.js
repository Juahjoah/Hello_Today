// import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios"

// const LoginSlice = createSlice({
//   name: "login", //reducer의 이름은 login 
//   initialState: {
//     token : "" //백엔드에서 받은 코드 
//   }, //초기값 
//   reducers: {
//     KakaoLogin(state,action) {//카카오 
//         const REST_URL = `http://localhost:8080`
//         const API_URL = `${REST_URL}/members/login/kakao`
//       return function(){
//         axios({
//           method : "GET",
//           url: API_URL,
//           data : code;
//         })
//         .then((res) => {
//           console.log(res); //토큰이 넘겨옴

//           const ACCESS_TOKEN = res.data.accessToken;
//           localStorage.setItem("token", ACCESS_TOKEN); //예시로 로컬에 저장함

//           history.replace("/") //토큰 받았고 로그인됐으니 화면 전환시켜준다.(메인으로)
//         })
//         .catch((err) => {
//           console.log("소셜로그인 에러",err);
//           window.alert("로그인에 실패하였습니다.");
//           history.replace("/login")//로그인 실패하면 로그인화면으로 돌려보냄 
//         })
//       }
//     },
//   },
// });

// export const { KakaoLogin } = SelectRoutineSlice.actions;
// export default LoginSlice.reducer;
