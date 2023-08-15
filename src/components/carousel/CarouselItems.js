import React, { forwardRef } from "react";
import { useSelector } from "react-redux";

import "./CarouselItems.scss";
import CarouselItem from "./CarouselItem";
import PosterFallback from "../../assets/no-poster.png";

const CarouselItems = forwardRef((props, ref) => {
  const { url } = useSelector((state) => state.home);

  // console.log(genres);
  //   console.log(props.data);
  const items = props.data?.map((item) => {
    const posterUrl = item.poster_path
      ? url?.poster + item.poster_path
      : PosterFallback;
    return (
      <CarouselItem
        key={item.id}
        id={item.id}
        title={item.title}
        name={item.name}
        posterUrl={posterUrl}
        release_date={item.release_date}
        rating={item.vote_average}
        genre_ids={item.genre_ids}
        mediaType={item.media_type || props.mediaType}
      />
    );
  });

  return (
    <div className="carouselItems" ref={ref}>
      {items}
    </div>
  );
});
export default CarouselItems;
