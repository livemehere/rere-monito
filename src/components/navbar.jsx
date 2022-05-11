import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  NavAllContainer,
  NavListContainer,
  NavBody,
  NavLoginLogOut,
} from "./Presenter/Nav/TopNavPresenter";
import { useRecoilState } from "recoil";
import { loginState } from "../atoms/loginState";

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const logoutHandler = () => {
    localStorage.removeItem("4242-token");
    setIsLoggedIn(false);
    window.location.href = "/";
    console.log(isLoggedIn);
  };
  return (
    <>
      <NavBody>
        <NavAllContainer>
          <h1>
            <Link to="/" className="top-nav-title">
              MONITO
            </Link>
          </h1>
          <NavListContainer>
            <Link to="/group" className="top-nav-list">
              <li>스터디그룹</li>
            </Link>
            <Link to="/calendar" className="top-nav-list">
              <li>캘린더</li>
            </Link>
            <Link to="/planner" className="top-nav-list">
              <li>플래너</li>
            </Link>
            <Link to="/mypage" className="top-nav-list">
              <li>마이페이지</li>
            </Link>
          </NavListContainer>
          <NavLoginLogOut>
            {isLoggedIn === false ? (
              <li>
                <Link to="/LoginFormContent" className="login-btn">
                  로그인
                </Link>
                <Link to="/signUp" className="sign-up-btn">회원가입</Link>
              </li>
            ) : (
              <p onClick={logoutHandler}>로그아웃</p>
            )}
          </NavLoginLogOut>

          {/* <div className="user-name">{User.Name}님 환영합니다.</div> { /* 이부분 기능구현은 로그인 기능 갖춰지면 넣을예정 */}
        </NavAllContainer>
      </NavBody>
    </>
    // <ul className="navbar">
    //   <li>
    //     <Link to="/">홈으로 가자</Link>
    //   </li>
    //   <li>
    //     <Link to="/mainCam">공부시작하기ㅇㅇ</Link>
    //   </li>
    //   <li>
    //     <Link to="/login">Loginㅇㅇ</Link>
    //   </li>
    //   <li>
    //     <Link to="/group">그룹 룸</Link>
    //   </li>
    //   <li>
    //     <Link to="/calendar">캘린더</Link>
    //   </li>
    //   <li>
    //     <Link to="/planner">플래너</Link>
    //   </li>
    //   <li>
    //     <Link to="/mypage">마이페이지</Link>
    //   </li>
    // </ul>
  );
}
