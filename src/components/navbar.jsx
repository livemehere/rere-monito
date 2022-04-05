import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <ul className="navbar">
      <li>
        <Link to="/">홈으로</Link>
      </li>
      <li>
        <Link to="/mainCam">공부시작하기</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/group">그룹 룸</Link>
      </li>
      <li>
        <Link to="/calendar">캘린더</Link>
      </li>
      <li>
        <Link to="/planner">플래너</Link>
      </li>
      <li>
        <Link to="/mypage">마이페이지</Link>
      </li>
    </ul>
  );
}
