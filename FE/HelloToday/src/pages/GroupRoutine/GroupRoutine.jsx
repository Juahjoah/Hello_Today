import Nav from "../../components/common/Nav";
import MainBanner from "../../components/common/MainBanner";
import GroupRoom from "../../components/group/GroupRoom";
import classes from "./GroupRoutine.module.css";
import Modal from "react-modal";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import classNames from "classnames";
import GroupRoomPage from "../../components/common/groupRoomPagination/GroupRoomPage";
import Footer from "../../components/common/Footer";

//로그인
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// 로그인 시 필요한 함수
import allAuth from "../../components/User/allAuth";

function GroupRoutine() {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [memberCount, setMemberCount] = useState(2);
  const [roomName, setRoomName] = useState("");
  const [roomDesc, setRoomDesc] = useState("");

  // user Info
  const nickName = localStorage.getItem("nickName");
  const memberId = localStorage.getItem("memberId");

  // Access Token
  const accessToken = useSelector((state) => state.authToken.accessToken);

  const [myUserName, setMyUserName] = useState(nickName);

  const videoEnabled = false;
  const audioEnabled = false;

  // const [groupRoomList, setGroupRoomList] = useState([]);

  const groupRoutineBannerImg = "main_banner_groupRoutine1";
  const groupRoutineBannerMents = [
    "오늘 루틴을 챙기기 버거웠나요?",
    "너무 자책하지 말아요!",
    "다른 오늘러들과 얘기나누며 다시 시작해봐요.",
  ];

  const makeRoomBtn = classNames({
    [classes.cantMake]: !roomName || !roomDesc,
    [classes.canMake]: roomName && roomDesc,
  });

  // useEffect(() => {
  //   async function axiosGroupRoomList() {
  //     try {
  //       const groupRoomResponse = await axios({
  //         url: `${process.env.REACT_APP_BASE_URL}/api/rooms/list`,
  //         method: "get",
  //         headers: {
  //           Authorization: accessToken,
  //         },
  //       });

  //       setGroupRoomList(groupRoomResponse.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   }
  //   axiosGroupRoomList();
  // }, []);

  // function

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setRoomName("");
    setRoomDesc("");
  };

  const handleIncrement = () => {
    if (memberCount < 6) {
      setMemberCount(memberCount + 1);
    }
  };

  const handleDecrement = () => {
    if (memberCount > 2) {
      setMemberCount(memberCount - 1);
    }
  };

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };

  const handleRoomDescChange = (event) => {
    setRoomDesc(event.target.value);
  };

  const enterRoom = (sessionId, Token, roomId) => {
    navigate(`/GroupRoutine/${roomId}`, {
      state: {
        roomId: roomId,
        sessionId: sessionId,
        roomTitle: roomName,
        myUserName: myUserName,
        videoEnabled: videoEnabled,
        audioEnabled: audioEnabled,
        Token: Token,
        accessToken: accessToken,
        memberId: memberId,
      },
    });
  };

  const handleMakeRoomInfo = () => {
    if (roomName && roomDesc) {
      const requestData = {
        title: roomName,
        description: roomDesc,
        memberLimit: memberCount,
      };

      axios({
        url: `${process.env.REACT_APP_BASE_URL}/api/rooms`,
        method: "post",
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
        data: JSON.stringify(requestData),
      }).then((res) => {
        const sessionId = res.data.data.sessionId;
        const Token = res.data.data.token;
        const roomId = res.data.data.roomId;

        enterRoom(sessionId, Token, roomId);
      });
    } else if (!roomName) {
      alert("방제목을 설정해주세요");
    } else if (!roomDesc) {
      alert("방설명을 설정해주세요");
    }
  };

  // Modal style
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
      justifyContent: "center",
      backgroundColor: "rgba(255,255,255,0.95)",
      overflow: "auto",
      zIndex: 10,
      top: "100px",
      left: "300px",
      right: "300px",
      bottom: "100px",
      border: "3px solid black",
      borderRadius: "12px",
    },
  };
  //------------------------------로그인 시작
  const dispatch = useDispatch();
  const isAccess = useSelector((state) => state.authToken.accessToken);

  useEffect(() => {
    allAuth(isAccess, dispatch);
  }, [dispatch]);
  //-----------------------------------여기까지

  return (
    <div>
      <Nav />
      <MainBanner
        bannerImg={groupRoutineBannerImg}
        bannerMent={groupRoutineBannerMents}
      />
      {/* 그룹 채팅방 섹션 */}
      <div className={classes.GroupRoomSection}>
        <GroupRoomPage
          // groupRoomList={groupRoomList}
          myUserName={myUserName}
          accessToken={accessToken}
          memberId={memberId}
        />
      </div>
      <hr className={classes.divideLine} />
      {/* 하단 방만들기 배너 */}
      <div className={classes.makeRoom}>
        <div className={classes.makeRoomLeft}>
          <div className={classes.makeRoomLeftTitle}>
            지금 당장 원하는 방이 없으신가요?
          </div>
          <div className={classes.makeRoomLeftDesc}>
            내가 원하는 방이 없으시다면
          </div>
          <div className={classes.makeRoomLeftDesc}>
            직접 방을 개설해 보시는건 어떠세요?
          </div>

          <button
            onClick={openModal}
            className={classes.makeRoomLeftBtn}
            style={{ marginTop: "15px" }}
          >
            방 생성하기
          </button>
        </div>
        <div className={classes.makeRoomRight}>
          <img
            className={classes.makeRoomRightImg}
            src="images/BannerImage/GroupRoutineFooterBanner.png"
            alt="toGroupBanner"
          />
        </div>
      </div>
      <Modal
        style={modalStyle}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        <div className={classes.makeRoomModal}>
          <FontAwesomeIcon
            onClick={closeModal}
            icon={faCircleXmark}
            className={classes.modalClose}
          />
          <div className={classes.makeRoomModalTitle}>
            <div style={{ marginTop: "10px" }}>단체 루틴방 생성하기</div>
          </div>
          <div className={classes.makeRoomModalMain}>
            <div className={classes.makeRoomModalMainRoomTitle}>
              <label
                className={classes.makeRoomModalMainRoomTitleLabel}
                htmlFor="roomName"
              >
                방 이름 :{" "}
              </label>
              <input
                className={classes.makeRoomModalMainRoomTitleInput}
                type="text"
                id="roomName"
                maxLength="33"
                value={roomName}
                onChange={handleRoomNameChange}
                placeholder="방 제목을 입력해주세요."
                spellCheck="false"
                autocomplete="off"
              />
            </div>
            <div className={classes.makeRoomModalMainRoomDesc}>
              <label
                htmlFor="roomDesc"
                className={classes.makeRoomModalMainRoomDescLabel}
              >
                방 설명 :{" "}
              </label>
              <textarea
                name=""
                id="roomDesc"
                maxLength="200"
                className={classes.makeRoomModalMainRoomDescInput}
                value={roomDesc}
                onChange={handleRoomDescChange}
                placeholder="방에 대한 설명을 작성해주세요."
                spellCheck="false"
              ></textarea>
            </div>
            <div className={classes.makeRoomModalMainRoomCount}>
              <label
                className={classes.makeRoomModalMainRoomCountLabel}
                htmlFor=""
              >
                인원 수 :{" "}
              </label>
              <div className={classes.makeRoomModalMainRoomCountInputSection}>
                <button
                  onClick={handleDecrement}
                  className={classes.makeRoomModalMainRoomCountMinusBtn}
                >
                  -
                </button>
                <input
                  type="number"
                  required
                  value={memberCount}
                  min={2}
                  max={6}
                  className={classes.makeRoomModalMainRoomCountInput}
                />

                <button
                  onClick={handleIncrement}
                  className={classes.makeRoomModalMainRoomCountPlusBtn}
                >
                  +
                </button>
              </div>
              <div className={classes.makeRoomModalMainRoomCountNone}></div>
            </div>
          </div>

          {roomName && roomDesc ? (
            <button onClick={handleMakeRoomInfo} className={makeRoomBtn}>
              방 생성하기
            </button>
          ) : (
            <button disabled className={makeRoomBtn}>
              방 생성하기
            </button>
          )}
        </div>
      </Modal>

      <Footer />
    </div>
  );
}

export default GroupRoutine;
