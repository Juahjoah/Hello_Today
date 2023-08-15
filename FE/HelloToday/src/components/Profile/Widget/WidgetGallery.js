import classes from "./WidgetGallery.module.css";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import axios from "axios";

function WidgetGallery() {
  const AccsesToken = useSelector((state) => state.authToken.accessToken);
  const memberId = useParams().memberId;

  const [gallery, setGallery] = useState([]);

  const [nowPage, setNowPage] = useState(1);
  const itemsIncludePage = 3;

  const getGallery = (memberId) => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/mypage/gallery/${memberId}`, {
        headers: { Authorization: AccsesToken },
      })
      .then((response) => {
        // console.log(response.data);
        setGallery(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getGallery(memberId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberId, AccsesToken]);

  const indexOfLastItem = nowPage * itemsIncludePage;
  const indexOfFirstItem = indexOfLastItem - itemsIncludePage;
  const nowPicItem = gallery.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setNowPage(pageNumber);
  };

  return (
    <div className={classes.WidgetGallery}>
      <span className={classes.WidgetDday_name}>갤러리</span>
      <div className={classes.WidgetContent}>
        {nowPicItem.length === 0 && (
          <div className={classes.WidgetContentTxt}>
            <p>루틴 인증 사진을 남기면 갤러리가 풍부해져요🥰</p>
          </div>
        )}
        {nowPicItem.length > 0 &&
          nowPicItem.map((galleryItem) => (
            <div className={classes.galleryIgmItem} key={galleryItem.imgPath}>
              <img
                className={classes.galleryIgm}
                src={galleryItem.imgPath}
                alt="userGallery.Item"
              />
            </div>
          ))}

        {gallery.length > itemsIncludePage && (
          <div>
            <button
              onClick={() => paginate(nowPage - 1)}
              disabled={nowPage === 1}
            >
              이전
            </button>
            <button
              onClick={() => paginate(nowPage + 1)}
              disabled={
                nowPicItem.length < itemsIncludePage || nowPicItem.length === 0
              }
            >
              다음
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default WidgetGallery;
