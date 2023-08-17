import { Route, Routes } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home/Home";
import User from "./pages/User/User";
import GroupRoutine from "./pages/GroupRoutine/GroupRoutine";
import MyProfile from "./pages/MyProfile/MyProfile";
import JoinRoom from "./pages/video/JoinRoom";
import NotFound from "./pages/NotFound/NotFound";
import Modal from "react-modal";

// openvidu demo ver
// import VideoRoomComponent from "./pages/video/VideoRoomComponent";
import RedirectPageKakao from "./components/User/PageRedirectKakao";
import RedirectPageNaver from "./components/User/PageRedirectNaver";
import LogoutPage from "./components/User/PageLogout";
import { useSelector } from "react-redux";
import ProfileCalenderDetail from "./components/Profile/ProfileCalenderDetail";
import MyProfileEdit from "./pages/MyProfile/MyProfileEdit";
//직접 경로 url 막기
// import PublicRoute from "./Router/PublicRoute";
// import PrivateRoute from "./Router/PrivateRoute";

function App() {
  Modal.setAppElement("#root");
  const islogin = useSelector((state) => state.login.isLogin);

  return (
    <Routes>
      {/* refresh유무에 따라서 직접 url 경로 막기 시작 */}
      {/* <Route element={<PublicRoute />}> */}
      {/* 로그인 안 하면 각각의 컴포넌트 */}
      {/* <Route path="/" element={<Home />} />
        <Route path="/login" element={<User />} />
      </Route>
      <Route element={<PrivateRoute />}> */}
      {/* 로그인 안하면 메인페이지 */}
      {/* <Route path="/unselectmain" element={<RoutineSelectMain />} />
        <Route path="/selectmain" element={<RoutineAuthMain />} />
        <Route path="/GroupRoutine" element={<GroupRoutine />} />
        <Route path="/MyProfile" element={<MyProfile />} />
      </Route>
      <Route path="/logout" element={<LogoutPage />} />
      <Route
        path="/login/oauth2/code/kakao"
        element={<RedirectPageKakao />}
      ></Route>
      <Route
        path="/login/oauth2/code/naver"
        element={<RedirectPageNaver />}
      ></Route> */}
      {/* refresh유무에 따라서 직접 url 경로 막기 끝 */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<User />} />
      <Route path="/logout" element={<LogoutPage />} />
      <Route path="/GroupRoutine" element={<GroupRoutine />} />
      <Route path="/GroupRoutine/:roomId" element={<JoinRoom />} />
      {/* 남의 memberid 가져오기 */}
      <Route path="/MyProfile/:memberId" element={<MyProfile />} />
      <Route path="/MyProfile/edit/:memberId" element={<MyProfileEdit />} />

      <Route
        path="/login/oauth2/code/kakao"
        element={<RedirectPageKakao />}
      ></Route>
      <Route
        path="/login/oauth2/code/naver"
        element={<RedirectPageNaver />}
      ></Route>
      <Route
        path="/MyProfile/:memberId/calen/:checkDate"
        element={<ProfileCalenderDetail />}
      ></Route>
      {/* <Route path="/roomId" element={<JoinRoom />} /> */}
      {/* <Routes path="/roomId" element={<VideoRoomComponent />} /> */}

      {/* 404 Not Found */}
      <Route path="/404NotFound" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
