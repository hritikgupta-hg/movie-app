import React, { useState } from "react";
import useFetch from "../../../hooks/useFetch";

import "../../carouselSections/CarouselSection.scss";
import ContentWrapper from "../../contentWrapper/ContentWrapper";
import SwitchTabs from "../../switchTabs/SwitchTabs";
import Carousel from "../../carousel/Carousel";

const TopRated = () => {
  const [endPoint, setEndPoint] = useState("movie");

  const { data, loading } = useFetch(`/${endPoint}/top_rated`);
  //console.log(data);

  const onTabChangeHandler = (tab) => {
    setEndPoint(tab === "Movies" ? "movie" : "tv");
  };

  // console.log(data);
  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Top Rated</span>
        <SwitchTabs
          tabs={["Movies", "TV shows"]}
          onTabChange={onTabChangeHandler}
        />
      </ContentWrapper>
      {(loading || data) && (
        <Carousel data={data?.results} loading={loading} mediaType={endPoint} />
      )}
    </div>
  );
};

export default TopRated;
