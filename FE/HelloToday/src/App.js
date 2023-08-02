import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import RoutineSelectTest from "./pages/RoutineSelectTest";
import RoutineSelectMain from "./pages/RoutineSelectMain";

import User from "./pages/User";
import RedirectPageKakao from "./components/User/PageRedirectKakao";
import RedirectPageNaver from "./components/User/PageRedirectNaver";
import LogoutPage from "./components/User/PageLogout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<User />} />
      <Route path="/logout" element={<LogoutPage />} />
      <Route
        path="/login/oauth2/code/kakao"
        element={<RedirectPageKakao />}
      ></Route>
      <Route
        path="/login/oauth2/code/naver"
        element={<RedirectPageNaver />}
      ></Route>
      <Route path="/unselectmain" element={<RoutineSelectMain />} />
      <Route path="/test" element={<RoutineSelectTest />} />
    </Routes>
  );
}

export default App;
