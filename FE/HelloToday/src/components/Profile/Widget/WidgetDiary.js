import classes from "./WidgetDiary.module.css";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

import axios from "axios";

function WidgetDiary() {
  const AccsesToken = useSelector((state) => state.authToken.accessToken);
  const memberId = useParams().memberId;

  const [isMe, setIsMe] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [diary, setDiary] = useState([]);
  const [newDiary, setNewDiary] = useState("");
  const [editedDiary, setEditedDiary] = useState("");
  const [editedDiaryId, setEditedDiaryId] = useState(null);

  const [nowPage, setNowPage] = useState(1);
  const itemsIncludePage = 4;

  const getDiary = () => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/api/mypage/onediary/${memberId}`,
        {
          params: { memberId },
          headers: { Authorization: AccsesToken },
        }
      )
      .then((response) => {
        setDiary(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const loggedInUserId = sessionStorage.getItem("memberId");
    setIsMe(
      loggedInUserId === memberId ||
        diary.some((diaryItem) => diaryItem.memberId === loggedInUserId)
    );
    getDiary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberId, AccsesToken]);
  // }, [diary, props.memberId]);

  const createDiary = () => {
    if (newDiary.trim() === "") {
      return;
    }
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/api/mypage/onediary`,
        {
          content: newDiary,
        },
        {
          headers: { Authorization: AccsesToken },
        }
      )
      .then((response) => {
        setNewDiary("");
        getDiary();
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editDiary = (wishDiaryId) => {
    if (editedDiary.trim() === "") {
      return;
    }
    axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/api/mypage/onediary/${wishDiaryId}`,
        {
          content: editedDiary,
        },
        {
          headers: { Authorization: AccsesToken },
        }
      )
      .then((response) => {
        // console.log(response);
        getDiary();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveEditedDiary = () => {
    editDiary(editedDiaryId, editedDiary);
    setIsEdit(false);
    setEditedDiaryId("");
  };

  const deleteAlert = (messageId) => {
    let confirmed = false;

    Swal.fire({
      icon: "question",
      title: "해당 일기를 삭제합니다.",
      text: "정말 삭제하시겠습니까?",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
      showCancelButton: true,
    }).then((response) => {
      if (response.isConfirmed) {
        confirmed = true;
        deleteDiary(messageId);
      }
    });
  };

  const deleteDiary = (wishDiaryId) => {
    axios
      .delete(
        `${process.env.REACT_APP_BASE_URL}/api/mypage/onediary/${wishDiaryId}`,
        // { params: { oneDiaryId: wishDiaryId } },
        {
          headers: { Authorization: AccsesToken },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "소중한 일기가 삭제되었습니다.",
            text: "",
            confirmButtonText: "확인",
          });
        }
        // console.log(response);
        getDiary();
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const indexOfLastItem = nowPage * itemsIncludePage;
  const indexOfFirstItem = indexOfLastItem - itemsIncludePage;

  const nowdiary =
    diary.length === 0 ? [] : diary.slice(indexOfFirstItem, indexOfLastItem);

  const setPage = (pageNumber) => {
    if (
      pageNumber < 1 ||
      pageNumber > Math.ceil(diary.length / itemsIncludePage)
    ) {
      return; // Prevent setting invalid page numbers
    }
    setNowPage(pageNumber);
  };

  const keyPressHandler = (e) => {
    if (e.key === "Enter") {
      createDiary();
    }
  };

  const keyPressHandlerEdit = (e) => {
    if (e.key === "Enter") {
      saveEditedDiary();
    }
  };

  return (
    <div className={classes.WidgetDiary}>
      <div className={classes.diaryTitleSection}>
        <div className={classes.diaryTitle}> 한 줄 일기 </div>
      </div>
      <div className={classes.wishDiaryBody}>
        <div className={classes.wishDiaryContent}>
          <div className={classes.pagination_before}>
            <button
              className={classes.wishDiaryPaginationBtn}
              onClick={() => setPage(nowPage - 1)}
            >
              <img
                style={{ width: "20px" }}
                src="../../images/Widget/before.png"
                alt="before"
              />
            </button>
          </div>
          <div className={classes.wishDiaryCenter}>
            {nowdiary.length === 0 && (
              <div className={classes.wishDiaryNothing}>
                오늘러의 하루를 기록해볼까요?😊
              </div>
            )}
            {nowdiary.length > 0 &&
              nowdiary.map((diaryItem) => {
                return (
                  <div key={diaryItem.wishDiaryId}>
                    {isEdit && editedDiaryId === diaryItem.wishDiaryId ? (
                      <div className={classes.wishDiaryEditInputStyle}>
                        <input
                          type="text"
                          className={classes.inputstyle}
                          value={editedDiary}
                          spellCheck="false"
                          onKeyDown={keyPressHandlerEdit}
                          onChange={(event) => {
                            setEditedDiary(event.target.value);
                            setEditedDiaryId(diaryItem.wishDiaryId);
                          }}
                        />
                        <div className={classes.wishDiaryinputBtnMiniStyle}>
                          <button
                            className={classes.wishDiaryinputBtnMini}
                            onClick={() => saveEditedDiary()}
                          >
                            저장
                          </button>
                          <button
                            className={classes.wishDiaryinputBtnMini}
                            onClick={() => setIsEdit(false)}
                          >
                            취소
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className={classes.wishDiaryContentTxt}>
                        <div className={classes.wishDiaryTxtt}>
                          <p className={classes.wishDiaryTxt}>
                            {diaryItem.content}
                          </p>
                        </div>
                        {isMe && (
                          <div>
                            <button
                              className={classes.wishDiaryEditButtonStyle}
                              onClick={() => {
                                setIsEdit(true);
                                setEditedDiaryId(diaryItem.wishDiaryId);
                                setEditedDiary(diaryItem.content);
                              }}
                            >
                              <img
                                src="../../images/Widget/edit.png"
                                alt="edit"
                              />
                            </button>
                            <button
                              className={classes.wishDiaryEditButtonStyle}
                              onClick={() => deleteAlert(diaryItem.wishDiaryId)}
                            >
                              <img
                                src="../../images/Widget/clear.png"
                                alt="clear"
                              />
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
          <div className={classes.pagination_next}>
            <button
              className={classes.wishDiaryPaginationBtn}
              onClick={() => setPage(nowPage + 1)}
            >
              <img
                style={{ width: "20px" }}
                src="../../images/Widget/next.png"
                alt="next"
              />
            </button>
          </div>
        </div>
        <div>
          {isMe && (
            <div className={classes.widgetBigInputStyle}>
              <input
                placeholder="한 줄 일기를 입력해주세요"
                type="text"
                className={classes.inputstyle}
                value={newDiary}
                spellCheck="false"
                onKeyDown={keyPressHandler}
                onChange={(event) => setNewDiary(event.target.value)}
              />
              <button
                className={classes.wishDiaryinputBtn}
                onClick={() => createDiary()}
              >
                저장
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WidgetDiary;
