import { constrainPoint } from "@fullcalendar/core/internal";
import classes from "./RoutineAuthCard.module.css";
import { useState } from "react";

function RoutineAuthCard({
  routineDetailDto,
  routineCheckDtoList,
  handleAuthInfo,
  handleModalOpen,
}) {
  const [isAuth,setIsAuth] = useState(false)

  const selectRoutineImgPath = `images/Routine/${routineDetailDto.imgPath}`;
  const handleAuthButtonClick = () => {
    handleAuthInfo({ routineDetailDto, routineCheckDtoList });
    handleModalOpen(true);
  };

  console.log("루틴 정보");
  console.log(routineDetailDto);
  console.log("루틴 체크");
  console.log(routineCheckDtoList);

  return (
    <>
    {isAuth ? <div> 인증 완료 </div> : <div className={classes.routineAuthCard}>
        <div className={classes.routineAuthLeft}>
          <div className={classes.routineAuthItem}>
            <img
              className={classes.routineImg}
              src={selectRoutineImgPath}
              alt=""
            />
            <div className={classes.routineName}>{routineDetailDto.content}</div>
          </div>
        </div>
        <div className={classes.routuneAuthMid}>
          <div className={classes.routineAuthMidDes}>
            "<span style={{ color: "#a581cf" }}>{routineDetailDto.content}</span>
            "루틴을 진행하셨나요?
          </div>
          <div className={classes.routineAuthMidDes}>
            루틴에 대한 기록을 남겨주세요!
          </div>
        </div>
        <div className={classes.routineAuthRight}>
          <button className={classes.goToAuth} onClick={handleAuthButtonClick}>
            인증하러 가기
          </button>
        </div>
      </div>} 
      
    </>
  );
}

export default RoutineAuthCard;
