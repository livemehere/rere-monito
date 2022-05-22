import styled from "styled-components";

<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400&display=swap');
</style>;

const AllMainContents = styled.div`
  width: 40%;
  padding: 5%;
  padding-top: 10%;
  font-family: "Noto Sans KR", sans-serif;
`;

const MainText = styled.div`
  p {
    font-size: large;
  }
  .MainSentence {
    display: flex;
    flex-direction: row;
    text-align: center;
  }
  .MainLogo {
    text-decoration: none;
    justify-content: space-between;
    color: rgb(238, 189, 82);
    font-family: "Jua", sans-serif;
  }
  .MainSubText {
    font-weight: 400;
    color: rgb(65, 65, 65);
  }
  .SubSentence {
    color: rgb(106, 105, 105);
  }
`;

const MainStartBtnContainer = styled.div`
  margin: 20%;
  display: flex;
  justify-content: center;
  .MainStartBtn {
    color: white;
    font-size: 20px;
    text-decoration: none;
    padding: 15px 35px 15px 35px;
    background: linear-gradient(45deg, rgb(247, 202, 54), orange);
    border-radius: 30px;
  }
`;

export { AllMainContents, MainStartBtnContainer, MainText };
