import SelectRoutineItem from "./SelectRoutineItem";
import { Splide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "@splidejs/splide/dist/css/splide.min.css";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import classes from "../Home/HomeThree.module.css";

function SelectRoutineList({ idx }) {
  // 나중에는 DB에서 useEffect 이용해서 데이터 전부 받아서 Redux에 전부 넣어두고
  // 뒤에 페이지에서도 꺼내쓰게 하면 될듯?
  //   useEffect(() => {
  //     axios({...})
  //   },[])

  const testList = [
    {
      id: 1,
      content: "명상하기",
      imgPath: "meditation.png",
    },
    {
      id: 2,
      content: "규칙적인 기상",
      imgPath: "getup.png",
    },
    {
      id: 3,
      content: "방 청소하기",
      imgPath: "cleaning.png",
    },
    {
      id: 4,
      content: "독서하기",
      imgPath: "book.png",
    },
    {
      id: 5,
      content: "음악듣기",
      imgPath: "music.png",
    },
    {
      id: 6,
      content: "마음챙기기",
      imgPath: "heart.png",
    },
    {
      id: 7,
      content: "지인 전화하기",
      imgPath: "phonecall.png",
    },
    {
      id: 8,
      content: "규칙적인 수면",
      imgPath: "sleep.png",
    },
    {
      id: 9,
      content: "사진 남기기",
      imgPath: "takephoto.png",
    },
    {
      id: 10,
      content: "반려견 산책",
      imgPath: "dog.png",
    },
  ];

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
              key={item.id}
              routineId={item.id}
              routineContent={item.content}
              routineImg={item.imgPath}
            />
          );
        })}
      </Splide>
      <br />
    </>
  );
}

export default SelectRoutineList;
