import { useState,useEffect } from "react";
import { EditFrom, Editname,EditText,Line, Linee,Lineeee, Blank, PWExplain } from "../../Presenter/UserPageEdit/UserPageEditBoxPresenter";
import {
  UserPageEditBtn,
  UserPageEditBtnSave,
  UserPageEditBtnGroup,
} from "../../Presenter/UserPageEdit/UserPageEditPresenter";
import ImageUpload from "./ImageUpload"

import { Link, useNavigate } from "react-router-dom";

import { useRecoilState } from "recoil";
import { userState } from "../../../atoms/user";
import axiosManager from "../../../util/axiosManager";

import moment from 'moment';

const UserPageEditBox = () => {

  const[userdata,setUserdata] = useState([]);
  const[userdatachange,setUserdatachange] = useState([]);
  const [user, setUser] = useRecoilState(userState);


  useEffect(() => {
    axiosManager.axios(`/api/user/${user.id}`,"GET")
    setUserdata(user);
  },[])

  const birthday = moment(userdata.birth).format('YYYY-MM-DD');

  const usernameChange = (n) => {
    setUserdatachange({
      name:n.target.value,
    });
  }

  const userbirthChange = (b) => {
    setUserdatachange({
      birth:b.target.value,
    });
  }

  const userjobChange = (b) => {
    setUserdatachange({
      job:b.target.value,
    });
  }

  const navigate = useNavigate();

  const save = ({user,pw}) => {
    // TODO: axios 작업
     // null인 부분은 update x
     if(pw===user.password){
       alert("사용자정보가 업데이트 되었습니다");
       navigate(-1);
     }
     else{
      alert("비밀번호를 다시 확인해 주세요");
     }
    axiosManager.axios(`/api/user/`,"PUT",{
      headers : {'Content-Type': 'application/x-www-form-urlencoded', },
      name:user.name,
      password:user.password,
      birth:user.birth,
      job:user.job,
      profile_img:user.profile_img,
    })
  };

    return (
        <>
        <EditFrom>
            <table>
              <Lineeee>
                <tr>
                  <td><Editname>커버사진</Editname></td>
                  <td><EditText>
                    <Blank>ㅤ
                      <ImageUpload value={userdata.profile_img} 
                      name="profile_img" 
                      accept="image/*"/>
                    </Blank>
                    </EditText></td> 
                </tr>
              </Lineeee>

              <Line>
                <tr>
                  <td><Editname>이름(닉네임)</Editname></td>
                  <td><EditText>
                    <input value={userdata.name}
                            name="name" 
                            onChange={usernameChange}/>
                  </EditText></td>
                </tr>
              </Line>

              <Line>
                <tr>
                  <td><Editname>이메일</Editname></td>
                  <td><EditText>
                    <input value={userdata.email}
                            disabled />
                  </EditText></td>
                </tr>
              </Line>

              <Line>
                <tr>
                  <td><Editname>생일</Editname></td>
                  <td><EditText>
                    <input 
                    type="date"
                    value={birthday} 
                    onChange={userbirthChange}/>
                  </EditText></td>
                </tr>
              </Line>

              <Line>
                <tr>
                  <td><Editname>직업</Editname></td>
                  <td>
                    <EditText>
                    <select name = "job" value={userdata.job} onChange={userjobChange}>
                      <option value="초등학생">초등학생</option>
                      <option value="중학생">중학생</option>
                      <option value="고등학생">고등학생</option>
                      <option value="대학생">대학생</option>
                      <option value="취업준비생">취업준비생</option>
                      <option value="직장인">직장인</option>
                      <option value="프리렌서">프리렌서</option>
                    </select>
                    </EditText>
                  </td>
                </tr>
              </Line>
              
              <Line>
                <tr>
                  <td><Editname>비밀번호 변경</Editname></td>
                  <td><EditText>
                    <input placeholder="새 비밀번호" name="newpw" type="password" autoComplete="on"/> <br/>
                    <input placeholder="새 비밀번호 재확인" name="newpwcheck" type="password" autoComplete="on"/>
                  </EditText></td>
                </tr>
              </Line> 

              <Linee>
                <tr>
                  <td><Editname>비밀번호 확인(*필수)</Editname></td>
                  <td><EditText>
                    <input placeholder="현재 비밀번호" name="pw"  type="password" autoComplete="on"/> <br/> 
                  </EditText></td>
                </tr>
              </Linee>  
    
            </table>
          </EditFrom>
          <UserPageEditBtnGroup>
            <UserPageEditBtnSave onClick={save}><div className="UserEditBtn">저장</div></UserPageEditBtnSave>
            <UserPageEditBtn className="UserEditBtn"><Link to ="/mypage" className="UserEditBtn">취소</Link></UserPageEditBtn>
          </UserPageEditBtnGroup>
        </>
    );
};

export default UserPageEditBox;