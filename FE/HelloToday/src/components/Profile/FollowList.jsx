import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

// const baseURL = "https://i9b308.p.ssafy.io"; // 배포용으로 보내면, 아직 확인불가(develop에서만 확인가능)
const baseURL = "http://localhost:8080"; // 개발용

function FollowList(props) {
  const AccsesToken = useSelector((state) => state.authToken.accessToken);

  const [Followers, setFollowers] = useState([]);
  const [Followings, setFollowings] = useState([]);

  // 팔로워 정보 가져오기

  useEffect(() => {
    axios
      .get(`${baseURL}/api/follow/follower`, {
        headers: { Authorization: AccsesToken },
      })
      .then((response) => {
        console.log(response.data);
        setFollowers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${baseURL}/api/follow/following`, {
        headers: { Authorization: AccsesToken },
      })
      .then((response) => {
        console.log(response.data);
        setFollowings(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [AccsesToken]);

  return (
    <div>
      <h1>함께하는 모듈러 보기</h1>
      <h3>팔로잉하는 사람</h3>
      {Followings.map((following) => (
        <div key={following.memberId}>
          <img src={following.profilePath} alt="followerImg" />
          {following.nickname}
        </div>
      ))}
      {Followings && Followings.length === 0 && <div>팔로잉 없음</div>}

      <h3>팔로우하는 사람</h3>
      {Followers.map((follower) => (
        <div key={follower.memberId}>
          <img src={follower.profilePath} alt="followerImg" />
          {follower.nickname}
        </div>
      ))}
      {Followers && Followers.length === 0 && <div>팔로워 없음</div>}
    </div>
  );
}

export default FollowList;
