import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../atoms/user";
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
    <div>
      <h1>Login</h1>
      <Link to="/">HOME</Link>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="email" name="email" />
        <input type="text" placeholder="password" name="password" />
        <button>로그인</button>
      </form>
    </div>
  );
}
