import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatDate } from "@fullcalendar/core";
import axios from "axios";
import { DateTime } from "luxon";

import FullCalendar from "@fullcalendar/react"; //풀캘린더 import
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; //필요없는 것 같기도?
import bootstrap5Plugin from "@fullcalendar/bootstrap5";

import { events, setEvents } from "./event-utils"; //달력에 일정 데이터 import함

export function ProfileCalender() {
  const navigate = useNavigate();

  // API로 데이터 가져오기
  // nav에서 memberId 고정한 것 고쳐주기
  // const [events, setEvents] = useState([]);
  const memberId = useParams().memberId;
  // console.log(memberId);
  // useEffect(() => {
  //   axios
  //     .get(`${process.env.REACT_APP_BASE_URL}/api/mypage/calendar/${memberId}`)
  //     .then((res) => {
  //       const dbdata = res.data.map((item) => ({
  //         id: item.routineId,
  //         start: item.startDate,
  //         end: item.endDate,
  //         title: item.activeFlag,
  //       }));
  //       setEvents(dbdata);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);
  //d-day추가하면 캘린더 데이터 수정해주기

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
        navLinkDayClick={(date) => {
          //일(숫자)을 누르면 상세 페이지로 이동
          console.log("navLink");
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          const formatdate = `${year}-${month}-${day}`;
          navigate(`/MyProfile/${memberId}/calen/${formatdate}`);
        }}
        //dateClick : 달력에서 해당 날자(네모칸)를 클릭했을 때 발생하는 이벤트 함수
        dateClick={(info) => {
          // <Link to={`/calen/${info.dateStr}`} />;
          console.log("dateLink");
          console.log(info.dateStr);
          console.log(typeof info.dateStr);
          navigate(`/MyProfile/${memberId}/calen/${info.dateStr}`);
          //해당 날짜가 alert에 뜬다.
        }}
        events={events} //달력에 표시할 값
        locale="ko" // 한국어 설정
      />
    </div>
  );
}

export default ProfileCalender;
