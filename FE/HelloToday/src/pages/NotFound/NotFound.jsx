import classes from "./NotFound.module.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FcLinux } from "react-icons/fc";

function NotFound() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const Iconstyle = { fontSize: "1.4em" };

  return (
    <div className={classes.NotFound}>
      <div className={classes.leftSide}>
        <div className={classes.leftSideBox}>
          <div className={classes.leftSideBoxTop}>
            <motion.img
              src="/images/logo_mini.png"
              alt="logo"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1.3 }}
              transition={{
                duration: 0.3,
                ease: [0, 0.71, 0.2, 1.01],
                scale: {
                  type: "spring",
                  damping: 10,
                  stiffness: 80,
                  restDelta: 0.001,
                },
              }}
            />
            <div
              className={classes.leftSideBoxTopDesc}
              style={{ marginTop: "30px" }}
            >
              <p>요청하신 페이지를 찾을 수 없습니다!</p>
              <FcLinux style={Iconstyle} />
            </div>
          </div>
          <div className={classes.leftSideBoxBottom}>
            <button
              onClick={handleGoBack}
              className={classes.leftSideBoxBottomBtn}
            >
              돌아가기
            </button>
          </div>
        </div>
      </div>
      <div className={classes.rightSide}>
        <img
          className={classes.rightSideMountain}
          src="/images/Home/Homemountain.png"
          alt="mountain"
        />
        <div className={classes.rightSideBox}>
          <img
            className={classes.rightSideBike}
            src="images/NotFound/NotFound.png"
            alt="bike"
          />
        </div>
      </div>
    </div>
  );
}

export default NotFound;
