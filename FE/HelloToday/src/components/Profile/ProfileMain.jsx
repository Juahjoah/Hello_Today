import classes from "./ProfileMain.module.css";

import ProfileCalender from "../../components/Profile/ProfileCalender";

function ProfileMain(props) {
  return (
    <div className="ProfileMain">
      <div className={classes.ProfileCalender}>
        <ProfileCalender />
      </div>
      <div className={classes.ProfileCustom}>
        {/* menu에서 받아온 정보 출력 */}
        {props.Menu}
      </div>
      <p>ProfileMain</p>
    </div>
  );
}

export default ProfileMain;
