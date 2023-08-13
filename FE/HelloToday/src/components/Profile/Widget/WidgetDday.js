import classes from "./WidgetDday.module.css";
import { useState, useRef, useCallback, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  SET_ISEDIT,
  SET_DDAY_DATA,
  SET_DDAYID,
  ADD_DDAY_DATA,
  SET_ISREGIST,
  SET_ISEDITF,
  SET_ISDELETE,
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

  // 배열 형태 데이터
  const ddaydata = useSelector((state) => state.dday.ddayData);
  const isedit = useSelector((state) => state.dday.isEdit);
  const isRegist = useSelector((state) => state.dday.isRegist);
  const iseditf = useSelector((state) => state.dday.isEditF);
  const AccsesToken = useSelector((state) => state.authToken.accessToken);
  // 배열
  //axios로 불러오기
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/mypage/dday/${memberId}`, {
        headers: { Authorization: AccsesToken },
      })
      .then((res) => {
        console.log(res);
        dispatch(SET_DDAY_DATA(res.data));
        if (isRegist) {
          dispatch(SET_ISREGIST(false));
        }
        if (iseditf) {
          dispatch(SET_ISEDITF(false));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch, isRegist, iseditf]);

  const handleEditState = (target) => {
    //수정
    dispatch(SET_ISEDIT(true));
    dispatch(SET_DDAYID(target));
    console.log(isedit);
    console.log(target);
  };
  const handleDeleteState = (target) => {
    //삭제
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}/api/mypage/dday/${target}`, {
        headers: { Authorization: AccsesToken },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    //프런트에서 삭제
    console.log(target);
    // console.log(`${item.ddayId}를 삭제합니다`);
    // alert("삭제하겠습니까?");
    const newDdayList = ddaydata.filter((item) => item.ddayId !== target);
    dispatch(SET_DDAY_DATA(newDdayList));
    dispatch(SET_ISDELETE(true));
  };

  return (
    <div className={classes.WidgetDday}>
      <span className={classes.WidgetDday_name}>D-Day</span>
      <div className={classes.WidgetDday_content}>
        <div className={classes.WidgetDday_text}>
          {/* 내 생일 d-30  */}
          {/* dday 데이터 있으면 뿌려주고 아니면 글 써달라는 거 써놓기  */}
          {ddaydata.length === 0 ? (
            <div>새로운 dday를 입력해주세요!</div>
          ) : (
            ddaydata.map((item) => {
              return (
                <div className={classes.routinediary} key={item.ddayId}>
                  <div className={classes.routineContentCenter}>
                    <p className={classes.routineContent}>
                      {item.content} D{item.calDate}
                    </p>

                    <div className={classes.btn_edit_delete}>
                      {/* 콜백으로 안 하면 그냥 다 삭제함 */}
                      <button className={classes.buttonstyle}>
                        <img
                          className={classes.edit}
                          src="../../images/Widget/edit.png"
                          alt="edit"
                          onClick={() => handleEditState(item.ddayId)}
                        />
                      </button>
                      <button className={classes.buttonstyle}>
                        <img
                          className={classes.clear}
                          src="../../images/Widget/clear.png"
                          alt="clear"
                          onClick={() => handleDeleteState(item.ddayId)}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className={classes.v_line}></div>
        <div className={classes.WidgetDday_edit}>
          {isedit ? <WidgetDdayEdit /> : <WidgetDdayregist />}
          {/* {isedit ? <div>수정</div> : <div>등록</div>} */}
        </div>
      </div>
    </div>
  );
}

export default WidgetDday;
