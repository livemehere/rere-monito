import {
  EditTitle,
  BackDiv,
} from "../../Presenter/UserPageEdit/UserPageEditPresenter";
import UserPageEditBox from "./UserPageEditBox";

const UserPageEdit = () => {
  return (
    <>
      <BackDiv>
        <EditTitle>개인 정보 수정</EditTitle>
        <UserPageEditBox />
      </BackDiv>
    </>
  );
};

export default UserPageEdit;
