// import Modal from "react-modal";
import classes from "./SearchPopup.module.css";
import axios from 'axios'

const SearchHashTag = ({ content,tagId,setUserList }) => {
  const API_URL = "http://localhost:8080";
  const tagSearchAxios = async () => {
    await axios({
      url: `${API_URL}/api/search`,
      method: "get",
      params: {
        key: "태그",
        word:tagId
      },
    }).then((res) => {
      console.log(res);
      const userListFromAPI = res.data; // API로부터 받아온 사용자 정보 리스트
      setUserList(userListFromAPI); 

    })
    // .catch(console.log(userName));
};

return (
  <button className={classes.searchHashTagContent} onClick={tagSearchAxios}>

  <p className={classes.searchHashTagInfo}># {content}</p>
</button>
);

  }

    
  
  export default SearchHashTag;