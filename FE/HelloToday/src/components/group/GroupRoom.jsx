import classes from "./GroupRoom.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function GroupRoom({
  createdDate,
  title,
  description,
  roomId,
  sessionId,
  memberLimit,
  joinCnt,
  myUserName,
  accessToken,
}) {
  console.log(joinCnt);

  // const API_URL = "https://i9b308.p.ssafy.io";
  const API_URL = "http://localhost:8080";
  const navigate = useNavigate();

  const enterRoom = (sessionId, Token, roomId) => {
    navigate(`/${roomId}`, {
      state: {
        roomId: roomId,
        sessionId: sessionId,
        myUserName: myUserName,
        roomTitle: title,
        videoEnabled: true,
        audioEnabled: true,
        Token: Token,
        accessToken: accessToken,
      },
    });
  };

  const join = () => {
    axios({
      url: `${API_URL}/api/rooms/${roomId}/connections`,
      method: "get",
      headers: {
        Authorization: accessToken,
      },
    }).then((res) => {
      const Token = res.data.data.token;
      const roomId = res.data.data.roomId;
      enterRoom(sessionId, Token, roomId);
    });
  };

  function formatElapsedTime(dateTime) {
    const currentTime = new Date();
    const elapsedMilliseconds = currentTime - new Date(dateTime);
    const elapsedMinutes = Math.floor(elapsedMilliseconds / 1000 / 60);

    if (elapsedMinutes < 1) {
      return "방금 전";
    } else if (elapsedMinutes < 60) {
      return `${elapsedMinutes}분 전`;
    } else if (elapsedMinutes < 1440) {
      const elapsedHours = Math.floor(elapsedMinutes / 60);
      return `${elapsedHours}시간 전`;
    } else {
      const elapsedDays = Math.floor(elapsedMinutes / 1440);
      return `${elapsedDays}일 전`;
    }
  }

  return (
    <div className={classes.groupRoom} onClick={join}>
      <div className={classes.groupRoomLeft}>
        <div className={classes.groupRoomLeftTime}>
          ⏱{" "}
          <span style={{ color: "rgba(0, 0, 0, 0.5)" }}>
            {formatElapsedTime(createdDate)}
          </span>
        </div>
        <div className={classes.groupRoomLeftTitle}>{title}</div>
        <div className={classes.groupRoomLeftDesc}>{description}</div>
        <div className={classes.groupRoomLeftCount}>
          🙎‍♂️ {joinCnt}/{memberLimit}
        </div>
      </div>
      <div className={classes.groupRoomRight}></div>
    </div>
  );
}

export default GroupRoom;
