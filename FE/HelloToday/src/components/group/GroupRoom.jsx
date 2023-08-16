import classes from "./GroupRoom.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import Swal from "sweetalert2";

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
  memberId,
}) {
  const navigate = useNavigate();

  const enterRoom = (sessionId, Token, roomId) => {
    navigate(`/GroupRoutine/${roomId}`, {
      state: {
        roomId: roomId,
        sessionId: sessionId,
        myUserName: myUserName,
        roomTitle: title,
        videoEnabled: false,
        audioEnabled: false,
        Token: Token,
        accessToken: accessToken,
        memberId: memberId,
      },
    });
  };

  const join = () => {
    axios({
      url: `${process.env.REACT_APP_BASE_URL}/api/rooms/${roomId}/connections`,
      method: "get",
      headers: {
        Authorization: accessToken,
      },
    })
      .then((res) => {
        const Token = res.data.data.token;
        const roomId = res.data.data.roomId;
        enterRoom(sessionId, Token, roomId);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          Swal.fire({
            icon: "warning",
            title: "제한 인원 초과",
            text: "제한 인원이 초과되었습니다.",
            confirmButtonText: "확인",
          });
        }
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

  const limitRoomStyle = classNames({
    [classes.groupRoom]: memberLimit > joinCnt,
    [classes.limitGroupRoom]: memberLimit === joinCnt,
  });

  const limitRoomLeftStyle = classNames({
    [classes.groupRoomLeft]: memberLimit > joinCnt,
    [classes.limitGroupRoomLeft]: memberLimit === joinCnt,
  });

  const limitRoomCountStyle = classNames({
    [classes.groupRoomLeftCount]: memberLimit > joinCnt,
    [classes.limitgroupRoomLeftCount]: memberLimit === joinCnt,
  });

  return (
    <div className={limitRoomStyle} onClick={join}>
      <div className={limitRoomLeftStyle}>
        <div className={classes.groupRoomLeftTime}>
          ⏱{" "}
          <span style={{ color: "rgba(0, 0, 0, 0.5)" }}>
            {formatElapsedTime(createdDate)}
          </span>
        </div>
        <div className={classes.groupRoomLeftTitle}>{title}</div>
        <div className={classes.groupRoomLeftDesc}>{description}</div>
        <div className={limitRoomCountStyle}>
          🙎‍♂️ {joinCnt}/{memberLimit}
        </div>
      </div>
      <div className={classes.groupRoomRight}></div>
    </div>
  );
}

export default GroupRoom;
