import React from "react";
import { useParams } from "react-router-dom";

import useFetch from "../../hooks/useFetch";
import DetailsBanner from "../../components/header/detailsBanner/DetailsBanner";
import Cast from "../../components/videoPopup/cast/Cast";
import VideosSection from "../../components/videosSection/VideosSection";
import Similar from "../../components/carouselSections/similar/Similar";
import Recommendation from "../../components/carouselSections/recommendation/Recommendation";

const Details = () => {
  const params = useParams();
  const { data: videos, loading: videosLoading } = useFetch(
    `/${params.mediaType}/${params.id}/videos`
  );

  console.log(videos);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${params.mediaType}/${params.id}/credits`
  );
  // console.log(credits);
  return (
    <div>
      <DetailsBanner video={videos?.results?.[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading} />
      <VideosSection data={videos} loading={videosLoading} />
      <Similar mediaType={params.mediaType} id={params.id} />
      <Recommendation mediaType={params.mediaType} id={params.id} />
    </div>
  );
};

export default Details;
