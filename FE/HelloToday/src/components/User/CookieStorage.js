import { Cookies } from "react-cookie";

const cookies = new Cookies();

//Refresh Token을 Cookie에 저장하기 위한 함수
export const setRefreshToken = (refreshToken) => {
  return cookies.set("refresh_token", refreshToken, { path: "/" });
  //path : 쿠키의 값을 저장하는 서버 경로
  // '/'일 경우 모든 페이지에서 쿠키에 접근할 수 있음
};

export const getCookieToken = () => {
  return cookies.get("refresh_token");
};

export const removeCookieToken = () => {
  return cookies.remove("refresh_token", { path: "/" });
};

//userinfo
// export const setUserInfo = () => {
//     return cookies.set('', , {path: "/", })
// }

// export const getUserInfo = () => {
//     return cookies.get('');
// }

// export const removeUserInfo = () => {
//     return cookies.remove('', { path: '/' })
// }
