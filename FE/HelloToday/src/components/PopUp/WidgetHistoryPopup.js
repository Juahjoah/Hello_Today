import Modal from "react-modal";
import classes from "./WidgetHistoryPopup.module.css";
import axios from "axios";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function WidgetHistoryPopup({ isOpen, setIsPopupOpen, routineId }) {
  const [routineList, setRoutineList] = useState([]);
  const memberId = useParams().memberId; //url에서 param가져오기
  const AccsesToken = useSelector((state) => state.authToken.accessToken);

  useEffect(() => {
    const params = {
      routineId: routineId,
    };
    const headers = {
      Authorization: AccsesToken,
    };
    if (isOpen) {
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/api/mypage/routinehistory/${memberId}/${routineId}`,
          { params, headers }
        )
        .then((res) => {
          console.log(res);
          setRoutineList(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isOpen]);

  const closePopup = () => {
    setRoutineList([]);
    setIsPopupOpen(false);
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
      flexDirection: "column",
      backgroundColor: "rgba(255,255,255,0.95)",
      overflow: "auto",
      zIndex: 10,
      top: "8vh",
      left: "35vh",
      right: "35vh",
      bottom: "8vh",
      border: "3px solid black",
      borderRadius: "12px",
    },
  };

  return (
    <div>
      <Modal
        style={modalStyle}
        isOpen={isOpen}
        onRequestClose={() => closePopup()}
      >
        <div>
          <p>{routineList.length > 0 ? "" : "기록을 남겨주세요"}</p>
          <div>
            {routineList.map((item, index) => {
              return (
                <div className={classes.routinehistory} key={index}>
                  <div className={classes.routinehistoryContent}>
                    <p className={classes.routinehistory_day}>
                      {item.checkDaySeq}일차
                    </p>
                    {item.routineDetail.length > 0 ? (
                      <div>
                        {item.routineDetail.map((detail, detailIndex) => (
                          <div
                            className={classes.routineHisotry_box}
                            key={detailIndex}
                          >
                            <p> 루틴 종류 : {detail.routineContent}</p>
                            <p>
                              인증일 :
                              {new Date(detail.writeDate).toLocaleDateString()}
                            </p>
                            <hr />
                            <div className={classes.routinehistory_bottom}>
                              {!detail.imgPath ||
                              detail.imgPath === "" ||
                              detail.imgPath === undefined ? (
                                <img
                                  className={classes.routineHisotryp_img}
                                  src="/images/logo.png"
                                  alt="Default"
                                />
                              ) : (
                                <img
                                  className={classes.routineHisotryp_img}
                                  src={detail.imgPath}
                                  alt={`Image ${detailIndex}`}
                                />
                              )}
                              <div
                                className={classes.routinehistory_vline}
                              ></div>
                              <div className={classes.routinehistory_text}>
                                <p className={classes.routinehistory_text_p}>
                                  내용: {detail.content}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div>다음 번에는 인증 해주세요~~ (뭐라고 하지...)</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default WidgetHistoryPopup;
