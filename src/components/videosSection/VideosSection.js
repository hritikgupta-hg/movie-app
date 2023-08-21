import React, { useState } from "react";

import "./VideosSection.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import { PlayIcon } from "../playButton/PlayIcon";
import VideoPopup from "../videoPopup/VideoPopup";
import Img from "../lazyLoadImage/Img";

const VideosSection = ({ data, loading }) => {
  console.log(data);
  console.log(loading);
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const loadingSkeleton = () => {
    return (
      <div className="skItem">
        <div className="thumb skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };

  if (data?.results?.length > 0)
    return (
      <div className="videosSection">
        <ContentWrapper>
          <div className="sectionHeading">"Official Videos"</div>
          {!loading && data ? (
            <div className="videos">
              {data?.results?.map((video) => {
                return (
                  <div
                    key={video.id}
                    className="videoItem"
                    onClick={() => {
                      setVideoId(video.key);
                      setShow(true);
                    }}
                  >
                    <div className="videoThumbnail">
                      <Img
                        src={`https://img.youtube.com/vi/${video?.key}/mqdefault.jpg`}
                      />
                      <PlayIcon />
                    </div>
                    <div className="videoTitle">{video?.name}</div>
                  </div>
                );
              })}{" "}
            </div>
          ) : (
            <div className="videoSkeleton">
              {loadingSkeleton()}
              {loadingSkeleton()}
              {loadingSkeleton()}
              {loadingSkeleton()}
            </div>
          )}
        </ContentWrapper>
        <VideoPopup
          show={show}
          setShow={setShow}
          videoId={videoId}
          setVideoId={setVideoId}
        />
      </div>
    );
};

export default VideosSection;
