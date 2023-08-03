import Nav from "../../components/common/Nav";
import MainBanner from "../../components/common/MainBanner";
import RoutineAuthCard from "../../components/routine/RoutineAuthCard";
import classes from "./RoutineAuthMain.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../components/common/customCalender.css";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
//로그인
import React, { useEffect } from "react";
// 로그인 시 필요한 함수
import allAuth from "../../components/User/allAuth";

function RoutineAuthMain() {
  const routineAuthBannerImg = "main_banner_routineAuth1";
  const routineAuthBannerMents = [
    "루틴은 일주일 단위로 진행됩니다.",
    "일주일 간 열심히 노력하며 진행한 루틴!",
    "잊지말고, 기록으로 남겨두세요",
  ];

  // TODO:지금은 일단 redux에서 상태를 빼왔는데 추후에는 DB에서 가져와야 함
  const selectRoutineState = useSelector((state) => state.selectRoutine);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [toAuthRoutine, setToAuthRoutine] = useState({
    routineId: 0,
    content: "",
  });
  const [value, onChange] = useState(new Date()); // 루틴 인증 날짜
  const [fileName, setFileName] = useState(""); // 루틴 인증 이미지 파일
  const [routineAuthText, setRoutineAuthText] = useState(""); // 루틴 인증 내용

  // function

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFileName(selectedFile.name);
    } else {
      setFileName("");
    }
  };

  const handleTextChange = (event) => {
    const text = event.target.value;
    setRoutineAuthText(text);
  };

  const submitAuthModalData = () => {
    // TODO: axios 보내야하는 데이터 (미확정)
    // {
    // ​    memberId: "(숫자)",
    // ​    routineDetailCatId: "(숫자)" (인증하는 루틴 세분류 아이디)
    // ​    routineCheck: { (루틴 인증할 때 필요한 것들)
    // ​        checkDate: "DateTime" (인증날짜)
    // ​        content: "String" (내용)
    // ​        imgOriName: "String" (이미지 이름)
    // ​    }
    // }
    console.log(`루틴 세분류 ID : ${toAuthRoutine.routineId}`);
    console.log(`달력에 선택한 날짜 : ${value}`);
    console.log(`루틴 인증 내용 : ${routineAuthText}`);
    console.log(`이미지 파일 : ${fileName}`);
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
      top: "300px",
      left: "300px",
      right: "300px",
      bottom: "200px",
      border: "5px solid black",
      borderRadius: "20px",
    },
  };

  //------------------------------로그인 시작
  const isAccess = useSelector((state) => state.authToken.accessToken);
  const dispatch = useDispatch();
  useEffect(() => {
    allAuth(isAccess, dispatch);
  }, [dispatch]);
  //-----------------------------------여기까지

  return (
    <div>
      <Nav />
      <MainBanner
        bannerImg={routineAuthBannerImg}
        bannerMent={routineAuthBannerMents}
      />
      <div className={classes.routineCardSection}>
        {selectRoutineState.map((item) => {
          const { content, routineDetailId, imgPath } = item;
          return (
            <RoutineAuthCard
              key={routineDetailId}
              content={content}
              routineId={routineDetailId}
              imgPath={imgPath}
              handleModalOpen={setModalIsOpen}
              handleAuthInfo={setToAuthRoutine}
            />
          );
        })}
      </div>
      <hr className={classes.divideLine} />
      {/* 하단 그룹배너 */}
      <div className={classes.toGroupBanner}>
        <div className={classes.toGroupBannerLeft}>
          <p className={classes.toGroupBannerLeftTitle}>
            혼자 루틴을 진행하기 어려우신가요?
          </p>
          <p className={classes.toGroupBannerLeftDesc}>
            단체 루틴을 통해 다른 오늘러와 공유해보세요!
          </p>
          <p className={classes.toGroupBannerLeftDesc}>
            오늘의 루틴을 진행할 힘을 얻을 수 있을거랍니다!
          </p>
          <Link to="/GroupRoutine">
            <button className={classes.toGroupBannerLeftBtn}>
              단체루틴 바로가기
            </button>
          </Link>
        </div>
        <div className={classes.toGroupBannerRight}>
          <img
            className={classes.toGroupBannerRightImg}
            src="images/BannerImage/toGroupBanner.png"
            alt="toGroupBanner"
          />
        </div>
      </div>
      {/* 인증 모달 */}
      <Modal
        style={modalStyle}
        isOpen={modalIsOpen}
        onRequestClose={() => closeModal(false)}
      >
        <div className={classes.authModal}>
          <FontAwesomeIcon
            onClick={closeModal}
            icon={faCircleXmark}
            className={classes.modalClose}
          />
          <div className={classes.authModalTitle}>
            <p>
              User 님의 "
              <span style={{ color: "#a581cf" }}>{toAuthRoutine.content}</span>"
              루틴
            </p>
          </div>

          <div className={classes.authModalMain}>
            <div className={classes.authModalMainLeft}>
              <p className={classes.authModalMainLeftTitle}>
                루틴 인증 날짜를 선택해주세요
              </p>
              <Calendar
                onChange={onChange}
                value={value}
                formatDay={(locale, date) => dayjs(date).format("DD")}
              />
            </div>
            <div className={classes.authModalMainRight}>
              <div className={classes.authModalMainRightText}>
                <p>이번 루틴은 어떠셨나요?</p>
                <textarea
                  className={classes.authModalMainRightTextArea}
                  name="textarea"
                  spellCheck="false"
                  value={routineAuthText} // 업데이트된 부분
                  onChange={handleTextChange} // 업데이트된 부분
                ></textarea>
              </div>
              <div className={classes.authModalMainRightImg}>
                <p>이미지 업로드</p>
                <div>
                  <input
                    className={classes.uploadName}
                    value={fileName}
                    placeholder="첨부파일"
                  />
                  <label className={classes.uploadLabel} htmlFor="file">
                    파일찾기
                  </label>
                  <input
                    type="file"
                    id="file"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </div>
              </div>
              <div className={classes.authModalMainRightNone}></div>
            </div>
          </div>
          <div className={classes.authModalFooter}>
            <button
              className={classes.authModalBtn}
              onClick={submitAuthModalData}
            >
              루틴 인증하기
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default RoutineAuthMain;
