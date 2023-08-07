import classes from "./FollowButton.module.css";

import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

// const baseURL = "https://i9b308.p.ssafy.io"; // 배포용으로 보내면, 아직 확인불가(develop에서만 확인가능)
const baseURL = "http://localhost:8080"; // 개발용

// 현재 로그인을 하면 memberid 값이 필요함. 아예 app.js에서 정보를 담아서 보내야할거같은데, 그 값을 저장해뒀다가 쓰는건?

// props로 유저 정보 받아오기, 아예 처음부터 팔로잉 정보도 받아올까?
function FollowButton(props) {
  const AccsesToken = useSelector((state) => state.authToken.accessToken);
  const [Follow, setFollow] = useState([props.Follow]);

  const UserFollow = () => {
    const followEndpoint = Follow ? "unfollow" : "follow";
    axios
      .request({
        method: Follow ? "delete" : "post",
        url: `${baseURL}/api/follow`,
        data: {
          headers: { Authorization: AccsesToken },
          body: { followId: props.memberId },
        },
      })
      .then((response) => {
        console.log(response.data);
        setFollow((Follow) => !Follow);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={classes.FollowButton}>
      <button onClick={UserFollow()}>Follow</button>
    </div>
  );
}

export default FollowButton;
