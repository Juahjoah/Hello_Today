// import Modal from "react-modal";
import classes from "./SearchPopup.module.css";
import { Link } from "react-router-dom";


const SearchContent = ({ profileImg, nickname, tagList,memberId }) => {

    const linkStyle = {
        textDecoration: "none", // 밑줄 없애기
        color: "inherit", // 부모 요소의 글자색 사용
      };
    
    return (
        <Link to={`/MyProfile/${memberId}`}  style={linkStyle}>
      <div className={classes.searchPopupFind}>
        <div className={classes.searchLeft}>
          <img className={classes.profileImg} src={profileImg} alt="" />
          <div className={classes.searchLeftItem}>
            <p className={classes.searchLeftNickname}>{nickname}</p>
            <div className={classes.HashTagItem}>
            {tagList.map((tag, index) => (
                <p key={index} className={classes.searchLeftHashTag}>
                  #{tag.content}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      </Link>
    );
  };
  
  export default SearchContent;