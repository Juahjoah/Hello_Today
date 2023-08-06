import classes from "./GroupRoom.module.css";

function GroupRoom() {
  return (
    <div className={classes.groupRoom}>
      <div className={classes.groupRoomLeft}>
        <div className={classes.groupRoomLeftTime}>
          ⏱ <span style={{ color: "rgba(0, 0, 0, 0.5)" }}>10 min ago</span>
        </div>
        <div className={classes.groupRoomLeftTitle}>루틴 공유 합시다!</div>
        <div className={classes.groupRoomLeftDesc}>
          다들 이번 주 루틴 뭐 고르셨나요..
        </div>
        <div className={classes.groupRoomLeftCount}>🙎‍♂️ 2/6</div>
      </div>
      <div className={classes.groupRoomRight}></div>
    </div>
  );
}

export default GroupRoom;
