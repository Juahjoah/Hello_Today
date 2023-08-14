import Nav from "../../components/common/Nav";
import classes from "./MyProfileEdit.module.css";

import ProfileMenu from "../../components/Profile/ProfileMenu";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
//로그인
import { useDispatch, useSelector } from "react-redux";
// 로그인 시 필요한 함수
import allAuth from "../../components/User/allAuth";

//회원탈퇴
import { useNavigate } from "react-router";

import { removeCookieToken } from "../../components/User/CookieStorage";
import { DELETE_TOKEN } from "../../store/TokenSlice";

import { Logoutstate } from "../../store/LoginSlice";

function MyProfileEdit() {
  //------------------------------로그인 시작
  const dispatch = useDispatch();
  const AccsesToken = useSelector((state) => state.authToken.accessToken);
  useEffect(() => {
    allAuth(AccsesToken, dispatch);
  }, []);
  //-----------------------------------여기까지

  // api 요청 후 받아온 user 정보 (모듈화 진행)
  const params = useParams();
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/mypage/${params.memberId}`, {
        headers: { Authorization: AccsesToken },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {});
  }, []);

  // const NowUser = sessionStorage.getItem("user");

  // 만약 회원 정보 수정에서 사용자가 닉네임을 변경했다면, ssessionStorage에 저장된 user 정보를 업데이트 해줘야 함
  // const updateNowUser = () => {
  //   sessionStorage.setItem("user");
  // };
  const [selectedFlags, setSelectedFlags] = useState([]);
  const [unselectedFlags, unsetSelectedFlags] = useState([]);
  const [selectedButtonIndexes, setSelectedButtonIndexes] = useState([]);
  const [choicedData, setChoicedData] = useState([]);
  const toggleButton = (index) => {
    if (selectedButtonIndexes.includes(index)) {
      setSelectedButtonIndexes(
        selectedButtonIndexes.filter((i) => i !== index)
      );
      setChoicedData(
        choicedData.filter((data) => data !== selectedFlags[index])
      );
    } else {
      setSelectedButtonIndexes([...selectedButtonIndexes, index]);
      setChoicedData([...choicedData, selectedFlags[index]]);
    }
  };
  // const choicedData = [];
  const handleSelectButton = () => {
    const updatedUnselectedFlags = unselectedFlags.concat(choicedData);
    const updatedSelectedFlags = selectedFlags.filter(
      (flag) => !choicedData.includes(flag)
    );

    unsetSelectedFlags(updatedUnselectedFlags);
    setSelectedFlags(updatedSelectedFlags);
    setChoicedData([]);
    setSelectedButtonIndexes([]);
  };
  const handleCancelFlag = (flag) => {
    const updatedUnselectedFlags = unselectedFlags.filter((f) => f !== flag);
    const updatedSelectedFlags = selectedFlags.concat(flag);

    unsetSelectedFlags(updatedUnselectedFlags);
    setSelectedFlags(updatedSelectedFlags);
  };

  const widgetAxios = async () => {
    axios({
      url: `${process.env.REACT_APP_BASE_URL}/api/mypage/widget/${params.memberId}`,
      method: "get",
      headers: {
        Authorization: AccsesToken,
      },
    }).then((res) => {
      const choiceData = [];
      const unchoiceDate = [];
      const data = res.data;

      if (data.ddayFlag === 0) {
        choiceData.push("D-Day");
      } else {
        unchoiceDate.push("D-Day");
      }

      if (data.galleryFlag === 0) {
        choiceData.push("갤러리");
      } else {
        unchoiceDate.push("갤러리");
      }
      if (data.goalFlag === 0) {
        choiceData.push("소중한 목표");
      } else {
        unchoiceDate.push("소중한 목표");
      }
      if (data.oneDiaryFlag === 0) {
        choiceData.push("한 줄 일기");
      } else {
        unchoiceDate.push("한 줄 일기");
      }
      if (data.routineHistoryFlag === 0) {
        choiceData.push("나의 루틴들");
      } else {
        unchoiceDate.push("나의 루틴들");
      }
      if (data.wishListFlag === 0) {
        choiceData.push("버킷리스트");
      } else {
        unchoiceDate.push("버킷리스트");
      }
      setSelectedFlags(choiceData);
      unsetSelectedFlags(unchoiceDate);
    });
  };
  const editWidgetAxios = () => {
    // const flagMappings = {
    //   goalFlag: "소중한 목표",
    //   oneDiaryFlag: "한 줄 일기",
    //   wishListFlag: "버킷리스트",
    //   routineHistoryFlag: "나의 루틴들",
    //   ddayFlag: "D-Day",
    //   galleryFlag: "갤러리",
    // };
    const flagMappings = [
      {
        flagName: "goalFlag",
        data: "소중한 목표",
      },
      {
        flagName: "oneDiaryFlag",
        data: "한 줄 일기",
      },
      {
        flagName: "wishListFlag",
        data: "버킷리스트",
      },
      {
        flagName: "routineHistoryFlag",
        data: "나의 루틴들",
      },
      {
        flagName: "ddayFlag",
        data: "D-Day",
      },
      {
        flagName: "galleryFlag",
        data: "갤러리",
      },
    ];

    let additionalFlag = {};

    for (let i = 0; i < flagMappings.length; i++) {
      if (unselectedFlags.includes(flagMappings[i].data)) {
        const test = flagMappings[i].flagName;
        additionalFlag[test] = "1";
      }
    }

    const additionalFlagJSON = JSON.stringify(additionalFlag);

    axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/api/mypage/widget`,
        additionalFlagJSON,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: AccsesToken,
          },
        }
      )
      .then((response) => {
        // 요청 성공 시 처리
        navigate(`/MyProfile/${response.data.data.memberId}`);
      });
  };
  useEffect(() => {
    widgetAxios();
  }, []);
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
        await axios.get(`${process.env.REACT_APP_BASE_URL}/api/test`, data);
        //logoutpage 하기
        // store에 저장된 Access Token 정보를 삭제
        dispatch(DELETE_TOKEN());
        // Cookie에 저장된 Refresh Token 정보를 삭제
        removeCookieToken();
        dispatch(Logoutstate());
        sessionStorage.clear();
        navigate("/");
      } catch (error) {}
    } else {
    }
  };
  return (
    <>
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
            <p className={classes.ProfileMsg}>{user.stMsg}</p>
            {/* 닉네임/프로필 바꿀 수 있는 옵션 화면 추가 */}
          </div>
          <hr />
          <ProfileMenu
            setMenu={setMenu}
            setFollowButtonClick={setFollowButtonClick}
            memberId={localStorage.getItem("memberId")}
            Token={AccsesToken}
          />
        </div>
        <div className={classes.editForm}>
          <div className={classes.editFormHeader}>
            <p className={classes.editFormTitle}>
              마이페이지에서 보일 위젯을 설정해주세요
            </p>
          </div>
          <div className={classes.widgetBody}>
            <div className={classes.widgetLeft}>
              <div className={classes.widgetLeftTitle}>
                <p className={classes.widgetLeftTitleItem}>
                  옵션 위젯 목록({selectedFlags.length})
                </p>
              </div>
              <div className={classes.widgetLeftForm}>
                <div className={classes.widgetLeftFormItem}>
                  {selectedFlags.map((flag, index) => (
                    <button
                      key={flag}
                      className={`${classes.widgetLeftFormButton} ${
                        selectedButtonIndexes.includes(index) &&
                        selectedFlags.includes(flag)
                          ? classes.selectedButton
                          : ""
                      }`}
                      onClick={() => toggleButton(index)}
                    >
                      {flag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className={classes.widgetMid}>
              <div className={classes.widgetMidButton}>
                <button
                  className={classes.widgetMidButtonForm}
                  onClick={handleSelectButton}
                >
                  선택
                </button>
              </div>
            </div>

            <div className={classes.widgetRight}>
              <div className={classes.widgetRightTitle}>
                <p className={classes.widgetRightTitleItem}>
                  마이페이지 위젯 목록({unselectedFlags.length + 2})
                </p>
              </div>
              <div className={classes.widgetRightForm}>
                <div className={classes.widgetRightTopForm}>
                  <div className={classes.widgetRightTop}>
                    <div>캘린더</div>
                    <div>응원 메시지</div>
                  </div>
                </div>
                <div className={classes.widgetRightBody}>
                  <p>선택 옵션</p>
                </div>
                {/* <div className={classes.widgetRightTopForm}> */}

                <div className={classes.widgetRightContent}>
                  {unselectedFlags.map((flag) => (
                    <div className={classes.widgetRightItem}>
                      <div className={classes.widgetRightItemFlag} key={flag}>
                        {flag}
                      </div>
                      <button
                        className={classes.widgetRightButoon}
                        onClick={() => handleCancelFlag(flag)}
                      >
                        x
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* </div> */}
            </div>
          </div>

          <div className={classes.widgetFooter}>
            <button
              className={classes.widgetFooterButton}
              onClick={editWidgetAxios}
            >
              수정 완료
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyProfileEdit;
