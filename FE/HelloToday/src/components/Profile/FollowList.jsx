import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

// const baseURL = "https://i9b308.p.ssafy.io"; // 배포용으로 보내면, 아직 확인불가(develop에서만 확인가능)
const baseURL = "http://localhost:8080"; // 개발용

function FollowList() {
  const AccsesToken = useSelector((state) => state.authToken.accessToken);

  const [Followers, setFollowers] = useState();
  const [Followings, setFollowings] = useState();

  // 팔로워 정보 가져오기

  useEffect(() => {
    axios
      .all([
        axios.get(`${baseURL}/api/follow/follower`, {
          headers: { Authorization: AccsesToken },
        }),
        axios.get(`${baseURL}/api/follow/following`, {
          headers: { Authorization: AccsesToken },
        }),
      ])
      .then((responses) => {
        const response1 = responses[0];
        const response2 = responses[1];
        console.log(response1.data);
        console.log(response2.data);
        setFollowers(response1.data);
        setFollowings(response2.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>함께하는 모듈러 보기</h1>
      <h3>팔로잉하는 사람</h3>

      <h3>팔로우하는 사람</h3>
    </div>
  );
}

export default FollowList;
