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
`;

const LoginBoxTitle = styled.div`
  font-size: 30px;
  padding-bottom: 20px;
  color: rgb(238, 189, 82);
  font-family: 'Jua', sans-serif;s
`;

export { BackDiv, LoginBox, LoginBoxTitle };
