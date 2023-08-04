// import style from './UserVideoComponent.module.css'
import OpenViduVideoComponent from "./OvVideo";

function VideoComponent(props) {
  const userName = JSON.parse(
    props.streamManager.stream.connection.data
  ).clientData;

  return (
    <>
      {props.streamManager !== undefined ? (
        <div className="streamcomponent">
          <div>
            <p>{userName}</p>
          </div>
          <OpenViduVideoComponent streamManager={props.streamManager} />
        </div>
      ) : null}
    </>
  );
}

export default VideoComponent;
