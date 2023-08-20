import classes from "./RoutineDoneBanner.module.css";
import TypeIt from "typeit-react";

function RoutineDoneBanner() {
  const bannerImage = `/images/BannerImage/routine_medal.png`;

  return (
    <div className={classes.banner}>
      <div className={classes.bannerLeft}>
        <TypeIt className={classes.bannerLeftTitle}>
          {"루틴진행도 100% 달성"}
        </TypeIt>
        <div className={classes.bannerLeftDescription}>
          <TypeIt
            options={{ waitUntilVisible: false }}
            getBeforeInit={(instance) => {
              instance
                .pause(3000)
                .type("루틴 완성을 정말 축하드려요!!")
                .pause(750)
                .delete(24)
                .pause(750)
                .type("다음 루틴도 100% 달성 기대할게요!");

              return instance;
            }}
          />
        </div>
      </div>
      <div className={classes.bannerRight}>
        <img className={classes.bannerRightImg} src={bannerImage} alt="" />
      </div>
    </div>
  );
}

export default RoutineDoneBanner;
