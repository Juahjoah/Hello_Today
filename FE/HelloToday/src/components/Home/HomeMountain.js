import classes from "../../components/Home/HomeMountain.module.css";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
//
import classNames from "classnames";
import { useState, useEffect } from "react";
//

function HomeMountain({ goHomeTop, HomeMountWantVisible }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (HomeMountWantVisible) {
      setTimeout(() => {
        setIsVisible(true);
      }, 1000);
    } else {
      console.log("들어가나?");
      setIsVisible(false);
    }
  }, [HomeMountWantVisible]);

  const visibleStyle = classNames({
    [classes.noneVisible]: !isVisible,
    [classes.visible]: isVisible,
  });

  return (
    <div className={classes.HomeLast}>
      <div className={classes.HomeLastText}>
        <p>
          오늘도 안녕과 함께 <br />
          나의 매일도 <br />
          반갑게 안녕!
        </p>
      </div>
      <img
        className={classes.mountain}
        src="/images/Home/Homemountain.png"
        alt="mountain"
      />
      <img
        className={classes.mountainman}
        src="/images/Home/Homemountainman.png"
        alt="mountainman"
      />
      <button onClick={goHomeTop} className={visibleStyle}>
        <BsFillArrowUpCircleFill />
      </button>
    </div>
  );
}
export default HomeMountain;
