import classes from "./WidgetDday.module.css";
import { useState, useRef } from "react";
import axios from "axios";
import { ADD_DDAY_DATA, SET_ISREGIST } from "../../../store/ddaySlice";
import { useDispatch, useSelector } from "react-redux";

function WidgetDdayregist() {
  const ddaycontentinput = useRef();
  const ddayfinalinput = useRef();
  const dispatch = useDispatch();
  const AccsesToken = useSelector((state) => state.authToken.accessToken);

  //State 상태 변경
  const [newDday, setNewDday] = useState({
    finalDate: "",
    content: "",
  });
  const handleChangeState = (e) => {
    // console.log(e.target.value);
    // console.log(typeof e.target.value);

    setNewDday({
      ...newDday,
      [e.target.name]: e.target.value,
    });
    // console.log(newDday);
  };

  // submit 보냄
  // back에 axios 같이 보냄
  const handleSubmit = () => {
    if (newDday.content.length < 1) {
      //focus
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
      type: "1",
    };
    // console.log(newDday);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/mypage/dday`, data, {
        headers: { Authorization: AccsesToken },
      })
      .then((res) => {
        // console.log(res);
        // alert("저장 성공");
        //submit한 데이터 저장하기
        dispatch(ADD_DDAY_DATA(newDday));
        //버튼 누르면 초기화하기 위해
        dispatch(SET_ISREGIST(true));
        setNewDday({
          finalDate: "",
          content: "",
        });
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  return (
    <div>
      <div className={classes.WidgetDday_date}>
        <p className={classes.WidgetDday_txt}>날짜</p>
        <input
          ref={ddayfinalinput}
          type="date"
          placeholder="날짜를 선택해주세요."
          name="finalDate" //이거 써야 변수와 연결
          value={newDday.finalDate}
          onChange={handleChangeState}
          className={classes.DdayInputDate}
          required
        />
      </div>
      <div>
        <p className={classes.WidgetDday_txt}>D-Day 입력</p>
        <div className={classes.WidgetDday_input_btn}>
          <div className={classes.input}>
            <input
              className={classes.WidgetDday_input}
              type="text"
              ref={ddaycontentinput}
              name="content"
              value={newDday.content}
              onChange={handleChangeState}
              placeholder="D-Day 제목을 입력해주세요"
            ></input>
          </div>
          <div>
            <button className={classes.WidgetDday_btn} onClick={handleSubmit}>
              완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WidgetDdayregist;
