import SelectRoutineItem from "./SelectRoutineItem";
import { Splide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "@splidejs/splide/dist/css/splide.min.css";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import classes from "../Home/HomeThree.module.css";
import { useSelector } from "react-redux";

function SelectRoutineList({
  bigRoutine,
  idx,
  updateSelectedCount,
  selectedCount,
}) {
  const isLogin = useSelector((state) => state.login.isLogin);
  const testList = bigRoutine.routineDetail;

  const option = {
    type: "loop",
    drag: "free",
    gap: "20px",
    focus: "center",
    fixedWidth: "250px",
    fixedHeight: "250px",
    arrows: false,
    pagination: false,
    perPage: 5,
    autoScroll: {
      speed: idx % 2 ? -0.5 : 0.5,
      // pauseOnHover: false로 설정하면 슬라이더에 마우스를 올려도 자동 스크롤이 멈추지 않습니다.
      // pauseOnFocus: false로 설정하면 슬라이더가 포커스를 받아도 자동 스크롤이 멈추지 않습니다 (예: 슬라이더를 클릭한 경우).
      // rewind: false로 설정하면 자동 스크롤이 마지막 슬라이드에 도달한 후 첫 번째 슬라이드로 돌아가지 않고 멈추게 됩니다.
      // speed: 이 옵션은 자동 스크롤의 속도를 설정합니다. 값이 1인 경우 기본 속도로 스크롤하며, 필요에 따라 속도를 조정할 수 있습니다.
    },
  };
  return (
    <>
      <Splide
        className={classes.splide}
        options={option}
        extensions={{ AutoScroll }}
      >
        {testList.map((item) => {
          return (
            <SelectRoutineItem
              key={item.routineDetailId}
              routineId={item.routineDetailId}
              routineContent={item.content}
              routineImg={item.imgPath}
              isModalOpen={false}
              updateSelectedCount={updateSelectedCount}
              selectedCount={selectedCount}
              isLogin={isLogin}
            />
          );
        })}
      </Splide>
      <br />
    </>
  );
}

export default SelectRoutineList;
