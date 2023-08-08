//리다이렉트될 화면
//Access token : redux를 이용하여 store에 저장
//브라우저를 새로고침할 때마다 값이 초기화된다는 불편함이 있다.
// => refresh token을 이용하여 재발급 받는다.
//refresh token : 브라우저 저장소(cookie)
// npm install react-cookie
import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
//토큰 관리
import { setRefreshToken } from "./CookieStorage";
import { SET_TOKEN } from "../../store/TokenSlice";
import { Loginstate } from "../../store/LoginSlice";

import Spinner from "./PageSpinner"; //로딩화면

import { useNavigate } from "react-router-dom";

function RedirectPageKakao() {
  // 1. user.js에서 받아온 인가코드
  const code = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate(); //페이지 이동시킬 때 사용

  //2. 백에게 인가코드 주고 access Token 요청
  const dispatch = useDispatch();
  useEffect(() => {
    //useEffect에 빈 배열을 전달하게 되면, 콜백함수가 mount된 시점에만 작동
    // const REST_URL = `https://i9b308.p.ssafy.io`;
    const REST_URL = `http://localhost:8080`;
    console.log(code);

    axios({
      url: `${REST_URL}/api/members/kakao/login`,
      method: "post",
      data: {
        code: code,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        const isFirstLogin = res.data.firstLogin;
        const memberId = res.data.memberId;
        const nickName = res.data.nickname;
        const accessToken = res.headers["authorization"];
        const refreshToken = res.headers["authorization-refresh"];
        sessionStorage.setItem("memberId", res.data.memberId);
        console.log(res.data);
        console.log("Access Token:", accessToken);
        console.log("Refresh Token:", refreshToken);
        dispatch(SET_TOKEN(accessToken));
        setRefreshToken(refreshToken);
        dispatch(Loginstate());
        //회원정보 저장하는 거 구현하기

        // Dahye
        // 메인페이지 화면 구조 변경으로 
        // /unselectmain -> / 으로 바꿨음
        navigate("/", {
          state: {
            isFirstLogin: isFirstLogin,
            memberId: memberId,
            nickName: nickName,
          },
        });
      })
      .catch((error) => {
        console.log(error.data);
        console.log("ERORR입니다!!");
      });
  }, []);

  return (
    <div>
      <Spinner />
    </div>
  );
}

export default RedirectPageKakao;
