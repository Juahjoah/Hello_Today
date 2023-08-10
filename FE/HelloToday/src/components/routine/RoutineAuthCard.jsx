import classes from "./RoutineAuthCard.module.css";
import UnCheckRoutine from "./UnCheckRoutine";
import CheckRoutine from "./CheckRoutine";

function RoutineAuthCard({
  routineStartDate,
  routineDetailDto,
  routineCheckDtoList,
  handleAuthInfo,
  handleModalOpen,
}) {
  const selectRoutineImgPath = `images/Routine/${routineDetailDto.imgPath}`;
  const handleAuthButtonClick = () => {
    handleAuthInfo({ routineDetailDto, routineCheckDtoList });
    handleModalOpen(true);
  };

  console.log("루틴 정보");
  console.log(routineDetailDto);
  console.log("루틴 체크");
  console.log(routineCheckDtoList);
  // console.log(routineCheckDtoList[0])
  console.log(new Date().toLocaleString().substring(0, 10));

  return (
    <div className={classes.routineAuthCard}>
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
      

      {/* 오늘 날짜랑 비교해서 오늘 날짜의 checkDate가 있으면 */}
      {/* checkDate가 오늘날짜인 것의 데이터가 null이면 UnCheckRoutine
          null이 아니면 CheckRoutine */}
      {/* <UnCheckRoutine
        routineCheckDtoList={routineCheckDtoList}
        routineDetailDto={routineDetailDto} /> */}
      {/* <CheckRoutine
        routineCheckDtoList={routineCheckDtoList}
        routineDetailDto={routineDetailDto} /> */}


      {/* <div className={classes.routuneAuthMid}>
        <div className={classes.routineAuthMidDes}>
          "<span style={{ color: "#a581cf" }}>{routineDetailDto.content}</span>
          "루틴을 완료하셨나요?
        </div> */}

      {/* 일차별로 보이기 */}
      {/* {routineCheckDtoList.map((checkDto, index) => (
          <div key={index} className={classes.checkImageItem}>
            <div style={{ float: "left", textAlign: "center", marginRight: "10px"}}>
              <div>
                {checkDto.checkDate ? <img className={classes.imgStyle} src="/images/Routine/routineCheck.png" /> : <img className={classes.imgStyle} src="/images/Routine/routineUnCheck.png" />}
              </div>
              <div>
                <span style={{ fontSize: '13px' }}>{` ${index + 1}일차`}</span>
              </div>
            </div>
          </div>
        ))} */}

      {/* 일차별로 보이기 */}
      {/* <div className={classes.routineAuthMidDes}>
          "<span style={{ color: "#a581cf" }}>{routineDetailDto.content}</span>
          "루틴을 진행하셨나요?
        </div>
        <div className={classes.routineAuthMidDes}>
          루틴에 대한 기록을 남겨주세요!
        </div> */}
      {/* </div> */}



      {/* <div className={classes.routineAuthRight}>
        <button className={classes.goToAuth} onClick={handleAuthButtonClick}>
          인증하러 가기
        </button>
      </div> */}

      {/* <div className={classes.routineAuthRight}>
        <button className={classes.goToAuth} onClick={handleAuthButtonClick}>
          추가 인증하러 가기
        </button>
      </div> */}
    </div>
  );
}

export default RoutineAuthCard;
