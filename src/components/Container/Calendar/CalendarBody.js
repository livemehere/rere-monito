import React from 'react';
import { connect } from 'react-redux';
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
class CalendarBody extends React.Component {

  render() {
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
            datesSet={this.handleDates}
            select={this.handleDateSelect}
            events={this.props.events}
            eventContent={renderEventContent} // 커스텀 렌더 기능
            eventClick={this.handleEventClick}
            eventAdd={this.handleEventAdd}
            eventChange={this.handleEventChange} //드래그 앤 드롭/크기 조정 
            eventRemove={this.handleEventRemove}
          />
                    </div>
                    </OnlyCalendar>
             {/* 여기에 CRUD폼 들어감 */}
                <DetailCalendar>
                {this.renderSidebar()}
                </DetailCalendar> 
            </CalendarBackDiv> 
      </div>
    )
  }

  renderSidebar() {
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
              checked={this.props.weekendsVisible}
              onChange={this.props.toggleWeekends}
            ></input>
            주말제외
          </label>
        </div>
        <div className='demo-app-sidebar-section'>
                <h2>{ User.name}님의 일정갯수 : {this.props.events.length}</h2>
          <ul>
            {this.props.events.map(renderSidebarEvent)}
          </ul>
        </div>
      </div>
    )
  }

  // 유저 핸들러
  // ------------------------------------------------------------------------------------------

  handleDateSelect = (selectInfo) => {
    let calendarApi = selectInfo.view.calendar
    let title = prompt('일정을 입력하세요.')

    calendarApi.unselect() //일자 선택 초기화

    if (title) {
      calendarApi.addEvent({ 
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      }, true) //임시로  true 값 둠. 리듀서가 새 이벤트를 제공할때 덮어씀
    }
  }

  handleEventClick = (clickInfo) => {
    if (window.confirm(`'${clickInfo.event.title}' 일정을 삭제하시겠습니까?`)) {
        clickInfo.event.remove();
    }
  }

  
  handleDates = (rangeInfo) => {
    console.log(rangeInfo);
    this.props.requestEvents(rangeInfo.startStr, rangeInfo.endStr)
      .catch(reportNetworkError)
  }

  handleEventAdd = (addInfo) => {
    this.props.createEvent(addInfo.event.toPlainObject())
      .catch(() => {
        reportNetworkError()
        addInfo.revert()
      })
  }

  handleEventChange = (changeInfo) => {
    this.props.updateEvent(changeInfo.event.toPlainObject())
      .catch(() => {
        reportNetworkError()
        changeInfo.revert()
      })
  }

  handleEventRemove = (removeInfo) => {
    this.props.deleteEvent(removeInfo.event.id)
      .catch(() => {
        reportNetworkError()
        removeInfo.revert()
      })
  }

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

export default connect(mapStateToProps, actionCreators)(CalendarBody)
