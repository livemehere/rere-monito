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
import Login from "./pages/login";
import RoomUpdate from "./pages/studyGroup/roomUpdate";
import RoomCreate from "./pages/studyGroup/roomCreate";
import StudyRoom from "./pages/studyGroup/studyRoom";
import SignUp from "./pages/signUp";
import {useEffect} from "react";
import {useRecoilState} from "recoil";
import {userState} from "./atoms/user";
import axiosManager from "./util/axiosManager";
import {loginState} from "./atoms/loginState";
import {toast} from "react-toastify";

function App() {
  const [user, setUser] = useRecoilState(userState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const handleAutoLogin = async (token)=>{
    const userData = await axiosManager.axios("/signIn/verify", "POST", {
      token,
    });
    setUser(userData);
  }

  // 자동로그인 처리 (from.태민)
  useEffect(()=>{
    const token = window.localStorage.getItem('token');
    if(!token) return;
    handleAutoLogin(token);
    setIsLoggedIn(true);
  },[])


  // 토스트창은 로그인 시에만 동작하게 됨(새로고침 할때도 마찬가지) (from.태민)
  // 토스트 창이 navbar에 있으면 계속 렌더링되기 때문에 최상위 컴포넌트인 App.js로 옮겼습니다 (from.태민)
  useEffect(() => {
    if(!isLoggedIn) return;

    toast.info("🦄 저번주 대비 학습량이 늘었습니다.", {
      autoClose:5000,
      position: toast.POSITION.TOP_RIGHT,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      pauseOnFocusLoss: false,
      draggable: true,
      isLoading: false
    });
  }, [isLoggedIn]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/LoginFormContent" element={<Login />} />
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
