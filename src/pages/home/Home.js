import React from "react";

import "./Home.scss";
import HeroBanner from "./heroBanner/HeroBanner";
import Trending from "../../components/carouselSections/trending/Trending";
import Popular from "../../components/carouselSections/popular/Popular";
import TopRated from "../../components/carouselSections/topRated/TopRated";

const HomePage = () => {
  return (
    <>
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
    </>
  );
};

export default HomePage;
