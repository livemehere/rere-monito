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
import LoginFormContent from "./LoginFormContent";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <BackDiv>
        <LoginBox>
          <LoginBoxTitle className="main-logo">
            <Link to="/LoginFormContent" className="LoginButton">
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
