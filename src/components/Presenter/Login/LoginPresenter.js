import styled from "styled-components";

const BackDiv = styled.div`
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
`;

const LoginBox = styled.div`
  .login-container {
    align-items: center;
    display: flex;
    flex-direction: column;
  }
  .login-input {
    width: 300px;
    border-radius: 20px;
    padding: 2px;
    height: 40px;
    border: solid 0.2px gray;
    margin: 0.5%;
  }
  .login-btn {
    margin-top: 4%;
    width: 300px;
    height: 40px;
    color: white;
    font-size: 20px;
    text-decoration: none;
    padding: 10px 25px 10px 25px;
    background: linear-gradient(45deg, rgb(247, 202, 54), orange);
    border-radius: 20px;
    border: 0;
  }
  .login-btn:hover {
    height: 40px;
    color: white;
    font-size: 20px;
    text-decoration: none;
    padding: 10px 25px 10px 25px;
    background: rgb(196, 155, 67);
    border-radius: 20px;
    border: 0px;
  }
  .stay-login {
    color: rgba(229, 105, 60, 0.801);
    cursor: pointer;
  }
  .signup-container {
    align-items: center;
    display: flex;
    flex-direction: column;
  }
  .signup-btn {
    margin-top: 1%;
    width: 300px;
    height: 40px;
    font-size: 20px;
    text-decoration: none;
    padding: 10px 25px 10px 25px;
    background: whitegray;
    border-radius: 20px;
    border: 0;
  }
  .signup-btn:hover {
    margin-top: 1%;
    width: 300px;
    height: 40px;
    font-size: 20px;
    text-decoration: none;
    padding: 10px 25px 10px 25px;
    background: rgba(128, 128, 128, 0.54);
    border-radius: 20px;
    border: 0;
  }
  .signup-input {
    width: 300px;
    padding: 2px;
    height: 40px;
    border: solid 0.2px gray;
    margin: 0.5%;
  }
`;

const LoginBoxTitle = styled.div`
  font-size: 30px;
  padding-bottom: 20px;
  color: rgb(238, 189, 82);
  font-family: "Jua", sans-serif;
`;

export { BackDiv, LoginBox, LoginBoxTitle };
