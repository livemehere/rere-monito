import React, { useState } from "react";
import Layout from "../components/layout";
import { AlignTitle } from "../components/Presenter/Calendar/CalendarTitlePresenter";
import {
  BackDiv,
  LoginBox,
} from "../components/Presenter/Login/LoginPresenter";
import axiosManager from "../util/axiosManager";

export default function SignUp() {
  const [startDate, setStartDate] = useState(new Date());

  const handleSignUp = async (
    email,
    password,
    password_check,
    name,
    birth,
    job
  ) => {
    try {
      const result = await axiosManager.axios("/api/user", "POST", {
        email,
        password,
        password_check,
        name,
        birth,
        job,
      });
    } catch (e) {
      alert("회원가입 실패");
    }
  };
  const handleSubmit = (e) => {
    const email = e.target.email.value;
    const password = e.target.password.value;
    const password_check = e.target.password_check.value;
    const name = e.target.name.value;
    const birth = e.target.birth.value;
    const job = e.target.job.value;
    handleSignUp(email, password, password_check, name, birth, job);
  };
  return (
    <Layout>
      <AlignTitle>
        <h1>회원가입</h1>
      </AlignTitle>
      <BackDiv>
        <LoginBox>
          <form className="signup-container" onClick={handleSubmit}>
            <input
              type="email"
              placeholder="email"
              name="email"
              className="signup-input"
            />
            <input
              type="text"
              placeholder="password"
              name="password"
              className="signup-input"
            />
            <input
              type="text"
              placeholder="password"
              name="password-check"
              className="signup-input"
            />
            <input
              type="text"
              placeholder="name"
              name="name"
              className="signup-input"
            />
            <input
              type="date"
              placeholder="birth"
              name="birth"
              className="signup-input"
            />
            <input
              type="text"
              placeholder="job"
              name="job"
              className="signup-input"
            />
            <button className="login-btn">회원가입</button>
          </form>
        </LoginBox>
      </BackDiv>
    </Layout>
  );
}
