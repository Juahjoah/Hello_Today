import React from "react";
import Pagination from "react-js-pagination";
import "./WidgetPaging.css";

const WidgetPaging = ({ page, count, setPage }) => {
  return (
    <Pagination
      activePage={page} //현재 페이지
      itemsCountPerPage={3} // 한 페이지 당 보여줄 리스트 아이템의 개수
      totalItemsCount={count} // 총 아이템의 개수
      pageRangeDisplayed={5} // paginator 내에서 보여줄 페이지의 개수
      //예를 들어서 5라고 적으면 1,2,3,4,5까지 페이지 네이션이 나오고 6,7,8,9,10 이런 식으로 동작
      prevPageText={"‹"}
      nextPageText={"›"}
      onChange={setPage} // 페이지가 바뀔 때 핸들링해줄 함수
    />
  );
};

export default WidgetPaging;
