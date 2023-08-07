import classes from "./UserVideoComponent.module.css";
import OpenViduVideoComponent from "./OvVideo";
import axios from "axios";

function VideoComponent(props) {
  const API_URL = "http://localhost:8080";

  const memberId = parseInt(
    JSON.parse(props.streamManager.stream.connection.data).clientData.memberId
  );
  const nickName = JSON.parse(props.streamManager.stream.connection.data)
    .clientData.nickName;

  const accessToken = props.accessToken;

  // const tempData = props.streamManager.stream.connection.data;
  // console.log(tempData, typeof tempData, "tempdata.....................");
  // console.log(
  //   JSON.parse(props.streamManager.stream.connection.data).clientData,
  //   "tempdatavalue-------------------------"
  // );
  // console.log(
  //   typeof parseInt(
  //     JSON.parse(props.streamManager.stream.connection.data).clientData.memberId
  //   ),
  //   "tempdatavalue-------------------------"
  // );

  const follow = () => {
    const requestData = {
      followingId: memberId,
    };

    axios({
      url: `${API_URL}/api/follow`,
      method: "post",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      data: JSON.stringify(requestData),
    })
      .then((res) => console.log(res.data))
      .then(console.log("팔로우 성공!!!!!!!!"))
      .catch((err) => console.log(err));
  };

  return (
    <>
      {props.streamManager !== undefined ? (
        <div className={classes.streamcomponent}>
          <OpenViduVideoComponent streamManager={props.streamManager} />
          <div className={classes.streamcomponentBottom}>
            <div>{nickName}</div>
            {props.isMe ? null : <button onClick={follow}>Follow</button>}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default VideoComponent;
