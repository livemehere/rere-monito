import { Link } from "react-router-dom";
import React from "react";
import { useRecoilState } from "recoil";
import { NavLoginLogOut } from "../../Presenter/Nav/TopNavPresenter";
import {
  AllMainContents,
  MainStartBtnContainer,
  MainText,
} from "../../Presenter/Main/MainContentsPresenter";
import { loginState } from "../../../atoms/loginState";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainContents = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  return (
    <>
      <AllMainContents>
        <MainText>
          <p>하나뿐인 나의 학습메이트,</p>
          <div className="MainSentence">
            <h1 className="MainLogo">MONITO</h1>
            <h1 className="MainSubText">와 함께 학습해보세요.</h1>
          </div>
          <p className="SubSentence">
            MONITO는 당신의 학습 습관을 교정함과 동시에 학습에 도움이 되는
            다양한 피드백을 제공합니다.
          </p>
          <MainStartBtnContainer>
            <Link to="/MainCam" className="MainStartBtn">
              시작하기
            </Link>
          </MainStartBtnContainer>
        </MainText>
      </AllMainContents>
    </>
  );
};

export default MainContents;
