import classes from "./MainBanner.module.css";
import TypeIt from "typeit-react";

function MainBanner({ bannerImg, bannerMent }) {
  const bannerImage = `/images/BannerImage/${bannerImg}.png`;

  return (
    <div className={classes.banner}>
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
