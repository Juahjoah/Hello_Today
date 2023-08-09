import classes from "./HomeThree.module.css";
import SelectRoutineList from "../routine/SelectRoutineList";
import { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

function HomeThree({ AllRoutineList }) {
  const count = useMotionValue(0);
  const num = useTransform(count, Math.round);

  useEffect(() => {
    const animation = animate(count, 26, { duration: 5 });

    return animation.stop;
  }, []);

  return (
    <div className={classes.test}>
      <p className={classes.routineNumDescription}>
        <motion.span className={classes.routineNum}>{num}</motion.span>여종의{" "}
        <span className={classes.routineNumSelect}>루틴 선택</span> 가능{" "}
      </p>
      {AllRoutineList.map((bigRoutine, index) => {
        return (
          <SelectRoutineList key={index} idx={index} bigRoutine={bigRoutine} />
        );
      })}
    </div>
  );
}

export default HomeThree;
