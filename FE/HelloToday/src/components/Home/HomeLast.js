import classes from "./HomeLast.module.css";

function Homelast() {
  return (
    <div>
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
      <div className={classes.footer}>
        <p>© 2023 - SSAFY(), Daejeon, 놀랍게도 하면 하조.</p>
        <p>| 권민정 | 고다혜 | 김주아 | 신준호 | 윤동훈 | 이지현 |</p>
      </div>
    </div>
  );
}
export default Homelast;
