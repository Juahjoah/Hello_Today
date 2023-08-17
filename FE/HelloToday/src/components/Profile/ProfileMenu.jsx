import classes from "./ProfileMenu.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import classNames from "classnames";

import WidgetComments from "./Widget/WidgetComments";
import WidgetGroupRoutine from "./Widget/WidgetGroupRoutine";
import WidgetBucket from "./Widget/WidgetBucket";
import WidgetGoals from "./Widget/WidgetGoals";
import WidgetDiary from "./Widget/WidgetDiary";
import WidgetHistory from "./Widget/WidgetHistory";
import WidgetGallery from "./Widget/WidgetGallery";
import WidgetDday from "./Widget/WidgetDday";
import { useLocation } from "react-router-dom";
import { AiOutlineMessage, AiOutlinePicture } from "react-icons/ai"; //응원 메세지, 갤러리
import { SlCalender } from "react-icons/sl"; // 디데이
import { GoGoal } from "react-icons/go"; // 목표
import { RiListSettingsLine } from "react-icons/ri"; //편집모드
import { PiPencilLine } from "react-icons/pi"; // 한줄 일기
import { RxCounterClockwiseClock } from "react-icons/rx"; //루틴
import { TbList } from "react-icons/tb"; //버킷

function ProfileMenu({
  setMenu,
  setFollowButtonClick,
  memberId,
  Token,
  isEditPage,
}) {
  const MenuList = {
    "응원 메세지": <WidgetComments memberId={memberId} />,
    "단체 루틴을 함께한 사람": <WidgetGroupRoutine memberId={memberId} />,
    버킷리스트: <WidgetBucket memberId={memberId} />,
    "소중한 목표": <WidgetGoals memberId={memberId} />,
    "한 줄 일기": <WidgetDiary memberId={memberId} />,
    "나의 루틴들": <WidgetHistory memberId={memberId} />,
    갤러리: <WidgetGallery memberId={memberId} />,
    "D-Day": <WidgetDday memberId={memberId} />,
    "편집 모드": <Link to="/MyProfile/edit"></Link>,
  };

  const location = useLocation();
  const [selectedFlags, setSelectedFlags] = useState([]);

  // 선택한 메뉴
  // const [selectMenu, setSelectMenu] = useState("응원 메세지");
  const [selectMenu, setSelectMenu] = useState();

  const localMemberId = localStorage.getItem("memberId");
  useEffect(() => {
    const widgetAxios = async () => {
      axios({
        url: `${process.env.REACT_APP_BASE_URL}/api/mypage/widget/${memberId}`,
        method: "get",
        headers: {
          Authorization: Token,
        },
      })
        .then((res) => {
          const newData = [];
          const data = res.data;

          newData.push("응원 메세지");

          if (data.ddayFlag === 1) {
            newData.push("D-Day");
          }

          if (data.galleryFlag === 1) {
            newData.push("갤러리");
          }
          if (data.goalFlag === 1) {
            newData.push("소중한 목표");
          }
          if (data.oneDiaryFlag === 1) {
            newData.push("한 줄 일기");
          }
          if (data.routineHistoryFlag === 1) {
            newData.push("나의 루틴들");
          }
          if (data.wishListFlag === 1) {
            newData.push("버킷리스트");
          }
          if (memberId === localMemberId) {
            newData.push("편집 모드");
          }
          setSelectedFlags(newData);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    widgetAxios();
  }, [memberId, Token]);

  const UserSelectMenu = (event) => {
    console.log(event.target.innerText);
    console.log(MenuList);
    console.log(MenuList[event.target.innerText]);
    setMenu(MenuList[event.target.innerText]);
    setSelectMenu(event.target.innerText);
    setFollowButtonClick(false);
  };

  useEffect(() => {
    setMenu(<WidgetComments memberId={memberId} />);
  }, []);

  return (
    <div className={classes.UserProfileMenu}>
      {selectedFlags.map((flag) => (
        <div className={classes.ProfileMenu} key={flag}>
          {flag === "편집 모드" ? (
            <Link to={`/MyProfile/edit/${memberId}`}>
              <button
                className={classNames(classes.ProfileItem, {
                  [classes.selectedProfileItem]: isEditPage,
                })}
              >
                <RiListSettingsLine
                  className={classes.WidgetFlagImg}
                ></RiListSettingsLine>
                <div className={classes.WidgetFlag}>{flag}</div>
              </button>
            </Link>
          ) : (
            <button
              // className={classes.ProfileItem}
              className={classNames(classes.ProfileItem, {
                [classes.selectedProfileItem]:
                  flag === selectMenu && !isEditPage,
              })}
              onClick={(event) => {
                UserSelectMenu(event);
                console.log(flag);
                console.log(selectMenu);
              }}
            >
              <div className={classes.WidgetForm}>
                <div className={classes.WidgetFormFlag}>
                  {flag === "응원 메세지" && (
                    <AiOutlineMessage
                      className={classes.WidgetFlagImg}
                    ></AiOutlineMessage>
                  )}
                  {flag === "D-Day" && (
                    <SlCalender className={classes.WidgetFlagImg}></SlCalender>
                  )}
                  {flag === "갤러리" && (
                    <AiOutlinePicture
                      className={classes.WidgetFlagImg}
                    ></AiOutlinePicture>
                  )}
                  {flag === "소중한 목표" && (
                    <GoGoal className={classes.WidgetFlagImg}></GoGoal>
                  )}
                  {flag === "한 줄 일기" && (
                    <PiPencilLine
                      className={classes.WidgetFlagImg}
                    ></PiPencilLine>
                  )}
                  {flag === "나의 루틴들" && (
                    <RxCounterClockwiseClock
                      className={classes.WidgetFlagImg}
                    ></RxCounterClockwiseClock>
                  )}
                  {flag === "버킷리스트" && (
                    <TbList className={classes.WidgetFlagImg}></TbList>
                  )}

                  <div className={classes.WidgetFlag}>{flag}</div>
                </div>
              </div>
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default ProfileMenu;
