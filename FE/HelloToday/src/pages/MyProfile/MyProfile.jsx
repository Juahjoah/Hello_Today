/* eslint-disable react-hooks/exhaustive-deps */
import Nav from "../../components/common/Nav";
import classes from "./MyProfile.module.css";
import ProfileCalender from "../../components/Profile/ProfileCalender";
import axios from "axios";
import { useState, useEffect } from "react";

//로그인
// import React, { useEffect } from "react";
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

  // const baseURL = "https://i9b308.p.ssafy.io"; // 배포용으로 보내면, 아직 확인불가(develop에서만 확인가능)
  const baseURL = "http://localhost:8080"; // 개발용

  // const profileApi = axios.create({
  //   baseURL: `${baseURL}/api/mypage`,
  //   headers: {
  //     // "Content-Type": "application/json",
  //     Authorization: AccsesToken,
  //   },
  // });
  // const userProfile = () => profileApi.get();

  const [user, setUser] = useState([]);
  useEffect(() => {
    axios
      .get(`${baseURL}/api/mypage`, {
        headers: { Authorization: AccsesToken },
      })
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
      });
  }, []);

  return (
    <div>
      <Nav />
      <div className={classes.MyProfile}>
        {/* 화면 왼쪽 개인 정보 */}
        <div className={classes.ProfileLeft}>
          <div className={classes.ProfileLeftInfo}>
            <img src={user.profile_path} alt={user.profile_ori_name} />
            <p>{user.nickname}</p>
          </div>
          <div className={classes.ProfileLeftMenu}>
            <p>hihi everybody</p>
            {/* <h3>{user.name}</h3> */}
            {/* <p>{user.email}</p> */}
          </div>
        </div>
        {/* 화면 오른쪽 화면 창 */}
        <div className={classes.ProfileRight}>
          <div className={classes.ProfileCalender}>
            <ProfileCalender />
          </div>
          <div className={classes.ProfileCustom}>
            {/* <h3>{user.name}</h3> */}
            {/* <p>{user.email}</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
