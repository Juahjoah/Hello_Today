import classes from "./ProfileMain.module.css";

import ProfileCalender from "../../components/Profile/ProfileCalender";

function ProfileMain(props) {
  return (
    <div className={classes.ProfileMain}>
      <div className={classes.ProfileCalenderSection}>
        <div className={classes.ProfileCalender}>
          <ProfileCalender />
        </div>
      </div>
      <br />
      <div className={classes.ProfileCustom}>
        {/* menu에서 받아온 정보 출력 */}
        <div className={classes.ProfileCustomSection}>{props.Menu}</div>
      </div>
    </div>
  );
}

export default ProfileMain;
