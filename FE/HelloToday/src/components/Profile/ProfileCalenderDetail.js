import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./ProfileCalenderDetail.module.css";
import { SET_CALENDAR_DATA } from "../../store/calendarDetailSlice";
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

import axios from "axios";

function ProfileCalenderDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const data = [
    {
      date: "2023-08-07",
      routine_name: "운동하기",
      img_path: "/images/Delete/강쥐.jpg",
      text: "여려분의 루틴을 일주일 간 함께해요!",
    },
    {
      date: "2023-08-07",
      routine_name: "책 읽기",
      img_path: "/images/Delete/계란.jpg",
      text: "매주 월요일의 시작",
    },
    {
      date: "2023-08-07",
      routine_name: "운동하기",
      img_path: "/images/Delete/라이언.jpg",
      text: "껄껄껄껄",
    },
  ];
  useEffect(() => {
    console.log(data);
    dispatch(SET_CALENDAR_DATA(data));
  }, [data]);

  //데이터 불러오기
  //d-day도 달력에 들어가면 기존 불러오는 데이터에 push해서 변화하면 데이터 변경하게 해야함
  // useEffect(() =>{
  //   axios.get('api 주소','헤더에 access, 날짜, id')
  //   //access 토큰 : 로그인한 사람 알기 위해
  //   //날짜 : 들어간 상세 페이지가 언제 인지
  //   //id : 마이페이지의 주인이 누구인지
  //   .then((res) => {
  //     console.log(res)
  //     dispatch(SET_CALENDAR_DATA(res));
  //   })
  //   .then((error) => {
  //     console.log(error);
  //   })
  // },[data])
  //이미지 없는 경우도 생각하기
  return (
    <div className={classes.calDetailContain}>
      <div className={classes.calDetailContent}>
        <p>{data[0].date}</p>
        <hr />
        <div>
          {data.map((item) => {
            return (
              <div className={classes.routinediary} key={item.routine_name}>
                <p className={classes.routinename}>{item.routine_name}</p>
                <div className={classes.img_txt}>
                  <div className={classes.img_box}>
                    <img
                      className={classes.img}
                      src={item.img_path}
                      alt="img"
                    />
                  </div>
                  <div className={classes.v_line}></div>
                  <div className={classes.txt}>
                    <p>{item.text}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <button
          type="button"
          className={"classes.btn-bd-primary"}
          onClick={() => {
            navigate(-1);
          }}
        >
          뒤로 가기
        </button>
      </div>
    </div>
  );
}

export default ProfileCalenderDetail;
