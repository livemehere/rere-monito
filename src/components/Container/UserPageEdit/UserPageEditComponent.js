import {
  EditTitle,
  BackDiv,
  UserPageEditBtn,
  UserPageEditBtnSave,
  UserPageEditBtnGroup,
} from "../../Presenter/UserPageEdit/UserPageEditPresenter";
import UserPageEditBox from "./UserPageEditBox";
import { Link, useNavigate } from "react-router-dom";

import { useState,useEffect } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../../atoms/user";
import axiosManager from "../../../util/axiosManager";

const UserPageEdit = () => {
  
  const[userdata,setUserdata] = useState([]);
  const [user, setUser] = useRecoilState(userState);

  const navigate = useNavigate();
  const save = () => {
    // TODO: axios 작업
    axiosManager.axios(`/api/user/${user.id}`,"PUT")
    
    // TODO: 성공시
    alert("수정되었습니다");
    navigate(-1);
    
    //TODO: 실패시
    // ...
    alert("입력되지 않은 부분이 있습니다.");
  };

  return (
    <>
      <BackDiv>
        <EditTitle>개인 정보 수정</EditTitle>
        <UserPageEditBox />
        <UserPageEditBtnGroup>
          <UserPageEditBtnSave onClick={save}><div className="UserEditBtn">저장</div></UserPageEditBtnSave>
          <UserPageEditBtn className="UserEditBtn"><Link to ="/mypage" className="UserEditBtn">취소</Link></UserPageEditBtn>
        </UserPageEditBtnGroup>
      </BackDiv>
    </>
  );
};

export default UserPageEdit;
