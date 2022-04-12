import styled from "styled-components";

const BackDiv = styled.div`

  align-items: center;
  justify-content: center;
  height: 50vmin;
`;

const LoginBox = styled.div`
  display:block;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: white;
  form .login-container{
    display:flex;
    flex-direction: row;
  }
  .login-input{
    width:300px;
    border-radius:20px;
    padding:2px;
    height:40px;
    border: solid 0.2px gray;
  }
  .login-btn{
    height:40px;
    color: white;
    font-size: 20px;
    text-decoration:none;
    padding:10px 25px 10px 25px;
    background:linear-gradient(45deg,rgb(247, 202, 54), orange);
    border-radius: 20px;
    border:0;
}
.login-btn:hover{
    height:40px;
    color: white;
    font-size: 20px;
    text-decoration:none;
    padding:10px 25px 10px 25px;
    background:rgb(196, 155, 67);
    border-radius: 20px;
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
