import classes from "./FollowButton.module.css";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function FollowButton(props) {
  const AccsesToken = useSelector((state) => state.authToken.accessToken);
  const memberId = useParams().memberId;

  const [isFollow, setIsFollow] = useState(false);
  const [isMe, setIsMe] = useState(false);

  useEffect(() => {
    const loggedInUserId = +memberId === +sessionStorage.getItem("memberId");
    setIsMe(loggedInUserId);

    if (!loggedInUserId && memberId !== undefined) {
      getFollowInfo(memberId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberId, AccsesToken, isFollow]);

  const getFollowInfo = (memberId) => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/follow/`, {
        params: { memberId },
        headers: { Authorization: AccsesToken },
      })
      .then((response) => {
        if (response.data.data === true) {
          setIsFollow(true);
        }
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  const UserFollowClick = () => {
    if (!isFollow) {
      // event.target.innerText = "Follow";
      axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/api/follow`,
          { followingId: memberId },
          {
            headers: { Authorization: AccsesToken },
          }
        )
        .then((response) => {
          // console.log(response.data);
          // console.log(response.data.data);
          setIsFollow(true);
        })
        .catch((error) => {
          // console.log(error);
        });
    } else {
      // event.target.innerText = "unFollow";
      axios
        .delete(`${process.env.REACT_APP_BASE_URL}/api/follow`, {
          params: { target: memberId },
          headers: { Authorization: AccsesToken },
        })
        .then((response) => {
          // console.log(response.data);
          setIsFollow(false);
        })
        .catch((error) => {
          // console.log(error);
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
