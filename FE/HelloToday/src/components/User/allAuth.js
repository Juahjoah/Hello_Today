//각각의 페이지에서 access 토큰을 이용해서 실시간으로 소통을 하는 함수
// Page > allAuth > AuthToken
import { setRefreshToken } from "../../components/User/CookieStorage";
import { SET_TOKEN } from "../../store/TokenSlice";
import { Loginstate } from "../../store/LoginSlice";
import {
  getRefreshToken,
  getAccessToken,
} from "../../components/User/AuthToken";
import { Cookies } from "react-cookie";

const allAuth = (isAccess, dispatch) => {
  //함수 정의
  const cookies = new Cookies();
  const refreshtoken_ = cookies.get("refresh_token");
  console.log("첫 마운트 refreshtoken = ", refreshtoken_);

  const fetchData = async (refreshtoken) => {
    try {
      const res = await getRefreshToken(refreshtoken); //날리기
      const newaccessToken = res.headers["authorization"];
      const newrefreshToken = res.headers["authorization-refresh"];
      console.log("Access Token:", newaccessToken);
      console.log("Refresh Token:", newrefreshToken);
      dispatch(SET_TOKEN(newaccessToken));
      setRefreshToken(newrefreshToken);
      dispatch(Loginstate());
    } catch (error) {
      console.log(error); // 에러 응답 데이터 출력
    }
  };
  const accessData = async (refreshtoken, accessToken) => {
    try {
      const res = await getAccessToken(refreshtoken, accessToken); //access 만료 유무
      console.log("성공");
    } catch (error) {
      console.log("accessData함수 = ", error);
      console.log("access토큰이 만료되었나? ", error.response.status === 401);
      if (error.response.status === 401) {
        //access 만료 error 못 잡음
        await fetchData(refreshtoken);
      }
    }
  };
  //함수 실제 실행
  if (!isAccess) {
    console.log("access토큰 없음");
    fetchData(refreshtoken_);
  } else {
    console.log("access토큰 있음");
    //토큰
    console.log(isAccess);
    accessData(refreshtoken_, isAccess);
  }
};

export default allAuth;
