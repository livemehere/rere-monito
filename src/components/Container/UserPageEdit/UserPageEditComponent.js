import {
  EditTitle,
  BackDiv,
  UserPageEditBtn,
  UserPageEditBtnSave,
  UserPageEditBtnGroup,
} from "../../Presenter/UserPageEdit/UserPageEditPresenter";
import UserPageEditBox from "./UserPageEditBox";
import { Link, useNavigate } from "react-router-dom";

const UserPageEdit = () => {
  const navigate = useNavigate();
  const save = () => {
    // TODO: axios 작업
    // TODO: 성공시
    alert("수정되었습니다");
    navigate(-1);

    //TODO: 실패시
    // ...
  };

  return (
    <>
      <BackDiv>
        <EditTitle>개인 정보 수정</EditTitle>
        <UserPageEditBox />
        <UserPageEditBtnGroup>
          <UserPageEditBtnSave onClick={save}>저장</UserPageEditBtnSave>
          <UserPageEditBtn>취소</UserPageEditBtn>
        </UserPageEditBtnGroup>
      </BackDiv>
    </>
  );
};

export default UserPageEdit;
