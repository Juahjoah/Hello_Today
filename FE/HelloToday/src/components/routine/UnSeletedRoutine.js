import classes from "../../pages/RoutineSelectMain/RoutineSelectMain.module.css"
import { useState, useEffect } from "react";
import SelectRoutineList from "./SelectRoutineList";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import allAuth from "../User/allAuth";
import { Navigate } from "react-router-dom";
import { haveRoutine } from "../../store/haveActiveRoutine";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { Splide } from "@splidejs/react-splide";
import SelectRoutineItem from "./SelectRoutineItem";
import NickNamePopup from "../PopUp/NickNamePopup";
import MainBanner from "../common/MainBanner";

function UnSelectedRoutine() {
  // state & data
  const API_URL = "https://i9b308.p.ssafy.io";
  const LOCAL_URL = "http://localhost:8080"
  const location = useLocation();

  const AccsesToken = useSelector((state) => state.authToken.accessToken);
  const isFirstLogin = JSON.parse(localStorage.getItem("isFirstLogin"))
  const memberId = localStorage.getItem('memberId')


  const [AllRoutineList, setAllRoutineList] = useState([]);
  const [routineMent, setRoutineMent] = useState([]);
  //
  const selectRoutineState = useSelector((state) => state.selectRoutine);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [redirectToAuth, setRedirectToAuth] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);
  const [FirstLogin, setFirstLogin] = useState(isFirstLogin);
  const [nickName, setNickName] = useState("");

  console.log(typeof FirstLogin)
  console.log(typeof false)
  const dispatch = useDispatch();
  const routineSelectBannerImg = "main_banner_routineselect1";
  const routineSelectMainBannerMents = [
    "쉽지 않은 생활 습관 만들기",
    "계획을 떠나 아예 뭘 해야할지 모르겠다구요?",
    "결심했다는 마음이 중요한거예요 :)",
  ];


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

  // 루틴 제출 시 redirect
  if (redirectToAuth) {
    return <Navigate to="/" />;
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
      url: `${LOCAL_URL}/api/routine/private`,
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
    // 메인으로 돌아가기
    // return <Navigate to="/" />;
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
      top: "300px",
      left: "300px",
      right: "300px",
      bottom: "200px",
      border: "5px solid black",
      borderRadius: "20px",
    },
  };

  // Splide option in Modal
  const option = {
    drag: "free",
    gap: "20px",
    focus: "center",
    fixedWidth: "250px",
    fixedHeight: "250px",
    arrows: false,
  };

    return (
        <>
        <MainBanner
          bannerImg={routineSelectBannerImg}
          bannerMent={routineSelectMainBannerMents}
        />
        <div className={classes.routineSelectMain}>
          <div className={classes.test}>
            {AllRoutineList.map((bigRoutine, index) => {
              const bigRoutineMent = routineMent[index].content;
              return (
                <div key={index}>
                  <p className={classes.bigRoutineMent}>{bigRoutineMent}</p>
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
            {/* <p>{nickName}님이 선택하신 루틴 입니다.</p> */}
            <p>{}님이 선택하신 루틴 입니다.</p>
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
            <p className={classes.modalDescriptionOne}>
              해당 루틴은 7일간 진행됩니다.
            </p>{" "}
            <p>루틴이 제대로 선택되었는지, 확인해주세요!</p>
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
          memberId={memberId}
        />
      </>
    );
}

export default UnSelectedRoutine;