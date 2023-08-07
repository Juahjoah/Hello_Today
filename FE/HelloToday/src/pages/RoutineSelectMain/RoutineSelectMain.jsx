import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import Nav from "../../components/common/Nav";
import MainBanner from "../../components/common/MainBanner";
import SelectRoutineItem from "../../components/routine/SelectRoutineItem";
import SelectRoutineList from "../../components/routine/SelectRoutineList";
import { haveRoutine } from "../../store/haveActiveRoutine";
import { Splide } from "@splidejs/react-splide";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import classes from "./RoutineSelectMain.module.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import NickNamePopup from "../../components/PopUp/NickNamePopup";

//로그인

// 로그인 시 필요한 함수
import allAuth from "../../components/User/allAuth";

function RoutineSelectMain() {
  // state & data
  // const API_URL = "https://i9b308.p.ssafy.io";
  const API_URL = "http://localhost:8080";
  const location = useLocation();
  // const memberId = location.state.memberId;
  const AccsesToken = useSelector((state) => state.authToken.accessToken);
  const isFirstLogin = location?.state?.isFirstLogin ?? false;

  const [AllRoutineList, setAllRoutineList] = useState([]);
  const [routineMent, setRoutineMent] = useState([]);
  //
  const selectRoutineState = useSelector((state) => state.selectRoutine);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [redirectToAuth, setRedirectToAuth] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);
  const [FirstLogin, setFirstLogin] = useState(isFirstLogin);
  const [nickName, setNickName] = useState(location?.state?.nickName ?? "user");

  const dispatch = useDispatch();

  // 최초 렌더 시 루틴 데이터 받아오기
  useEffect(() => {
    async function axiosRoutineData() {
      try {
        const routineResponse = await axios.get(
          `${API_URL}/api/routine/detail`
        );
        const routineMentResponse = await axios.get(
          `${API_URL}/api/routine/ment`
        );
        setAllRoutineList(routineResponse.data);
        setRoutineMent(routineMentResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    axiosRoutineData();
  }, []);

  //------------------------------로그인 시작
  const isAccess = useSelector((state) => state.authToken.accessToken);

  useEffect(() => {
    allAuth(isAccess, dispatch);
  }, [dispatch]);
  //-----------------------------------여기까지

  const routineSelectBannerImg = "main_banner_routineselect1";
  const routineSelectMainBannerMents = [
    "쉽지 않은 생활 습관 만들기",
    "계획을 떠나 아예 뭘 해야할지 모르겠다구요?",
    "결심했다는 마음이 중요한거예요 :)",
  ];

  // 루틴 제출 시 redirect
  if (redirectToAuth) {
    return <Navigate to="/selectmain" />;
  }

  // function
  const openModal = () => {
    if (selectRoutineState.length < 1) {
      alert("루틴을 선택해주세요!");
      return;
    }
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const submitSelectedRoutine = () => {
    axios({
      url: `${API_URL}/api/routine/private`,
      method: "post",
      data: {
        routineDetailDtoList: selectRoutineState,
      },
      headers: {
        Authorization: AccsesToken,
      },
    });

    dispatch(haveRoutine(true));
    closeModal();
    setRedirectToAuth(true);
  };

  // modal style
  const modalStyle = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.6)",
      zIndex: 10,
    },
    content: {
      display: "flex",
      flexDirextion: "column",
      backgroundColor: "rgba(255,255,255,0.95)",
      overflow: "auto",
      zIndex: 10,
      top: "100px",
      left: "100px",
      right: "100px",
      bottom: "100px",
      border: "3px solid black",
      borderRadius: "12px",
    },
  };

  // Splide option in Modal
  const option = {
    drag: "free",
    gap: "20px",
    focus: "center",
    fixedWidth: "180px",
    fixedHeight: "180px",
    arrows: false,
  };

  return (
    <>
      <Nav />
      <MainBanner
        bannerImg={routineSelectBannerImg}
        bannerMent={routineSelectMainBannerMents}
      />
      <div className={classes.routineSelectMain}>
        <div className={classes.test}>
          {AllRoutineList.map((bigRoutine, index) => {
            const bigRoutineMent = routineMent[index].content;
            return (
              <div key={index} style={{ marginTop: "30px" }}>
                <div className={classes.bigRoutineMent}>{bigRoutineMent}</div>
                <SelectRoutineList
                  bigRoutine={bigRoutine}
                  idx={index}
                  updateSelectedCount={setSelectedCount}
                  selectedCount={selectedCount}
                />
              </div>
            );
          })}
        </div>
        <button onClick={openModal} className={classes.routineSubmit}>
          루틴을 선택하셨나요?
        </button>
      </div>

      {/* Modal */}

      <Modal
        style={modalStyle}
        isOpen={modalIsOpen}
        onRequestClose={() => closeModal(false)}
      >
        <div className={classes.selectedRoutineModal}>
          <FontAwesomeIcon
            onClick={closeModal}
            icon={faCircleXmark}
            className={classes.modalClose}
          />
          <div className={classes.modalDescriptionTitle}>
            {nickName}님이 선택하신 루틴 입니다.
          </div>
          <Splide options={option}>
            {selectRoutineState.map((item, index) => {
              return (
                <SelectRoutineItem
                  key={index}
                  routineId={item.routineDetailId}
                  routineContent={item.content}
                  routineImg={item.imgPath}
                  isModalOpen={modalIsOpen}
                />
              );
            })}
          </Splide>
          <div className={classes.modalDescriptionOne}>
            해당 루틴은 7일간 진행됩니다.
          </div>{" "}
          <div className={classes.modalDescriptionTwo}>
            루틴이 제대로 선택되었는지, 확인해주세요!
          </div>
          <div className="modalBtnSection">
            <button
              className={classes.routinSubmitModal}
              onClick={submitSelectedRoutine}
            >
              루틴 확정하기
            </button>
          </div>
        </div>
      </Modal>

      {/* NickName Modal */}
      <NickNamePopup
        FirstLogin={FirstLogin}
        setFirstLogin={setFirstLogin}
        Token={AccsesToken}
        setNickName={setNickName}
      />
    </>
  );
}

export default RoutineSelectMain;
