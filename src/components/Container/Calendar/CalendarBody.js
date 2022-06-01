import React, { useEffect, useState } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { EventDragStopArg } from "@fullcalendar/interaction";
import ReactTooltip from 'react-tooltip';
// import {
//   Tooltip,
// } from 'react-tippy';
import 'react-tippy/dist/tippy.css'

import moment from "moment";

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

      setCalendarData(
        initialData.sort((a, b) => {
          return moment(a.start).diff(b.start, "days");
        })
      );
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
    let end_date = moment(selectInfo.endStr).subtract(1, 'days').endOf("day").startOf("day").format('YYYY-MM-DD');
    selectInfo.endStr = end_date;
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
  const renderEventContent=(eventInfo)=>{
    return (
      <>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }  
  //  일정삭제 컨트롤
  const handleEventClick = (removeInfo) => {
    let datalist = [];
    let question = window.confirm(
      `'${removeInfo.event.title}' 일정을 삭제하시겠습니까?`
    );
    
    if (question) {
      let calendarApi = removeInfo.view.calendar;
      calendarApi.unselect(); //일자 선택 초기화
      console.log(typeof(calendarApi))
      axiosManager.axios(`/calendar/`, "DELETE", {
        headers: { "Content-type": "application/x-www-form-urlencoded" },
        id: removeInfo.event._def.publicId,
      }).then((datas) => {
        console.log(datas)
        let eventobj = calendarApi.getEventById(removeInfo.event._def.publicId);
        eventobj.remove();
        calendarApi.refetchEvents();
        // calendarApi.render();

        // const initialData = [];
        // datas.forEach((data) => {
        //   initialData.push({
        //     id: data.id,
        //     title: data.title,
        //     start: data.startDate,
        //     end: data.endDate,
        //   });
        // });
        // setCalendarData(
        //   initialData.sort((a, b) => {
        //     return moment(a.start).diff(b.start, "days");
        //   })
        // );


      }, []);
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
        setCalendarData(
          initialData.sort((a, b) => {
            return moment(a.start).diff(b.start, "days");
          })
        );
      }, []);

      // console.log(removeInfo.event.toPlainObject());
      // setCalendarData((d) =>
      //   d.filter((calendar) => calendar.removeInfo !== removeInfo)
      // );
      //console.log(removeInfo.event._def.publicId);
      // removeInfo.event.remove();
      // setCalendarData((d) =>
      //   d.filter((calendar) => calendar.removeInfo !== removeInfo)
      // );
      //console.log(removeInfo.event);
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
              timeZone="UTC"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              initialView="dayGridMonth"
              editable={true}
              selectable={true}
              expandRows={true} // 화면에 맞게 높이 재설정
              // slotMinTime="08:00" // Day 캘린더에서 시작 시간
              // slotMaxTime="20:00" // Day 캘린더에서 종료 시간
              selectMirror={true}
              dayMaxEvents={true}
              weekends={true}
              //datesSet={handleEventAdd}
              events={calendarData}
              select={handleDateSelect} // 일자선택하면 eventADD기능활성화
              eventContent={renderEventContent} // 아이콘 삭제
              eventClick={handleEventClick}
              eventAdd={handleEventAdd}
              eventChange={handleEventChange} //드래그 앤 드롭/크기 조정
              // eventRender={eventRender}
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

// function renderEventContent(eventInfo) {
//   return (
//     <>
//       <i>{eventInfo.event.title}</i>
//     </>
//   );
// }

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
