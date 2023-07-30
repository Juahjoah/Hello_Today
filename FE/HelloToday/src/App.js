import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import User from "./pages/User";
import RoutineSelectTest from "./pages/RoutineSelectTest";
import Kakao from "./components/Login/Kakao"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/test" element={<RoutineSelectTest />} />
      <Route path="/login" element={<User />} />
      <Route path = "/login/oauth2/code/kakao" element={<Kakao />}></Route>
    </Routes>
  );
}

export default App;
