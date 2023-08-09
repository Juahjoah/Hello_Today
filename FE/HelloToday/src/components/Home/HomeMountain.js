import classes from "../../components/Home/HomeMountain.module.css";

function HomeMountain() {
  return (
    <div className={classes.HomeLast}>
    <div className={classes.HomeLastText}>
      <p>
        오늘도 안녕과 함께 <br />
        나의 매일도 <br />
        반갑게 안녕!
      </p>
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
export default HomeMountain;
