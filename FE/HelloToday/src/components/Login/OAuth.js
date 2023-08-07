const CLIENT_ID = "342e7bf27eba10f4f52f213866d7146d"; //카카오 developers REST API 키
const REDIRECT_URI = "http://localhost:3000/login/oauth2/code/kakao"; // 등록한 redirect uri //나중에 3030으로 바꾸기

// const REDIRECT_URI = "https://i9b308.p.ssafy.io/login/oauth2/code/kakao";
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

// const NAVER_AUTH_URL = ``;
export { KAKAO_AUTH_URL };
