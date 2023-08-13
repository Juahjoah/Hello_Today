import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

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

  const getDiary = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/mypage/onediary/`, {
        headers: { Authorization: AccsesToken },
      })
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
        // console.log(response);
        getDiary();
      })

      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="WidgetDiary">
      <p> {memberId}님의 한 줄 일기 </p>
      <div>
        {diary.length === 0 && <div>일기가 없습니다.</div>}
        {diary.length > 0 &&
          diary.map((diaryItem) => {
            return (
              <div key={diaryItem.wishDiaryId}>
                {isEdit && editedDiaryId === diaryItem.wishDiaryId ? (
                  <div>
                    <input
                      type="text"
                      value={editedDiary}
                      onChange={(event) => {
                        setEditedDiary(event.target.value);
                        setEditedDiaryId(diaryItem.wishDiaryId);
                      }}
                    />
                    <button onClick={() => saveEditedDiary()}>저장</button>
                    <button onClick={() => setIsEdit(false)}>취소</button>
                  </div>
                ) : (
                  <div>
                    {diaryItem.content}
                    {isMe && (
                      <div>
                        <button
                          onClick={() => {
                            setIsEdit(true);
                            setEditedDiaryId(diaryItem.wishDiaryId);
                            setEditedDiary(diaryItem.content);
                          }}
                        >
                          <img
                            // className={classes.edit}
                            src="../../images/Widget/edit.png"
                            alt="edit"
                          />
                        </button>
                        <button
                          onClick={() => deleteDiary(diaryItem.wishDiaryId)}
                        >
                          <img
                            // className={classes.clear}
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
        <div>
          {isMe && (
            <div>
              <input
                type="text"
                value={newDiary}
                onChange={(event) => setNewDiary(event.target.value)}
              />
              <button onClick={() => createDiary()}>댓글 입력</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WidgetDiary;
