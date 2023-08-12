import { useEffect, useState } from "react";
import Paging from "./GroupRoomPaging";
import GroupRoom from "../../group/GroupRoom";
import classes from "./GroupRoomPage.module.css";
import axios from "axios";

function GroupRoomPage({ groupRoomList, myUserName, accessToken, memberId }) {
  //   const dummy = [
  //     {
  //       createdDate: 1,
  //       title: "이거 제목",
  //       description: "이거 설명",
  //       memberLimit: 6,
  //       joinCnt: 2,
  //     },
  //     {
  //       createdDate: 1,
  //       title: "이거 제목",
  //       description: "이거 설명",
  //       memberLimit: 6,
  //       joinCnt: 2,
  //     },
  //     {
  //       createdDate: 1,
  //       title: "이거 제목",
  //       description: "이거 설명",
  //       memberLimit: 6,
  //       joinCnt: 2,
  //     },
  //     {
  //       createdDate: 1,
  //       title: "이거 제목",
  //       description: "이거 설명",
  //       memberLimit: 6,
  //       joinCnt: 2,
  //     },
  //     {
  //       createdDate: 1,
  //       title: "이거 제목",
  //       description: "이거 설명",
  //       memberLimit: 6,
  //       joinCnt: 2,
  //     },
  //     {
  //       createdDate: 1,
  //       title: "이거 제목",
  //       description: "이거 설명",
  //       memberLimit: 6,
  //       joinCnt: 2,
  //     },
  //     {
  //       createdDate: 1,
  //       title: "이거 제목",
  //       description: "이거 설명",
  //       memberLimit: 6,
  //       joinCnt: 2,
  //     },
  //     {
  //       createdDate: 1,
  //       title: "이거 제목",
  //       description: "이거 설명",
  //       memberLimit: 6,
  //       joinCnt: 2,
  //     },
  //     {
  //       createdDate: 1,
  //       title: "이거 제목",
  //       description: "이거 설명",
  //       memberLimit: 6,
  //       joinCnt: 2,
  //     },
  //   ];

  const [posts, setPosts] = useState([]); // axios로 받아온 리스트 저장
  const [currentPosts, setCurrentPosts] = useState([]); // 보여줄 포스트
  const [page, setPage] = useState(1); // 현재 페이지
  const handlePageChange = (page) => {
    setPage(page);
  };
  const [postPerPage] = useState(6); // 페이지 당 그룹 룸 개수
  const indexOfLastPost = page * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;

  useEffect(() => {
    async function axiosGroupRoomList() {
      try {
        const groupRoomResponse = await axios({
          url: `${process.env.REACT_APP_BASE_URL}/api/rooms/list`,
          method: "get",
          headers: {
            Authorization: accessToken,
          },
        });

        const reversedPosts = [...groupRoomResponse.data].reverse();
        const slicedPosts = reversedPosts.slice(
          indexOfFirstPost,
          indexOfLastPost
        );
        const filledPosts = Array.from(
          { length: postPerPage },
          (_, index) => slicedPosts[index] || "dummy"
        );
        setPosts(reversedPosts);
        setCurrentPosts(filledPosts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    axiosGroupRoomList();
  }, [indexOfFirstPost, indexOfLastPost, postPerPage, accessToken]);

  return (
    <>
      {posts.length > 0 ? (
        <div className={classes.roomList}>
          <table className={classes.roomTable}>
            <thead className={classes.roomTableTitle}>
              <tr>
                <th>현재 진행 중인 단체 루틴 ({posts.length}) </th>
              </tr>
            </thead>
            <tbody className={classes.roomTableMain}>
              {currentPosts.map((room, idx) => {
                return (
                  <tr key={idx}>
                    {room !== "dummy" ? (
                      <td>
                        <GroupRoom
                          key={room.roomId}
                          createdDate={room.createdDate}
                          title={room.name}
                          description={room.description}
                          roomId={room.roomId}
                          sessionId={room.sessionId}
                          memberLimit={room.memberLimit}
                          joinCnt={room.joinCnt}
                          myUserName={myUserName}
                          accessToken={accessToken}
                          memberId={memberId}
                        />
                      </td>
                    ) : (
                      <td className={classes.dummyRoom}>empty</td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Paging
            totalCount={posts.length}
            page={page}
            postPerPage={postPerPage}
            pageRangeDisplayed={5}
            handlePageChange={handlePageChange}
          />
        </div>
      ) : (
        <div className={classes.noGroupRoutineBanner}>
          <div>현재 진행 중인 단체 루틴 방이 없습니다!</div>
        </div>
      )}
    </>
  );
}

export default GroupRoomPage;
