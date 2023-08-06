import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { Cookies } from "react-cookie";

// 로그인 유저만 접근 가능
// 비로그인 유저 접근 불가
const PrivateRoute = () => {
  const cookies = new Cookies();
  const refreshtoken_ = cookies.get("refresh_token");
  console.log(typeof refreshtoken_ == "undefined");
  console.log("Private undefined나오면 로그인 안 한 것. 그러면 홈으로 이동");
  console.log("private 값이 있으면 해당 컴포넌트로 이동");
  console.log("리프레시토큰:", refreshtoken_);
  return typeof refreshtoken_ == "undefined" ? (
    <Navigate replace to="/" />
  ) : (
    <Outlet />
  );
};

export default PrivateRoute;
