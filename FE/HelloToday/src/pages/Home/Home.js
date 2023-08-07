import classes from "./Home.module.css";
import { useSelector } from "react-redux";
import NoLoginHome from "../../components/Home/NoLoginHome";
import LoginHome from "../../components/Home/LoginHome";
import Footer from "../../components/common/Footer";

function Home() {

  const islogin = useSelector((state) => state.login.isLogin);
  console.log("로그인 상태 >: " + islogin)

  return (
    <div className={classes.HomeMain}>

      {/* 로그인 여부에 따라서 컴포넌트 렌더링 */}
      {islogin ? <LoginHome/> : <NoLoginHome/>}

      <Footer/>
    </div>
  );
}
export default Home;
