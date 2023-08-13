import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import axios from "axios";

function FollowList() {
  const AccsesToken = useSelector((state) => state.authToken.accessToken);
  const memberId = useParams().memberId;

  const [Followers, setFollowers] = useState([]);
  const [Followings, setFollowings] = useState([]);

  const [nowPage, setNowPage] = useState(1);
  const itemsIncludePage = 5;

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
        console.log(response.data);
        setFollowers(response.data);
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
        console.log(response.data);
        setFollowings(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const indexOfLastItem = nowPage * itemsIncludePage;
  const indexOfFirstItem = indexOfLastItem - itemsIncludePage;
  const nowFollowings = Followings.slice(indexOfFirstItem, indexOfLastItem);
  const nowFollowers = Followers.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setNowPage(pageNumber);
  };

  return (
    <div>
      <h1>함께하는 모듈러 보기</h1>
      <h3>내가 팔로잉하는 사람</h3>
      {nowFollowings.length === 0 && <div>팔로잉 없음</div>}
      {nowFollowings.length > 0 &&
        nowFollowings.map((following) => (
          <div key={following.memberId}>
            <img src={following.profilePath} alt="followerImg" />
            {following.nickname}
          </div>
        ))}
      {Followings.length > itemsIncludePage && (
        <div>
          <button
            onClick={() => paginate(nowPage - 1)}
            disabled={nowPage === 1}
          >
            이전
          </button>
          <button
            onClick={() => paginate(nowPage + 1)}
            disabled={
              nowFollowings.length < itemsIncludePage ||
              nowFollowings.length === 0
            }
          >
            다음
          </button>
        </div>
      )}

      <h3>나를 팔로우하는 사람</h3>
      {nowFollowers.length === 0 && <div>팔로워 없음</div>}
      {nowFollowers.length > 0 &&
        nowFollowers.map((follower) => (
          <div key={follower.memberId}>
            <img src={follower.profilePath} alt="followerImg" />
            {follower.nickname}
          </div>
        ))}
      {Followers.length > itemsIncludePage && (
        <div>
          <button
            onClick={() => paginate(nowPage - 1)}
            disabled={nowPage === 1}
          >
            이전
          </button>
          <button
            onClick={() => paginate(nowPage + 1)}
            disabled={
              nowFollowers.length < itemsIncludePage ||
              nowFollowers.length === 0
            }
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
}

export default FollowList;
