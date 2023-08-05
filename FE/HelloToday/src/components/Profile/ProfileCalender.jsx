import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "@fullcalendar/core";

import FullCalendar from "@fullcalendar/react"; //풀캘린더 import
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; //필요없는 것 같기도?
import bootstrap5Plugin from "@fullcalendar/bootstrap5";

import { INITIAL_EVENTS, createEventId } from "./event-utils"; //달력에 일정 데이터 import함

export function ProfileCalender() {
  // API로 데이터 가져오기
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //     axios.get('주소')
  //     .then(res=>setEvents(res.data.calendarList))
  //    .catch(err=>console.log(err));
  //    }, []);

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
    //클릭하면 세부 페이지로 이동하게 하기
    //이거 디테일 세부 페이지에서 data 받을 때 url 뒤에 unique 숫자 붙여야할듯?
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
  // const calendarDetailRouter = (info) =>{
  //   router.push(`/detail/${info.dateStr}`)
  // }

  return (
    <div>
      <FullCalendar
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          bootstrap5Plugin,
        ]}
        // Toolbar
        headerToolbar={{
          //핸들바
          left: "prev,next", //이전 달, 다음 달,
          center: "title", //제목
          right: "today", // 오늘
        }}
        //Theme
        themeSystem="bootstrap5"
        //Sizing
        height={"300px"}
        //Month
        fixedWeekCount={false} //true면 기본이 6줄
        initialView="dayGridMonth" //처음 보이는 부분은 달
        weekends={true}
        //Date Nav Links
        navLinks={true} //일과 주를 누르면 해당 페이지로 이동
        navLinkDayClick={(info) => {
          console.log("navLink");
          console.log(info.dateStr);
          navigate(`/MyProfile/calen/${info.dateStr}`);
        }} //일(숫자)을 누르면 상세 페이지로 이동
        //dateClick : 달력에서 해당 날자(네모칸)를 클릭했을 때 발생하는 이벤트 함수
        dateClick={(info) => {
          // <Link to={`/calen/${info.dateStr}`} />;
          console.log("dateLink");
          console.log(info.dateStr);
          navigate(`/MyProfile/calen/${info.dateStr}`);

          //해당 날짜가 alert에 뜬다.
        }}
        events={events} //달력에 표시할 값
        eventContent={renderEventContent} // custom render function
        // dayMinWidth={"50px"}
        expandRows={false}
        // editable={true} //수정 가능
        selecttable={false} //달력 일자 드래그 가능
        selectMirror={true} //
        dayMaxEvents={true} //
        initialEvents={INITIAL_EVENTS}
        select={handleDateSelect}
        eventClick={handleEventClick} //이벤트 다루는 툴
        // eventClick={((info) => router.push(`/detail/${info.dateStr}`))} //해당 상세 페이지로 이동
        locale="ko" // 한국어 설정
        // nowIndicator={true}

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
