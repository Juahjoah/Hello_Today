// routine/private API 확인
// flag
//  - 0: 진행 루틴 있을 때의 컴포넌트
//  - 1: 진행 루틴 없을 때의 컴포넌트
import axios from "axios";
import { useEffect, useState } from "react";
import Nav from "../../components/common/Nav";
import { useSelector } from "react-redux";
import UnSelectedRoutine from "../../components/routine/UnSeletedRoutine";
import SelectedRoutine from "../routine/SelectedRoutine";

function LoginHome() {
  const LOCAL_URL = "http://localhost:8080";
  const [routinePrivateResponse, setRoutinePrivate] = useState([]);
  const AccsesToken = useSelector((state) => state.authToken.accessToken);
  const [routineDetailCheckList, setRoutineDetailCheckList] = useState();

  useEffect(() => {
    async function axiosRoutinePrivateData() {
      try {
        const routinePrivateResponse = await 
        axios.get(`${LOCAL_URL}/api/routine/private`, {
            headers: {
              Authorization: AccsesToken,
            }}
        );

        setRoutinePrivate(routinePrivateResponse.data);

        // 현재 진행하고 있는 루틴 리스트(인증 내역)
        // const routineDetailCheckList = routinePrivateResponse.data.routineDetailCatCheck;
        setRoutineDetailCheckList(routinePrivateResponse.data.routineDetailCatCheck)
        console.log(">>")
        console.log(routineDetailCheckList)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    axiosRoutinePrivateData();
  }, []);

  return (

    <div>
      <Nav />
      {routinePrivateResponse.activeFlag === 1 ? (
        // 진행 중인 루틴이 있는 경우
        <SelectedRoutine routineCheckList={routineDetailCheckList}/>
      ) : (
        // 진행 중인 루틴이 없는 경우
        <UnSelectedRoutine />
      )}
    </div>
  );
}

export default LoginHome;