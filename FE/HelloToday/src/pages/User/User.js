import React from "react";
//import { Navigate } from "react-router-dom";
//추가
import classes from "../../components/User/button.module.css";
import classe from "./User.module.css";
import { KAKAO_AUTH_URL, NAVER_AUTH_URL } from "../../components/User/config";

const User = () => {
  // const [go, setGo] = useState(false);

  // if (go) {
  //   return <Navigate to="/unselectmain" />;
  // }

  // return (
  //   <div>
  //     <button
  //       style={{ width: "500px", height: "300px" }}
  //       onClick={() => setGo(!go)}
  //     >
  //       Go!
  //     </button>
  //   </div>
  // );

  const handleLogin = (social) => {
    window.location.href = social === "kakao" ? KAKAO_AUTH_URL : NAVER_AUTH_URL;
  };
  return (
    <div
      className={classe.login}
      style={{
        background: "url(images/Login/Routine_bannerimg.png)",
        backgroundRepeat: "no-repeat",
        // backgroundSize: "100% 100%",
        backgroundPosition: "right center",
      }}
    >
      <div className={classe.content}>
        <img className={classe.logo} src="/images/logo.png" alt="logo" />
        <div /*이미지 넣기*/></div>
        <div className={classe.LoginText}>
          <p>간편하게 로그인하고</p>
          <p>나만의 루틴을 생성하여</p>
          <p>규칙적인 생활습관을 만들어보아요</p>
        </div>
        <div className={classe.btn}>
          <button className={classes.buttonstyle}>
            <img
              className={classe.kakao}
              src="../../images/Login/kakao_login_large_narrow.png"
              alt="kakaobtnimg"
              onClick={() => handleLogin("kakao")}
            />
          </button>
          <button className={classes.buttonstyle}>
            <img
              className={classe.naver}
              src="../../images/Login/btnG_완성형.png"
              alt="naverbtnimg"
              onClick={() => handleLogin("naver")}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default User;
