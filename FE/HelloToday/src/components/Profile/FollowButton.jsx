import classes from "./FollowButton.module.css";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// const baseURL = "https://i9b308.p.ssafy.io"; // 배포용으로 보내면, 아직 확인불가(develop에서만 확인가능)
const baseURL = "http://localhost:8080"; // 개발용

// props로 유저 정보 받아오기, 아예 처음부터 팔로잉 정보도 받아올까?
function FollowButton(props) {
  const AccsesToken = useSelector((state) => state.authToken.accessToken);
  const [Follow, setFollow] = useState([]);

  // 시작할때, 팔로우 정보 가져와서 담아두기!
  useEffect(() => {
    axios
      .get(`${baseURL}/api/follow/`, {
        headers: { Authorization: AccsesToken },
      })
      .then((response) => {
        console.log(response.data);
        setFollow(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const UserFollow = () => {
    // const FollowEndpoint = Follow ? "False" : "True";
    axios
      .request({
        method: Follow ? "delete" : "post",
        url: `${baseURL}/api/follow`,
        data: {
          headers: { Authorization: AccsesToken },
          body: { followingId: props.memberId },
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
      <button onClick={UserFollow}>Follow</button>
    </div>
  );
}

export default FollowButton;
