import React from "react";
import { selector, useRecoilValue, useRecoilState } from 'recoil';
import { calArrayState, eventTextState } from "../../../atoms/calendar";
import { User } from "./CalendarBody";


const CountingEvent = () => {
    const countEventState = selector({
        key: "countEventState",
        get: ({ get }) => {
            const calEvents = get(eventTextState);
      
            return calEvents.length;
        }
    });
    const calCount = useRecoilValue(countEventState);

    return (
        <>
            <div className='demo-app-sidebar'>
        <div className='demo-app-sidebar-section'>
                <h2>{User.name}님의 일정입니다.</h2>
          <ul>
            <li>날짜를 선택하면 새 일정을 생성하라는 메시지가 표시됩니다.</li>
            <li>일정 드래그, 드롭 및 크기 조정이 가능합니다</li>
            <li>일정을 클릭하면 삭제가 가능합니다.</li>
          </ul>
        </div>
        <div className='demo-app-sidebar-section'>
          <label>
            <input
              type='checkbox'
              //checked={calCheck}
              // onChange={onChange}
            ></input>
            주말제외
          </label>
        </div>
        <div className='demo-app-sidebar-section'>
                <h2>{ User.name}님의 일정갯수 : {calCount}</h2>
          <ul>
            {/* {this.props.events.map(renderSidebarEvent)} */}
          </ul>
        </div>
      </div>
        </>
    )
}

export default CountingEvent