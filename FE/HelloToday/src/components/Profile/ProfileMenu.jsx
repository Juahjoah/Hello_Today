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

function ProfileMenu({ setMenu }) {
  const MenuList = {
    WidgetComments: <WidgetComments />,
    WidgetGroupRoutine: <WidgetGroupRoutine />,
    WidgetBucket: <WidgetBucket />,
    WidgetGoals: <WidgetGoals />,
    WidgetDiary: <WidgetDiary />,
    WidgetHistory: <WidgetHistory />,
    WidgetGallery: <WidgetGallery />,
    WidgetDday: <WidgetDday />,
  };

  const UserSelectMenu = (event) => {
    console.log(event.target.innerText);
    setMenu(MenuList[event.target.innerText]);
  };

  useEffect(() => {
    setMenu(<WidgetComments />);
  }, []);

  return (
    <div className={classes.ProfileMenu}>
      <h1>ProfileMenu</h1>

      <div>
        <p
          onClick={(event) => {
            UserSelectMenu(event);
          }}
        >
          WidgetComments
        </p>
        <p
          onClick={(event) => {
            UserSelectMenu(event);
          }}
        >
          WidgetBucket
        </p>
        <event
          onClick={(event) => {
            UserSelectMenu(event);
          }}
        >
          WidgetGoals
        </event>
        {/* 일/월/연 목표 */}
        <p
          onClick={(event) => {
            UserSelectMenu(event);
          }}
        >
          WidgetDiary
        </p>
        {/* 한 줄 일기 */}
        <p
          onClick={(event) => {
            UserSelectMenu(event);
          }}
        >
          WidgetHistory
        </p>
        {/* 루틴 히스토리 */}
        <p
          onClick={(event) => {
            UserSelectMenu(event);
          }}
        >
          WidgetGroupRoutine
        </p>
        <p
          onClick={(event) => {
            UserSelectMenu(event);
          }}
        >
          WidgetDday
        </p>
        {/* 디데이 */}
        <p
          onClick={(event) => {
            UserSelectMenu(event);
          }}
        >
          WidgetGallery
        </p>
        {/* 갤러리 */}
      </div>
    </div>
  );
}

export default ProfileMenu;
