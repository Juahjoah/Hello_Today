/* eslint-disable react-hooks/exhaustive-deps */
import Nav from "../../components/common/Nav";
import classes from "./MyProfile.module.css";

import ProfileMenu from "../../components/Profile/ProfileMenu";
import ProfileMain from "../../components/Profile/ProfileMain";
import FollowButton from "../../components/Profile/FollowButton";
import FollowList from "../../components/Profile/FollowList";

import axios from "axios";
import { useState, useEffect, useRef } from "react";

//로그인
import { useDispatch, useSelector } from "react-redux";
// 로그인 시 필요한 함수
import allAuth from "../../components/User/allAuth";

//회원탈퇴
import { useNavigate } from "react-router";

import { removeCookieToken } from "../../components/User/CookieStorage";
import { DELETE_TOKEN } from "../../store/TokenSlice";

import { Logoutstate } from "../../store/LoginSlice";

function MyProfile() {
  //------------------------------로그인 시작
  const dispatch = useDispatch();
  const AccsesToken = useSelector((state) => state.authToken.accessToken);

  useEffect(() => {
    allAuth(AccsesToken, dispatch);
  }, []);
  //-----------------------------------여기까지

  // api 요청 후 받아온 user 정보 (모듈화 진행)
  // const baseURL = "https://i9b308.p.ssafy.io"; // 배포용으로 보내면, 아직 확인불가(develop에서만 확인가능)
  const baseURL = "http://localhost:8080"; // 개발용

  const [user, setUser] = useState([]);
  const memberId = sessionStorage.getItem("memberId");

  useEffect(() => {
    axios
      .get(`${baseURL}/api/mypage/${memberId}`, {
        headers: { Authorization: AccsesToken },
      })
      .then((response) => {
        setUser(response.data);
        sessionStorage.setItem(user, JSON.stringify(response.data));
        // console.log("user");
        // console.log(response.data);
      })
      .catch((error) => {
        // console.log(error);
        sessionStorage.setItem(user, ["error"]);
      });
  }, []);

  // const NowUser = sessionStorage.getItem("user");

  // 만약 회원 정보 수정에서 사용자가 닉네임을 변경했다면, ssessionStorage에 저장된 user 정보를 업데이트 해줘야 함
  // const updateNowUser = () => {
  //   sessionStorage.setItem("user");
  // };

  const [Menu, setMenu] = useState(0);

  const [FollowButtonClick, setFollowButtonClick] = useState(false);

  const navigate = useNavigate();
  const handleunregister = async () => {
    //백에 요청 날리고
    const data = {
      headers: {
        Authorization: AccsesToken,
      },
    };
    if (window.confirm("정말로 탈퇴하시겠습니까?")) {
      try {
        await axios.delete(
          `${process.env.REACT_APP_BASE_URL}/api/members/withdrawal`,
          data
        );
        //logoutpage 하기
        // store에 저장된 Access Token 정보를 삭제
        dispatch(DELETE_TOKEN());
        // Cookie에 저장된 Refresh Token 정보를 삭제
        removeCookieToken();
        dispatch(Logoutstate());
        sessionStorage.clear();
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("회원탈퇴를 취소하셨습니다.");
    }
  };
  //회원정보 수정
  // const [user, setUser] = useState([]);
  // const memberId = sessionStorage.getItem("memberId");
  const [isUserEdit, setIsUserEdit] = useState(false);
  const nicknameinput = useRef();
  const stMsginput = useRef();
  const handleUserEdit = () => {
    setIsUserEdit(true);
  };
  const handleChangeState = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };
  const handleSubmit = () => {
    if (user.nickname.length < 1) {
      //focus
      nicknameinput.current.focus();
      return;
    }
    if (user.stMsg === null || user.stMsg.length < 1) {
      //focus
      stMsginput.current.focus();
      return;
    }
    const data = user;
    //백이랑 통신
    axios
      .put(`${process.env.REACT_APP_BASE_URL}/api/memvers/${memberId}`, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    // session에 덮어쓰기
    sessionStorage.setItem("user", user);

    //edit모드 false로 바꾸기
    setIsUserEdit(false);
  };
  const handleCancle = () => {
    /*취소*/
    setIsUserEdit(false);
  };

  return (
    <div>
      <Nav />
      <div className={classes.MyProfile}>
        {/* 화면 왼쪽 개인 정보 */}
        <div className={classes.UserProfile}>
          {isUserEdit ? (
            <div className={classes.UserInfo}>
              <img
                className={classes.ProfileImg}
                src={user.profilePath}
                alt={user.Userprofilepic}
              />
              <button>파일 올리기</button>
              <div className={classes.ProfilenNickName}>
                <input
                  type="text"
                  value={user.nickname}
                  placeholder="닉네임을 입력하세요"
                  ref={nicknameinput}
                  onChange={handleChangeState}
                ></input>
              </div>
              <div className={classes.ProfileMsg}>
                <input
                  type="text"
                  value={user.stMsg}
                  placeholder="상태메세지를 입력하세요"
                  ref={stMsginput}
                  onChange={handleChangeState}
                ></input>
              </div>
              <button onClick={handleSubmit}>완료</button>
              <button onClick={handleCancle}>취소</button>
            </div>
          ) : (
            <div className={classes.UserInfo}>
              <img
                className={classes.ProfileImg}
                src={user.profilePath}
                alt={user.Userprofilepic}
              />
              <button className={classes.editbtn}>
                <img
                  src="../../images/Widget/gear.png"
                  alt="useredit"
                  onClick={handleUserEdit}
                  style={{
                    width: "30px",
                    height: "30px",
                  }}
                />
              </button>
              <p className={classes.ProfilenNickName}>{user.nickname}</p>
              <p className={classes.ProfileMsg}>{user.stMsg}</p>
              {/* 닉네임/프로필 바꿀 수 있는 옵션 화면 추가 */}
              {/* 팔로잉/팔로워 */}
              <div className={classes.UserFollow}>
                <FollowButton
                memberId={user.memberId}
                setFollowButtonClick={setFollowButtonClick}
              />
              </div>
            </div>
          )}
          <button onClick={() => handleunregister()}>회원 탈퇴</button>
          <hr />
          <div className={classes.UserProfileMenu}>
            <ProfileMenu
              setMenu={setMenu}
              setFollowButtonClick={setFollowButtonClick}
            />
          </div>
        </div>
        {/* 화면 오른쪽 화면 출력 창 */}

        <div className={classes.Profilecontent}>
          {FollowButtonClick ? <FollowList /> : <ProfileMain Menu={Menu} />}
          {/* <ProfileMain Menu={Menu} /> */}
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
