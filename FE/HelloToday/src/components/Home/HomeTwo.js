import classes from "./HomeTwo.module.css";
import { BsFillArrowDownCircleFill } from "react-icons/bs";
//
import classNames from "classnames";
import { useState, useEffect } from "react";
//

function HomeTwo({ goHomeThree, HomeTwoWantVisible }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (HomeTwoWantVisible) {
      setTimeout(() => {
        setIsVisible(true);
      }, 2000);
    }
  }, [HomeTwoWantVisible]);

  const visibleStyle = classNames({
    [classes.noneVisible]: !isVisible,
    [classes.visible]: isVisible,
  });

  return (
    <div
      className={classes.HomeTwo}
      style={{
        background: "url(/images/Home/Homeonebackground.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      }}
    >
      <div className={classes.HomeTwoText}>
        <div className={classes.HomeTwoinnerText}>
          <p>지친 당신을 위한 솔루션</p>
        </div>
      </div>
      <div className={classes.HomeTwoCircle}>
        <div className={classes.HomeTwoCircleOne}>
          <h3 className={classes.HomeTwoCircleTextOne}>01</h3>
          <p className={classes.HomeTwoCircleinnerText}>
            계획한 일을 다 지키지 못하고 하루가 끝났을 때
          </p>
        </div>
        <div className={classes.HomeTwoCircleTwo}>
          <h3 className={classes.HomeTwoCircleTextTwo}>02</h3>
          <p className={classes.HomeTwoCircleinnerText}>
            계획은 없지만, 계획을 다시 세우고 싶을 때,{" "}
          </p>
        </div>
        <div className={classes.HomeTwoCircleThree}>
          <h3 className={classes.HomeTwoCircleTextThree}>03</h3>
          <p className={classes.HomeTwoCircleinnerText}>
            특별한 하루가 아닌 평범한 하루를 제대로 보내기
          </p>
        </div>
      </div>
      <button onClick={goHomeThree} className={visibleStyle}>
        <BsFillArrowDownCircleFill />
      </button>
    </div>
  );
}

export default HomeTwo;
