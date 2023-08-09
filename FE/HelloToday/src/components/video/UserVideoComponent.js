import classes from "./UserVideoComponent.module.css";
import OpenViduVideoComponent from "./OvVideo";
import axios from "axios";
import { FaUserPlus, FaUserCheck } from "react-icons/fa";
import classNames from "classnames";
import { useEffect, useState } from "react";

function VideoComponent(props) {
  const API_URL = "http://localhost:8080";
  // const API_URL = "https://i9b308.p.ssafy.io";

  const memberId = parseInt(
    JSON.parse(props.streamManager.stream.connection.data).clientData.memberId
  );
  const nickName = JSON.parse(props.streamManager.stream.connection.data)
    .clientData.nickName;

  const accessToken = props.accessToken;

  // const [clickFollow, setClickFollow] = useState(false);
  const [isFollow, setIsFollow] = useState(undefined);
  console.log(isFollow, "===========================");

  const followStyle = classNames({
    [classes.followBtn]: !isFollow,
    [classes.unfollowBtn]: isFollow,
  });

  useEffect(() => {
    async function followCheckAxios() {
      try {
        const response = await axios.get(`${API_URL}/api/follow`, {
          params: { memberId: memberId },
          headers: { Authorization: accessToken },
        });
        console.log(response.data.data);
        setIsFollow(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    if (!props.isMe) {
      followCheckAxios();
    }
  }, []);

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
      .then(setIsFollow(true))
      .catch((err) => console.log(err));
  };

  const unFollow = async () => {
    try {
      const response = await axios.delete(`${API_URL}/api/follow`, {
        params: { target: memberId },
        headers: { Authorization: accessToken },
      });
      console.log(response);
      setIsFollow(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {props.streamManager !== undefined ? (
        <div className={classes.streamcomponent}>
          <OpenViduVideoComponent streamManager={props.streamManager} />
          <div className={classes.streamcomponentBottom}>
            <div>{nickName}</div>
            {props.isMe ? null : isFollow ? (
              <button onClick={unFollow} className={followStyle}>
                <FaUserCheck />
              </button>
            ) : (
              <button onClick={follow} className={followStyle}>
                <FaUserPlus />
              </button>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default VideoComponent;
