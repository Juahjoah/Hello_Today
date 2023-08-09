import classes from "./WidgetComments.module.css";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import WidgetCommentsEdit from "./WidgetCommentsEdit";

// const baseURL = "https://i9b308.p.ssafy.io"; // 배포용으로 보내면, 아직 확인불가(develop에서만 확인가능)
const baseURL = "http://localhost:8080"; // 개발용

function WidgetComments(props) {
  const AccsesToken = useSelector((state) => state.authToken.accessToken);
  const memberId = props.memberId;

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const page = 0;
  const size = 10;

  const getComments = (memberId) => {
    axios
      .get(
        `${baseURL}/api/mypage/cheermsg/${memberId}`,
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
    getComments(memberId);
  }, [memberId]);

  const CreateComment = () => {
    axios
      .post(
        `${baseURL}/api/mypage/cheermsg`,
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

  const EditComment = (messageId, editedContent) => {
    axios
      .put(
        `${baseURL}/api/mypage/cheermsg/${messageId}`,
        {
          content: editedContent,
        },
        {
          headers: { Authorization: AccsesToken },
        }
      )
      .then((response) => {
        console.log(response.data);
        getComments(memberId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const DeleteComment = (messageId) => {
    axios
      .delete(
        `${baseURL}/api/mypage/cheermsg/${messageId}`,

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
          {comments.map((comment) => (
            // <div key={comment.id}>
            <div key={comment.messageId}>
              {comment.content}

              <button className={classes.buttonstyle}>
                <img
                  className={classes.edit}
                  src="../../images/Widget/edit.png"
                  alt="edit"
                  // onClick={> }
                />
              </button>

              <button className={classes.buttonstyle}>
                <img
                  className={classes.clear}
                  src="../../images/Widget/clear.png"
                  alt="clear"
                  onClick={() => DeleteComment(comment.messageId)}
                />
              </button>
            </div>
          ))}
          <div className={classes.btn_edit_delete}>
            {/* 해당 이미지 부분 CSS는 DDay 위젯에서 총괄 관리 */}
          </div>
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
