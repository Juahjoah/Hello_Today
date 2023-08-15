import classes from "./HomeThree.module.css";
import SelectRoutineList from "../routine/SelectRoutineList";
import { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { BsFillArrowDownCircleFill } from "react-icons/bs";
import classNames from "classnames";

function HomeThree({ AllRoutineList, goHomeMountain, HomeThreeWantVisible }) {
  const count = useMotionValue(0);
  const num = useTransform(count, Math.round);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (HomeThreeWantVisible) {
      const animation = animate(count, 26, { duration: 5 });

      return animation.stop;
    }
  }, [HomeThreeWantVisible]);

  useEffect(() => {
    if (HomeThreeWantVisible) {
      setTimeout(() => {
        setIsVisible(true);
      }, 3000);
    }
  }, [HomeThreeWantVisible]);

  const visibleStyle = classNames({
    [classes.noneVisible]: !isVisible,
    [classes.visible]: isVisible,
  });

  return (
    <div className={classes.test}>
      <p className={classes.routineNumDescription}>
        {HomeThreeWantVisible ? 
        <motion.span className={classes.routineNum}>{num}</motion.span>
         : <motion.span className={classes.routineNum}>26</motion.span>}
         여종의{" "}
        <span className={classes.routineNumSelect}>루틴 선택</span> 가능{" "}
      </p>
      {AllRoutineList.map((bigRoutine, index) => {
        return (
          <SelectRoutineList key={index} idx={index} bigRoutine={bigRoutine} />
        );
      })}
      <button onClick={goHomeMountain} className={visibleStyle}>
        <BsFillArrowDownCircleFill />
      </button>
    </div>
  );
}

export default HomeThree;
