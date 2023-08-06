import classes from "./WidgetDday.module.css";
import { useState, useRef, useCallback, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  SET_ISEDIT,
  SET_DDAY_DATA,
  SET_DDAYID,
} from "../../../store/ddaySlice";
import { useDispatch, useSelector } from "react-redux";
import WidgetDdayEdit from "./WidgetDdayEdit";
import WidgetDdayregist from "./WidgetDdayregist";

function WidgetDday() {
  //submit 조건에 충족 안 할 때 DOM 선택해서 커서 가게 할려고
  const ddaycontentinput = useRef();
  const ddaydataId = useRef(0);
  const memberId = useParams().memberId; //url에서 param가져오기
  const dispatch = useDispatch();

  // 더미 데이터
  const dummyList = [
    {
      memberId: 1,
      finalDate: "2023-08-06T04:05:01.540Z",
      createdDate: "2023-08-06T04:05:01.540Z",
      modifiedDate: "2023-08-06T04:05:01.540Z",
      content: "내 생일",
      calDate: 30,
      ddayId: 1,
    },
    {
      memberId: 1,
      finalDate: "2023-08-07T04:05:01.540Z",
      createdDate: "2023-08-07T04:05:01.540Z",
      modifiedDate: "2023-08-07T04:05:01.540Z",
      content: "수능",
      calDate: 50,
      ddayId: 2,
    },
  ];

  // 배열 형태 데이터
  const ddaydata = useSelector((state) => state.dday.ddayData);
  const isedit = useSelector((state) => state.dday.isEdit);

  // 배열
  //axios로 불러오기
  // useEffect(() => {
  //   axios
  //     .get(`${process.env.REACT_APP_BASE_URL}/api/mypage/dday/${memberId}`)
  //     .then((res) => {
  //       console.log(res);
  //       SET_DDAY_DATA(res.data);
  //     })
  //     .then((err) => {
  //       console.log(err);
  //     });
  // });

  useEffect(() => {
    dispatch(SET_DDAY_DATA(dummyList));
    console.log(ddaydata);
    console.log("다시 렌더링");
  }, [dispatch]);

  const handleEditState = (target) => {
    //수정
    dispatch(SET_ISEDIT(true));
    dispatch(SET_DDAYID(target));
    console.log(isedit);
    console.log(target);

    // const data = {
    //   ddayId : 0,
    //   finalDate : ddayInput.finalDate,
    //   content : ddayInput.content
    // }
    // axios.put(`${process.env.REACT_APP_BASE_URL}/api/mypage/dday`,data)
    // .then((res) => {
    //   console.log(res)
    // })
    // .then((err) => {
    //   console.log(err)
    // })
    //프런트에서 수정
  };
  const handleDeleteState = (target) => {
    //삭제
    // axios
    //   .delete(`${process.env.REACT_APP_BASE_URL}/api/mypage/dday/${ddayId}`)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .then((err) => {
    //     console.log(err);
    //   });
    //프런트에서 삭제
    console.log(target);
    // console.log(`${item.ddayId}를 삭제합니다`);
    // alert("삭제하겠습니까?");
    const newDdayList = ddaydata.filter((item) => item.ddayId !== target);
    dispatch(SET_DDAY_DATA(newDdayList));
  };
  return (
    <div className={classes.WidgetDday}>
      <div className={classes.WidgetDday_name}>D-Day</div>
      <div className={classes.WidgetDday_content}>
        <div className={classes.WidgetDday_text}>
          {/* 내 생일 d-30  */}
          {/* dday 데이터 있으면 뿌려주고 아니면 글 써달라는 거 써놓기  */}
          {ddaydata &&
            ddaydata.map((item) => {
              return (
                <div className={classes.routinediary} key={item.ddayId}>
                  <p className={classes.routineContent}>
                    {item.content} D-{item.calDate}
                  </p>
                  <div className={classes.btn_edit_delete}>
                    {/* 콜백으로 안 하면 그냥 다 삭제함 */}
                    <button onClick={() => handleEditState(item.ddayId)}>
                      수정
                    </button>
                    <button onClick={() => handleDeleteState(item.ddayId)}>
                      삭제
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
        <div className={classes.WidgetDday_edit}>
          {isedit ? <WidgetDdayEdit /> : <WidgetDdayregist />}
          {isedit ? <div>수정</div> : <div>등록</div>}
        </div>
      </div>
    </div>
  );
}

export default WidgetDday;
