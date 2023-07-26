import classes from "./HomeTwo.module.css";

function HomeTwo() {
  return (
    <div
      className={classes.HomeTwo}
      style={{
        background: "url(/images/Home/Homeonebackground.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      }}
    >
      <div className={classes.HomeTwoText}>
        <div className={classes.HomeTwoinnerText}>
          <p>지친 당신을 위한 솔루션</p>
        </div>
      </div>
      <div className={classes.HomeTwoCircle}>
        <div className={classes.HomeTwoCircleOne}>
          <h3 className={classes.HomeTwoCircleTextOne}>01</h3>
          <p className={classes.HomeTwoCircleinnerText}>
            01에 대한 말을 적자아아아아아아아아
          </p>
        </div>
        <div className={classes.HomeTwoCircleTwo}>
          <h3 className={classes.HomeTwoCircleTextTwo}>02</h3>
          <p className={classes.HomeTwoCircleinnerText}>02에 대한 말을 적자</p>
        </div>
        <div className={classes.HomeTwoCircleThree}>
          <h3 className={classes.HomeTwoCircleTextThree}>03</h3>
          <p className={classes.HomeTwoCircleinnerText}>03에 대한 말을 적자</p>
        </div>
      </div>
    </div>
  );
}

export default HomeTwo;
