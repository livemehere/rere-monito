import styled from "styled-components";

const LoginInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
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

const LoginLine = styled.div`
  display: flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.35);
  font-size: 14px;
  margin: 10px 0px;
`;
const SideLine = styled.div`
  content: "";
  flex-grow: 1;
  background: rgba(0, 0, 0, 0.35);
  height: 1px;
  font-size: 0px;
  line-height: 0px;
  margin: 0px 16px;
`;
const Input = styled.div`

`
export { LoginInput, LoginLine, SideLine,Input };
