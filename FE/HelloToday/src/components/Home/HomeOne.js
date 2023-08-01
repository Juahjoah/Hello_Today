import classes from "../Home/HomeOne.module.css";

function HomeOne() {
  return (
    <div className={classes.HomeMain}>
      <div
        className={classes.HomeMain}
        style={{
          background: "url(/images/Home/Homeonebackground.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      >
        {/* 문자 */}
        <div className={classes.Homecontainer}>
          <div className={classes.HomeOneText}>
            <p>걱정말고, 다시 시작해보아요</p>
            <p>오늘도, 안녕</p>
            <p>오늘은 어떤 하루를 보낼 계획인가요?</p>
          </div>
          {/* 이미지 */}
          <div className={classes.HomeOneImg}>
            <div>
              <img
                className={classes.Homecircleregular}
                src="/images/Home/Homecircleregular.png"
                alt="Homecircleregular"
              />
              <img
                className={classes.Homecirclesemibold}
                src="/images/Home/Homecirclesemibold.png"
                alt="Homecirclesemibold"
              />
            </div>

            <div className={classes.HomeOneImgItem}>
              <img
                className={classes.Homespeechbubble}
                src="/images/Home/Homespeechbubble.png"
                alt="Homespeechbubble"
              />
              <p className={classes.Homesbubbletext}>
                계획은 있었지만, 지키지 못했어요.
              </p>
              <img
                className={classes.Homeconfusedface}
                src="/images/Home/Homeconfusedface.gif"
                alt="Homeconfusedface"
              />
            </div>
            <div className={classes.HomeOneImgItem}>
              <img
                className={classes.Homespeechbubble}
                src="/images/Home/Homespeechbubble.png"
                alt="Homespeechbubble"
              />
              <p className={classes.Homesbubbletext}>
                딱히 하루 계획을 세우지 못했어요.
              </p>
              <img
                className={classes.Homefacewithsteamfromnose}
                src="/images/Home/Homefacewithsteamfromnose.gif"
                alt="Homefacewithsteamfromnose"
              />
            </div>
            <div className={classes.HomeOneImgItem}>
              <img
                className={classes.Homespeechbubble}
                src="/images/Home/Homespeechbubble.png"
                alt="Homespeechbubble"
              />
              <p className={classes.Homesbubbletext}>
                흠, 꼭 계획을 세워야 할까요?
              </p>
              <img
                className={classes.Homegrinningfacewithsweat}
                src="/images/Home/Homegrinningfacewithsweat.gif"
                alt="Homegrinningfacewithsweat"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HomeOne;
