import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./DetailsBanner.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import Img from "../../../components/lazyLoadImage/Img";
import PosterFallback from "../../../assets/no-poster.png";
import { PlayIcon } from "../../playButton/PlayIcon";
import VideoPopup from "../../videoPopup/VideoPopup";

const DetailsBanner = ({ video, crew }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const directors = crew?.filter((member) => member.job === "Director");
  const writers = crew?.filter(
    (member) =>
      member.job === "Writer" ||
      member.job === "Screenplay" ||
      member.job === "story"
  );

  const { url } = useSelector((state) => state.home);

  const params = useParams();
  const { data, loading } = useFetch(`/${params.mediaType}/${params.id}`);

  const _genres = data?.genres.map((genre) => genre.id);
  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  return (
    <div className="detailsBanner">
      {!loading && data ? (
        <>
          <div className="backdrop-img">
            <Img src={url.backdrop + data?.backdrop_path} />
          </div>
          <div className="opacity-layer" />
          <ContentWrapper>
            <div className="content">
              <div className="left">
                {data.poster_path ? (
                  <Img
                    className="posterImg"
                    src={url.backdrop + data.poster_path}
                  />
                ) : (
                  <Img className="posterImg" src={PosterFallback} />
                )}
              </div>
              <div className="right">
                <div className="title">
                  {`${data.name || data.title} ${dayjs(
                    data.release_date
                  ).format("YYYY")} `}
                </div>

                <div className="subtitle">{data.tagline}</div>
                <Genres genre_ids={_genres} />
                <div className="row">
                  <CircleRating rating={data.vote_average.toFixed(1)} />
                  <div
                    className="playbtn"
                    onClick={() => {
                      setShow(true);
                      setVideoId(video.key);
                    }}
                  >
                    <PlayIcon />
                    <span className="text">Watch Trailer</span>
                  </div>
                </div>

                <div className="overview">
                  <div className="heading">Overview</div>
                  <div className="description">{data.overview}</div>
                </div>

                <div className="info">
                  {data.status && (
                    <div className="infoItem">
                      <span className="text bold">{`Status: `} </span>
                      <span className="text">{data.status}</span>
                    </div>
                  )}
                  {data.release_date && (
                    <div className="infoItem">
                      <span className="text bold">{`Release Date: `} </span>
                      <span className="text">
                        {dayjs(data.release_date).format("MMMM D, YYYY")}
                      </span>
                    </div>
                  )}
                  {data.runtime && (
                    <div className="infoItem">
                      <span className="text bold">{`Runtime `} </span>
                      <span className="text">
                        {toHoursAndMinutes(data.runtime)}
                      </span>
                    </div>
                  )}
                </div>

                {directors?.length > 0 && (
                  <div className="info">
                    <span className="text bold">{`Director: `} </span>
                    <span>
                      {directors?.map((director, index) => {
                        return (
                          <span className="text" key={index}>
                            {director.name}
                            {directors.length - 1 !== index && ", "}
                          </span>
                        );
                      })}
                    </span>
                  </div>
                )}
                {writers?.length > 0 && (
                  <div className="info">
                    <span className="text bold">{`Writer: `} </span>
                    <span>
                      {writers?.map((writer, index) => {
                        return (
                          <span className="text" key={index}>
                            {writer.name}
                            {writers.length - 1 !== index && ", "}
                          </span>
                        );
                      })}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <VideoPopup
              show={show}
              setShow={setShow}
              videoId={videoId}
              setVideoId={setVideoId}
            />
          </ContentWrapper>
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
