import classes from "./SelectedRoutine.module.css";
import { useEffect, useState } from "react";
import RoutineAuthCard from "./RoutineAuthCard";
import { Link } from "react-router-dom";
import MainBanner from "../common/MainBanner";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import Calendar from "react-calendar";
import dayjs from "dayjs";
import axios from "axios";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { routineCheck } from "../../store/routineCheckModalSlice";
import Swal from "sweetalert2";
import confetti from "canvas-confetti";
import { allRoutineCheck } from "../../store/allRoutineCheckSlice";

function SelectedRoutine({ routinePrivate }) {
  const allRoutineCheckFlag = useSelector((state) => state.allRoutineCheck);
  useEffect(() => {
    if (allRoutineCheckFlag) {
      fire(0.25, {
        spread: 100,
        startVelocity: 60,
      });
      fire(0.2, {
        spread: 110,
      });
      fire(0.35, {
        spread: 120,
        decay: 0.91,
        scalar: 1.0,
      });
      fire(0.1, {
        spread: 150,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.5,
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      });

      Swal.fire({
        title: "루틴 진행",
        text: "루틴을 모두 진행하셨습니다! 🎉",
        confirmButtonText: "확인",
      });
    }
  }, [allRoutineCheckFlag]);

  var count = 300;
  var defaults = {
    origin: { y: 0.8 },
  };

  function fire(particleRatio, opts) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      })
    );
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const routineAuthBannerImg = allRoutineCheckFlag
    ? "routine_medal"
    : "main_banner_routineAuth1";
  const routineAuthBannerMents = allRoutineCheckFlag
    ? [
        "루틴 진행도 100% 달성!",
        "루틴 완성을 정말 축하드려요!!",
        "다음 루틴도 100% 달성 기대할게요!",
      ]
    : [
        "루틴은 일주일 단위로 진행됩니다.",
        "일주일 간 열심히 노력하며 진행한 루틴!",
        "잊지말고, 기록으로 남겨두세요",
      ];

  const [value, onChange] = useState(new Date()); // 루틴 인증 날짜
  const [routineAuthText, setRoutineAuthText] = useState(""); // 루틴 인증 내용
  const [routineInputkTextCount, setRoutineInputTextCount] = useState(0);
  const [fileName, setFileName] = useState(""); // 루틴 인증 이미지 파일
  const AccsesToken = useSelector((state) => state.authToken.accessToken);
  const nickName = localStorage.getItem("nickName");

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
      top: "60px",
      left: "100px",
      right: "100px",
      bottom: "60px",
      border: "3px solid black",
      borderRadius: "12px",
    },
  };

  const closeModal = () => {
    setRoutineAuthText("");
    setSelectedFile(null);
    setFileName("");
    setModalIsOpen(false);
  };

  const [toAuthRoutine, setToAuthRoutine] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null); // 선택한 파일을 상태로 관리

  const AuthSubmitBtn = classNames({
    [classes.cantAuth]: !routineAuthText,
    [classes.canAuth]: routineAuthText,
  });

  const handleTextChange = (event) => {
    const text = event.target.value;
    setRoutineAuthText(text);
    setRoutineInputTextCount(text.length);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
    } else {
      setSelectedFile(null);
      setFileName("");
    }
  };

  const submitAuthModalData = () => {
    const routineCheckDt = new Date(new Date(`${value}`).toLocaleDateString());
    const routineStartDt = new Date(
      new Date(routinePrivate.routineStartDate).toLocaleDateString()
    );

    const calCheckSeq =
      Math.ceil(
        Math.abs(routineCheckDt.getTime() - routineStartDt.getTime()) /
          (1000 * 60 * 60 * 24)
      ) + 1;

    let offset = new Date().getTimezoneOffset() * 60000;
    const checkDate = new Date(new Date(`${value}`).getTime() - offset);

    const formData = new FormData();
    const routineCheckRequest = {
      // routineCheckId: "219",
      // checkDaySeq
      // checkDate(선택한 날짜) - 루틴 시작 날짜 + 1
      // 1부터 시작하니까
      // routineId와 checkDaySeq인 routineCheck데이터 찾고
      // update하는 걸로 API  수정하기
      checkDaySeq: calCheckSeq,
      routineDetailId: `${toAuthRoutine.routineDetailDto.routineDetailId}`,
      routineId: routinePrivate.routineId,
      content: `${routineAuthText}`,
      checkDate: checkDate,
    };

    formData.append(
      "request",
      new Blob([JSON.stringify(routineCheckRequest)], {
        type: "application/json",
      })
    );
    formData.append("file", selectedFile);

    Swal.fire({
      icon: "info",
      title: "루틴 인증",
      text: "루틴 인증을 정말 등록하시겠습니까?",
      confirmButtonText: "확인",
      cancelButtonAriaLabel: "취소",
      showCancelButton: true,
    }).then((response) => {
      if (response.isConfirmed) {
        axios
          .put(
            `${process.env.REACT_APP_BASE_URL}/api/routine/private/check`,
            formData,
            {
              headers: {
                Authorization: AccsesToken,
              },
            }
          )
          .then((res) => {
            navigate("/");
          })
          .then(() => {
            setModalIsOpen(false);
            setRoutineAuthText("");
            setSelectedFile(null);
            setFileName("");
            dispatch(routineCheck(true));
          })
          .catch((error) => {
            if (error.response.data.code === 4001) {
              Swal.fire({
                icon: "warning",
                title: "루틴 인증",
                text: "해당 날짜에 이미 인증한 내역이 존재합니다.",
                confirmButtonText: "확인",
              });
            }
          });
      }
    });
  };

  function checkRoutineCheckAll(routinePrivate) {
    var flag = true;
    for (var i = 0; i < routinePrivate?.routineDetailCatCheck?.length; i++) {
      for (
        var j = 0;
        j < routinePrivate.routineDetailCatCheck[i].routineCheckDtoList.length;
        j++
      ) {
        if (
          routinePrivate.routineDetailCatCheck[i].routineCheckDtoList[j]
            .checkDate == null
        ) {
          return false;
        }
      }
    }
    return flag;
  }

  const result = checkRoutineCheckAll(routinePrivate);

  if (result) {
    dispatch(allRoutineCheck(true));
  }

  return (
    <div>
      <MainBanner
        bannerImg={routineAuthBannerImg}
        bannerMent={routineAuthBannerMents}
      />
      <div className={classes.routineSelectMain}>
        <div className={classes.test}>
          오늘도 루틴을 잘 진행하셨나요?!
          <span className={classes.testSide} style={{ marginLeft: "20px" }}>
            루틴을 모두 7일 동안 성공하면 '오늘도, 안녕'의 깜짝 선물이!
          </span>
        </div>
      </div>

      <div className={classes.routineCardSection}>
        {routinePrivate.routineDetailCatCheck.map((item) => {
          return (
            <RoutineAuthCard
              routineStartDate={routinePrivate.routineStartDate}
              routineDetailDto={item.routineDetailDto}
              routineCheckDtoList={item.routineCheckDtoList}
              handleModalOpen={setModalIsOpen}
              key={item.routineDetailDto.routineDetailId}
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
            <button
              className={classes.toGroupBannerLeftBtn}
              style={{ marginTop: "15px" }}
            >
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
            <div>
              {nickName} 님의 "
              <span style={{ color: "#a581cf" }}>
                {toAuthRoutine?.routineDetailDto?.content}
              </span>
              "
              {/* <span style={{ color: "#a581cf" }}>{toAuthRoutine.routineDetailDto.content}</span>" */}
              루틴
            </div>
          </div>
          <div className={classes.authModalMain} style={{ marginLeft: "3%" }}>
            <div className={classes.authModalMainLeft}>
              <div className={classes.authModalMainLeftTitle}>
                루틴 인증 날짜를 선택해주세요
              </div>
              <Calendar
                onChange={onChange}
                defaultValue={value}
                formatDay={(locale, date) => dayjs(date).format("DD")}
                // 루틴 시작 날짜
                minDate={new Date(routinePrivate.routineStartDate)}
                // 오늘 날짜
                maxDate={new Date()}
              />
              <div style={{ margin: "4px" }}></div>
              <span className={classes.caution}>
                ※ 미래 날짜에 대한 루틴 인증은 안돼요! 인증은 루틴 시작일자부터
                오늘날짜만 가능합니다.
              </span>
            </div>

            <div className={classes.authModalMainRight}>
              <div className={classes.authModalMainRightText}>
                <div className={classes.authModalMainRightDescOne}>
                  이번 루틴은 어떠셨나요?
                </div>
                <div className={classes.authtextArea}>
                  <textarea
                    className={classes.authModalMainRightTextArea}
                    name="textarea"
                    spellCheck="false"
                    defaultValue={routineAuthText} // 업데이트된 부분
                    onChange={handleTextChange} // 업데이트된 부분
                    maxLength="500"
                    placeholder="오늘 진행한 루틴은 어땠는지 한 이야기를 들려주세요."
                  ></textarea>
                  <div className={classes.authModalMainRightTextAreaLimit}>
                    <span>{routineInputkTextCount}</span>
                    <span>/500 자</span>
                  </div>
                </div>
              </div>
              <div className={classes.authModalMainRightImg}>
                <div className={classes.authModalMainRightDescTwo}>
                  이미지 업로드
                </div>
                <div>
                  <input
                    className={classes.uploadName}
                    defaultValue={fileName}
                    placeholder="첨부파일"
                    readOnly={true}
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
            {routineAuthText ? (
              <button className={AuthSubmitBtn} onClick={submitAuthModalData}>
                루틴 인증하기
              </button>
            ) : (
              <button className={AuthSubmitBtn} disabled>
                루틴 인증하기
              </button>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default SelectedRoutine;
