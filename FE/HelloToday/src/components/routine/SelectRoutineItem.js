import classes from "./SelectRoutineItem.module.css";
import { SplideSlide } from "@splidejs/react-splide";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addRoutine, deleteRoutine } from "../../store/SelectRoutineSlice";
import classNames from "classnames";

function SelectRoutineItem({
  routineId,
  routineContent,
  routineImg,
  isModalOpen,
  updateSelectedCount,
  selectedCount,
  isLogin,
}) {
  const [selected, setSelected] = useState(false);
  const dispatch = useDispatch();

  const onClick = () => {
    if (!isLogin) {
      return;
    }

    if (isModalOpen) {
      return;
    }

    if (!selected) {
      if (selectedCount < 5) {
        dispatch(addRoutine({ routineId, routineContent, routineImg }));
        updateSelectedCount(selectedCount + 1);
        setSelected(!selected);
      } else {
        alert("루틴 선택은 5개까지 가능합니다!");
      }
    } else {
      dispatch(deleteRoutine({ routineId }));
      updateSelectedCount(selectedCount - 1);
      setSelected(!selected);
    }
  };

  const isSelectedStyle = classNames({
    [classes.modalStyle]: isModalOpen,
    [classes.selectedsplideSlide]: selected && !isModalOpen,
    [classes.unselectedSplideSlide]: !selected && !isModalOpen,
  });

  return (
    <SplideSlide className={isSelectedStyle} onClick={onClick}>
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
