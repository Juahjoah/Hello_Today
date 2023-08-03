import React, { useState } from "react";
import { formatDate } from "@fullcalendar/core";

import FullCalendar from "@fullcalendar/react"; //풀캘린더 import
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "./event-utils"; //달력에 일정 데이터 import함

const events = [{ title: "Meeting", start: new Date() }];

export function ProfileCalender() {
  // const [currentEvents, setCurrentEvents] = useState([]); //현재 일정(약간 데이터 값들 )

  //------------------------
  const handleDateSelect = (selectInfo) => {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };
  //------------------------
  const handleEventClick = (clickInfo) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  };
  //------------------------
  // const handleEvents = (events) => {
  //   setCurrentEvents(events);
  // };

  //------------------------
  const renderEventContent = (eventInfo) => {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  };

  return (
    <div>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          //핸들바
          left: "prev,next today", //이전 달, 다음 달, 오늘
          center: "title", //제목
        }}
        initialView="dayGridMonth" //처음 보이는 부분은 달
        weekends={true}
        events={events}
        eventContent={renderEventContent} // custom render function
        fixedWeekCount={false}
        height={"300px"}
        // dayMinWidth={"50px"}
        expandRows={false}
        editable={true} //수정 가능
        selecttable={true} //선택 가능
        selectMirror={true} //
        dayMaxEvents={true} //
        initialEvents={INITIAL_EVENTS}
        select={handleDateSelect}
        eventClick={handleEventClick}
        // eventsSet={handleEvents} // called after events are initialized/added/changed/removed
        /* you can update a remote database when these fire:
        eventAdd={function(){}}
        eventChange={function(){}}
        eventRemove={function(){}}
        */
      />
    </div>
  );
}

export default ProfileCalender;
