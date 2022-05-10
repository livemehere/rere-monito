import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import MainCam from "./pages/mainCam";
import MyPage from "./pages/mypage/myPage";
import Planner from "./pages/planner";
import Group from "./pages/studyGroup/group";
import Canlendar from "./pages/calendar";
import Edit from "./pages/mypage/edit";
import Dday from "./pages/mypage/dDay";
import Analyze from "./pages/mypage/analyze";
import Pose from "./pages/mypage/pose";
import LoginFormContent from "./components/Container/Login/LoginFormContent";
import RoomUpdate from "./pages/studyGroup/roomUpdate";
import RoomCreate from "./pages/studyGroup/roomCreate";
import StudyRoom from "./pages/studyGroup/studyRoom";
import SignUp from "./pages/signUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<LoginFormContent />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="mainCam" element={<MainCam />} />
        <Route path="mypage">
          <Route path="" element={<MyPage />} />
          <Route path="edit" element={<Edit />} />
          <Route path="d-day" element={<Dday />} />
          <Route path="analyze" element={<Analyze />} />
          <Route path="pose" element={<Pose />} />
        </Route>
        <Route path="planner" element={<Planner />} />
        <Route path="group">
          <Route path="" element={<Group />} />
          <Route path="RoomUpdate" element={<RoomUpdate />} />
          <Route path="RoomCreate" element={<RoomCreate />} />
          <Route path=":roomId" element={<StudyRoom />} />
        </Route>
        <Route path="calendar" element={<Canlendar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
