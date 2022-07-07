import { useState, useEffect } from "react";
import {
  EditFrom,
  Editname,
  EditText,
  EditTextt,
  Line,
  Linee,
  Lineeee,
  Editnames,
  Editimg,
} from "../../Presenter/UserPageEdit/UserPageEditBoxPresenter";
import {
  UserPageEditBtn,
  UserPageEditBtnSave,
  UserPageEditBtnGroup,
} from "../../Presenter/UserPageEdit/UserPageEditPresenter";
import { Link, useNavigate } from "react-router-dom";

import { useRecoilState } from "recoil";
import { userState } from "../../../atoms/user";
import axiosManager from "../../../util/axiosManager";
import moment from "moment";

const UserPageEditBox = () => {
  const [userdata, setUserdata] = useState([]);
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => { // 유저정보 불러오기
    axiosManager.axios(`/api/user/${user.id}`, "GET");
    setUserdata(user);
  }, []);

  const birthday = moment(userdata.birth).format("YYYY-MM-DD"); // 생일 테이터 형식 변경

  // 데이터 수정

  const onChange = (e) => {
    setUserdata(preState => {
      return{ ...preState,[e.target.name]:e.target.value}
    });
  };

  const navigate = useNavigate();

  const usersave = () => {
    
    console.log(userdata);

    if (userdata.pw === userdata.password) {
      if(userdata.pwnew === null) {

        //만약 뉴pw 빈칸이면 원래비번
        axiosManager.axios(`/api/user/`, "PUT", {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        id:userdata.id,
        name: userdata.name,
        password: userdata.password,
        email:userdata.email,
        birth: userdata.birth,
        job: userdata.job,
        profile_img: null,
        }).catch(console.log);
        

        alert("사용자정보가 업데이트 되었습니다");
        navigate(-1);
      }
      else{
        if (userdata.pwnew === userdata.pwnewcheck){

            axiosManager.axios(`/api/user/`, "PUT", {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            id:userdata.id,
            name: userdata.name,
            password: userdata.pwnew,
            birth: userdata.birth,
            email:userdata.email,
            job: userdata.job,
            profile_img: null,
            }).catch(console.log);
            alert("사용자정보가 업데이트 되었습니다");
            navigate(-1);
        }
        else{
          alert("변경된 비밀번호를 확인해 주세요");
        }
      }
    } else {
      alert("비밀번호를 확인해 주세요");
    }
  };

  return (
    <>
      <EditFrom>
          <Lineeee>
                <Editname>이름(닉네임)</Editname>
                <EditText>
                  <input
                    value={userdata.name|| ''}
                    name="name"
                    onChange={onChange}/>
                </EditText>
          </Lineeee>

          <Line>
                <Editname>이메일</Editname>
                <EditText>
                  <input name="email"value={userdata.email|| ''} disabled />
                  {/* 콘솔창 경고 안뜨려면(이름, 이메일에만 뜸) -> || '' */}
                </EditText>
          </Line>

          <Line>
                <Editname>생일</Editname>
                <EditText>
                  <input
                    type="date"
                    name="birth"
                    value={birthday|| ''}
                    onChange={onChange}
                    disabled
                  />
                </EditText>
          </Line>

          <Line>
                <Editname>직업</Editname>
                <EditText>
                  <select name="job" value={userdata.job|| ''} onChange={onChange}>
                    <option value="초등학생">초등학생</option>
                    <option value="중학생">중학생</option>
                    <option value="고등학생">고등학생</option>
                    <option value="대학생">대학생</option>
                    <option value="취업준비생">취업준비생</option>
                    <option value="직장인">직장인</option>
                    <option value="프리렌서">프리렌서</option>
                  </select>
                </EditText>
          </Line>

          <Line>
                <Editname>비밀번호 변경</Editname>
                <EditText>
                  <input
                    placeholder="새 비밀번호"
                    name="pwnew"
                    type="password"
                    autoComplete="on"
                    onChange={onChange}
                  /><br />
                  <input
                    placeholder="새 비밀번호 재확인"
                    name="pwnewcheck"
                    type="password"
                    autoComplete="on"
                    onChange={onChange}
                  />
                </EditText>
          </Line>

          <Linee>
                <Editname>비밀번호 확인(*필수)</Editname>
                <EditText>
                  <input
                    placeholder="현재 비밀번호"
                    name="pw"
                    type="password"
                    autoComplete="on"
                    onChange={onChange}
                  /><br />
                </EditText>
          </Linee>
      </EditFrom>

      <UserPageEditBtnGroup>
        <UserPageEditBtnSave onClick={usersave}>
          <div className="UserEditBtn">저장</div>
        </UserPageEditBtnSave>
        <UserPageEditBtn className="UserEditBtn">
          <Link to="/mypage" className="UserEditBtn">
            취소
          </Link>
        </UserPageEditBtn>
      </UserPageEditBtnGroup>
    </>
  );
};

export default UserPageEditBox;
