import classes from "./FollowButton.module.css";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function FollowButton(props) {
  const AccsesToken = useSelector((state) => state.authToken.accessToken);
  // 팔로잉 상태를 구분하는 변수
  const [isFollow, setIsFollow] = useState(false);
  // 접속한 프로필이 나인가, 아닌가 판단해서 값을 주기
  const [isMe, setIsMe] = useState(false);

  // 시작할때, 팔로우 정보 가져와서 담아두기!
  useEffect(() => {
    setIsMe(
      +props.memberId === +sessionStorage.getItem("memberId") ? true : false
    );
    if (!isMe && props.memberId !== undefined) {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/api/follow/`, {
          params: { memberId: props.memberId },
          headers: { Authorization: AccsesToken },
        })
        .then((response) => {
          if (response.data.data === true) {
            setIsFollow(true);
          } else {
            setIsFollow(false);
          }

          // console.log(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.memberId, AccsesToken, isFollow, isMe]);

  console.log(isFollow);

  const UserFollowClick = () => {
    if (!isFollow) {
      // event.target.innerText = "Follow";
      axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/api/follow`,
          { followingId: props.memberId },
          {
            headers: { Authorization: AccsesToken },
          }
        )
        .then((response) => {
          console.log(response.data);
          console.log(response.data.data);
          setIsFollow(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // event.target.innerText = "unFollow";
      axios
        .delete(`${process.env.REACT_APP_BASE_URL}/api/follow`, {
          params: { target: props.memberId },
          headers: { Authorization: AccsesToken },
        })
        .then((response) => {
          // console.log(response.data);
          setIsFollow(false);
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
