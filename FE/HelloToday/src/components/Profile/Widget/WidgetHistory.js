import classes from "./WidgetHistory.module.css";
import { useState, useRef, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

function WidgetHistory() {
  const memberId = useParams().memberId; //url에서 param가져오기
  const [data, setData] = useState([]);
  const AccsesToken = useSelector((state) => state.authToken.accessToken);
  const [curpage, setCurPage] = useState("1");

  useEffect(() => {
    const params = {
      memberId: memberId,
      page: curpage,
      size: 3,
    };
    const headers = {
      Authorization: AccsesToken,
    };
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/api/mypage/routinehistory/${memberId}`,
        { params, headers }
      )
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <div className="widget-history">
      <div className={classes.WidgetHistory}>
        <span className={classes.WidgetHistory_name}>루틴 히스토리</span>
        <div className={classes.WidgetHistory_content}></div>
      </div>
    </div>
  );
}

export default WidgetHistory;
