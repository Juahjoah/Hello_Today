import classes from "./ProfileMenu.module.css";
import { useEffect, useState } from "react";

import ProfileMain from "./ProfileMain";
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
          onClick={(e) => {
            UserSelectMenu(e);
          }}
        >
          WidgetGroupRoutine
        </p>
        <p
          onClick={(e) => {
            UserSelectMenu(e);
          }}
        >
          WidgetComments
        </p>
        <p
          onClick={(e) => {
            UserSelectMenu(e);
          }}
        >
          WidgetBucket
        </p>
        <p
          onClick={(e) => {
            UserSelectMenu(e);
          }}
        >
          WidgetGoals
        </p>
        {/* 일/월/연 목표 */}
        <p
          onClick={(e) => {
            UserSelectMenu(e);
          }}
        >
          WidgetDiary
        </p>
        {/* 한 줄 일기 */}
        <p
          onClick={(e) => {
            UserSelectMenu(e);
          }}
        >
          WidgetHistory
        </p>
        {/* 루틴 히스토리 */}
        <p
          onClick={(e) => {
            UserSelectMenu(e);
          }}
        >
          WidgetGallery
        </p>
        {/* 갤러리 */}
        <p
          onClick={(e) => {
            UserSelectMenu(e);
          }}
        >
          WidgetDday
        </p>{" "}
        {/* 디데이 */}
      </div>
    </div>
  );
}

export default ProfileMenu;

// function ProfileMenu() {
//   const MenuList = [
//     WidgetComments,
//     WidgetGroupRoutine,
//     WidgetBucket,
//     WidgetGoals,
//     WidgetDiary,
//     WidgetHistory,
//     WidgetGallery,
//     WidgetDday,
//   ];

// const ProfileMenuChange = function (props) {
//   const WidgetComments = <WidgetComments />;
//   const WidgetGroupRoutine = <WidgetGroupRoutine />;
//   const WidgetBucket = <WidgetBucket />;
//   const WidgetGoals = <WidgetGoals />;
//   const WidgetDiary = <WidgetDiary />;
//   const WidgetHistory = <WidgetHistory />;
//   const WidgetGallery = <WidgetGallery />;
//   const WidgetDday = <WidgetDday />;
//   return [
//     WidgetComments,
//     WidgetGroupRoutine,
//     WidgetBucket,
//     WidgetGoals,
//     WidgetDiary,
//     WidgetHistory,
//     WidgetGallery,
//     WidgetDday,
//   ];
// };

// const ProfileMenuChange =
