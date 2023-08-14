import Modal from "react-modal";
import classes from "./SearchPopup.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import SearchContent from "./SearchContent";
import SearchHashTag from "./SearchHashTag";
// import classNames from "classnames";
import { HiSearch } from "react-icons/hi";
import { GrFormRefresh } from "react-icons/gr";
import { useSelector } from "react-redux";
function getRandomIndexes(totalLength, count) {
  const indexes = [];
  while (indexes.length < count) {
    const randomIndex = Math.floor(Math.random() * totalLength);
    if (!indexes.includes(randomIndex)) {
      indexes.push(randomIndex);
    }
  }
  return indexes;
}

function SearchPopup({ isOpen, setIsPopupOpen }) {
  // const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 여부 상태 관리
  const [userName, setUserName] = useState("");
  const [userList, setUserList] = useState([]);
  // const [hashList, setHashList] = useState([]);
  const [randomHashList, setRandomHashList] = useState([]);
  const AccsesToken = useSelector((state) => state.authToken.accessToken);

  // API연동

  //
  useEffect(() => {
    tagAxios();
  }, []);

  const keyPressHandler = (e) => {
    if (e.key === "Enter") {
      searchAxios();
    }
  };

  const closePopup = () => {
    setUserName("");
    setUserList([]);
    setIsPopupOpen(false);
  };

  const searchAxios = () => {
    if (userName === "") {
      alert("닉네임을 입력해주세요");
      return;
    }
    axios({
      url: `${process.env.REACT_APP_BASE_URL}/api/search`,
      method: "get",
      params: {
        key: "닉네임",
        word: userName,
        page: 1,
      },
      headers: {
        Authorization: AccsesToken,
      },
    })
      .then((res) => {
        const userListFromAPI = res.data.members; // API로부터 받아온 사용자 정보 리스트
        setUserList(userListFromAPI);
      })
      .catch(console.log(userName));
  };

  const tagAxios = async () => {
    await axios({
      url: `${process.env.REACT_APP_BASE_URL}/api/routine/tag`,
      method: "get",
    }).then((res2) => {
      const allHashList = res2.data;
      const randomIndexes = getRandomIndexes(allHashList.length, 8); // 8개의 무작위 인덱스를 얻음
      const selectedHashList = randomIndexes.map((index) => allHashList[index]); // 무작위 아이템 선택
      setRandomHashList(selectedHashList);
    });
  };

  // modal style
  const modalStyle = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.6)",
      zIndex: 10,
    },
    content: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "rgba(255,255,255,0.95)",
      overflow: "auto",
      zIndex: 10,
      top: "8vh",
      left: "35vh",
      right: "35vh",
      bottom: "8vh",
      border: "3px solid black",
      borderRadius: "12px",
    },
  };

  return (
    <div>
      <Modal
        style={modalStyle}
        isOpen={isOpen}
        onRequestClose={() => closePopup()}
      >
        <div className={classes.searchPopupHeader}>
          <p className={classes.searchPopupTitle}>검색창</p>
        </div>
        <div className={classes.searchPopupBody}>
          <div className={classes.searchPopupDesc}>
            <input
              type="text"
              className={classes.searchPopupDescInput}
              placeholder="  닉네임을 입력해주세요"
              value={userName}
              onKeyDown={keyPressHandler}
              onChange={(e) => setUserName(e.target.value)} // 입력 값이 변경될 때마다 상태 업데이트
            />

            <button className={classes.searchButton} onClick={searchAxios}>
              <HiSearch />
            </button>
          </div>
          <div className={classes.searchHashTagForm}>
            {/* <div className={classes.searchHashTagFormTag}> */}
            <div>
              {randomHashList.map((tag, index) => (
                <SearchHashTag
                  key={index}
                  tagId={tag.tagId}
                  content={tag.content}
                  setUserList={setUserList}
                  Token={AccsesToken}
                />
              ))}
            </div>

            <button className={classes.HashTagRe} onClick={tagAxios}>
              <GrFormRefresh />
            </button>
          </div>
        </div>
        <div className={classes.searchPopupFormSection}>
          {userList.length !== 0 ? (
            <div className={classes.searchPopupForm}>
              <div style={{ paddingLeft: "3vh" }}>
                검색 결과 ({userList.length})
              </div>
              <div className={classes.searchPopupFormContent}>
                {userList.map((user, index) => (
                  <SearchContent
                    key={index}
                    memberId={user.memberId}
                    profileImg={user.profile}
                    nickname={user.nickname}
                    tagList={user.tagList}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className={classes.searchPopupFormNoContent}>
              <p>검색 결과가 없습니다.</p>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default SearchPopup;

// import Modal from "react-modal";
// import classes from "./SearchPopup.module.css";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import SearchContent from "./SearchContent";
// import SearchHashTag from "./SearchHashTag";
// // import classNames from "classnames";
// import { HiSearch } from "react-icons/hi";
// import { GrFormRefresh } from "react-icons/gr";
// import { useSelector } from "react-redux";

// // TODO: searchPopup test
// import SearchPopupPage from "../common/SearchPopupPagination/SearchPopupPage";

// function getRandomIndexes(totalLength, count) {
//   const indexes = [];
//   while (indexes.length < count) {
//     const randomIndex = Math.floor(Math.random() * totalLength);
//     if (!indexes.includes(randomIndex)) {
//       indexes.push(randomIndex);
//     }
//   }
//   return indexes;
// }

// function SearchPopup({ isOpen, setIsPopupOpen }) {
//   // const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 여부 상태 관리
//   const [userName, setUserName] = useState("");
//   const [userList, setUserList] = useState(undefined);
//   // const [hashList, setHashList] = useState([]);
//   const [randomHashList, setRandomHashList] = useState([]);
//   const AccsesToken = useSelector((state) => state.authToken.accessToken);

//   // TODO: API연동(pagination)
//   const [page, setPage] = useState(1);
//   const handlePageChange = (page) => {
//     setPage(page);
//   };

//   const [isClickSearchBtn, setIsClickSearchBtn] = useState(false);

//   //
//   useEffect(() => {
//     tagAxios();
//   }, []);

//   // const keyPressHandler = (e) => {
//   //   if (e.key === "Enter") {
//   //     searchAxios();
//   //   }
//   // };
//   const keyPressHandler = (e) => {
//     if (e.key === "Enter") {
//       setIsClickSearchBtn(true);
//     }
//   };

//   const closePopup = () => {
//     setUserName("");
//     setUserList([]);
//     setIsPopupOpen(false);
//   };

//   // const searchAxios = () => {
//   //   if (userName === "") {
//   //     alert("닉네임을 입력해주세요");
//   //     return;
//   //   }
//   //   axios({
//   //     url: `${process.env.REACT_APP_BASE_URL}/api/search`,
//   //     method: "get",
//   //     params: {
//   //       key: "닉네임",
//   //       word: userName,
//   //       page: 1,
//   //     },
//   //     headers: {
//   //       Authorization: AccsesToken,
//   //     },
//   //   })
//   //     .then((res) => {
//   //       // console.log(res);
//   //       const userListFromAPI = res.data.members; // API로부터 받아온 사용자 정보 리스트
//   //       setUserList(userListFromAPI);
//   //     })
//   //     .catch(console.log(userName));
//   // };

//   const tagAxios = async () => {
//     await axios({
//       url: `${process.env.REACT_APP_BASE_URL}/api/routine/tag`,
//       method: "get",
//     }).then((res2) => {
//       const allHashList = res2.data;
//       const randomIndexes = getRandomIndexes(allHashList.length, 8); // 8개의 무작위 인덱스를 얻음
//       const selectedHashList = randomIndexes.map((index) => allHashList[index]); // 무작위 아이템 선택
//       setRandomHashList(selectedHashList);
//     });
//     // .catch(console.log(res2));
//   };

//   // modal style
//   const modalStyle = {
//     overlay: {
//       position: "fixed",
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       backgroundColor: "rgba(0,0,0,0.6)",
//       zIndex: 10,
//     },
//     content: {
//       display: "flex",
//       flexDirection: "column",
//       backgroundColor: "rgba(255,255,255,0.95)",
//       overflow: "auto",
//       zIndex: 10,
//       top: "8vh",
//       left: "35vh",
//       right: "35vh",
//       bottom: "8vh",
//       border: "3px solid black",
//       borderRadius: "12px",
//     },
//   };

//   return (
//     <div>
//       <Modal
//         style={modalStyle}
//         isOpen={isOpen}
//         onRequestClose={() => closePopup()}
//       >
//         <div className={classes.searchPopupHeader}>
//           <p className={classes.searchPopupTitle}>검색창</p>
//         </div>
//         <div className={classes.searchPopupBody}>
//           <div className={classes.searchPopupDesc}>
//             <input
//               type="text"
//               className={classes.searchPopupDescInput}
//               placeholder="  닉네임을 입력해주세요"
//               value={userName}
//               onKeyDown={keyPressHandler}
//               onChange={(e) => setUserName(e.target.value)} // 입력 값이 변경될 때마다 상태 업데이트
//             />

//             <button
//               className={classes.searchButton}
//               onClick={() => {
//                 setIsClickSearchBtn(true);
//               }}
//             >
//               <HiSearch />
//             </button>
//           </div>
//           <div className={classes.searchHashTagForm}>
//             {/* <div className={classes.searchHashTagFormTag}> */}
//             <div>
//               {randomHashList.map((tag, index) => (
//                 <SearchHashTag
//                   key={index}
//                   tagId={tag.tagId}
//                   content={tag.content}
//                   setUserList={setUserList}
//                   Token={AccsesToken}
//                 />
//               ))}
//             </div>

//             <button className={classes.HashTagRe} onClick={tagAxios}>
//               <GrFormRefresh />
//             </button>

//             {/* </div> */}

//             {/* </div> */}
//           </div>
//         </div>
//         <div className={classes.searchPopupFormSection}>
//           <div className={classes.searchPopupForm}>
//             {/* TODO: SearchPopupPage 들어갈 곳 */}

//             {userList}
//             <SearchPopupPage
//               page={page}
//               setPage={setPage}
//               handlePageChange={handlePageChange}
//               userName={userName}
//               AccsesToken={AccsesToken}
//               isClickSearchBtn={isClickSearchBtn}
//               setIsClickSearchBtn={setIsClickSearchBtn}
//             />
//           </div>

//           {/* {userList.map((user, index) => (
//             <SearchContent
//               key={index}
//               memberId={user.memberId}
//               profileImg={user.profile}
//               nickname={user.nickname}
//               tagList={user.tagList}
//             />
//           ))} */}
//         </div>
//       </Modal>
//     </div>
//   );
// }

// export default SearchPopup;
