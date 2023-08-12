import classes from "./WidgetComments.module.css";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

function WidgetComments() {
  const AccsesToken = useSelector((state) => state.authToken.accessToken);
  const memberId = useParams().memberId;

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editedComment, setEditedComment] = useState("");
  const [editedCommentId, setEditedCommentId] = useState(null);
  const [isMe, setIsMe] = useState(false);
  const page = 0;
  const size = 20;

  useEffect(() => {
    const loggedInUserId = sessionStorage.getItem("memberId");
    setIsMe(
      loggedInUserId === memberId ||
        comments.some((comment) => comment.writerNickName === loggedInUserId)
      // memberId === +sessionStorage.getItem("memberId") ? true : false
    );
    getComments(memberId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberId, AccsesToken]);

  const getComments = async (memberId) => {
    await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/api/mypage/cheermsg/${memberId}`,
        {
          params: { memberId, page, size },
          headers: {
            Authorization: AccsesToken,
          },
        }
      )
      .then((response) => {
        // console.log(response.data);
        setComments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const CreateComment = async () => {
    await axios
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
        // console.log(response);
        getComments(memberId);
        setNewComment("");
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
        // console.log(response);
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
        { headers: { Authorization: AccsesToken } }
      )
      .then((response) => {
        // console.log(response);
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
          {comments.length === 0 && <p>댓글이 없습니다.</p>}
          {comments.length > 0 &&
            comments.map((comment) => (
              <div key={comment.messageId}>
                {isEdit && editedCommentId === comment.messageId ? (
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
                          setEditedCommentId(comment.messageId);
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
            ))}
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
