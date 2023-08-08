// import Modal from "react-modal";
import classes from "./SearchPopup.module.css";

const SearchHashTag = ({ content }) => {
    
    return (
      <button className={classes.searchHashTagContent}>

      <p className={classes.searchHashTagInfo}># {content}</p>
    </button>
    );
  };
  
  export default SearchHashTag;