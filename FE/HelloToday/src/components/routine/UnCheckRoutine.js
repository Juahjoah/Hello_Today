import classes from "./UnCheckRoutine.module.css";

function UnCheckRoutine({ routineCheckDtoList, routineDetailDto,handleAuthButtonClick }) {
    return (
        <>
            <div className={classes.routuneAuthMid}>
                <div className={classes.routineAuthMidDes}>
                    "<span style={{ color: "#a581cf" }}>{routineDetailDto.content}</span>
                    "루틴을 진행하셨나요?
                </div>
                <div style={{marginLeft: "25px"}}>
                    <span className={classes.routineDetailDes}>루틴에 대한 기록을 남겨주세요!</span>
                </div>
            </div>

            <div className={classes.routineAuthRight}>
                <button className={classes.goToAuth} onClick={handleAuthButtonClick}>
                {/* <button className={classes.goToAuth} > */}
                    인증하러 가기
                </button>
            </div>
        </>
    );
}

export default UnCheckRoutine;