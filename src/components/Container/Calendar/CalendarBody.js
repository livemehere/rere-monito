import React, { useEffect, useState } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  CalendarBackDiv,
  DetailCalendar,
  OnlyCalendar,
} from "../../Presenter/Calendar/CalendarBodyPresenter";

import CountingEventState from "./CountEventstate";
import { useRecoilState } from "recoil";
import { userState } from "../../../atoms/user";
import axiosManager from "../../../util/axiosManager";
import { calendarState } from "../../../atoms/calendar";

export const event1 = [
  {
    title: "캡스톤회의",
    start: "2022-05-27",
  },
];

export function CalendarBody() {
  const [calendarData, setCalendarData] = useRecoilState(calendarState);
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    //TODO: axios from server
    axiosManager.axios(`/calendar/${user.id}`, "GET").then((datas) => {
      const initialData = [];
      console.log("캘린더", datas);
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
  }, []);
  // 이벤트 추가
  const handleEventAdd = (addInfo) => {
    console.log(addInfo.event.toPlainObject());
    // TODO: addCalendarToDB();

    axiosManager.axios(`/calendar/${user.id}`, "GET").then((datas) => {
      const initialData = [];
      datas.forEach((data) => {
        initialData.push({
          id: data.id,
          title: data.title,
          start: data.startDate,
          end: data.endDate,
        });
      });
      setCalendarData([
        ...calendarData,
        { ...addInfo.event.toPlainObject(), id: Date.now() },
      ]);
    }, []);
  };
  //일자선택
  const handleDateSelect = (selectInfo) => {
    let calendarApi = selectInfo.view.calendar;
    let title = prompt("일정을 입력하세요.");
    let detail = "0";
    calendarApi.unselect(); //일자 선택 초기화

    if (title) {
      console.log(user.id, title, selectInfo.startStr, selectInfo.endStr);
      axiosManager.axios(`/calendar/`, "POST", {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        id: user.id,
        title: title,
        startDate: selectInfo.startStr,
        endDate: selectInfo.endStr,
        detail: detail,
      });
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
  //드래그 앤 드롭
  const handleEventChange = (oldEvent) => {
    console.log(oldEvent.event.toPlainObject());
    // TODO: updateToDB(); 해도되고 안해도되고
  };

  const handleEventRemove = (removeInfo) => {};

  const handleEventClick = (removeInfo) => {
    let question = window.confirm(
      `'${removeInfo.event.title}' 일정을 삭제하시겠습니까?`
    );
    if (question) {
      axiosManager.axios(`calendar/${user.id}`, "DELETE", {
        headers: { "Content-type": "application/x-www-form-urlencoded" },
        id: removeInfo.event._def.publicId,
      });
      setCalendarData((d) =>
        d.filter((data) => data.removeInfo !== removeInfo)
      );
      // removeInfo.event.remove();
    }
    // setCalendarData(updatedList);
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
              //datesSet={handleEventAdd}
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

// const handleDates = (rangeInfo) => {
//   console.log(rangeInfo);
// };

// const handleEventRemove = (removeInfo) => {
//   (removeInfo.event.id).catch(() => {
//     reportNetworkError();
//     // removeInfo.revert();
//   });
// };

function renderEventContent(eventInfo) {
  return (
    <>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

function renderSidebarEvent(plainEventObject) {
  return (
    <li key={plainEventObject.id}>
      <b>
        {formatDate(plainEventObject.start, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </b>
      <i>{plainEventObject.title}</i>
    </li>
  );
}

function reportNetworkError() {
  alert("이 작업을 완료할 수 없습니다");
}
