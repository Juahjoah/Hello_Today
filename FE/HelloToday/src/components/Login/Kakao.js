//리다이렉트될 화면
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner"; //로딩화면
import axios from "axios";

function Kakao() {
  // 1. user.js에서 받아온 인가코드
  const code = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate(); //페이지 이동시킬 때 사용

  //2. 백에게 인가코드 주고 access Token 요청
  useEffect(() => {
    const REST_URL = `http://localhost:8080`;
    // const REST_URL = `https://i9b308.p.ssafy.io`;
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
        console.log(res.headers);

        //토큰을 받아서 localStorage같은 곳에 저장하는 코드를 여기에 쓴다.
        // localStorage.setItem('name', res.data.user_name); // 일단 이름만 저장했다.
        // localStorage.setItem('token', res.headers.authorization);
        const accessToken = res.headers["authorization"];
        const refreshToken = res.headers["authorization-refresh"];
        console.log("Access Token:", accessToken);
        console.log("Refresh Token:", refreshToken);
        navigate("/");
      })
      .catch((error) => {
        console.log("ERORR입니다!!");
      });
  }, []);
}

export default Kakao;