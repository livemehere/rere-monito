import React from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../../atoms/user";
import { CountingEvent } from "../../Presenter/Calendar/CountingEventPresenter";

 function User() {
  const [user, setUser] = useRecoilState(userState);
   return `${user.name}`
};

const CountingEventState = ({ data }) => {
  return (
    <>
      <CountingEvent>
        <div className="demo-app-sidebar">
          <div className="demo-app-sidebar-section">
            <h2>{User()}님의 일정입니다.</h2>
            <ul className="notice-container">
              <li className="notice-list">날짜를 선택하면 새 일정을 생성하라는 메시지가 표시됩니다.</li>
              <li className="notice-list">일정 드래그, 드롭 및 크기 조정이 가능합니다</li>
              <li className="notice-list">일정을 클릭하면 삭제가 가능합니다.</li>
            </ul>
          </div>
          <div className="demo-app-sidebar-section">
            <label>
              <input
                type="checkbox"
                //checked={calCheck}
                // onChange={onChange}
              ></input>
              주말제외
            </label>
          </div>
          <div className="demo-app-sidebar-section">
            <h2>{User()}님의 이번달 일정갯수 : </h2>
            {data && data.map((d) => <div key={d.id}>{d.title}</div>)}
            <ul>{/* {this.props.events.map(renderSidebarEvent)} */}</ul>
          </div>
        </div>
      </CountingEvent>
    </>
  );
};

export default CountingEventState;
