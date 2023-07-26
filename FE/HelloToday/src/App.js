import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import User from "./pages/User";
import RoutineSelectTest from "./pages/RoutineSelectTest";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<User />} />
      <Route path="/test" element={<RoutineSelectTest />} />
    </Routes>
  );
}

export default App;
