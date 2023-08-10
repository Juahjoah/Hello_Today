import classes from "./WidgetHistory.module.css";
import { useState, useRef, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
//
import WidgetPaging from "./WidgetPaging";

function WidgetHistory() {
  const memberId = useParams().memberId; //url에서 param가져오기
  const AccsesToken = useSelector((state) => state.authToken.accessToken);

  //
  const [items, setItems] = useState([]); //리스트에 나타낼 아이템
  const [count, setCount] = useState(0); //아이템 총 개수
  const [currentpage, setCurrentpage] = useState(1); //현재페이지
  const [postPerPage] = useState(3); //페이지당 아이템 개수

  const [indexOfLastPost, setIndexOfLastPost] = useState(0);
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(0);
  const [currentPosts, setCurrentPosts] = useState(0);

  const setPage = (e) => {
    // 페이지가 바뀔 때 핸들링해줄 함수
    setCurrentpage(e); //현재 페이지
    console.log("현재 페이지 : ", e);
  };

  useEffect(() => {
    const params = {
      memberId: memberId,
      page: currentpage - 1,
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
        console.log("받아온 데이터", res);
        setItems(res.data);
        console.log("뿌리는 데이터", items);
        setCount(res.data[0].size); //총 아이템의 개수
        console.log(count);
        // setIndexOfLastPost(currentpage * postPerPage);
        // setIndexOfFirstPost(indexOfLastPost - postPerPage);
        // setCurrentPosts(items.slice(indexOfFirstPost, indexOfLastPost, items));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentpage, memberId, indexOfFirstPost, indexOfLastPost]);
  return (
    <div className="widget-history">
      <div className={classes.WidgetHistory}>
        <span className={classes.WidgetHistory_title}>루틴 히스토리</span>
        <div className={classes.WidgetHistory_body}>
          {/* 여기 시작 */}
          <div className={classes.WidgetHistory_content}>
            {items && items.length > 0 ? (
              items.map((item) => (
                <div className={classes.WidgetHistory_one}>
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
                      alt={item.imgPath}
                    />
                  )}
                  <hr />
                  <p>
                    {new Date(item.startDate).toLocaleDateString()} ~
                    {new Date(item.endDate).toLocaleDateString()}
                  </p>
                </div>
              ))
            ) : (
              <p>게시물이 없습니다.</p>
            )}
          </div>
          <div className={classes.btn}>
            <WidgetPaging page={currentpage} count={count} setPage={setPage} />
          </div>
        </div>

        {/* 여기 끝 */}
      </div>
    </div>
  );
}

export default WidgetHistory;
