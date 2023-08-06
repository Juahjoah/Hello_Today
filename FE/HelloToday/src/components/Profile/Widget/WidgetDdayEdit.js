import classes from "./WidgetDday.module.css";
import { useState, useRef, useCallback, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  SET_ISEDIT,
  SET_DDAY_DATA,
  ADD_DDAY_DATA,
} from "../../../store/ddaySlice";
import { useDispatch, useSelector } from "react-redux";

function WidgetDdayEdit() {
  const ddaycontentinput = useRef();
  const ddaydataId = useRef(0);
  const memberId = useParams().memberId; //url에서 param가져오기
  const dispatch = useDispatch();

  const ddaydata = useSelector((state) => state.dday.ddayData);
  const ddayinput = useSelector((state) => state.dday.ddayInput);

  const isedit = useSelector((state) => state.isEdit);

  const [newDday, setNewDday] = useState({

    finalDate: '',
    content: '',
  });

  //State 상태 변경
  const handleChangeState = (e) => {
    ADD_DDAY_DATA({
      [e.target.name]: e.target.value,
    });
  };

  // submit 보냄
  // back에 axios 같이 보냄
  const handleSubmit = () => {
    if (ddayinput.content.length < 1) {
      //focus
      ddaycontentinput.current.focus();
      return;
    }

    //백에 연락 날리기
    // const data = {
    //   finalDate : ddayInput.finalDate,
    //   content : ddayInput.content,
    //   type : "1"
    // }
    // console.log(ddayInput);
    // axios.post(`${process.env.REACT_APP_BASE_URL}/api/mypage/dday`,data)
    // .then((res) => {
    //   console.log(res)
    // })
    // .then((err) => {
    //   console.log(err)
    // })
    alert("저장 성공");
    //submit한 데이터 저장하기
    SET_DDAY_DATA([ddayinput, ...ddaydata]);

    //버튼 누르면 초기화하기 위해
    setNewDday({
      finalDate: "",
      content: "",
    });
  };
  return (
    <div className={classes.WidgetDday_edit}>
      {/* 수정 */}
      <div>
        <p className={classes.WidgetDday_txt}>날짜</p>
        <input
          type="date"
          placeholder="날짜를 선택해주세요."
          name="finalDate" //이거 써야 변수와 연결
          value={ddayinput.finalDate}
          onChange={handleChangeState}
        />
      </div>
      <div>
        <p className={classes.WidgetDday_txt}>이벤트 입력</p>
        <input
          type="text"
          ref={ddaycontentinput}
          name="content"
          value={ddayinput.content}
          onChange={handleChangeState}
        ></input>
      </div>
      <div>
        <button onClick={handleSubmit}>완료</button>
      </div>
    </div>
  );
}

export default WidgetDdayEdit;
