import classes from "./WidgetBucket.module.css";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

import axios from "axios";

function WidgetBucket() {
  const AccsesToken = useSelector((state) => state.authToken.accessToken);
  const memberId = useParams().memberId;

  const [isMe, setIsMe] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [bucket, setBucket] = useState([]);
  const [newBucket, setNewBucket] = useState("");
  const [editedBucket, setEditedBucket] = useState("");
  const [editedBucketId, setEditedBucketId] = useState(null);

  const [nowPage, setNowPage] = useState(1);
  const itemsIncludePage = 4;
  const [checkedItems, setCheckedItems] = useState({});

  const getBucket = () => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/api/mypage/bucketlist/${memberId}`,
        {
          params: { memberId },
          headers: { Authorization: AccsesToken },
        }
      )
      .then((response) => {
        setBucket(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  useEffect(() => {
    const loggedInUserId = sessionStorage.getItem("memberId");
    setIsMe(
      loggedInUserId === memberId ||
        bucket.some((bucketItem) => bucketItem.memberId === loggedInUserId)
    );
    getBucket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberId, AccsesToken]);

  const createBucket = () => {
    if (newBucket.trim() === "") {
      return;
    }
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/api/mypage/bucketlist`,
        {
          content: newBucket,
        },
        {
          headers: { Authorization: AccsesToken },
        }
      )
      .then((response) => {
        getBucket();
        setNewBucket("");
        // console.log(response.data);
      })

      .catch((error) => {
        // console.log(error);
      });
  };

  const saveEditedBucket = () => {
    editBucket(editedBucketId, editedBucket);
    setIsEdit(false);
    setEditedBucketId("");
  };

  const editBucket = (wishDiaryId) => {
    if (editedBucket.trim() === "") {
      return;
    }
    axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/api/mypage/bucketlist/${wishDiaryId}`,
        { content: editedBucket },
        {
          headers: { Authorization: AccsesToken },
        }
      )
      .then((response) => {
        getBucket();
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  const deleteAlert = (messageId) => {
    let confirmed = false;

    Swal.fire({
      icon: "question",
      title: "해당 버킷 리스트를 삭제합니다.",
      text: "정말 삭제하시겠습니까?",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
      showCancelButton: true,
    }).then((response) => {
      if (response.isConfirmed) {
        confirmed = true;
        deleteBucket(messageId);
      }
    });
  };

  const deleteBucket = (wishDiaryId) => {
    axios
      .delete(
        `${process.env.REACT_APP_BASE_URL}/api/mypage/bucketlist/${wishDiaryId}`,
        {
          headers: { Authorization: AccsesToken },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "해당 버킷 리스트가 삭제되었습니다.",
            text: "",
            confirmButtonText: "확인",
          });
        }
        // console.log(response);
        getBucket();
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  const indexOfLastItem = nowPage * itemsIncludePage;
  const indexOfFirstItem = indexOfLastItem - itemsIncludePage;

  const nowBucket =
    bucket.length === 0 ? [] : bucket.slice(indexOfFirstItem, indexOfLastItem);

  // Update the current page
  // const paginate = (pageNumber) => setNowPage(pageNumber);
  const setPage = (pageNumber) => {
    if (
      pageNumber < 1 ||
      pageNumber > Math.ceil(bucket.length / itemsIncludePage)
    ) {
      return; // Prevent setting invalid page numbers
    }
    setNowPage(pageNumber);
  };

  const keyPressHandler = (e) => {
    if (e.key === "Enter") {
      createBucket();
    }
  };

  const keyPressHandlerEdit = (e) => {
    if (e.key === "Enter") {
      saveEditedBucket();
    }
  };

  return (
    <div className={classes.WidgetBucket_}>
      <span className={classes.bucketTitle}> 버킷리스트 </span>
      <div className={classes.WidgetBucket}>
        <div>
          <div className={classes.bucketSection}>
            <div className={classes.pagination}>
              <button
                className={classes.moveButtonStyle}
                onClick={() => setPage(nowPage - 1)}
              >
                <img src="../../images/Widget/before.png" alt="before" />
              </button>
            </div>
            <div className={classes.bucketList}>
              {nowBucket.length === 0 && (
                <div className={classes.bucketListNoting}>
                  버킷리스트를 채워볼까요?😊
                </div>
              )}

              {nowBucket.length > 0 &&
                nowBucket.map((bucketItem) => (
                  <div key={bucketItem.wishDiaryId}>
                    {isEdit && editedBucketId === bucketItem.wishDiaryId ? (
                      <div className={classes.bucketListInputBtn}>
                        <input
                          className={classes.inputstyle_}
                          type="text"
                          value={editedBucket}
                          spellCheck="false"
                          onKeyDown={keyPressHandlerEdit}
                          onChange={(event) => {
                            setEditedBucket(event.target.value);
                            setEditedBucketId(bucketItem.wishDiaryId);
                          }}
                        />
                        <div className={classes.bucketListBtnStyle}>
                          <button
                            className={classes.bucketListBtn}
                            onClick={() => saveEditedBucket()}
                          >
                            저장
                          </button>

                          <button
                            className={classes.bucketListBtn}
                            onClick={() => setIsEdit(false)}
                          >
                            취소
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className={classes.bucketListSection}>
                      <div className={classes.bucketItemContainer}>
                        <input
                          type="checkbox"
                          checked={checkedItems[bucketItem.wishDiaryId] || false}
                          onChange={(event) => {
                            const isChecked = event.target.checked;
                            setCheckedItems((prev) => ({
                              ...prev,
                              [bucketItem.wishDiaryId]: isChecked,
                            }));
                          }}
                        />
                        <p
                          className={`${classes.bucketItem} ${
                            checkedItems[bucketItem.wishDiaryId]
                              ? classes.checkedItem
                              : ""
                          }`}
                        >
                          {bucketItem.content}
                        </p>
                      </div>
                        {isMe && (
                          <div className={classes.editButtonSection}>
                            <button
                              className={classes.editButtonStyle}
                              onClick={() => {
                                setIsEdit(true);
                                setEditedBucket(bucketItem.content);
                                setEditedBucketId(bucketItem.wishDiaryId);
                              }}
                            >
                              <img
                                // className={classes.edit}
                                src="../../images/Widget/edit.png"
                                alt="edit"
                              />
                            </button>
                            <button
                              className={classes.editButtonStyle}
                              onClick={() =>
                                deleteAlert(bucketItem.wishDiaryId)
                              }
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
                ))}
            </div>

            <div className={classes.pagination}>
              <button
                className={classes.moveButtonStyle}
                onClick={() => setPage(nowPage + 1)}
              >
                <img src="../../images/Widget/next.png" alt="next" />
              </button>
            </div>
          </div>

          <div>
            {isMe && (
              <div className={classes.widgetInputStyle}>
                <input
                  className={classes.inputstyle}
                  type="text"
                  value={newBucket}
                  placeholder="여러분의 버킷 리스트를 남겨보세요!"
                  spellCheck="false"
                  onKeyDown={keyPressHandler}
                  onChange={(event) => setNewBucket(event.target.value)}
                />
                <button className={classes.inputBtn} onClick={createBucket}>
                  저장
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WidgetBucket;
