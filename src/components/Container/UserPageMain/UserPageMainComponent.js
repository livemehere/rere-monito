import {
    BackDiv, 
    UserPageTitle,
    UserBtn,
    MypageBox,
 } from "../../Presenter/UserPageMain/UserPageMainPresenter";

import { Link } from "react-router-dom"; 
import { AlignTitle } from "../../Presenter/Calendar/CalendarTitlePresenter";

const UserPageMain = () => {
    return (
        <>
            <BackDiv>
                <AlignTitle>
                    <h1>마이페이지</h1>
                </AlignTitle>
                <MypageBox>
                        <UserPageTitle>개인 정보 수정</UserPageTitle>
                        <UserBtn><Link to ="/mypage/edit" className="UserPageBtn">수정</Link></UserBtn>
                </MypageBox>
                <MypageBox>
                    <UserPageTitle>디데이</UserPageTitle>
                    <UserBtn><Link to="/mypage/d-day" className="UserPageBtn">확인하기</Link></UserBtn>
                </MypageBox>
                <MypageBox>
                    <UserPageTitle>측정 결과 분석</UserPageTitle>
                    <UserBtn><Link to ="/mypage/analyze" className="UserPageBtn">확인하기</Link></UserBtn>
                </MypageBox>  
            </BackDiv>
        </>
    );
};

export default UserPageMain;