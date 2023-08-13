import { useState, useEffect } from "react";
import SearchContent from "../../PopUp/SearchContent";
import Paging from "./SearchPopupPaging";

function SearchPopupPage({ AccsesToken, userList }) {
  const [totalSearchCount, setTotalSearchCount] = useState(undefined);
  const [currentPosts, setCurrentPosts] = useState([]); // 보여줄 포스트
  const [page, setPage] = useState(1); // 현재 페이지
  const handlePageChange = (page) => {
    setPage(page);
  };
  const size = 9;

  useEffect(() => {});
  return <div></div>;
}

export default SearchPopupPage;
