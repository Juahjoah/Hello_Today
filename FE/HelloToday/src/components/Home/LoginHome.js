// routine/private API 확인
// flag
//  - 0: 진행 루틴 있을 때의 컴포넌트
//  - 1: 진행 루틴 없을 때의 컴포넌트

import axios from "axios";
import { useEffect } from "react";

function LoginHome() {
    useEffect(() => {
        async function axiosPrivateRoutineData() {
            try {
                const privateRoutineResponse = await axios.get(

                )
            } catch (error) {
                console.log("Error fetching data: ", error);
            }
        }
    }, []);
    return (
        <div></div>
    );
}

export default LoginHome;