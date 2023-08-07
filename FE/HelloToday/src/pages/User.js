import { useSelector } from "react-redux";
import KakaoLoginButton from "../components/Login/KakaoLoginButton"
import NaverLoginButton from "../components/Login/NaverLoginButton"

function User() {
  const selectedRoutine = useSelector((state) => state.selectRoutine);
  return (
    <div>
    <p>
      로그인 페이지 입니다!
    </p>
    {selectedRoutine}
    <KakaoLoginButton />
    <NaverLoginButton />
    </div>
  );
}

export default User;
