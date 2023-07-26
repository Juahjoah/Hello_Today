import classes from "./Home.module.css";
import { Link } from "react-router-dom";
import HomeOne from "../components/Home/HomeOne";
import HomeTwo from "../components/Home/HomeTwo";
import HomeThree from "../components/Home/HomeThree";
// import HomeLast from "../components/Home/HomeLast";

function Home() {
  return (
    <div className={classes.HomeMain}>
      <div
        style={{
          background: "url(/images/Home/Homebackground.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      >
        <div className={classes.HomeText}>
          <p>생활 개선 습관 </p>
          <p>
            <span className={classes.threedays}>작심 삼일</span>로 끝나셨나요?
          </p>
          <img className={classes.logo} src="/images/logo.png" alt="logo" />
        </div>
        <div className={classes.Homecontainer}>
          <div className={classes.HomeImg}>
            <img
              className={classes.calendersml}
              src="/images/Home/Homecalendersml.png"
              alt="calendersml"
            />
            <img
              className={classes.spr}
              src="/images/Home/Homespr.png"
              alt="spr"
            />
            <img
              className={classes.jumpchar}
              src="/images/Home/Homejumpchar.png"
              alt="jumpchar"
            />
            <img
              className={classes.music}
              src="/images/Home/Homemusic.png"
              alt="music"
            />
            <img
              className={classes.calenderlag}
              src="/images/Home/Homecalenderlag.png"
              alt="calenderlag"
            />
            <img
              className={classes.Homecirclebold}
              src="/images/Home/Homecirclebold.png"
              alt="Homecirclebold"
            />
            <img
              className={classes.memopad}
              src="/images/Home/Homememopad.png"
              alt="memopad"
            />

            <div className={classes.HomeOneEllipse}></div>
          </div>
          <div className={classes.HomeBtn}>
            <Link to="/login">
              <button className={classes.HomeBtnlog}>함께하러가기</button>
            </Link>
            <button className={classes.HomeBtnMove}>더 보기</button>
          </div>
        </div>
      </div>

      <HomeOne />
      <HomeTwo />
      <HomeThree />
      {/* <HomeLast /> */}
    </div>
  );
}
export default Home;
