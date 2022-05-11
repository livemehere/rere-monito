import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../atoms/user";
import Layout from "../components/layout";
import { AlignTitle } from "../components/Presenter/Calendar/CalendarTitlePresenter";
import {
  LoginBox,
  LoginBoxTitle,
} from "../components/Presenter/Login/LoginPresenter";
import { BackDiv } from "../components/Presenter/UserPageMain/UserPageMainPresenter";
import axiosManager from "../util/axiosManager";
import signUp from "./signUp";
import { loginState } from "../atoms/loginState";

export default function Login() {
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const token = window.location.href.split(`?token=`)[1];

  useEffect(() => {
    if (token) localStorage.setItem("4242-token", token);
    if (localStorage.getItem("4242-token")) setIsLoggedIn(true);
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const result = await axiosManager.axios("/signIn", "POST", {
        email,
        password,
      });

      const userData = await axiosManager.axios("/signIn/verify", "POST", {
        token: result,
      });
      setUser(userData);
      navigate("/");
      setIsLoggedIn(true);
    } catch (e) {
      alert("로그인에 실패하였습니다");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    handleLogin(email, password);
  };

  function signUpClick() {
    window.location.href = "/signUp";
  }
  return (
    <Layout>
      <AlignTitle>
        <h1>로그인</h1>
      </AlignTitle>
      <BackDiv>
        <LoginBox>
          <form onSubmit={handleSubmit} className="login-container">
            <input
              type="text"
              placeholder="email"
              name="email"
              className="login-input"
            />
            <input
              type="text"
              placeholder="password"
              name="password"
              className="login-input"
            />

            <button className="login-btn">로그인</button>
          </form>
          <button className="signup-btn" onClick={signUpClick}>
            회원가입
          </button>
        </LoginBox>
      </BackDiv>
    </Layout>
  );
}
