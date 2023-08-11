import React from "react";
import HashLoader from "react-spinners/HashLoader";
import classes from "./PageSpinner.module.css";

function PageSpinner() {
  return (
    <div className={classes.spinner_container}>
      <div className={classes.spinner_innercontainer}>
        <HashLoader color="#ffffff" size={300} />
        <p className={classes.spinner_txt}>잠시만 기다려 주세요</p>
      </div>
    </div>
  );
}

export default PageSpinner;
