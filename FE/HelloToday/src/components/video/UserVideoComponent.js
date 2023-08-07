import classes from "./UserVideoComponent.module.css";
import OpenViduVideoComponent from "./OvVideo";

function VideoComponent(props) {
  const nickName = localStorage.getItem("nickName");
  const memberId = localStorage.getItem("memberId");

  return (
    <>
      {props.streamManager !== undefined ? (
        <div className={classes.streamcomponent}>
          <OpenViduVideoComponent streamManager={props.streamManager} />
          <div>
            {nickName}, {memberId}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default VideoComponent;
