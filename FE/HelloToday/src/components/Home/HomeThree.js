import classes from "./HomeThree.module.css";
import SelectRoutineList from "../routine/SelectRoutineList";
import { useEffect, useState } from "react";
import axios from "axios";

function HomeThree({ AllRoutineList }) {
  // const API_URL = "http://localhost:8080";
  const [num, setNum] = useState(1);
  // const [AllRoutineList, setAllRoutineList] = useState([]);

  // useEffect(() => {
  //   async function axiosRoutineData() {
  //     try {
  //       const routineResponse = await axios.get(
  //         `${API_URL}/api/routine/detail`
  //       );
  //       setAllRoutineList(routineResponse.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   }
  //   axiosRoutineData();
  // }, []);

  useEffect(() => {
    if (num < 26) {
      const interval = setInterval(() => {
        setNum((prevNum) => prevNum + 1);
      }, 50);

      return () => {
        clearInterval(interval);
      };
    }
  }, [num]);

  console.log(AllRoutineList);

  // 대분류 3가지
  const testList = [1, 2, 3];

  return (
    <div className={classes.test}>
      <p className={classes.routineNumDescription}>
        <span className={classes.routineNum}>{num}</span>여종의{" "}
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
