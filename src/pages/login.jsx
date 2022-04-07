import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../atoms/user";
import Layout from "../components/layout";
import { LoginBox, LoginBoxTitle } from "../components/Presenter/Login/LoginPresenter";
import { BackDiv } from "../components/Presenter/UserPageMain/UserPageMainPresenter";
import axiosManager from "../util/axiosManager";


export default function Login() {
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

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
    } catch (e) {
      alert("로그인에 실패하였습니다");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    handleLogin(email, password);
  };

  return (
    <Layout>
      <BackDiv>
      <LoginBox>
      <LoginBoxTitle className="main-logo">로그인</LoginBoxTitle>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="email" name="email" className="login-input"/>
          <input type="text" placeholder="password" name="password" className="login-input"/>
          <button className="login-btn">로그인</button>
        </form>
        </LoginBox>
        </BackDiv>

    </Layout>
  );
}
