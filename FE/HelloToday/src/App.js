import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import User from "./pages/User/User";
import RoutineSelectMain from "./pages/RoutineSelectMain/RoutineSelectMain";
import GroupRoutine from "./pages/GroupRoutine/GroupRoutine";
import MyProfile from "./pages/MyProfile/MyProfile";
import RoutineAuthMain from "./pages/RoutineAuthMain/RoutineAuthMain";
import JoinRoom from "./pages/video/JoinRoom";
import Modal from "react-modal";

// openvidu demo ver
// import VideoRoomComponent from "./pages/video/VideoRoomComponent";
import RedirectPageKakao from "./components/User/PageRedirectKakao";
import RedirectPageNaver from "./components/User/PageRedirectNaver";
import LogoutPage from "./components/User/PageLogout";

function App() {
  Modal.setAppElement("#root");

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<User />} />
      <Route path="/logout" element={<LogoutPage />} />
      <Route path="/unselectmain" element={<RoutineSelectMain />} />
      <Route path="/selectmain" element={<RoutineAuthMain />} />
      <Route path="/GroupRoutine" element={<GroupRoutine />} />
      <Route path="/MyProfile" element={<MyProfile />} />
      <Route path="/roomId" element={<JoinRoom />} />
      {/* <Route path="/roomId" element={<VideoRoomComponent />} /> */}
      <Route
        path="/login/oauth2/code/kakao"
        element={<RedirectPageKakao />}
      ></Route>
      <Route
        path="/login/oauth2/code/naver"
        element={<RedirectPageNaver />}
      ></Route>
    </Routes>
  );
}

export default App;
