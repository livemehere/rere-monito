import React, { useEffect, useState } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { CalendarBackDiv, DetailCalendar, OnlyCalendar } from "../../Presenter/Calendar/CalendarBodyPresenter";

import CountingEventState from "./CountEventstate";
import { useRecoilState } from "recoil";
import { userState } from "../../../atoms/user";
import axiosManager from "../../../util/axiosManager";
import { calendarState } from "../../../atoms/calendar";


export const event1= [{
  title: "캡스톤회의",
  start: "2022-05-27",
},]


export function CalendarBody() {
  const [calendarData, setCalendarData] = useRecoilState(calendarState);
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    //TODO: axios from server
    axiosManager.axios(`/calendar/${user.id}`, "GET").then((datas) => {
      const initialData = [];
      console.log("캘린더",datas);
      datas.forEach((data) => {
        initialData.push({
          id: data.id,
          title: data.title,
          start: data.startDate,
          end: data.endDate,
        });
      });
        
      setCalendarData(initialData);
    });
    console.log("이벤트정보", calendarData);
    console.log("변경");
  }, [calendarData]);
  
  const handleEventAdd = (addInfo) => {
    console.log(addInfo.event.toPlainObject());
    // TODO: addCalendarToDB();
    setCalendarData([
      ...calendarData,{ ...addInfo.event.toPlainObject(), id:Date.now() }
    ])
  };
  const handleEventRemove = (removeInfo) => {
    const updatedList = [...calendarData]

    (removeInfo.event.id).catch(() => {
      reportNetworkError();
      updatedList.removeInfo.revert();
    });

    setCalendarData(updatedList);
  };
  return (
    <div className="demo-app">
      <CalendarBackDiv>
        <OnlyCalendar>
          <div className="demo-app-main">
            <FullCalendar
              className="FullCalendarCSS"
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              initialView="dayGridMonth"
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              weekends={true}
              datesSet={handleDates} 
              select={handleDateSelect}
              events={calendarData}
              eventContent={renderEventContent} // 커스텀 렌더 기능
              eventClick={handleEventClick}
              eventAdd={handleEventAdd}
              eventChange={handleEventChange} //드래그 앤 드롭/크기 조정
              eventRemove={handleEventRemove}
            />
          </div>
        </OnlyCalendar>
        {/* 여기에 CRUD폼 들어감 */}
        <DetailCalendar>
          <CountingEventState data={calendarData} />
        </DetailCalendar>
      </CalendarBackDiv>
    </div>
  );
}

const handleDateSelect = (selectInfo) => {
  let calendarApi = selectInfo.view.calendar;
  let title = prompt("일정을 입력하세요.");

  calendarApi.unselect(); //일자 선택 초기화

  if (title) {
    calendarApi.addEvent(
      {
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      },
      true
    );
  }
};
const handleEventClick = (clickInfo) => {
  if (window.confirm(`'${clickInfo.event.title}' 일정을 삭제하시겠습니까?`)) {
    clickInfo.event.remove();
  }
  // TODO: deleteCalendarFromDB();
};

const handleDates = (rangeInfo) => {
  console.log(rangeInfo);
};


const handleEventChange = (oldEvent) => {
  console.log(oldEvent.event.toPlainObject());
  // TODO: updateToDB(); 해도되고 안해도되고
};



// const handleEventRemove = (removeInfo) => {
//   (removeInfo.event.id).catch(() => {
//     reportNetworkError();
//     // removeInfo.revert();
//   });
// };

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>

    </>
  );
}

function renderSidebarEvent(plainEventObject) {
  return (
    <li key={plainEventObject.id}>
      <b>{formatDate(plainEventObject.start, { year: "numeric", month: "short", day: "numeric" })}</b>
      <i>{plainEventObject.title}</i>
    </li>
  );
}

function reportNetworkError() {
  alert("이 작업을 완료할 수 없습니다");
}