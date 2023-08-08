import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import classes from "./ProfileCalenderDetail.module.css";
// import { SET_CALENDAR_DATA } from "../../store/calendarDetailSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import axios from "axios";

function ProfileCalenderDetail() {
  const navigate = useNavigate();
  const memberId = useParams().memberId;
  const checkDate = useParams().checkDate;

  //데이터 불러오기
  //d-day도 달력에 들어가면 기존 불러오는 데이터에 push해서 변화하면 데이터 변경하게 해야함

  // const calDetails = [
  //   {
  //     routineContent: "운동하기",
  //     writeDate: "2023-08-07",
  //     imgPath: "/images/Delete/강쥐.jpg",
  //     content: "여러분의 루틴을 일주일 간 함께해요!",
  //   },
  //   {
  //     routineContent: "책 읽기",
  //     writeDate: "2023-08-07",
  //     imgPath: "/images/Delete/계란.jpg",
  //     content: "매주 월요일의 시작",
  //   },
  //   {
  //     routineContent: "물마시기",
  //     writeDate: "2023-08-07",
  //     imgPath: "/images/Delete/라이언.jpg",
  //     content: "껄껄껄껄",
  //   },
  //   {
  //     routineContent: "물마시기",
  //     writeDate: "2023-08-07",
  //     imgPath: "",
  //     content: "껄껄껄껄",
  //   },
  // ];
  const [calDetails, setCalDetail] = useState([]);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/api/mypage/calendar/${memberId}/${checkDate}`
      )
      .then((res) => {
        const formattedData = res.data.map((item) => {
          const date = new Date(item.writeDate);
          const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

          return {
            ...item,
            writeDate: formattedDate,
          };
        });

        setCalDetail(formattedData);
        console.log(res.data);
        console.log("ok");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className={classes.calDetailContain}>
      <div className={classes.calDetailContent}>
        <p>{calDetails.length > 0 ? calDetails[0].writeDate : ""}</p>
        <hr />
        <div>
          {calDetails.map((item, index) => {
            return (
              <div className={classes.routinediary} key={index}>
                <p className={classes.routineContent}>{item.routineContent}</p>
                <div className={classes.img_txt}>
                  <div className={classes.img_box}>
                    {!item.imgPath ||
                    item.imgPath === "" ||
                    item.imgPath === undefined ? (
                      <img
                        className={classes.img}
                        src="/images/logo.png"
                        alt="Default"
                      />
                    ) : (
                      <img
                        className={classes.img}
                        src={item.imgPath}
                        alt="img"
                      />
                    )}
                  </div>
                  <div className={classes.v_line}></div>
                  <div className={classes.content}>
                    <p>{item.content}</p>
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
