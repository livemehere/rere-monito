// import {
//   LoginBox,
//   LoginBoxTitle,
//   BackDiv,
// } from "../../Presenter/Login/LoginPresenter";
import {
  LoginBox,
  LoginBoxTitle,
  BackDiv,
} from "../../Presenter/Login/LoginPresenter";
import Link from "react-router-dom";
import LoginFormContent from "./LoginFormContent";

const Login = () => {
  return (
    <>
      <BackDiv>
        <LoginBox>
          <LoginBoxTitle className="main-logo">
            <Link to="/Login" className="MainStartBtn">
              로그인
            </Link>
          </LoginBoxTitle>
          <LoginFormContent />
        </LoginBox>
      </BackDiv>
    </>
  );
};

export default Login;
