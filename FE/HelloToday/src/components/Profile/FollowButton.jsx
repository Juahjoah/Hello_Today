import classes from "./FollowButton.module.css";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const baseURL = "https://i9b308.p.ssafy.io"; // 배포용으로 보내면, 아직 확인불가(develop에서만 확인가능)
// const baseURL = "http://localhost:8080"; // 개발용

// props로 유저 정보 받아오기, 아예 처음부터 팔로잉 정보도 받아올까?
function FollowButton(props) {
  const AccsesToken = useSelector((state) => state.authToken.accessToken);
  // const UserId = sessionStorage.getItem("memberId");
  const [isFollow, setIsFollow] = useState();
  // 들어온 프로필이 나인가, 아닌가
  const [isMe, setIsMe] = useState(false);

  // 시작할때, 팔로우 정보 가져와서 담아두기!
  useEffect(() => {
    setIsMe(
      +props.memberId === +sessionStorage.getItem("memberId") ? true : false
    );

    axios
      .get(
        `${baseURL}/api/follow/`,
        { params: { memberId: props.memberId } },
        { Authorization: AccsesToken }
      )
      .then((response) => {
        // console.log(response.data);
        // console.log(response.success);
        setIsFollow(response.success);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, [props.memberId]);

  const UserFollow = () => {
    axios
      .request({
        method: isFollow ? "delete" : "post",
        url: `${baseURL}/api/follow`,
        data: {
          headers: { Authorization: AccsesToken },
          body: { followingId: props.memberId },
          // 'Content-type': 'application/json',
        },
      })
      .then((response) => {
        // console.log(response.data);
        setIsFollow((isFollow) => !isFollow);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  return (
    <div className={classes.FollowButton}>
      {!isMe ? <button onClick={UserFollow}>Follow</button> : null}
      <button onClick={() => props.setFollowButtonClick(true)}>
        팔로우하는 사람보기
      </button>
    </div>
  );
}

export default FollowButton;
