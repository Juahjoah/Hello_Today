import classes from "./WidgetDday.module.css";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  SET_ISEDIT,
  SET_DDAY_DATA,
  SET_DDAYID,
  SET_ISEDITF,
} from "../../../store/ddaySlice";
import { useDispatch, useSelector } from "react-redux";

function WidgetDdayEdit() {
  const ddaycontentinput = useRef();
  const ddayfinalinput = useRef();
  const dispatch = useDispatch();
  const ddaydata = useSelector((state) => state.dday.ddayData);

  //State 상태 변경
  const ddayid = useSelector((state) => state.dday.ddayID);
  const AccsesToken = useSelector((state) => state.authToken.accessToken);

  const [newDday, setNewDday] = useState({
    finalDate: "",
    content: "",
  });
  useEffect(() => {
    const propdata = ddaydata.find((item) => item.ddayId == ddayid);
    setNewDday({ finalDate: propdata.finalDate, content: propdata.content });
    // console.log(newDday.finalDate);
    // console.log(newDday.content);
  }, []);
  const handleChangeState = (e) => {
    setNewDday({
      ...newDday,
      [e.target.name]: e.target.value,
    });
  };

  // submit 보냄
  // back에 axios 같이 보냄
  const handleSubmit = () => {
    if (newDday.content.length < 1) {
      //focus
      // console.log("한 개 이상의 글을 쓰시오");
      ddaycontentinput.current.focus();
      return;
    }
    if (newDday.finalDate.length < 1) {
      ddayfinalinput.current.focus();
      return;
    }
    //백에 연락 날리기
    const data = {
      finalDate: new Date(newDday.finalDate).toISOString(),
      content: newDday.content,
      ddayId: ddayid,
    };
    // console.log(newDday);
    axios
      .put(`${process.env.REACT_APP_BASE_URL}/api/mypage/dday`, data, {
        headers: { Authorization: AccsesToken },
      })
      .then((res) => {
        // console.log(res);
        // alert("저장 성공");
        //submit한 데이터 저장하기
        const updatedDdayData = ddaydata.map((item) =>
          item.ddayId === ddayid ? { ...item, ...newDday } : item
        );
        dispatch(SET_DDAY_DATA(updatedDdayData));
        //버튼 누르면 초기화하기 위해
        setNewDday({
          finalDate: "",
          content: "",
        });
        dispatch(SET_ISEDIT(false));
        dispatch(SET_DDAYID(""));
        dispatch(SET_ISEDITF(true));
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  const handleCancle = () => {
    dispatch(SET_ISEDIT(false));
  };

  const keyPressHandler = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className={classes.WidgetDday_edit}>
      {/* 수정 */}
      <div className={classes.WidgetDday_date}>
        <p className={classes.WidgetDday_txt}>날짜</p>
        <input
          type="date"
          placeholder="날짜를 선택해주세요."
          name="finalDate" //이거 써야 변수와 연결
          value={newDday.finalDate}
          onChange={handleChangeState}
          ref={ddaycontentinput}
          className={classes.DdayInputDate}
          spellCheck="false"
          required
        />
      </div>
      <div>
        <p className={classes.WidgetDday_txt}>이벤트 입력</p>
        <div className={classes.WidgetDday_input_btn}>
          <input
            className={classes.WidgetDday_input}
            type="text"
            ref={ddayfinalinput}
            name="content"
            value={newDday.content}
            onKeyDown={keyPressHandler}
            onChange={handleChangeState}
          ></input>

          <button className={classes.WidgetDday_btnMini} onClick={handleSubmit}>
            저장
          </button>

          <button className={classes.WidgetDday_btnMini} onClick={handleCancle}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default WidgetDdayEdit;
