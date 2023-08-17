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
import Swal from "sweetalert2";

import { IoIosClose } from "react-icons/io";
import { BiSolidRightArrow } from "react-icons/bi";

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

  //회원 탈퇴하기
  const memberId = useParams().memberId; //url에서 param가져오기
  const smemberId = sessionStorage.getItem("memberId");

  const handleunregister = async () => {
    //백에 요청 날리고
    const data = {
      headers: {
        Authorization: AccsesToken,
      },
    };
    Swal.fire({
      title: "정말로 탈퇴하시겠어요?",
      text: "다시 되돌릴 수 없습니다",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "회원 탈퇴 진행",
      cancelButtonText: "회원 탈퇴 취소",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "회원 탈퇴되었습니다.",
          "회원님의 정보가 삭제되었습니다.",
          "succcess"
        );
        try {
          const res = axios.delete(
            `${process.env.REACT_APP_BASE_URL}/api/members/withdrawal`,
            data
          );
          // console.log("탈퇴 결과", res);
          dispatch(DELETE_TOKEN()); // store에 저장된 Access Token 정보를 삭제
          removeCookieToken(); // Cookie에 저장된 Refresh Token 정보를 삭제
          dispatch(Logoutstate());
          sessionStorage.clear();
          localStorage.clear();
          navigate("/");
        } catch (error) {
          // console.log("회원탈퇴 에러", error);
        }
      }
    });
  };
  return (
    <>
      <Nav />
      <div className={classes.MyProfile}>
        {/* 화면 왼쪽 개인 정보 */}
        <div className={classes.UserProfile}>
          <div className={classes.UserProfileSection}>
            <div className={classes.UserInfo}>
              <div className={classes.UserInformation}>
                <img
                  className={classes.ProfileImg}
                  src={user.profilePath}
                  alt={user.Userprofilepic}
                />
                <p className={classes.ProfilenNickName}>{user.nickname}</p>
                <p className={classes.ProfileMsg}>{user.stMsg}</p>
              </div>
              {/* 닉네임/프로필 바꿀 수 있는 옵션 화면 추가 */}
            </div>
            <div className={classes.userInfoMenu}>
              <ProfileMenu
                setMenu={setMenu}
                setFollowButtonClick={setFollowButtonClick}
                memberId={localStorage.getItem("memberId")}
                Token={AccsesToken}
                isEditPage={true}
              />
            </div>
            {memberId === smemberId ? (
              <button
                className={classes.profile_unregist_btn}
                onClick={() => handleunregister()}
              >
                회원 탈퇴
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>

        {/* edit form */}
        <div className={classes.Profilecontent}>
          <div className={classes.editForm}>
            <div className={classes.editFormMain}>
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
                  <BiSolidRightArrow
                    className={classes.widgetMidButtonForm}
                    onClick={handleSelectButton}
                  />
                </div>

                <div className={classes.widgetRight}>
                  <div className={classes.widgetRightTitle}>
                    <p className={classes.widgetRightTitleItem}>
                      마이페이지 위젯 목록({unselectedFlags.length + 2})
                    </p>
                  </div>
                  <div className={classes.widgetRightForm}>
                    <div className={classes.widgetRightTopForm}>
                      <div className={classes.widgetRightFormitem}>
                        <div className={classes.widgetRightFormButton}>
                          캘린더
                        </div>
                        <div className={classes.widgetRightFormButton}>
                          응원 메시지
                        </div>
                        {unselectedFlags.map((flag) => (
                          <div className={classes.widgetRightItem}>
                            <div
                              className={classes.widgetRightItemFlag}
                              key={flag}
                            >
                              {flag}
                            </div>

                            <IoIosClose
                              className={classes.widgetRightButton}
                              onClick={() => handleCancelFlag(flag)}
                            />
                          </div>
                        ))}
                      </div>
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
        </div>
      </div>
    </>
  );
}

export default MyProfileEdit;
