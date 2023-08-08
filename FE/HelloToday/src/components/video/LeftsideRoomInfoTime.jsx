import { useState, useEffect } from "react";
import classes from "../../pages/video/JoinRoom.module.css";

function LeftsideRoomInfoTime() {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

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
