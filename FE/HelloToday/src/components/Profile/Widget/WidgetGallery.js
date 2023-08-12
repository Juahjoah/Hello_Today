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

  useEffect(() => {
    getGallery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberId, AccsesToken]);

  return (
    <div className="WidgetGallery">
      <p> 소중한 루틴 추억 ^_^</p>
      <div>
        {gallery.length === 0 && <p>등록된 사진이 없습니다.</p>}
        {gallery.length > 0 &&
          gallery.map((galleryItem) => (
            <div key={galleryItem.imgPath}>
              <img src={galleryItem.imgPath} alt="userGallery.Item" />
            </div>
          ))}
      </div>
    </div>
  );
}

export default WidgetGallery;
