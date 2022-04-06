import { Edit,
    Measurement,
    PoseHeart, 
    Dday, 
    MypageFlex, 
    BackDiv, 
    UserPageBox,
    UserPageTitle,
    UserBtn,
 } from "../../Presenter/UserPageMain/UserPageMainPresenter";
import UserPageMainBox from "./UserPageMainBox";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom"; 
import { AlignTitle } from "../../Presenter/Calendar/CalendarTitlePresenter";

const UserPageMain = () => {
    return (
        <>
            <BackDiv>
            <AlignTitle>
                <h1>마이페이지</h1>
            </AlignTitle>
            <MypageFlex>
                    <Edit>
                        <UserPageTitle>개인 정보 수정</UserPageTitle>
                        <UserPageBox/>
                        <UserBtn><Link to ="/UserPageEdit" className="UserPageBtn">수정</Link></UserBtn>
                    </Edit>
                    <Dday>
                        <UserPageTitle>디데이 설정</UserPageTitle>
                        <UserPageBox/>
                        <UserBtn><Link to="/UserDday" className="UserPageBtn">설정</Link></UserBtn>
                    </Dday>               
                </MypageFlex>
                <MypageFlex>
                    <Measurement>
                        <UserPageTitle>측정 결과 분석</UserPageTitle>
                        <UserPageBox/>
                        <UserBtn><Link to ="/UserMeasurement" className="UserPageBtn">확인하기</Link></UserBtn>
                    </Measurement>
                    <PoseHeart>
                        <UserPageTitle>자세</UserPageTitle>
                        <UserPageBox/>
                        <UserBtn><Link to="/UserPose" className="UserPageBtn">설정</Link></UserBtn>
                    </PoseHeart>                    
                </MypageFlex>
            </BackDiv>
        </>
    );
};

export default UserPageMain;