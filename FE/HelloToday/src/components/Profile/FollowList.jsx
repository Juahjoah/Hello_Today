import { useState } from "react";

function FollowList(props) {
  const userId = props.memberId;

  const [Followers, setFollowers] = useState();
  const [Following, setFollowing] = useState();

  return (
    <div>
      <h1>함께하는 모듈러 보기</h1>
      <h3>팔로잉하는 사람</h3>
      <h3>팔로우하는 사람</h3>
    </div>
  );
}

export default FollowList;
