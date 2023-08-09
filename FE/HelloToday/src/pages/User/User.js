import React from "react";
//import { Navigate } from "react-router-dom";
//추가
// import classes from "../../components/User/button.module.css";
import classes from "./User.module.css";
import { KAKAO_AUTH_URL, NAVER_AUTH_URL } from "../../components/User/config";

const User = () => {
  const handleLogin = (social) => {
    window.location.href = social === "kakao" ? KAKAO_AUTH_URL : NAVER_AUTH_URL;
  };
  return (
    <div className={classes.login}>
      <div className={classes.none}></div>

      <div className={classes.content}>
        <div className={classes.leftlogo}>
          <img className={classes.logo} src="/images/logo.png" alt="logo" />
        </div>

        <div className={classes.LoginText}>
          <p className={classes.MainText}>간편하게 로그인하고</p>
          <p className={classes.MainText}>나만의 루틴을 생성하여</p>
          <p className={classes.MainText}>규칙적인 생활습관을 만들어보아요</p>
        </div>
        <div className={classes.btn}>
          <div className={classes.kakaoSection}>
            <img
              className={classes.kakao}
              src="../../images/Login/kakao_login_large_narrow.png"
              alt="kakaobtnimg"
              onClick={() => handleLogin("kakao")}
            />
          </div>

          <div className={classes.naverSection}>
            <img
              className={classes.naver}
              src="../../images/Login/btnG_완성형.png"
              alt="naverbtnimg"
              onClick={() => handleLogin("naver")}
            />
          </div>
        </div>
      </div>
      <div className={classes.none}></div>
      <div className={classes.rightContent}>
        <img
          className={classes.rightImg}
          src="../../images/Login/Routine_bannerimg.png"
        />
      </div>
    </div>
  );
};

export default User;
