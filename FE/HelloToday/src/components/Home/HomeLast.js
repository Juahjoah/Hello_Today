import classes from "./HomeLast.module.css";

function Homelast() {
  return (
    <div className={classes.HomeLast}>
      <div className={classes.HomeLastText}>
        <p>오늘도 안녕과 함께</p>
        <p>나의 매일도</p>
        <p>반갑게 안녕!</p>
      </div>
      <img
        className={classes.mountain}
        src="/images/Home/Homemountain.png"
        alt="mountain"
      />
      <img
        className={classes.mountainman}
        src="/images/Home/Homemountainman.png"
        alt="mountainman"
      />
    </div>
  );
}
export default Homelast;
