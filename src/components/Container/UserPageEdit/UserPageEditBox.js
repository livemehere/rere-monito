import { useState,useEffect } from "react";
import { EditFrom, Editname,EditText,Line, Linee, Blank, PWExplain } from "../../Presenter/UserPageEdit/UserPageEditBoxPresenter";
import ImageUpload from "./ImageUpload"



const UserPageEditBox = (props) => {

  const userDb = {
      name:'임의연',
      job: '대학생',
      password:'1234'
    }

  const [name, setName] = useState();
  const [job, setJob] = useState();
  const [password, setPassword] = useState();
  const [profile_img, setProfile_img] = useState();

  const onChangename = e => setName(e.target.value);
  const onChangejob = e => setJob(e.target.value);
  const onProfile_img = e => setProfile_img(e.target.value);
  const onPassword = e => setPassword(e.target.value);


    return (
        <>
        <EditFrom>
            <table>
              <Line>
                <tr>
                  <td><Editname>커버사진</Editname></td>
                  <td><EditText>
                    <Blank>ㅤ
                      <ImageUpload/>
                    </Blank>
                    </EditText></td> 
                </tr>
              </Line>

              <Line>
                <tr>
                  <td><Editname>이름(닉네임)</Editname></td>
                  <td><EditText>
                    <input placeholder="현재 이름(닉네임)"
                            name="name"
                            value={name}
                            onChange={onChangename}
                    >{name}</input>
                  </EditText></td>
                </tr>
              </Line>

              <Line>
                <tr>
                  <td><Editname>직업</Editname></td>
                  <td>
                    <EditText>
                    <select name = "job">
                      <option value="">직업선택</option>
                      <option value="초등학생">초등학생</option>
                      <option value="중학생">중학생</option>
                      <option value="고등학생">고등학생</option>
                      <option value="대학생">대학생</option>
                      <option value="취업준비생">취업준비생</option>
                      <option value="직장인">직장인</option>
                    </select>
                    </EditText>
                  </td>
                </tr>
              </Line>
              
              <Linee>
                <tr>
                  <td><Editname>비밀번호 변경
                      <PWExplain>비밀번호를 변경하지 않을 시,<br/>
                      현재 비밀번호만 입력해주세요.</PWExplain>
                    </Editname></td>
                  <td><EditText>
                    <input placeholder="현재 비밀번호"></input> <br/>
                    <input placeholder="새 비밀번호"></input> <br/>
                    <input placeholder="새 비밀번호 재확인"></input> 
                  </EditText></td>
                </tr>
              </Linee>              
            </table>
          </EditFrom>
        </>
    );
};

export default UserPageEditBox;