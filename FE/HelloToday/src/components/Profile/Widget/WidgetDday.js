import classes from "./WidgetDday.module.css";
import { useState, useRef, useCallback, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function WidgetDday() {
  //submit 조건에 충족 안 할 때 DOM 선택해서 커서 가게 할려고
  const ddaycontentinput = useRef();
  const memberId = useParams().memberId; //url에서 param가져오기
  const ddayId = 0;

  // 더미 데이터
  const dummyList = [
    {
      memberId: 1,
      finalDate: "2023-08-06T04:05:01.540Z",
      createdDate: "2023-08-06T04:05:01.540Z",
      modifiedDate: "2023-08-06T04:05:01.540Z",
      content: "내 생일",
      calDate: 30,
    },
    {
      memberId: 1,
      finalDate: "2023-08-07T04:05:01.540Z",
      createdDate: "2023-08-07T04:05:01.540Z",
      modifiedDate: "2023-08-07T04:05:01.540Z",
      content: "수능",
      calDate: 50,
    },
  ];

  // 배열 형태 데이터
  const [ddayData, setDdayData] = useState([]);
  // 객체 형태 데이터
  const [ddayInput, setDdayInput] = useState({
    finalDate: "",
    content: "",
  });
  const { finalDate, content } = ddayInput;

  // 배열
  //axios로 불러오기
  // useEffect(() => {
  //   axios
  //     .get(`${process.env.REACT_APP_BASE_URL}/api/mypage/dday/${memberId}`)
  //     .then((res) => {
  //       console.log(res);
  //       setDdayData(res.data);
  //     })
  //     .then((err) => {
  //       console.log(err);
  //     });
  // });

  useEffect(() => {
    setDdayData(dummyList);
  }, [setDdayData]);

  //State 상태 변경
  const handleChangeState = (e) => {
    setDdayInput({
      ...ddayInput,
      [e.target.name]: e.target.value,
    });
  };

  // submit 보냄
  // back에 axios 같이 보냄
  const handleSubmit = () => {
    // if (ddayInput.content.length < 1) {
    //   //focus
    //   ddaycontentinput.current.focus();
    //   return;
    // }
    console.log(ddayInput);
    alert("저장 성공");
    //submit한 데이터 저장하기
    setDdayData([ddayInput, ...ddayData]);

    //버튼 누르면 초기화하기 위해
    setDdayInput({
      finalDate: "",
      content: "",
    });
  };

  const handleEditState = () => {
    //수정 
  }
  const handleDeleteState = () => {
    //삭제 
    axios.delete(`${process.env.REACT_APP_BASE_URL}/api/mypage/dday/${ddayId}`)
    .then((res) => {
      console.log(res)
    })
    .then((err) => {
      console.log(err)
    })
    //프런트에서 삭제 
    

  }
  return (
    <div className={classes.WidgetDday}>
      <div className={classes.WidgetDday_name}>D-Day</div>
      <div className={classes.WidgetDday_content}>
        <div className={classes.WidgetDday_text}>
          {/* 내 생일 d-30  */}
          {ddayData.map((item, index) => {
            return (
              <div className={classes.routinediary} key={index}>
                <p className={classes.routineContent}>
                  {item.content} D-{item.calDate}
                </p>
                <div className={classes.btn_edit_delete}>
                  <button onClick={handleEditState}>수정</button>
                  <button onClick={handleDeleteState}>삭제</button>
                </div>
              </div>
            );
          })}
        </div>

        <div className={classes.WidgetDday_edit}>
          {/* 수정 */}
          <div>
            <p className={classes.WidgetDday_txt}>날짜</p>
            <input
              type="date"
              placeholder="날짜를 선택해주세요."
              name="finalDate" //이거 써야 변수와 연결
              value={ddayInput.finalDate}
              onChange={handleChangeState}
            />
          </div>
          <div>
            <p className={classes.WidgetDday_txt}>이벤트 입력</p>
            <input
              type="text"
              ref={ddaycontentinput}
              name="content"
              value={ddayInput.content}
              onChange={handleChangeState}
            ></input>
          </div>
          <div>
            <button onClick={handleSubmit}>완료</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WidgetDday;
