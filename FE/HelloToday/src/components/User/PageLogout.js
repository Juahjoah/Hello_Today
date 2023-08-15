import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
// import { Link } from 'react-router-dom';

import { removeCookieToken } from "./CookieStorage";
import { DELETE_TOKEN } from "../../store/TokenSlice";

import Spinner from "./PageSpinner";
import { Logoutstate } from "../../store/LoginSlice";

function LogoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function logout() {
    // store에 저장된 Access Token 정보를 삭제
    dispatch(DELETE_TOKEN());
    // Cookie에 저장된 Refresh Token 정보를 삭제
    removeCookieToken();
    dispatch(Logoutstate());
    // local, session 저장소 사용자 정보 삭제
    localStorage.clear();
    sessionStorage.clear();
    return navigate("/");
  }

  // 해당 컴포넌트가 요청된 후 한 번만 실행되면 되기 때문에 useEffect 훅을 사용
  useEffect(() => {
    logout();
  }, []);

  return (
    // <>
    //     <Link to="/" />
    // </>
    <div>
      <Spinner />
    </div>
  );
}

export default LogoutPage;
