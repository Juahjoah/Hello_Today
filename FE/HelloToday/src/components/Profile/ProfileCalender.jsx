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
  const navigate = useNavigate();

  // API로 데이터 가져오기
  // const [events, setEvents] = useState([]);
  // useEffect(() => {
  //     axios.get('주소')
  //     .then(res=>setEvents(res.data.calendarList))
  //    .catch(err=>console.log(err));
  //    }, []);

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
        // events={events} //달력에 표시할 값
        initialEvents={INITIAL_EVENTS}
        locale="ko" // 한국어 설정
      />
    </div>
  );
}

export default ProfileCalender;
