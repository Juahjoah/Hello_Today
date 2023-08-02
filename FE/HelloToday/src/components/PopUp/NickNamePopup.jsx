import Modal from "react-modal";
import classes from "./NickNamePopup.module.css";
import { useState } from "react";

function NickNamePopup({ FirstLogin, setFirstLogin }) {
  const [nickName, setNickName] = useState("");
  // modal style
  const modalStyle = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.6)",
      zIndex: 10,
    },
    content: {
      display: "flex",
      flexDirextion: "column",
      backgroundColor: "rgba(255,255,255,0.95)",
      overflow: "auto",
      zIndex: 10,
      top: "300px",
      left: "300px",
      right: "300px",
      bottom: "200px",
      border: "5px solid black",
      borderRadius: "20px",
    },
  };

  const checkNickName = () => {};

  return (
    <Modal style={modalStyle} isOpen={FirstLogin}>
      <div className={classes.nickNamePopup}>
        <p className={classes.nickNamePopupTitle}>
          사용할 닉네임을 작성해주세요
        </p>
        <div className={classes.nickNamePopupDesc}>
          <input
            type="text"
            value={nickName}
            className={classes.nickNamePopupDescInput}
          />
          <button className={classes.nickNamePopupDescBtn}>중복 확인</button>
        </div>
      </div>
    </Modal>
  );
}

export default NickNamePopup;
