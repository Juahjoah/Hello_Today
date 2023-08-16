import classes from "./FollowList.module.css";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

function FollowList() {
  const AccsesToken = useSelector((state) => state.authToken.accessToken);
  const memberId = useParams().memberId;

  const [Followers, setFollowers] = useState([]);
  const [Followings, setFollowings] = useState([]);

  const [nowPage, setNowPage] = useState(1);
  const itemsIncludePage = 5;

  const navigate = useNavigate();

  useEffect(() => {
    getUserFollowers(memberId);
    getUserFollowings(memberId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberId, AccsesToken]);

  const getUserFollowers = (memberId) => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/follow/follower`, {
        params: { memberId },
        headers: { Authorization: AccsesToken },
      })
      .then((response) => {
        console.log(response.data.followers);
        setFollowers(response.data.followers);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUserFollowings = (memberId) => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/follow/following`, {
        params: { memberId },
        headers: { Authorization: AccsesToken },
      })
      .then((response) => {
        console.log(response.data.followings);
        setFollowings(response.data.followings);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 페이지네이션
  const indexOfLastItem = nowPage * itemsIncludePage;
  const indexOfFirstItem = indexOfLastItem - itemsIncludePage;
  const nowFollowings = Followings.slice(indexOfFirstItem, indexOfLastItem);
  const nowFollowers = Followers.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setNowPage(pageNumber);
  };

  // 팔로잉, 팔로워 리스트 프로필 연결

  const FollowCardClick = (memberId) => {
    // navigate(`${process.env.REACT_APP_BASE_URL}/api/mypage/${memberId}`);
    navigate(`/MyProfile/${memberId}/`);
    setTimeout(() => {
      window.location.reload(); // 차후에 변경하기
    }, 10);
  };

  return (
    <div className={classes.followList}>
      <h1>함께하는 오늘러 보기</h1>
      <h3>내가 팔로잉하는 사람</h3>
      {Followings.length > itemsIncludePage && (
        <div>
          <button
            onClick={() => paginate(nowPage - 1)}
            disabled={nowPage === 1}
          >
            <img src="../../images/Widget/before.png" alt="before" />
          </button>
        </div>
      )}
      <div className={classes.followMemberList}>
        {nowFollowings.length === 0 && (
          <div className={classes.followMent}>
            아직 팔로잉하고 있는 오늘러가 없어요.
          </div>
        )}
        {nowFollowings.length > 0 &&
          nowFollowings.map((following) => (
            <div
              className={classes.followCard}
              key={following.memberId}
              onClick={() => FollowCardClick(following.memberId)}
            >
              <img
                className={classes.followImg}
                src={following.profilePath}
                alt="followerImg"
              />
              {following.nickname}
            </div>
          ))}
      </div>
      {Followings.length > itemsIncludePage && (
        <div>
          <button
            onClick={() => paginate(nowPage + 1)}
            disabled={
              nowFollowings.length < itemsIncludePage ||
              nowFollowings.length === 0
            }
          >
            <img src="../../images/Widget/next.png" alt="next" />
          </button>
        </div>
      )}

      <h3>나를 팔로우하는 사람</h3>

      {Followers.length > itemsIncludePage && (
        <div>
          <button
            onClick={() => paginate(nowPage - 1)}
            disabled={nowPage === 1}
          >
            <img src="../../images/Widget/before.png" alt="before" />
          </button>
        </div>
      )}
      <div className={classes.followMemberList}>
        {nowFollowers.length === 0 && (
          <div className={classes.followMent}>
            아직 팔로우하는 오늘러가 없어요.
          </div>
        )}
        {nowFollowers.length > 0 &&
          nowFollowers.map((follower) => (
            <div
              className={classes.followCard}
              key={follower.memberId}
              onClick={() => FollowCardClick(follower.memberId)}
            >
              <img
                className={classes.followImg}
                src={follower.profilePath}
                alt="followerImg"
              />
              {follower.nickname}
            </div>
          ))}
      </div>

      {Followers.length > itemsIncludePage && (
        <div>
          <button
            onClick={() => paginate(nowPage + 1)}
            disabled={
              nowFollowers.length < itemsIncludePage ||
              nowFollowers.length === 0
            }
          >
            <img src="../../images/Widget/next.png" alt="next" />
          </button>
        </div>
      )}
    </div>
  );
}

export default FollowList;
