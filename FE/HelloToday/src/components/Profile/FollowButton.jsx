import { flexibleCompare } from "@fullcalendar/core/internal";
import classes from "./FollowButton.module.css";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// const baseURL = "https://i9b308.p.ssafy.io"; // 배포용으로 보내면, 아직 확인불가(develop에서만 확인가능)
const baseURL = "http://localhost:8080"; // 개발용

function FollowButton(props) {
  const AccsesToken = useSelector((state) => state.authToken.accessToken);
  // const UserId = sessionStorage.getItem("memberId");
  // 팔로잉 상태를 구분하는 변수
  const [isFollow, setIsFollow] = useState();
  // 접속한 프로필이 나인가, 아닌가 판단해서 값을 주기
  const [isMe, setIsMe] = useState(false);

  // 시작할때, 팔로우 정보 가져와서 담아두기!
  useEffect(() => {
    setIsMe(
      +props.memberId === +sessionStorage.getItem("memberId") ? true : false
    );
    if (props.memberId !== undefined) {
      axios
        .get(`${baseURL}/api/follow`, {
          params: { memberId: props.memberId },
          headers: { Authorization: AccsesToken },
        })
        .then((response) => {
          if (response.data.success === true) {
            setIsFollow(true);
          } else {
            setIsFollow(false);
          }
          // console.log(response.data.success);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [props.memberId]);

  const UserFollowClick = (event) => {
    if (!isFollow) {
      // event.target.innerText = "Follow";
      axios
        .post(
          `${baseURL}/api/follow`,
          { followingId: props.memberId },
          {
            headers: { Authorization: AccsesToken },
          }
        )
        .then((response) => {
          // console.log(response.data);
          setIsFollow((isFollow) => !isFollow);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // event.target.innerText = "unFollow";
      axios
        .delete(`${baseURL}/api/follow`, {
          params: { target: props.memberId },
          headers: { Authorization: AccsesToken },
        })
        .then((response) => {
          // console.log(response.data);
          setIsFollow((isFollow) => !isFollow);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className={classes.FollowButton}>
      {!isMe ? (
        <button onClick={UserFollowClick}>
          {isFollow ? "unFollow" : "Follow"}
        </button>
      ) : null}
      <button onClick={() => props.setFollowButtonClick(true)}>
        팔로우하는 사람보기
      </button>
    </div>
  );
}

export default FollowButton;
