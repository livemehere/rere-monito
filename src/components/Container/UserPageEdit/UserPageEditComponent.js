import {
  EditTitle,
  BackDiv,
} from "../../Presenter/UserPageEdit/UserPageEditPresenter";
import UserPageEditBox from "./UserPageEditBox";
import { AlignTitlee } from "../../Presenter/Calendar/CalendarTitlePresenter";

const UserPageEdit = () => {
  return (
    <>
    <AlignTitlee>개인 정보 수정</AlignTitlee>
      <BackDiv>
        <UserPageEditBox />
      </BackDiv>
    </>
  );
};

export default UserPageEdit;
