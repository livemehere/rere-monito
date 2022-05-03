import { useState,useEffect } from "react";
import { EditFrom, Editname,EditText,Line, Linee,Lineeee, Blank, PWExplain } from "../../Presenter/UserPageEdit/UserPageEditBoxPresenter";
import ImageUpload from "./ImageUpload"

import { useRecoilState } from "recoil";
import { userState } from "../../../atoms/user";
import axiosManager from "../../../util/axiosManager";

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {ko} from "date-fns/esm/locale"


const UserPageEditBox = () => {

  const[userdata,setUserdata] = useState([]);
  const [user, setUser] = useRecoilState(userState);


  useEffect(() => {
    axiosManager.axios(`/api/user/${user.id}`,"GET")
    console.log("회원정보", user);
    setUserdata(user);
  },[]);

    return (
        <>
        <EditFrom>
            <table>
              <Lineeee>
                <tr>
                  <td><Editname>커버사진</Editname></td>
                  <td><EditText>
                    <Blank>ㅤ
                      <ImageUpload value={user.profile_img} />
                    </Blank>
                    </EditText></td> 
                </tr>
              </Lineeee>

              <Line>
                <tr>
                  <td><Editname>이름(닉네임)</Editname></td>
                  <td><EditText>
                    <input placeholder={userdata.name}
                            name="name" />
                  </EditText></td>
                </tr>
              </Line>

              <Line>
                <tr>
                  <td><Editname>이메일</Editname></td>
                  <td><EditText>
                    <input placeholder="현재 이름(닉네임)"
                            name="name"
                            value={userdata.email}
                            disabled />
                  </EditText></td>
                </tr>
              </Line>

              <Line>
                <tr>
                  <td><Editname>생일</Editname></td>
                  <td><EditText>
                    <DatePicker
                    locale={ko}  // 언어설정 한글
                    dateFormat="yyyy-MM-dd"
                    value={userdata.birth}
                    disabled/>
                  </EditText></td>
                </tr>
              </Line>

              <Line>
                <tr>
                  <td><Editname>직업</Editname></td>
                  <td>
                    <EditText>
                    <select name = "job">
                      <option disabled selected>{userdata.job}</option>
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
                    <input placeholder="새 비밀번호"/> <br/>
                    <input placeholder="새 비밀번호 재확인"/>
                  </EditText></td>
                </tr>
              </Line> 

              <Linee>
                <tr>
                  <td><Editname>비밀번호 확인(*필수)</Editname></td>
                  <td><EditText>
                    <input placeholder="현재 비밀번호"/> <br/> 
                  </EditText></td>
                </tr>
              </Linee>  
    
            </table>
          </EditFrom>
        </>
    );
};

export default UserPageEditBox;