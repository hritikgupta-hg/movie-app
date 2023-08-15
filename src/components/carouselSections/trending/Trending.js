import React, { useState } from "react";
import useFetch from "../../../hooks/useFetch";

import "../../carouselSections/CarouselSection.scss";
import ContentWrapper from "../../contentWrapper/ContentWrapper";
import SwitchTabs from "../../switchTabs/SwitchTabs";
import Carousel from "../../carousel/Carousel";

const Trending = () => {
  const [endPoint, setEndPoint] = useState("day");

  const { data, loading } = useFetch(`/trending/all/${endPoint}`);
  //console.log(data);

  const onTabChangeHandler = (tab) => {
    setEndPoint(tab === "Day" ? "day" : "week");
  };

  // console.log(data);
  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Trending</span>
        <SwitchTabs tabs={["Day", "Week"]} onTabChange={onTabChangeHandler} />
      </ContentWrapper>
      {(loading || data) && <Carousel data={data?.results} loading={loading} />}
    </div>
  );
};

export default Trending;
