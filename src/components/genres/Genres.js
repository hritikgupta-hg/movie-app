import React from "react";
import { UseSelector, useSelector } from "react-redux";

import "./Genres.scss";

const Genres = (props) => {
  const allGenres = useSelector((state) => state.home.genres);

  return (
    <div className="genres">
      {props.genre_ids?.map((id) => {
        return allGenres[id]?.name ? (
          <div key={id} className="genre">
            {allGenres[id]?.name}
          </div>
        ) : (
          ""
        );
      })}
    </div>
  );
};

export default Genres;
