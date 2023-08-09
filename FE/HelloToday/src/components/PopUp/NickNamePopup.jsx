import Modal from "react-modal";
import classes from "./NickNamePopup.module.css";
import { useState } from "react";
import axios from "axios";
import classNames from "classnames";


function NickNamePopup({
  FirstLogin,
  setFirstLogin,
  Token,
  setNickName,
  memberId,
}) {
  const [userName, setUserName] = useState("");
  // 정규식 통과 검사(닉네임 형식)
  const [isUserName, setIsUserName] = useState(false);
  // 중복체크 검사
  const [validUserName, setValidUserName] = useState(false);
  // 닉네임 사용가능 여부 메시지
  const [userNameMessage, setUserNameMessage] = useState("");
  const [checkUserNameMessage, setCheckUserNameMessage] = useState("❌");

  const validCheck = classNames({
    [classes.cantCheck]: true,
    [classes.canCheck]: isUserName,
  });

  const validChange = classNames({
    [classes.cantChange]: true,
    [classes.canChange]: validUserName,
  });

  const onChangeUserName = (e) => {
    const currentUserName = e.target.value;

    setUserName(currentUserName);

    // 닉네임 관련 유효성 검사
    const usernameRegExp = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{3,10}$/;
    if (!usernameRegExp.test(currentUserName)) {
      setUserNameMessage(
        "닉네임은 특수문자 없이 3~10글자 사이로 입력해주세요!"
      );
      setIsUserName(false);
    } else {
      setUserNameMessage("사용가능한 닉네임 형식입니다.");
      setIsUserName(true);
    }
    setCheckUserNameMessage("❌");
  };

  const nickNameCheckAxios = () => {
    axios({
      url: `${process.env.REACT_APP_BASE_URL}/api/members/nickname`,
      method: "get",
      params: {
        nickname: userName,
      },
      headers: {
        Authorization: Token,
      },
    })
      .then((res) => {
        const isValidNick = res.data.success;
        console.log(isValidNick);

        if (isValidNick) {
          alert("사용가능한 닉네임입니다!");
          setValidUserName(isValidNick);
          setCheckUserNameMessage("✔");
        } else {
          alert("이미 존재하는 닉네임입니다!");
          setUserName("");
        }
      })
      .catch(console.log(Token, userName));
  };

  const changeNickName = () => {
    axios({
      url: `${process.env.REACT_APP_BASE_URL}/api/members/nickname`,
      method: "put",
      data: {
        nickname: userName,
      },
      headers: {
        Authorization: Token,
      },
    })
      .then(setFirstLogin(false))
      .then((res) => {
        setNickName(res.data.data.nickname);
        localStorage.setItem("nickName", res.data.data.nickname);
        localStorage.setItem("memberId", memberId);
        localStorage.setItem("isFirstLogin", false);
        setFirstLogin(false)

      });
  };

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
      top: "200px",
      left: "300px",
      right: "300px",
      bottom: "200px",
      border: "3px solid black",
      borderRadius: "12px",
    },
  };

  console.log(typeof FirstLogin)

  return (
    <Modal style={modalStyle} isOpen={FirstLogin}>
      <div className={classes.nickNamePopup}>
        <div className={classes.nickNamePopupTitle}>
          사용할 닉네임을 작성해주세요
        </div>
        <div className={classes.nickNamePopupDesc}>
          <input
            type="text"
            value={userName}
            className={classes.nickNamePopupDescInput}
            onChange={onChangeUserName}
          />
          {isUserName ? (
            <button className={validCheck} onClick={nickNameCheckAxios}>
              중복확인
            </button>
          ) : (
            <button className={validCheck} disabled>
              중복확인
            </button>
          )}
          <div className={classes.checkUserNameMessage}>
            {checkUserNameMessage}
          </div>
        </div>
        <div style={{ fontSize: "15px" }}>{userNameMessage}</div>

        {validUserName ? (
          <button className={validChange} onClick={changeNickName}>
            설정 완료
          </button>
        ) : (
          <button className={validChange} disabled>
            설정 완료
          </button>
        )}
      </div>
    </Modal>
  );
}

export default NickNamePopup;
