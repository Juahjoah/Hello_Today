import classes from "../Home/HomeOne.module.css";

function HomeOne() {
  return (
    <div className={classes.HomeMain}>
      <div
        className="HomeOnemain"
        style={{
          background: "url(/images/Home/Homeonebackground.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      >
        {/* 문자*/}
        <div className={classes.Homecontainer}>
          <div className={classes.HomeOneText}>
            <p>다시 시작해보아요</p>
            <p>오늘도, 안녕</p>
            <p>힘든 일이 있으셨나요?</p>
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
              <p className={classes.Homesbubbletext}>오늘은 너무 우울했어요</p>
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
              <p className={classes.Homesbubbletext}>상사가 화나게 해요</p>
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
              <p className={classes.Homesbubbletext}>ㄴㅇㄹ</p>
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
