import styled from "styled-components";

const BackDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50vmin;
`;

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  background-color: white;
  .login-input{
    width:200px;
  }
  .login-btn{
    color: white;
    font-size: 20px;
    text-decoration:none;
    padding:5px 15px 5px 15px;
    background:linear-gradient(45deg,rgb(247, 202, 54), orange);
    border-radius: 5px;
    border:0;
}
.login-btn:hover{
    color: white;
    font-size: 20px;
    text-decoration:none;
    padding:5px 15px 5px 15px;
    background:rgb(196, 155, 67);
    border-radius: 5px;
    border:0px;
}
.stay-login{
  color:rgba(229, 105, 60, 0.801);
  cursor: pointer;
}
`;

const LoginBoxTitle = styled.div`
  font-size: 30px;
  padding-bottom: 20px;
  color: rgb(238, 189, 82);
  font-family: 'Jua', sans-serif;s
`;

export { BackDiv, LoginBox, LoginBoxTitle };
