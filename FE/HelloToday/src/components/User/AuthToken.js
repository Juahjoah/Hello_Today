//구동 방식
// 1. 로그인 인증이 필요한 페이지에 api 요청할 때 header에 access토큰을 담아서 요청
// 2-1. 만약에 새로고침에 의해 사라졌거나,access 토큰이 만료되어 백으로부터 에러 메세지를 받으면
// 3-1. refresh토큰만 백으로 넘기면서 요청하면 백에서 refresh토큰을 인증하고 다시 프론트로 access 토큰과 refresh토큰을 프론트로 발급한다.
// allAuth에 들어가는 메서드
// refresh토큰 요청
// access 토큰 요청 : 만료되서 에러 떠서 refresh토큰 다시 요청하는 것은 외부(allAuth)에서 처리

import axios from "axios";

//refresh 건너주고 refresh와 access 받음
export const getRefreshToken = async (refreshtoken_) => {
  const data = {
    headers: {
      "Authorization-Refresh": refreshtoken_,
    },
  };

  try {
    console.log("머가 문제");
    console.log("refreshtoken_ = ", refreshtoken_);
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/members/reissue`,
      data
    );
    // const res = await axios.get(
    //   `https://i9b308.p.ssafy.io/api/members/reissue`,
    //   data
    // );
    
    console.log("requestAccessToken");
    return res;
  } catch (error) {
    console.log(error);
    throw error; // 에러를 다시 던져서 호출하는 곳에서도 에러 처리 가능
  }
};

// access 토큰 만료되었는지 확인
export const getAccessToken = async (refreshtoken_, accesstoken_) => {
  const data = {
    headers: {
      Authorization: accesstoken_,
    },
  };
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/test`,
      data
    );
    // const res = await axios.get(
    //   `https://i9b308.p.ssafy.io/api/members/reissue`,
    //   data
    // );
    console.log("매개변수 받은 accesstoken = ", accesstoken_);
    console.log("만료 안 함. 해당 페이지에 있어도 ok ");
    return res; //access만료 안함. 해당 페이지에 있어도 괜찮다.
  } catch (error) {
    console.log(error); //에러 등장. 밖에서 에러 잡고 프레시 토큰 날리고
    throw error; // 에러를 다시 던져서 호출하는 곳에서도 에러 처리 가능
  }
};
