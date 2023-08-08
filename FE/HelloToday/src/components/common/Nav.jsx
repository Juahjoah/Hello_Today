import { useState } from "react";
import classes from "./Nav.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { resetRoutine } from "../../store/SelectRoutineSlice";
import SearchPopup from "../PopUp/SearchPopup";

function Nav() {
  // const [nowRouting, setNowRouting] = useState("");

  // const handleRouting = (pos) => {
  //   setNowRouting(pos);
  // };

  const isUserhaveRoutine = useSelector((state) => state.haveActiveRoutine);

  const PersonalRoutine = isUserhaveRoutine ? "/selectmain" : "/unselectmain";

  const dispatch = useDispatch();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const memberId = sessionStorage.getItem("memberId");

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };
  return (
    <nav className={classes.nav}>
      <Link to="/">
        <img
          src="images/logo_mini.png"
          alt="logo"
          className={classes.navLeftLogo}
        />
      </Link>
      <div className={classes.navLeft}>
        <Link to={PersonalRoutine}>
          <button
            onClick={() => {
              if (isUserhaveRoutine) {
                return;
              }
              dispatch(resetRoutine());
            }}
            className={classes.navLeftPersonal}
          >
            개인 루틴
          </button>
        </Link>

        {/* <Link to={PersonalRoutine}>
          <button
            onClick={() => {
              if (isUserhaveRoutine) {
                return;
              }
              dispatch(resetRoutine());
            }}
            className={classes.navLeftPersonal}
          >
            개인 루틴
          </button>
        </Link> */}
        <Link to="/GroupRoutine">
          <button
            onClick={() => {
              if (isUserhaveRoutine) {
                return;
              }
              dispatch(resetRoutine());
            }}
            className={classes.navLeftGroup}
          >
            단체 루틴
          </button>
        </Link>
        <Link to={`/MyProfile/${memberId}`}>
          <button
            onClick={() => {
              if (isUserhaveRoutine) {
                return;
              }
              dispatch(resetRoutine());
            }}
            className={classes.navLeftProfile}
          >
            프로필
          </button>
        </Link>
      </div>
      <div className={classes.navMid}></div>
      <div className={classes.navRight}>
        <div className={classes.navRightSearchbar}>
          <input
            type="text"
            size="5"
            className={classes.navRightSearchbarInput}
            onClick={openPopup} // <input> 클릭 시 모달 열기
          />
        </div>
        {<SearchPopup isOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen}/>}
        <Link to="/logout">
          <button className={classes.navRightLogout}>로그아웃</button>
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
