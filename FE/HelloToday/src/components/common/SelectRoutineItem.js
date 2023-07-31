import { SplideSlide } from "@splidejs/react-splide";
import classes from "../Home/HomeThree.module.css";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addRoutine, deleteRoutine } from "../../store/SelectRoutineSlice";

function SelectRoutineItem({ routineId, routineContent, routineImg }) {
  const [selected, setSelected] = useState(false);
  const dispatch = useDispatch();

  const isLogin = true; // 로그인 여부로 클릭 가능(메인) / 불가능(비로그인 메인페이지) 여부 판단
  const onClick = () => {
    if (!isLogin) {
      return;
    }

    if (!selected) {
      dispatch(addRoutine({ routineId, routineContent, routineImg }));
    } else {
      dispatch(deleteRoutine({ routineId }));
    }
    setSelected(!selected);
  };

  return (
    <SplideSlide className={classes.splideSlide} onClick={onClick}>
      <img
        className={classes.routineImg}
        src={`images/Routine/${routineImg}`}
        alt="routineImg"
      />
      <p className={classes.routineName}>{routineContent}</p>
    </SplideSlide>
  );
}

export default SelectRoutineItem;
