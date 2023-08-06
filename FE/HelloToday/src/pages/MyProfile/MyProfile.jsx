/* eslint-disable react-hooks/exhaustive-deps */
import Nav from "../../components/common/Nav";
import classes from "./MyProfile.module.css";

import ProfileMenu from "../../components/Profile/ProfileMenu";
import ProfileMain from "../../components/Profile/ProfileMain";

import axios from "axios";
import { useState, useEffect } from "react";

//로그인
import { useDispatch, useSelector } from "react-redux";
// 로그인 시 필요한 함수
import allAuth from "../../components/User/allAuth";

function MyProfile() {
  //------------------------------로그인 시작
  const dispatch = useDispatch();
  const isAccess = useSelector((state) => state.authToken.accessToken);
  useEffect(() => {
    allAuth(isAccess, dispatch);
  }, [dispatch]);
  //-----------------------------------여기까지

  // api 요청 후 받아온 user 정보 (모듈화 진행)
  const AccsesToken = useSelector((state) => state.authToken.accessToken);

  const baseURL = "https://i9b308.p.ssafy.io"; // 배포용으로 보내면, 아직 확인불가(develop에서만 확인가능)
  // const baseURL = "http://localhost:8080"; // 개발용

  const [user, setUser] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseURL}/api/mypage`, {
        headers: { Authorization: AccsesToken },
      })
      .then((response) => {
        setUser(response.data);
        sessionStorage.setItem("user", response.data);
        // console.log(user);
        // console.log(response.data);
      })
      .catch((error) => {
        // console.log(error);
        sessionStorage.setItem("user", []);
      });
  }, []);

  // const NowUser = sessionStorage.getItem("user");

  // 만약 회원 정보 수정에서 사용자가 닉네임을 변경했다면, ssessionStorage에 저장된 user 정보를 업데이트 해줘야 함
  // const updateNowUser = () => {
  //   sessionStorage.setItem("user");
  // };

  const [Menu, setMenu] = useState();

  return (
    <div>
      <Nav />
      <div className={classes.MyProfile}>
        {/* 화면 왼쪽 개인 정보 */}
        <div className={classes.UserProfile}>
          <div className={classes.UserInfo}>
            <img
              className={classes.ProfileImg}
              src={user.profilePath}
              alt={user.Userprofilepic}
            />
            <p className={classes.ProfilenNickName}>{user.nickname}</p>
            <p className={classes.ProfileNickName}>{user.nickname}</p>
            <p className={classes.ProfileMsg}>{user.stMsg}</p>
            {/* 닉네임/프로필 바꿀 수 있는 옵션 화면 추가 */}
            {/* 팔로잉/팔로워 */}
            <div className={classes.UserFollow}>
              <p></p>
              <p>팔로잉/팔로워</p>
            </div>
          </div>
          <hr />
          <div className={classes.UserProfileMenu}>
            <ProfileMenu setMenu={setMenu} />
          </div>
        </div>
        {/* 화면 오른쪽 화면 출력 창 */}
        <div className={classes.Profilecontent}>
          <ProfileMain Menu={Menu} />
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
