import classes from "./SelectedRoutine.module.css"
import { useState } from "react";
import RoutineAuthCard from "./RoutineAuthCard";
import { Link } from "react-router-dom";
import MainBanner from "../common/MainBanner";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import Calendar from "react-calendar";
import dayjs from "dayjs";
import axios from "axios";
import { useSelector } from "react-redux";

function SelectedRoutine(props) {
    console.log(props);
    const LOCAL_URL = "http://localhost:8080"
    const routineDetailList = props.routineCheckList;
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const routineAuthBannerImg = "main_banner_routineAuth1";
    const routineAuthBannerMents = [
        "루틴은 일주일 단위로 진행됩니다.",
        "일주일 간 열심히 노력하며 진행한 루틴!",
        "잊지말고, 기록으로 남겨두세요",
    ];

    const [value, onChange] = useState(new Date()); // 루틴 인증 날짜
    const [routineAuthText, setRoutineAuthText] = useState(""); // 루틴 인증 내용
    const [fileName, setFileName] = useState(""); // 루틴 인증 이미지 파일
    const AccsesToken = useSelector((state) => state.authToken.accessToken);

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
        setModalIsOpen(false);
    };

    const [toAuthRoutine, setToAuthRoutine] = useState({
        routineDetailDto: props,
        // content: "",
    });

    const handleTextChange = (event) => {
        const text = event.target.value;
        setRoutineAuthText(text);
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFileName(selectedFile.name);
        } else {
            setFileName("");
        }
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

        // axios({
        //     url: `${LOCAL_URL}/api/routine/private/check`,
        //     method: 'put',
        //     params: {
        //         routineCheckId: "219",
        //         // checkDaySeq
        //         checkDaySeq: "2", 
        //         content: `${routineAuthText}`,
        //         checkDate: "2023-08-06 06:15:37",
        //         file: "test",
        //     }, headers: {
        //         "Content-Type": "multipart/form-data",
        //         Authorization: AccsesToken,
        //     }
        // })

        const formData = new FormData();
        const routineCheckRequest = {
            routineCheckId: "219",
            checkDaySeq: "2",
            content: "test",
            checkDate: "2023-08-06 06:15:37"
        }

        formData.append("request", new Blob([JSON.stringify(routineCheckRequest)], {
            type: "application/json"
        }));
        formData.append("file", "test");
        
        axios.put(`${LOCAL_URL}/api/routine/private/check`, formData, {
            headers: {
                Authorization: AccsesToken,
            }

        })
        .then((res) => {
            console.log(res.data);
            console.log("루틴 인증 성공")
        }).catch((error) => console.log(error));

        console.log(`루틴 세분류 ID : ${toAuthRoutine.routineDetailDto.routineDetailId}`);
        console.log(`달력에 선택한 날짜 : ${value}`);
        console.log(`루틴 인증 내용 : ${routineAuthText}`);
        console.log(`이미지 파일 : ${fileName}`);
    };

    return (
        <div>
            <MainBanner
                bannerImg={routineAuthBannerImg}
                bannerMent={routineAuthBannerMents}
            />
            <div className={classes.routineCardSection}>
                {routineDetailList.map((item) => {
                    return (
                        <RoutineAuthCard
                            routineDetailDto={item.routineDetailDto}
                            routineCheckDtoList={item.routine}
                            handleModalOpen={setModalIsOpen}
                            key={item.routineDetailDto.routineDetailId}
                            handleAuthInfo={setToAuthRoutine}
                        // content={content}
                        // routineId={routineDetailId}
                        // imgPath={imgPath}
                        />
                    );
                })}
            </div>

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
            <div>
              User 님의 "
              <span style={{ color: "#a581cf" }}>{toAuthRoutine.routineDetailDto.content}</span>"
              루틴
            </div>
          </div>

          <div className={classes.authModalMain}>
            <div className={classes.authModalMainLeft}>
              <div className={classes.authModalMainLeftTitle}>
                루틴 인증 날짜를 선택해주세요
              </div>
              <Calendar
                onChange={onChange}
                value={value}
                formatDay={(locale, date) => dayjs(date).format("DD")}
              />
            </div>
            <div className={classes.authModalMainRight}>
              <div className={classes.authModalMainRightText}>
                <div className={classes.authModalMainRightDescOne}>
                  이번 루틴은 어떠셨나요?
                </div>
                <textarea
                  className={classes.authModalMainRightTextArea}
                  name="textarea"
                  spellCheck="false"
                  value={routineAuthText} // 업데이트된 부분
                  onChange={handleTextChange} // 업데이트된 부분
                ></textarea>
              </div>
              <div className={classes.authModalMainRightImg}>
                <div className={classes.authModalMainRightDescTwo}>
                  이미지 업로드
                </div>
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
export default SelectedRoutine;
