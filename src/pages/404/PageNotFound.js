import React from "react";

import "./PageNotFound.scss";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const pageNotFound = () => {
  return (
    <>
      <Header />
      <div className="pageNotFound">
        <div>Page not found !</div>
      </div>
      <Footer />
    </>
  );
};

export default pageNotFound;
