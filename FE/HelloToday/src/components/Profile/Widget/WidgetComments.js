import classes from "./WidgetComments.module.css";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

// import WidgetCommentsEdit from "./WidgetCommentsEdit";

function WidgetComments(props) {
  const AccsesToken = useSelector((state) => state.authToken.accessToken);
  const memberId = props.memberId;

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editedComment, setEditedComment] = useState("");
  const [editedCommentId, setEditedCommentId] = useState(null);
  const [isMe, setIsMe] = useState(false);
  const page = 0;
  const size = 10;

  const getComments = (memberId) => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/api/mypage/cheermsg/${memberId}`,
        {
          params: { memberId: memberId, page: page, size: size },
        },
        {
          headers: { Authorization: AccsesToken },
        }
      )
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const loggedInUserId = sessionStorage.getItem("memberId");
    // setIsMe(
    //   loggedInUserId === props.memberId ||
    //     comments.some((comment) => comment.writerId === loggedInUserId)
    // );
    // getComments(memberId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberId, comments, props.memberId]);

  const CreateComment = () => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/api/mypage/cheermsg`,
        {
          memberId,
          content: newComment,
        },
        {
          headers: { Authorization: AccsesToken },
        }
      )
      .then((response) => {
        // console.log(response.data);
        // if (response.data.length === 0) {
        //   alert("내용을 입력해주세요.");
        // } else {
        //   alert("응원 메시지가 등록되었습니다.");
        setNewComment("");
        getComments(memberId);
        // }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const SaveEditedComment = () => {
    EditComment(editedCommentId, editedComment);
    setIsEdit(false);
    setEditedComment("");
  };

  const EditComment = () => {
    axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/api/mypage/cheermsg`,
        {
          cheerMessageId: editedCommentId,
          memberId,
          content: editedComment,
        },
        {
          headers: { Authorization: AccsesToken },
        }
      )
      .then((response) => {
        // console.log(response.data);
        getComments(memberId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const DeleteComment = (messageId) => {
    axios
      .delete(
        `${process.env.REACT_APP_BASE_URL}/api/mypage/cheermsg/${messageId}`,

        {
          // data: { cheerMessageId: messageId },
          headers: { Authorization: AccsesToken },
        }
      )
      .then((response) => {
        // console.log(response.data);
        // console.log(response.data.data);
        getComments(memberId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={classes.WidgetComments}>
      <div>
        <p> {memberId}님을 향한 응원의 댓글!</p>
        <div className={classes.CommentSection}>
          {/* {comments.map((comment) => (
            // <div key={comment.id}>
            <div key={comment.messageId}>
              {isEdit === comment.messageId ? (
                <div>
                  <input
                    type="text"
                    value={editedComment}
                    onChange={(event) => {
                      setEditedComment(event.target.value);
                      setEditedCommentId(comment.messageId);
                    }}
                  />
                  <button
                    onClick={() => {
                      SaveEditedComment();
                    }}
                  >
                    저장
                  </button>
                </div>
              ) : (
                <div>
                  {comment.content}
                  {comment.writerNickName}
                  {isMe && (
                    <button
                      className={classes.buttonstyle}
                      onClick={() => {
                        setIsEdit(comment.messageId);
                        setEditedComment(comment.content);
                      }}
                    >
                      <img
                        className={classes.edit}
                        src="../../images/Widget/edit.png"
                        alt="edit"
                      />
                    </button>
                  )}
                  {isMe && (
                    <button
                      className={classes.buttonstyle}
                      onClick={() => DeleteComment(comment.messageId)}
                    >
                      <img
                        className={classes.clear}
                        src="../../images/Widget/clear.png"
                        alt="clear"
                      />
                    </button>
                  )}
                </div>
              )}
            </div>
          ))} */}
        </div>
      </div>

      <div>
        <input
          type="text"
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
        />
        <button onClick={CreateComment}>댓글 작성</button>
      </div>
    </div>
  );
}

export default WidgetComments;
