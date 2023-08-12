import React from "react";
import HashLoader from "react-spinners/HashLoader";
import classes from "./Spinners.module.css";

function Spinner() {
  return (
    <div className={classes.spinner_container}>
      <div className={classes.spinner_location}>
        <HashLoader color="#ffffff" size={300} />
      </div>
      <div>
        <p className={classes.spinner_txt}>잠시만 기다려 주세요</p>
      </div>
    </div>
  );
}

export default Spinner;
