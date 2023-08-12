import { color } from "framer-motion";
import classes from "./CheckRoutine.module.css";

function CheckRoutine({routineCheckDtoList, routineDetailDto, handleAuthButtonClick}) {
    return (
        <>
            <div className={classes.routuneAuthMid}>
                <div className={classes.routineAuthMidDes}>
                    "<span style={{ color: "#a581cf" }}>{routineDetailDto.content}</span>
                    "루틴을 완료하셨나요?
                </div>

                {/* 일차별로 보이기 */}
                {routineCheckDtoList.map((checkDto, index) => (
                    <div key={index} className={classes.checkImageItem} style={{marginLeft: "25px"}}>
                        <div style={{ float: "left", textAlign: "center", marginRight: "16px" }}>
                            <div>
                                {checkDto.checkDate ? <img className={classes.imgStyle} src="/images/Routine/routineCheck.png" /> : <img className={classes.imgStyle} src="/images/Routine/routineUnCheck.png" />}
                            </div>
                            <div>
                                <span className = {classes.dateSeqItem}>{` ${index + 1} 일차`}</span>
                            </div>
                        </div>
                    </div>
                ))}
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

export default CheckRoutine;