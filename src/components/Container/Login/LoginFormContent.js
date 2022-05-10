import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  LoginInput,
  LoginLine,
  SideLine,
} from "../../Presenter/Login/LoginFormPresenter";

import loginUser from "../../../util/loginData";

const LoginFormContent = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const LoginButton = () => {
    console.log("로그인 클릭 : " + email + "/" + password);

    loginUser(dispatch, email, password);
  };
  return (
    <>
      <LoginInput>
        <input
          variant="filled"
          placeholder="ID"
          className="login-input"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          variant="filled"
          placeholder="Password"
          className="login-input"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button
          onClick={LoginButton}
          colorScheme="blue"
          width="300px"
          className="login-btn"
        >
          로그인
        </button>
        <br />
        <div>
          <checkbox className="stay-login">로그인 상태 유지</checkbox>
        </div>
        <br />
        <div display="flex">
          <SideLine />
          <LoginLine>또는 다음으로 로그인</LoginLine>
        </div>
      </LoginInput>
    </>
  );
};

export default LoginFormContent;
