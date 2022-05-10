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
<<<<<<< HEAD
import LoginFormContent from "./LoginFormContent";
import { Link } from "react-router-dom";
=======
import Link from "react-router-dom";
import LoginFormContent from "./LoginFormContent";
>>>>>>> e691f6252be123b27c32e375ef7c592f42efdb10

const Login = () => {
  return (
    <>
      <BackDiv>
        <LoginBox>
          <LoginBoxTitle className="main-logo">
<<<<<<< HEAD
            <Link to="/LoginFormContent" className="LoginButton">
=======
            <Link to="/Login" className="MainStartBtn">
>>>>>>> e691f6252be123b27c32e375ef7c592f42efdb10
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
