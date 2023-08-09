import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { formatDate } from "@fullcalendar/core";
import axios from "axios";
import { DateTime } from "luxon";

import FullCalendar from "@fullcalendar/react"; //풀캘린더 import
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; //필요없는 것 같기도?

// import { events, setEvents } from "./event-utils"; //달력에 일정 데이터 import함
import "./ProfileCalendar.css";

export function ProfileCalender() {
  const navigate = useNavigate();

  // API로 데이터 가져오기
  // nav에서 memberId 고정한 것 고쳐주기
  const [events, setEvents] = useState([]);
  const memberId = useParams().memberId;
  const AccsesToken = useSelector((state) => state.authToken.accessToken);

  useEffect(() => {
    if (AccsesToken) {
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/api/mypage/calendar/${memberId}`,
          {
            headers: { Authorization: AccsesToken },
          }
        )
        .then((res) => {
          const dbdata = res.data.map((item) => ({
            id: item.routineId,
            start: item.startDate,
            end: item.endDate,
            title: item.activeFlag,
          }));
          setEvents(dbdata);
        })
        .catch((error) => {
          console.log("-------ProfileCalendar error----------");
          console.log(error);
        });
    }
  }, [AccsesToken]);
  //d-day추가하면 캘린더 데이터 수정해주기

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        // Toolbar
        headerToolbar={{
          //핸들바
          left: "prev,next", //이전 달, 다음 달,
          center: "title", //제목
          right: "today", // 오늘
        }}
        //Sizing
        height={"300px"}
        //Month
        fixedWeekCount={false} //true면 기본이 6줄
        initialView="dayGridMonth" //처음 보이는 부분은 달
        weekends={true}
        //Date Nav Links
        navLinks={true} //일과 주를 누르면 해당 페이지로 이동
        //일(숫자)을 누르면 상세 페이지로 이동
        navLinkDayClick={(date) => {
          if (events.length > 0) {
            const selectedDate = new Date(date);
            selectedDate.setHours(0, 0, 0, 0); // 시간을 00:00:00으로 조정
            const clickedDate = selectedDate.toISOString().split("T")[0];

            const isClickable = events.some((event) => {
              const eventStartDate = new Date(event.start);
              eventStartDate.setHours(0, 0, 0, 0); // 시간을 00:00:00으로 조정
              const eventEndDate = new Date(event.end);
              eventEndDate.setHours(23, 59, 59, 999); // 시간을 23:59:59로 조정
              return (
                eventStartDate <= selectedDate && selectedDate <= eventEndDate
              );
            });

            if (isClickable) {
              navigate(`/MyProfile/${memberId}/calen/${clickedDate}`);
            }
          }
        }}
        //dateClick : 달력에서 해당 날자(네모칸)를 클릭했을 때 발생하는 이벤트 함수
        dateClick={(info) => {
          if (events.length > 0) {
            const clickedDate = info.dateStr;
            const selectedDate = new Date(clickedDate);
            selectedDate.setHours(0, 0, 0, 0); // 시간을 00:00:00으로 조정

            const isClickable = events.some((event) => {
              const eventStartDate = new Date(event.start);
              eventStartDate.setHours(0, 0, 0, 0); // 시간을 00:00:00으로 조정
              const eventEndDate = new Date(event.end);
              eventEndDate.setHours(23, 59, 59, 999); // 시간을 23:59:59로 조정
              return (
                eventStartDate <= selectedDate && selectedDate <= eventEndDate
              );
            });

            if (isClickable) {
              navigate(`/MyProfile/${memberId}/calen/${clickedDate}`);
            }
          }
        }}
        events={events} //달력에 표시할 값
        locale="ko" // 한국어 설정
      />
    </div>
  );
}

export default ProfileCalender;
