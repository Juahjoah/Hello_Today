import classes from "./Home.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NoLoginHome from "../../components/Home/NoLoginHome";
import LoginHome from "../../components/Home/LoginHome";
import allAuth from "../../components/User/allAuth";
import { useLocation } from "react-router-dom";

function Home() {
  // const [FirstLogin, setFirstLogin] = useState(isFirstLogin)/;
  
  const islogin = useSelector((state) => state.login.isLogin);
  console.log("로그인 상태 >: " + islogin)
  

    //------------------------------로그인 시작
    const dispatch = useDispatch();
    const isAccess = useSelector((state) => state.authToken.accessToken);
    useEffect(() => {
      allAuth(isAccess, dispatch);
    }, [dispatch]);
    //-----------------------------------여기까지

  return (
    <div className={classes.HomeMain}>

      {/* 로그인 여부에 따라서 컴포넌트 렌더링 */}
      { islogin? <LoginHome/> : <NoLoginHome/>}

      
    </div>
  );
}
export default Home;
