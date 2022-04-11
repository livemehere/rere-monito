import React from 'react';
import FullCalendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarBackDiv, DetailCalendar, OnlyCalendar } from '../../Presenter/Calendar/CalendarBodyPresenter';

import CountingEvent from './CountEventstate';
import CountingEventState from './CountEventstate';

export const User = {
    name:"임의연",
}

const EventList =[
  {
    id: 'a',
    title: "캡스톤 회의",
    start: '2022-04-05',

  },
  {
    id: 'b',
    title: "캡스톤 면담",
    start: '2022-04-09',
  },
  {
    id: 'b',
    title: "중간고사 시험",
    start: '2022-04-11',
  }
]

export function CalendarBody() {
    return (
      <div className='demo-app'>
            
            <CalendarBackDiv>
            <OnlyCalendar>
        <div className='demo-app-main'>
          <FullCalendar className="FullCalendarCSS" 
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            //weekends={calendarEvent.weekendsVisible}
            //datesSet={handleDates} 조정
            select={handleDateSelect}
            events={EventList}
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
                <CountingEventState/>
                </DetailCalendar> 
            </CalendarBackDiv> 
      </div>
    )
}

const handleDateSelect = (selectInfo) => {
  let calendarApi = selectInfo.view.calendar
  let title = prompt('일정을 입력하세요.')

  calendarApi.unselect() //일자 선택 초기화

  if (title) {
    calendarApi.addEvent({ 
      title,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay
    }, true)
  }
}

const  handleEventClick = (clickInfo) => {
  if (window.confirm(`'${clickInfo.event.title}' 일정을 삭제하시겠습니까?`)) {
      clickInfo.event.remove();
  }
}


const  handleDates = (rangeInfo) => {
  console.log(rangeInfo);
  this.props.requestEvents(rangeInfo.startStr, rangeInfo.endStr)
    .catch(reportNetworkError)
}

const  handleEventAdd = (addInfo) => {
  this.props.createEvent(addInfo.event.toPlainObject())
    .catch(() => {
      reportNetworkError()
      addInfo.revert()
    })
}


const  handleEventChange = (changeInfo) => {
  this.props.updateEvent(changeInfo.event.toPlainObject())
    .catch(() => {
      reportNetworkError()
      changeInfo.revert()
    })
}

const  handleEventRemove = (removeInfo) => {
  this.props.deleteEvent(removeInfo.event.id)
    .catch(() => {
      reportNetworkError()
      removeInfo.revert()
    })
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

function renderSidebarEvent(plainEventObject) {
  return (
    <li key={plainEventObject.id}>
      <b>{formatDate(plainEventObject.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
      <i>{plainEventObject.title}</i>
    </li>
  )
}

function reportNetworkError() {
  alert('이 작업을 완료할 수 없습니다')
}

// function mapStateToProps() {
//   const getEventArray = createSelector(
//     (state) => state.eventsById,
//     getHashValues
//   )

//   return (state) => {
//     return {
//       events: getEventArray(state),
//       weekendsVisible: state.weekendsVisible
//     }
//   }
// }