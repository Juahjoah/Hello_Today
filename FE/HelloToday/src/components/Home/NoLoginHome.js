// import classes from "./Home.module.css";
import classes from "../../pages/Home/Home.module.css";
import { useNavigate } from "react-router-dom";
import HomeOne from "../../components/Home/HomeOne";
import HomeTwo from "../../components/Home/HomeTwo";
import HomeThree from "../../components/Home/HomeThree";
import HomeLast from "../../components/Home/HomeLast";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

function NoLoginHome() {
  const [AllRoutineList, setAllRoutineList] = useState([]);

  const navigate = useNavigate();
  const scroll1Ref = useRef();
  const scroll2Ref = useRef();
  const scroll3Ref = useRef();
  const scroll4Ref = useRef();

  const goHomeOne = () => {
    scroll1Ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
  };
  const goHomeTwo = () => {
    scroll2Ref.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const goHomeThree = () => {
    scroll3Ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
  };
  const goHomeLast = () => {
    scroll4Ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  useEffect(() => {
    async function axiosRoutineData() {
      try {
        const routineResponse = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/routine/detail`
        );
        console.log(routineResponse);
        setAllRoutineList(routineResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    axiosRoutineData();
  }, []);

  return (
    <div className={classes.HomeMain}>
      <div
        style={{
          background: "url(/images/Home/Homebackground.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 90%",
        }}
      >
        <div className={classes.HomeText}>
          <p>생활 습관 개선 </p>
          <p>
            <span className={classes.threedays}>작심 삼일</span>로 끝나셨나요?
          </p>
          <img className={classes.logo} src="/images/logo.png" alt="logo" />
        </div>
        <div className={classes.Homecontainer}>
          <div className={classes.HomeImg}>
            <div className={classes.hide}></div>
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
            <button
              onClick={() => navigate("/login")}
              className={classes.HomeBtnlog}
            >
              오안녕과 함께하기
            </button>

            <button onClick={goHomeOne} className={classes.HomeBtnMove}>
              한 번 둘러볼까요?
            </button>
          </div>
        </div>
      </div>

      <div ref={scroll1Ref}>
        <HomeOne goHomeTwo={goHomeTwo} />
      </div>
      <div ref={scroll2Ref}>
        <HomeTwo goHomeThree={goHomeThree} />
      </div>
      <div ref={scroll3Ref}>
        <HomeThree AllRoutineList={AllRoutineList} />
      </div>
      <div ref={scroll4Ref}>
        <HomeLast />
      </div>
    </div>
  );
}
export default NoLoginHome;
