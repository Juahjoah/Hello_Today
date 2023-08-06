import classes from "./GroupRoom.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function GroupRoom({
  createdDate,
  title,
  description,
  sessionId,
  memberLimit,
  myUserName,
}) {
  const API_URL = "http://localhost:8080";
  const navigate = useNavigate();

  const enterRoom = (sessionId, Token, roomId) => {
    navigate(`/${roomId}`, {
      state: {
        roomId: roomId,
        sessionId: sessionId,
        myUserName: myUserName,
        videoEnabled: true,
        audioEnabled: true,
        Token: Token,
      },
    });
  };

  const join = () => {
    axios({
      url: `${API_URL}/api/rooms/${sessionId}/connections`,
      method: "get",
    }).then((res) => {
      console.log(res.data);
      const Token = res.data.data.token;
      const roomId = res.data.data.roomId;

      enterRoom(sessionId, Token, roomId);
    });
  };

  return (
    <div className={classes.groupRoom} onClick={join}>
      <div className={classes.groupRoomLeft}>
        <div className={classes.groupRoomLeftTime}>
          ⏱ <span style={{ color: "rgba(0, 0, 0, 0.5)" }}>10 min ago</span>
        </div>
        <div className={classes.groupRoomLeftTitle}>{title}</div>
        <div className={classes.groupRoomLeftDesc}>{description}</div>
        <div className={classes.groupRoomLeftCount}>🙎‍♂️ 2/{memberLimit}</div>
      </div>
      <div className={classes.groupRoomRight}></div>
    </div>
  );
}

export default GroupRoom;
