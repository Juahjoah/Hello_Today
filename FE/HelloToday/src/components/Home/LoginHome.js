// routine/private API 확인
// flag
//  - 0: 진행 루틴 있을 때의 컴포넌트
//  - 1: 진행 루틴 없을 때의 컴포넌트
import axios from "axios";
import { useEffect, useState } from "react";
import Nav from "../../components/common/Nav";
import { useSelector } from "react-redux";
import UnSelectedRoutine from "../routine/UnSelectedRoutine";
import SelectedRoutine from "../routine/SelectedRoutine";
import Footer from "../common/Footer";

function LoginHome() {
  const [routinePrivateResponse, setRoutinePrivate] = useState([]);
  const AccsesToken = useSelector((state) => state.authToken.accessToken);
  console.log("LoginHome")
  // console.log(AccsesToken);
  const haveActiveRoutine = useSelector((state) => state.haveActiveRoutine); // 추가
  console.log("haveActiveRoutine: " + haveActiveRoutine);
  
  useEffect(() => {
    async function axiosRoutinePrivateData() {
      console.log("useEffect 실행")
      try {
        const routinePrivateResponse = await 
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/routine/private`, {
            headers: {
              Authorization: AccsesToken,
            }}
        );
        
        setRoutinePrivate(routinePrivateResponse.data);
        console.log(routinePrivateResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    axiosRoutinePrivateData();
  }, [haveActiveRoutine]);

  return (

    <div>
      <Nav />
      {routinePrivateResponse.activeFlag === 1 ? (
        // 진행 중인 루틴이 있는 경우
        <SelectedRoutine routinePrivate={routinePrivateResponse}/>
      ) : (
        // 진행 중인 루틴이 없는 경우
        <UnSelectedRoutine />
      )}
      <Footer/>
    </div>
  );
}

export default LoginHome;