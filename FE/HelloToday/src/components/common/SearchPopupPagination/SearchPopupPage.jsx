import { useState, useEffect } from "react";
import SearchContent from "../../PopUp/SearchContent";
import Paging from "./SearchPopupPaging";
import axios from "axios";
import classes from "./SearchPopupPage.module.css";

function SearchPopupPage({
  page,
  setPage,
  handlePageChange,
  AccsesToken,
  userName,
  isClickSearchBtn,
  setIsClickSearchBtn,
}) {
  const [totalSearchCount, setTotalSearchCount] = useState(undefined);
  const [currentPosts, setCurrentPosts] = useState([]); // 보여줄 포스트
  // const [page, setPage] = useState(1); // 현재 페이지 (상위에서 받아오기?)

  const size = 9;

  useEffect(() => {
    async function searchAxios() {
      if (!isClickSearchBtn) {
        return;
      }

      if (userName === "") {
        alert("닉네임을 입력해주세요");
        return;
      }
      console.log(`호출 확인 : ${page}`);
      const searchResponse = await axios({
        url: `${process.env.REACT_APP_BASE_URL}/api/search`,
        method: "get",
        params: {
          key: "닉네임",
          word: userName,
          page: page,
          size: size,
        },
        headers: {
          Authorization: AccsesToken,
        },
      });

      console.log(searchResponse);

      const userListFromAPI = searchResponse.data.members; // API로부터 받아온 사용자 정보 리스트
      setCurrentPosts(userListFromAPI);
      setTotalSearchCount(searchResponse.data.totalMembers);
      setIsClickSearchBtn(false);
    }

    searchAxios();
  }, [page, isClickSearchBtn]);

  return (
    <div className={classes.searchPopupPage}>
      <div className={classes.searchPopupPageUsers}>
        {currentPosts.map((user, index) => (
          <SearchContent
            key={index}
            memberId={user.memberId}
            profileImg={user.profile}
            nickname={user.nickname}
            tagList={user.tagList}
          />
        ))}
      </div>
      <Paging
        totalCount={totalSearchCount}
        page={page}
        postPerPage={size}
        pageRangeDisplayed={5}
        handlePageChange={handlePageChange}
        setPage={setPage}
      />
    </div>
  );
}

export default SearchPopupPage;
