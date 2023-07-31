import classes from "./HomeThree.module.css";
import SelectRoutineList from "../ServicePage/SelectRoutineList";
import { useEffect, useState } from "react";

function HomeThree() {
  const [num, setNum] = useState(1);
  useEffect(() => {
    if (num < 30) {
      const interval = setInterval(() => {
        setNum((prevNum) => prevNum + 1);
      }, 50);

      return () => {
        clearInterval(interval);
      };
    }
  }, [num]);

  // 대분류 3가지
  const testList = [1, 2, 3];

  return (
    <div className={classes.test}>
      <p className={classes.routineNumDescription}>
        <span className={classes.routineNum}>{num}</span>여종의{" "}
        <span className={classes.routineNumSelect}>루틴 선택</span> 가능{" "}
      </p>
      {testList.map((List, index) => {
        return <SelectRoutineList key={index} idx={index} />;
      })}
    </div>
  );
}

export default HomeThree;
