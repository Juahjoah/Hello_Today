import classes from "./RoutineAuthCard.module.css";
import CheckRoutine from "./CheckRoutine";
import UnCheckRoutine from "./UnCheckRoutine";

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
  console.log(new Date().toLocaleString().substring(0, 10));

  const calCheckSeq = Math.ceil((Math.abs(new Date().getTime() - new Date(routineStartDate).getTime())) / (1000 * 60 * 60 * 24));

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


      {routineCheckDtoList[calCheckSeq - 1].checkDate == null ?
        <UnCheckRoutine
          routineCheckDtoList={routineCheckDtoList}
          routineDetailDto={routineDetailDto}
          handleAuthButtonClick={handleAuthButtonClick}
        />
        :
        <CheckRoutine
          routineCheckDtoList={routineCheckDtoList}
          routineDetailDto={routineDetailDto}
          handleAuthButtonClick={handleAuthButtonClick}
        />
      }

    </div>
  );
}

export default RoutineAuthCard;
