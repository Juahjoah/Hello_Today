/* eslint-disable react-hooks/exhaustive-deps */
import Nav from "../../components/common/Nav";
import classes from "./MyProfile.module.css";
import ProfileCalender from "../../components/Profile/ProfileCalender";
import ProfileCalenderDetail from "../../components/Profile/ProfileCalenderDetail";

//로그인
import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// 로그인 시 필요한 함수
import allAuth from "../../components/User/allAuth";

function MyProfile(user) {
  //------------------------------로그인 시작
  const dispatch = useDispatch();
  const isAccess = useSelector((state) => state.authToken.accessToken);
  useEffect(() => {
    allAuth(isAccess, dispatch);
  }, [dispatch]);
  //-----------------------------------여기까지
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
            <div>잉</div>
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
