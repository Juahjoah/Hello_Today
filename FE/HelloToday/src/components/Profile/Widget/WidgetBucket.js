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

  const getBucket = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/mypage/bucketlist`, {
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
    setIsMe(memberId === +sessionStorage.getItem("memberId") ? true : false);
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

  return (
    <div className="WidgetBucket">
      <p> {memberId} 님의 버킷리스트</p>
      <div>
        {bucket.length === 0 && <div>버킷리스트가 없습니다.</div>}
        {bucket.length > 0 &&
          bucket.map((bucketItem) => (
            <div key={bucketItem.wishDiaryId}>
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
                  {bucketItem.content}
                  {isMe && (
                    <div>
                      <button
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

        <div>
          {isMe && (
            <div>
              <input
                type="text"
                value={newBucket}
                onChange={(event) => setNewBucket(event.target.value)}
              />
              <button onClick={createBucket}>저장</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
// }

export default WidgetBucket;
