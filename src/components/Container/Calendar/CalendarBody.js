import React from 'react';
import axios from 'axios';
import { createSelector } from 'reselect';
import FullCalendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import actionCreators from './actions';
import { getHashValues } from './utils';
import { CalendarBackDiv, DetailCalendar, OnlyCalendar } from '../../Presenter/Calendar/CalendarBodyPresenter';
import { UserBtn } from '../../Presenter/UserPageMain/UserPageMainPresenter';

const User ={
    name:"임의연",
}

const CalendarBody = () => {
  
    // 유저 핸들러
  // ------------------------------------------------------------------------------------------


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
            weekends={this.props.weekendsVisible}
            datesSet={handleDates}
            select={handleDateSelect}
            events={this.props.events}
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
                {renderSidebar("")}
                </DetailCalendar> 
            </CalendarBackDiv> 
      </div>
    )
}

const  handleDateSelect = (selectInfo) => {
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

const renderSidebar= (props)=> {
  return (
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
            checked={props.weekendsVisible}
            onChange={props.toggleWeekends}
          ></input>
          주말제외
        </label>
      </div>
      <div className='demo-app-sidebar-section'>
              <h2>{ User.name}님의 일정갯수 : {props.events.length}</h2>
        <ul>
          {props.events.map(renderSidebarEvent)}
        </ul>
      </div>
    </div>
  )
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

function mapStateToProps() {
  const getEventArray = createSelector(
    (state) => state.eventsById,
    getHashValues
  )

  return (state) => {
    return {
      events: getEventArray(state),
      weekendsVisible: state.weekendsVisible
    }
  }
}

export default CalendarBody
