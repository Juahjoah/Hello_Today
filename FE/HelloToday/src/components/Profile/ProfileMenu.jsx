import classes from "./ProfileMenu.module.css";
import { useEffect } from "react";

import WidgetComments from "./Widget/WidgetComments";
import WidgetGroupRoutine from "./Widget/WidgetGroupRoutine";
import WidgetBucket from "./Widget/WidgetBucket";
import WidgetGoals from "./Widget/WidgetGoals";
import WidgetDiary from "./Widget/WidgetDiary";
import WidgetHistory from "./Widget/WidgetHistory";
import WidgetGallery from "./Widget/WidgetGallery";
import WidgetDday from "./Widget/WidgetDday";

function ProfileMenu({ setMenu, setFollowButtonClick }) {
  const MenuList = {
    "응원 메세지": <WidgetComments />,
    "단체 루틴을 함께한 사람": <WidgetGroupRoutine />,
    버킷리스트: <WidgetBucket />,
    "소중한 목표": <WidgetGoals />,
    "한 줄 일기": <WidgetDiary />,
    "나의 루틴들": <WidgetHistory />,
    갤러리: <WidgetGallery />,
    "D-Day": <WidgetDday />,
  };

  const UserSelectMenu = (event) => {
    // console.log(event.target.innerText);
    setMenu(MenuList[event.target.innerText]);
    setFollowButtonClick(false);
  };

  useEffect(() => {
    setMenu(<WidgetComments />);
  }, []);

  return (
    <div className={classes.ProfileMenu}>
      <div>
        <p
          onClick={(event) => {
            UserSelectMenu(event);
          }}
        >
          응원 메세지
        </p>
        <p
          onClick={(event) => {
            UserSelectMenu(event);
          }}
        >
          버킷리스트
        </p>
        <p
          onClick={(event) => {
            UserSelectMenu(event);
          }}
        >
          소중한 목표
        </p>
        {/* 일/월/연 목표 */}
        <p
          onClick={(event) => {
            UserSelectMenu(event);
          }}
        >
          한 줄 일기
        </p>
        {/* 한 줄 일기 */}
        <p
          onClick={(event) => {
            UserSelectMenu(event);
          }}
        >
          나의 루틴들
        </p>
        {/* 루틴 히스토리 */}
        <p
          onClick={(event) => {
            UserSelectMenu(event);
          }}
        >
          단체 루틴을 함께한 사람
        </p>
        <p
          onClick={(event) => {
            UserSelectMenu(event);
          }}
        >
          D-Day
        </p>
        {/* 디데이 */}
        <p
          onClick={(event) => {
            UserSelectMenu(event);
          }}
        >
          갤러리
        </p>
        {/* 갤러리 */}
      </div>
    </div>
  );
}

export default ProfileMenu;
