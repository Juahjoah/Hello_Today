const KAKAO_CLIENT_ID = "342e7bf27eba10f4f52f213866d7146d";
const KAKAO_REDIRECT_URI = "https://i9b308.p.ssafy.io/login/oauth2/code/kakao";
// const KAKAO_REDIRECT_URI =
// "http://i9b308.p.ssafy.io:3000/login/oauth2/code/kakao";
const KAKAO_REDIRECT_URI = "http://localhost:3000/login/oauth2/code/kakao";
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

const NAVER_CLIENT_ID = "mnX6BbAZD4pm3XzHHq7K";
const NAVER_REDIRECT_URI =
  "http://i9b308.p.ssafy.io:3000/login/oauth2/code/naver";
const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}`;

export { KAKAO_AUTH_URL, NAVER_AUTH_URL };
