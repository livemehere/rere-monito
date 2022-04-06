import { useState } from "react";
import { useDispatch } from "react-redux";
import { Input, Button, Checkbox } from "@chakra-ui/react";
import {
  LoginInput,
  LoginLine,
  SideLine,
} from "../../Presenter/Login/LoginFormPresenter";

import { signinUser } from "../../../action/loginData";

const LoginFormContent = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const LoginButton = () => {
    console.log("로그인 클릭 : " + email + "/" + password);

    signinUser(dispatch, email, password);
  };
  return (
    <>
      <LoginInput>
        <Input
          variant="filled"
          placeholder="ID"
          className="login-input"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <Input
          variant="filled"
          placeholder="Password"
          className="login-input"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <Button
          onClick={LoginButton}
          colorScheme="blue"
          width="300px"
          className="login-btn"
        >
          로그인
        </Button>
        <br />
        <div>
          <Checkbox className="stay-login">로그인 상태 유지</Checkbox>
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
