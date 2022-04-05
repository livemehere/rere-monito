import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/layout";

export default function MyPage() {
  return (
    <Layout>
      <h1>MyPage</h1>
      <ul className="navbar">
        <li>
          <Link to="/mypage/edit">프로필 수정</Link>
        </li>
        <li>
          <Link to="/mypage/d-day">D-day</Link>
        </li>
        <li>
          <Link to="/mypage/pose">자세</Link>
        </li>
        <li>
          <Link to="/mypage/analyze">분석</Link>
        </li>
      </ul>
    </Layout>
  );
}
