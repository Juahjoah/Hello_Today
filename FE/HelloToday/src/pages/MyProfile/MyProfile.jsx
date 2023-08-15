/* eslint-disable react-hooks/exhaustive-deps */
import Nav from "../../components/common/Nav";
import classes from "./MyProfile.module.css";

import ProfileMenu from "../../components/Profile/ProfileMenu";
import ProfileMain from "../../components/Profile/ProfileMain";
import FollowButton from "../../components/Profile/FollowButton";
import FollowList from "../../components/Profile/FollowList";

import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

//로그인
import { useDispatch, useSelector } from "react-redux";
// 로그인 시 필요한 함수
import allAuth from "../../components/User/allAuth";

function MyProfile() {
  //------------------------------로그인 시작
  const dispatch = useDispatch();
  const AccsesToken = useSelector((state) => state.authToken.accessToken);
  const [isUserEdit, setIsUserEdit] = useState(false);
  const memberId = useParams().memberId; //url에서 param가져오기
  const smemberId = sessionStorage.getItem("memberId");

  useEffect(() => {
    allAuth(AccsesToken, dispatch);
  }, []);
  //-----------------------------------여기까지

  // api 요청 후 받아온 user 정보 (모듈화 진행)
  const params = useParams();
  const [user, setUser] = useState({
    memberId: "",
    nickname: "",
    profilePath: "",
    stMsg: "",
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/mypage/${params.memberId}`, {
        headers: { Authorization: AccsesToken },
      })
      .then((response) => {
        // console.log("user정보 가지고 와랐!!!!");
        // console.log(response.data);
        setUser({
          memberId: response.data.memberId,
          nickname: response.data.nickname,
          profilePath: response.data.profilePath,
          stMsg: response.data.stMsg,
        });
        // console.log(response.data);
        setURLThumbnail(response.data.profilePath);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, [AccsesToken, isUserEdit, memberId]);

  const [Menu, setMenu] = useState(0);

  const [FollowButtonClick, setFollowButtonClick] = useState(false);

  //회원정보 수정
  const nicknameinput = useRef();
  const stMsginput = useRef();
  const thumbnailInput = useRef();
  const [selectedFile, setSelectedFile] = useState(null);
  const [URLThumbnail, setURLThumbnail] = useState();
  const [originalUser, setOriginalUser] = useState({});

  const handleClick = () => {
    thumbnailInput.current?.click();
  };

  // createObjectURL 방식
  const createImageURL = (fileBlob) => {
    //createObjectURL을 사용하여 생성한 URL을 사용한 후에는
    //revokeObjectURL을 호출하여 메모리 누수를 방지
    if (URLThumbnail) URL.revokeObjectURL(URLThumbnail);
    const url = URL.createObjectURL(fileBlob);
    setURLThumbnail(url);
  };

  //edit모드인지 수정
  const handleUserEdit = () => {
    setIsUserEdit(true);
    setOriginalUser(user);
  };

  // 에딧 모드 취소
  const handleCancle = () => {
    setIsUserEdit(false);
    setUser(originalUser); // 원래 데이터로 복구
    setURLThumbnail(originalUser.profilePath);
  };

  // 변동 사항(파일)
  const handleFileChange = (e) => {
    //set preview image
    const { files } = e.target;
    if (!files || !files[0]) return;
    const uploadImage = files[0];
    createImageURL(uploadImage);
    setSelectedFile(uploadImage);
  };

  // 변동 사항(input)
  const handleChangeState = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  //제출
  const handleSubmit = () => {
    if (user.nickname.length < 1) {
      alert("닉네임 입력");
      nicknameinput.current.focus();
      return;
    }
    if (user.stMsg === null || user.stMsg.length < 1) {
      alert("상태 입력");
      stMsginput.current.focus();
      return;
    }
    const formData = new FormData();
    const data = {
      nickname: user.nickname,
      stMsg: user.stMsg,
      file: user.file,
    };
    console.log(selectedFile);

    formData.append(
      "request",
      new Blob([JSON.stringify(data)], {
        type: "application/json",
      })
    );
    formData.append("file", selectedFile);

    //백이랑 통신
    axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/api/members/${params.memberId}`,
        formData,
        {
          headers: {
            Authorization: AccsesToken,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        // console.log("제출결과 : ", res);
        //edit모드 false로 바꾸기
        setIsUserEdit(false);
        // TODO: localstrage에 setItem
        localStorage.setItem("nickName", user.nickname);
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  return (
    <div>
      <Nav />
      <div className={classes.MyProfile}>
        {/* 화면 왼쪽 개인 정보 */}
        <div className={classes.UserProfile}>
          <div className={classes.UserProfileSection}>
            <div className={classes.UserInfo}>
              <div className={classes.UserInfoTop}>
                {/* 닉네임/프로필 바꿀 수 있는 옵션 화면 추가 */}
                {isUserEdit ? (
                  <div>
                    <form id="form" className={classes.editable}>
                      <img
                        className={classes.ProfileImg}
                        src={URLThumbnail}
                        alt="thumbnail"
                      />
                      <button
                        className={`${classes.Profile_edit_btn} ${classes.Profile_file_btn} ${classes.Profile_Img_edit_btn}`}
                        onClick={handleClick}
                        type="button"
                      >
                        +
                        <input
                          type="file"
                          accept="image/*"
                          ref={thumbnailInput}
                          onChange={handleFileChange}
                        />
                      </button>
                      <div className={classes.ProfilenNickName}>
                        <input
                          className={classes.Profile_edit_input}
                          type="text"
                          value={user.nickname}
                          placeholder="닉네임을 입력하세요"
                          ref={nicknameinput}
                          onChange={handleChangeState}
                          name="nickname"
                          spellCheck="false"
                        ></input>
                      </div>
                      <div className={classes.ProfileMsg}>
                        <input
                          className={classes.Profile_edit_input}
                          type="text"
                          value={user.stMsg}
                          placeholder="상태메세지를 입력하세요"
                          ref={stMsginput}
                          onChange={handleChangeState}
                          name="stMsg"
                          spellCheck="false"
                        ></input>
                      </div>
                      <div className={classes.Profile_btns}>
                        <button
                          className={classes.Profile_edit_btn}
                          onClick={handleSubmit}
                          type="button"
                        >
                          완료
                        </button>
                        <button
                          className={`${classes.Profile_edit_btn} ${classes.Profile_cancle_btn}`}
                          onClick={handleCancle}
                          type="button"
                        >
                          취소
                        </button>
                      </div>
                      {/* type = button 지정 안 하면 url에 ?key=value 형태 생김  */}
                    </form>
                  </div>
                ) : (
                  <div className={classes.UserInformation}>
                    <img
                      className={classes.ProfileImg}
                      src={user.profilePath}
                      alt={user.Userprofilepic}
                    />
                    <p className={classes.ProfilenNickName}>{user.nickname}</p>
                    <p className={classes.ProfileMsg}>{user.stMsg}</p>
                    {memberId === smemberId ? (
                      <button className={classes.editbtn}>
                        <img
                          src="../../images/Widget/gear.png"
                          alt="useredit"
                          onClick={handleUserEdit}
                          style={{
                            width: "20px",
                            height: "20px",
                          }}
                        />
                      </button>
                    ) : (
                      // followBtn
                      <></>
                    )}
                  </div>
                )}
              </div>

              {/* 팔로잉/팔로워 */}
              <div className={classes.UserFollow}>
                <FollowButton
                  memberId={params.memberId}
                  setFollowButtonClick={setFollowButtonClick}
                />
              </div>
            </div>

            <div className={classes.userInfoMenu}>
              <ProfileMenu
                setMenu={setMenu}
                setFollowButtonClick={setFollowButtonClick}
                memberId={params.memberId}
                Token={AccsesToken}
              />
            </div>
          </div>
        </div>

        {/* 화면 오른쪽 화면 출력 창 */}

        <div className={classes.Profilecontent}>
          {FollowButtonClick ? (
            <FollowList memberId={params.memberId} />
          ) : (
            <ProfileMain Menu={Menu} />
          )}
          {/* <ProfileMain Menu={Menu} /> */}
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
