import classes from "../../components/Home/HomeThree.module.css"
import { useState } from "react";
import RoutineAuthCard from "./RoutineAuthCard";
import { Link } from "react-router-dom";

function SelectedRoutine(props) {
    const routineDetailList = props.routineCheckList;
    console.log(routineDetailList)
    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <div>
            <div className={classes.routineCardSection}>
                {routineDetailList.map((item) => {
                    console.log(item)
                    return (
                        <RoutineAuthCard
                            routineDetailDto={item.routineDetailDto}
                            routineCheckDtoList={item.routine}
                        // key={routineDetailId}
                        // content={content}
                        // routineId={routineDetailId}
                        // imgPath={imgPath}
                        // handleModalOpen={setModalIsOpen}
                        // handleAuthInfo={setToAuthRoutine}
                        />
                    );
                })}
            </div>

            {/* 하단 그룹배너 */}
            <div className={classes.toGroupBanner}>
                <div className={classes.toGroupBannerLeft}>
                    <p className={classes.toGroupBannerLeftTitle}>
                        혼자 루틴을 진행하기 어려우신가요?
                    </p>
                    <p className={classes.toGroupBannerLeftDesc}>
                        단체 루틴을 통해 다른 오늘러와 공유해보세요!
                    </p>
                    <p className={classes.toGroupBannerLeftDesc}>
                        오늘의 루틴을 진행할 힘을 얻을 수 있을거랍니다!
                    </p>
                    <Link to="/GroupRoutine">
                        <button className={classes.toGroupBannerLeftBtn}>
                            단체루틴 바로가기
                        </button>
                    </Link>
                </div>
                <div className={classes.toGroupBannerRight}>
                    <img
                        className={classes.toGroupBannerRightImg}
                        src="images/BannerImage/toGroupBanner.png"
                        alt="toGroupBanner"
                    />
                </div>
            </div>
        </div>

    );
}
export default SelectedRoutine;
