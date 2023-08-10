import classes from "../../pages/Home/Home.module.css";
import { useNavigate } from "react-router-dom";
import HomeOne from "../../components/Home/HomeOne";
import HomeTwo from "../../components/Home/HomeTwo";
import HomeThree from "../../components/Home/HomeThree";
import HomeLast from "../../components/Home/HomeLast";
import HomeMountain from "./HomeMountain";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion, useScroll, useSpring } from "framer-motion";
import classNames from "classnames";

function NoLoginHome() {
  const [AllRoutineList, setAllRoutineList] = useState([]);

  const navigate = useNavigate();
  const scroll1Ref = useRef();
  const scroll2Ref = useRef();
  const scroll3Ref = useRef();
  const scroll4Ref = useRef();

  // HomeOne에 있는 버튼
  const [HomeOneWantVisible, SetHomeOneVisible] = useState(false);
  // HomeTwo에 있는 버튼
  const [HomeTwoWantVisible, SetHomeTwoVisible] = useState(false);
  // HomeThree에 있는 버튼
  const [HomeThreeWantVisible, SetHomeThreeVisible] = useState(false);
  // HomeThree에 있는 버튼
  const [HomeMountWantVisible, SetHomeMountVisible] = useState(false);

  const goHomeOne = () => {
    scroll1Ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
    SetHomeOneVisible(true);
    setIsFirstMoveBtn(false);
  };
  const goHomeTwo = () => {
    scroll2Ref.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    SetHomeTwoVisible(true);
    SetHomeOneVisible(false);
  };
  const goHomeThree = () => {
    scroll3Ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
    SetHomeThreeVisible(true);
  };
  const goHomeMountain = () => {
    scroll4Ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
    SetHomeMountVisible(true);
  };
  const goHomeTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsFirstLoginBtn(true);
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

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // 둘러보기 버튼
  const [isFirstMoveBtn, setIsFirstMoveBtn] = useState(true);

  const FirstMoveBtn = classNames({
    [classes.firstHomeBtnMove]: isFirstMoveBtn,
    [classes.HomeBtnMove]: !isFirstMoveBtn,
  });

  // 로그인 버튼
  const [isFirstLoginBtn, setIsFirstLoginBtn] = useState(false);

  const FirstLoginBtn = classNames({
    [classes.firstHomeBtnLog]: isFirstLoginBtn,
    [classes.HomeBtnlog]: !isFirstLoginBtn,
  });

  return (
    <div className={classes.HomeMain}>
      <motion.div className={classes.progressBar} style={{ scaleX }} />
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
              className={FirstLoginBtn}
            >
              오안녕과 함께하기
            </button>

            <button onClick={goHomeOne} className={FirstMoveBtn}>
              한 번 둘러볼까요?
            </button>
          </div>
        </div>
      </div>

      <div ref={scroll1Ref}>
        <HomeOne
          goHomeTwo={goHomeTwo}
          HomeOneWantVisible={HomeOneWantVisible}
        />
      </div>
      <div ref={scroll2Ref}>
        <HomeTwo
          goHomeThree={goHomeThree}
          HomeTwoWantVisible={HomeTwoWantVisible}
        />
      </div>
      <div ref={scroll3Ref}>
        <HomeThree
          AllRoutineList={AllRoutineList}
          goHomeMountain={goHomeMountain}
          HomeThreeWantVisible={HomeThreeWantVisible}
        />
      </div>
      <div ref={scroll4Ref}>
        <HomeMountain
          goHomeTop={goHomeTop}
          HomeMountWantVisible={HomeMountWantVisible}
        />
      </div>
      <div>
        <HomeLast />
      </div>
    </div>
  );
}
export default NoLoginHome;
