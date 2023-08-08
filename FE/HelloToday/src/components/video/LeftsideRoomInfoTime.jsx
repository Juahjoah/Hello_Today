import { useState, useEffect } from "react";
import classes from "../../pages/video/JoinRoom.module.css";

function LeftsideRoomInfoTime() {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    // 1초마다 elapsed time 증가
    const interval = setInterval(() => {
      setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
    }, 1000);

    return () => {
      // 컴포넌트가 unmount될 때 interval 정리
      clearInterval(interval);
    };
  }, []);

  // 분:초 형식으로 변환하는 함수
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
  };

  return (
    <div className={classes.leftsideRoomInfoTime}>
      ⏱ {formatTime(elapsedTime)}
    </div>
  );
}

export default LeftsideRoomInfoTime;
