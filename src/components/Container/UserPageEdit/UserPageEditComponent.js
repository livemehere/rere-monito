import {EditTitle, BackDiv, UserPageEditBtn, UserPageEditBtnSave, UserPageEditBtnGroup} from "../../Presenter/UserPageEdit/UserPageEditPresenter";
import UserPageEditBox from "./UserPageEditBox";
import { Link } from "react-router-dom"; 

const UserPageEdit = () => {
    const save = () => {
        alert("수정되었습니다");
    }

    return (
        <>
            <BackDiv>
                <EditTitle>개인 정보 수정</EditTitle>
                <UserPageEditBox/>
                <UserPageEditBtnGroup>
                    <UserPageEditBtnSave onClick={save}><Link to ="/UserPageMain" className="UserEditBtn">저장</Link></UserPageEditBtnSave>
                    <UserPageEditBtn><Link to ="/UserPageMain"  className="UserEditBtn">취소</Link></UserPageEditBtn>
                </UserPageEditBtnGroup>                
            </BackDiv>
        </>
    );
};

export default UserPageEdit;