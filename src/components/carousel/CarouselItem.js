import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

import "./CarouselItem.scss";
import Img from "../../components/lazyLoadImage/Img";
import CircleRating from "../../components/circleRating/CircleRating";
import Genres from "../../components/genres/Genres";

const CarouselItem = (props) => {
  const navigate = useNavigate();
  const openDetailsHandler = () => {
    navigate(`/${props.mediaType}/${props.id}`);
  };

  return (
    <div className="carouselItem" onClick={openDetailsHandler}>
      <div className="posterBlock">
        <Img src={props.posterUrl} />
        <CircleRating rating={props.rating.toFixed(1)} />
        <Genres genre_ids={props.genre_ids.slice(0, 2)} />
      </div>
      <div className="textBlock">
        <div className="name">{props.title || props.name}</div>
        <span className="date">
          {dayjs(props.release_Date).format("MMM D, YYYY")}
        </span>
      </div>
    </div>
  );
};

export default CarouselItem;
