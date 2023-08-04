import classes from "./ProfileMain.module.css";

import ProfileCalender from "../../components/Profile/ProfileCalender";

function ProfileMain() {
  return (
    <div className="ProfileMain">
      <div className={classes.ProfileCalender}>
        <ProfileCalender />
      </div>
      <div className={classes.ProfileCustom}>
        {/* <h3>{user.name}</h3> */}
        {/* <p>{user.email}</p> */}
      </div>
      <p>ProfileMain</p>
    </div>
  );
}

export default ProfileMain;
