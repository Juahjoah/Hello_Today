import React from "react";
// import classes from "../../components/User/button.module.css";
import classes from "./User.module.css";
import { KAKAO_AUTH_URL, NAVER_AUTH_URL } from "../../components/User/config";
import { motion } from "framer-motion";

const User = () => {
  const handleLogin = (social) => {
    window.location.href = social === "kakao" ? KAKAO_AUTH_URL : NAVER_AUTH_URL;
  };
  return (
    <div className={classes.login}>
      <div style={{ position: "relative" }}>
        <img
          style={{
            width: "55%",
            marginLeft: "50%",
            marginTop: "10%",
            userSelect: "none",
          }}
          src="/images/Home/Homemountain.png"
          alt="mountain"
        />
        <img
          style={{
            width: "30%",
            position: "absolute",
            top: "5%",
            marginLeft: "90%",
            userSelect: "none",
          }}
          src="/images/Home/Homemountainman.png"
          alt="mountainman"
        />
      </div>

      <div style={{ position: "absolute" }}>
        <div className={classes.content} style={{ marginLeft: "100px" }}>
          <div className={classes.leftlogo}>
            <motion.img
              style={{ marginTop: "80px" }}
              className={classes.logo}
              src="/images/logo.png"
              alt="logo"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1.3 }}
              transition={{
                duration: 0.3,
                ease: [0, 0.71, 0.2, 1.01],
                scale: {
                  type: "spring",
                  damping: 10,
                  stiffness: 80,
                  restDelta: 0.001,
                },
              }}
            />
          </div>

          <div className={classes.LoginText}>
            <p className={classes.MainText}>간편하게 로그인하고</p>
            <p className={classes.MainText} style={{ color: "#3F3F3F" }}>
              나만의 루틴을 생성하여
            </p>
            <p className={classes.MainText} style={{ color: "#3F3F3F" }}>
              규칙적인 생활습관을 만들어보아요
            </p>
          </div>
          <div className={classes.btn}>
            <div className={classes.kakaoSection}>
              <img
                className={classes.kakao}
                src="../../images/Login/kakao_login_large_narrow.png"
                alt="kakaobtnimg"
                onClick={() => handleLogin("kakao")}
              />

              <span style={{ margin: "20px" }}></span>
              <img
                className={classes.kakao}
                src="../../images/Login/btnG_완성형.png"
                alt="naverbtnimg"
                onClick={() => handleLogin("naver")}
              />
            </div>
          </div>
          <div className={classes.naverSection} style={{ marginTop: "20px" }}>
            회원가입 시 이메일 동의를 반드시 해주세요!
          </div>
        </div>
        <div className={classes.none}></div>
        <div className={classes.rightContent}></div>
      </div>
    </div>
  );
};

export default User;
