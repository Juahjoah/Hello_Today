import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

function WidgetGallery() {
  const AccsesToken = useSelector((state) => state.authToken.accessToken);
  const memberId = useParams().memberId;

  const [gallery, setGallery] = useState([]);

  const getGallery = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/mypage/gallery/${memberId}`, {
        headers: { Authorization: AccsesToken },
      })
      .then((response) => {
        console.log(response.data);
        setGallery(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {});

  return (
    <div className="WidgetGallery">
      <p> 소중한 루틴 추억 ^_^</p>
    </div>
  );
}

export default WidgetGallery;
