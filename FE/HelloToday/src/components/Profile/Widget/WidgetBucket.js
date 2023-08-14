import classes from "./WidgetBucket.module.css";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

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
  const itemsIncludePage = 5;

  const getBucket = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/mypage/bucketlist`, {
        params: { memberId },
        headers: { Authorization: AccsesToken },
      })
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

  const deleteBucket = (wishDiaryId) => {
    axios
      .delete(
        `${process.env.REACT_APP_BASE_URL}/api/mypage/bucketlist/${wishDiaryId}`,
        {
          headers: { Authorization: AccsesToken },
        }
      )
      .then((response) => {
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

  return (
    <div className={classes.WidgetBucket}>
      <p className={classes.bucketTitle}> 버킷리스트 </p>
      <div className={classes.bucketList}>
        <div className={classes.bucketSection}>
          <div className={classes.pagination}>
            <button
              className={classes.editButtonStyle}
              onClick={() => setPage(nowPage - 1)}
            >
              <img src="../../images/Widget/before.png" alt="before" />
            </button>
          </div>
          {nowBucket.length === 0 && <div>버킷리스트가 없습니다.</div>}

          {nowBucket.length > 0 &&
            nowBucket.map((bucketItem) => (
              <div
                className={classes.bucketListSection}
                key={bucketItem.wishDiaryId}
              >
                {isEdit && editedBucketId === bucketItem.wishDiaryId ? (
                  <div>
                    <input
                      type="text"
                      value={editedBucket}
                      onChange={(event) => {
                        setEditedBucket(event.target.value);
                        setEditedBucketId(bucketItem.wishDiaryId);
                      }}
                    />
                    <button onClick={() => saveEditedBucket()}>저장</button>
                    <button onClick={() => setIsEdit(false)}>취소</button>
                  </div>
                ) : (
                  <div>
                    <p className={classes.bucketItem}>{bucketItem.content}</p>
                    {isMe && (
                      <div>
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
                          onClick={() => deleteBucket(bucketItem.wishDiaryId)}
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

          <div className={classes.pagination}>
            <button
              className={classes.editButtonStyle}
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
                placeholder="응원의 댓글을 남겨주세요!"
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
  );
}

export default WidgetBucket;
