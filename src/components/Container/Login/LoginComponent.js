// import {
//   LoginBox,
//   LoginBoxTitle,
//   BackDiv,
// } from "../../Presenter/Login/LoginPresenter";
import { LoginBox,LoginBoxTitle,BackDiv } from "../../Presenter/Login/LoginPresenter";
import LoginFormContent from "./LoginFormContent";


const Login = () => {
  return (
    <>
      <BackDiv>
        <LoginBox>
          <LoginBoxTitle className="main-logo">로그인</LoginBoxTitle>
          <LoginFormContent />
        </LoginBox>
      </BackDiv>
    </>
  );
};

export default Login;
