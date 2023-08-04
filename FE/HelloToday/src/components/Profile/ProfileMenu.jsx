import classes from "./ProfileMenu.module.css";

function ProfileMenu() {
  return (
    <div className={classes.ProfileMenu}>
      <h1>ProfileMenu</h1>
      <p>ProfileMain</p>
      <p>WidgetGroupRoutine</p> {/* 그룹 루틴 참여 기록*/}
      <p>WidgetComments</p>
      <p>WidgetBucket</p>
      <p>WidgetGoals</p> {/* 일/월/연 목표 */}
      <p>WidgetDiary</p> {/* 한 줄 일기 */}
      <p>WidgetHistory</p> {/* 루틴 히스토리 */}
      <p>WidgetGallery</p> {/* 갤러리 */}
      <p>WidgetDday</p> {/* 디데이 */}
    </div>
  );
}

export default ProfileMenu;
