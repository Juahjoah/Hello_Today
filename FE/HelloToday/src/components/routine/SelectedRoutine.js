import classes from "../../components/Home/HomeThree.module.css"
import { useState } from "react";
import RoutineAuthCard from "./RoutineAuthCard";
import { Link } from "react-router-dom";
import MainBanner from "../common/MainBanner";

function SelectedRoutine(props) {
    const routineDetailList = props.routineCheckList;
    console.log(routineDetailList)
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const routineAuthBannerImg = "main_banner_routineAuth1";
    const routineAuthBannerMents = [
      "루틴은 일주일 단위로 진행됩니다.",
      "일주일 간 열심히 노력하며 진행한 루틴!",
      "잊지말고, 기록으로 남겨두세요",
    ];
  
    return (
        <div>
            <MainBanner
                bannerImg={routineAuthBannerImg}
                bannerMent={routineAuthBannerMents}
            />
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
