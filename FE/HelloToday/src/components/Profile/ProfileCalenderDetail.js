import Nav from "../../components/common/Nav";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import classes from "./ProfileCalenderDetail.module.css";
// import { SET_CALENDAR_DATA } from "../../store/calendarDetailSlice";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Button from "react-bootstrap/Button";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

function ProfileCalenderDetail() {
  const navigate = useNavigate();
  const memberId = useParams().memberId;
  const checkDate = useParams().checkDate;

  const AccsesToken = useSelector((state) => state.authToken.accessToken);
  const dispatch = useDispatch();
  const [calDetails, setCalDetail] = useState([]);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/api/mypage/calendar/${memberId}/${checkDate}`,
        {
          headers: { Authorization: AccsesToken },
        }
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
        // console.log(res.data);
        // console.log("ok");
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);
  return (
    <div>
      <Nav />
      <div className={classes.calDetailContain}>
        <div className={classes.calDetailContent}>
          <span className={classes.calDetailDay}>{checkDate}</span>
          <hr />
          <p className={classes.nothingmsg}>
            {calDetails.length > 0 ? "" : "기록을 남겨주세요😊"}
          </p>
          <div>
            {calDetails.map((item, index) => {
              return (
                <div className={classes.routinediary} key={index}>
                  <p className={classes.routineContent}>
                    💜 {item.routineContent}
                  </p>
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
                    <div className={classes.routine_content}>
                      <p>{item.content}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <hr />
        <div className={classes.calendardetail_btn}>
          <button
            type="button"
            className={classes.btn_back}
            onClick={() => {
              navigate(-1);
            }}
          >
            뒤로 가기
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileCalenderDetail;
