import classes from "../Home/HomeOne.module.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useState, useEffect } from "react";
import TypeIt from "typeit-react";
import { BsFillArrowDownCircleFill } from "react-icons/bs";

//
import classNames from "classnames";
//

function HomeOne({ goHomeTwo, HomeOneWantVisible }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    if (HomeOneWantVisible) {
      setTimeout(() => {
        setIsVisible(true);
      }, 8000);
    }
  }, [HomeOneWantVisible]);

  const visibleStyle = classNames({
    [classes.noneVisible]: !isVisible,
    [classes.visible]: isVisible,
  });

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
          <div
            className={classes.HomeOneText}
            // data-aos="zoom-in"
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-delay="500"
          >
            <div>걱정말고, 다시 시작해보아요</div>
            <div className={classes.HomeOneTextTitle}>오늘도, 안녕</div>
            <div>오늘은 어떤 하루를 보낼 계획인가요?</div>
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
                <TypeIt
                  options={{
                    waitUntilVisible: true,
                  }}
                  getBeforeInit={(instance) => {
                    instance
                      .pause(600)
                      .type("계획은 있었지만", { speed: 200 })
                      .pause(100)
                      .type(",")
                      .pause(100)
                      .type(",")
                      .pause(100)
                      .type(",")
                      .pause(100)
                      .type("지키지 못했어요.", { speed: 200 });

                    return instance;
                  }}
                />
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
                <TypeIt
                  options={{ waitUntilVisible: true }}
                  getBeforeInit={(instance) => {
                    instance
                      .pause(3000)
                      .type("딱히 하루 계획을 세우지 못했어요.");

                    return instance;
                  }}
                />
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
                <TypeIt
                  options={{ waitUntilVisible: true }}
                  getBeforeInit={(instance) => {
                    instance
                      .pause(5000)
                      .type("흠,,")
                      .pause(100)
                      .type("꼭 계획을 세워야 할까요?");

                    return instance;
                  }}
                />
              </p>
              <img
                className={classes.Homegrinningfacewithsweat}
                src="/images/Home/Homegrinningfacewithsweat.gif"
                alt="Homegrinningfacewithsweat"
              />
            </div>
          </div>
        </div>
        <button onClick={goHomeTwo} className={visibleStyle}>
          <BsFillArrowDownCircleFill />
        </button>
      </div>
    </div>
  );
}
export default HomeOne;
