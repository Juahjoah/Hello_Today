import classess from "./WidgetDday.module.css";
import { useState, useRef, useCallback } from "react";

function WidgetDday() {
  return (
    <div className={classess.WidgetDday}>
      <div className={classess.WidgetDday_name}>D-Day</div>
      <div className={classess.WidgetDday_content}>
        <div className={classess.WidgetDday_text}>
          {/* 내 생일 d-30  */}
          sdfdsfsdfsdf
        </div>
        <div className={classess.WidgetDday_edit}>
          {/* 수정 */}
          <p className={classess.WidgetDday_txt}>날짜</p>
          <input type="date" placeholder="날짜를 선택해주세요." />
          <p className={classess.WidgetDday_txt}>이벤트 입력</p>
        </div>
      </div>
    </div>
  );
}

export default WidgetDday;
