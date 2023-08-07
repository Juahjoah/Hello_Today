import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { Cookies } from "react-cookie";

// 비로그인 유저 접근 가능
// 로그인 유저 접근 불가
const PublicRoute = () => {
  const cookies = new Cookies();
  const refreshtoken_ = cookies.get("refresh_token");
  console.log("리프레시토큰:", refreshtoken_);
  console.log(typeof refreshtoken_ == "undefined"); //undefined면 true
  console.log(
    "pulbic undefined나오면 로그인 안 한 것. 로그인 안 하면 home 페이지 "
  );
  console.log("public 값 있으면 개인페이지로 이동");
  return typeof refreshtoken_ == "undefined" ? (
    <Outlet />
  ) : (
    <Navigate replace to="/unselectmain" />
  );
};

export default PublicRoute;
