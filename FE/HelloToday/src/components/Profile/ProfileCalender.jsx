import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";

import FullCalendar from "@fullcalendar/react"; //풀캘린더 import
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; //필요없는 것 같기도?
import { SET_ISDELETE } from "../../store/ddaySlice";

import "./ProfileCalendar.css";

//tooltip
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import "tippy.js/themes/light.css";
import "tippy.js/dist/border.css";

export function ProfileCalender() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // API로 데이터 가져오기
  // nav에서 memberId 고정한 것 고쳐주기
  const [events, setEvents] = useState([]);
  const memberId = useParams().memberId;
  const AccsesToken = useSelector((state) => state.authToken.accessToken);

  //디데이
  const isRegist = useSelector((state) => state.dday.isRegist);
  const isEditF = useSelector((state) => state.dday.isEditF);
  const isDelete = useSelector((state) => state.dday.isDelete);

  useEffect(() => {
    if (AccsesToken) {
      axios
        .all([
          axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/mypage/calendar/${memberId}`,
            {
              headers: { Authorization: AccsesToken },
            }
          ),
          axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/mypage/dday/${memberId}`,
            {
              headers: { Authorization: AccsesToken },
            }
          ),
        ])
        .then(
          axios.spread((res1, res2) => {
            // console.log("캘린더", res1);
            // console.log("디데이", res2);

            const dbdata1 = res1.data.map((item) => ({
              id: item.routineId,
              start: format(new Date(item.startDate), "yyyy-MM-dd"),
              end: format(
                new Date(item.endDate).setDate(
                  new Date(item.endDate).getDate() + 1
                ),
                "yyyy-MM-dd"
              ),
              title: "🚩 나의 루틴",
              color: "#ffcb6b",
            }));
            const dbdata2 = res2.data.map((item) => ({
              //디데이 데이터
              calDate: item.calDate,
              title: item.content,
              description:
                item.calDate > 0
                  ? `D +${item.calDate}`
                  : item.calDate === 0
                  ? "D-day"
                  : `D ${item.calDate}`,
              start: item.finalDate,
              createDate: item.createdDate,
              memberid: item.memberId,
              modifedDate: item.modifedDate,
            }));
            const dbdata = dbdata1.concat(dbdata2);

            setEvents(dbdata);
            if (isDelete) {
              dispatch(SET_ISDELETE(false));
            }
          })
        )
        .catch((err) => {
          // console.log("-------ProfileCalendar error----------");
          // console.log(err);
        });
    }
  }, [AccsesToken, isRegist, isEditF, isDelete]);

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
        height={"350px"}
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
            const clickedDate = new Date(date);
            const year = clickedDate.getFullYear();
            const month = String(clickedDate.getMonth() + 1).padStart(2, "0");
            const day = String(clickedDate.getDate()).padStart(2, "0");
            const formattedDate = `${year}-${month}-${day}`;

            const isClickable = events.some((event) => {
              const eventStartDate = new Date(event.start);
              eventStartDate.setHours(0, 0, 0, 0); // 시간을 00:00:00으로 조정
              const eventEndDate = new Date(event.end);
              eventEndDate.setDate(eventEndDate.getDate() - 1);
              eventEndDate.setHours(23, 59, 59, 999); // 시간을 23:59:59로 조정
              return (
                eventStartDate <= selectedDate && selectedDate <= eventEndDate
              );
            });

            if (isClickable) {
              navigate(`/MyProfile/${memberId}/calen/${formattedDate}`);
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
              eventEndDate.setDate(eventEndDate.getDate() - 1);
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
        //tooltip
        eventDidMount={(info) => {
          if (info.event.extendedProps.description) {
            // description이 있는 경우에만 툴팁 생성
            const tooltip = new tippy(info.el, {
              content: info.event.extendedProps.description,
              placement: "top",
              animation: "scale",
              theme: "light",
              hideOnClick: false,
            });

            return () => {
              tooltip.destroy();
            };
          }
        }}
        eventContent={(arg) => {
          console.log(arg);
        }}
      />
    </div>
  );
}

export default ProfileCalender;
