import classes from "./MainBanner.module.css";
import TypeIt from "typeit-react";
import classNames from "classnames";

function MainBanner({ bannerImg, bannerMent, allRoutineCheckFlag }) {
  const bannerImage = `/images/BannerImage/${bannerImg}.png`;

  const bannerColor = classNames({
    [classes.banner]: !allRoutineCheckFlag,
    [classes.allDoneBanner]: allRoutineCheckFlag,
  });
  return (
    <div className={bannerColor}>
      <div className={classes.bannerLeft}>
        <TypeIt className={classes.bannerLeftTitle}>{bannerMent[0]}</TypeIt>
        <div className={classes.bannerLeftDescription}>
          <TypeIt
            options={{ waitUntilVisible: false }}
            getBeforeInit={(instance) => {
              instance
                .pause(3000)
                .type(bannerMent[1])
                .pause(750)
                .delete(24)
                .pause(750)
                .type(bannerMent[2]);

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

export default MainBanner;
