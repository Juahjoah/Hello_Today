import classes from "./GroupRoom.module.css";

function GroupRoom() {
  return (
    <div className={classes.groupRoom}>
      <div className={classes.groupRoomLeft}></div>
      <div className={classes.groupRoomRight}></div>
    </div>
  );
}

export default GroupRoom;
