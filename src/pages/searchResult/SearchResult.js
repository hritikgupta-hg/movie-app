import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import "./SearchResult.scss";

import fetchDataFromApi from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard.js";
import Spinner from "../../components/spinner/Spinner";
import noResults from "../../assets/no-results.png";
import { useParams } from "react-router-dom";
import Img from "../../components/lazyLoadImage/Img";

const SearchResult = () => {
  const { query } = useParams();
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);

  // console.log(pageNum);
  // console.log(data);
  // console.log(loading);

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi`, { query: query }).then((res) => {
      // console.log(res);
      setData(res);
      setPageNum((prev) => prev + 1);
      setLoading(false);
    });
  };

  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi`, { page: pageNum, query: query }).then(
      (res) => {
        setData((data) => {
          if (data?.results) {
            return { ...res, results: [...data.results, ...res.results] };
          } else {
            return res;
          }
        });

        setPageNum((prev) => prev + 1);
      }
    );
  };

  useEffect(() => {
    // console.log("hi");
    setPageNum(1);
    fetchInitialData();
  }, [query]);

  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true} />}
      {!loading && data && (
        <ContentWrapper>
          {data.results.length > 0 ? (
            <>
              {" "}
              <div className="pageTitle">
                {`Search ${
                  data.total_results > 1 ? "results" : "result"
                } of '${query}'`}
              </div>
              <InfiniteScroll
                className="content"
                dataLength={data.results.length}
                next={fetchNextPageData}
                hasMore={pageNum <= data.total_pages}
                loader={<Spinner />}
              >
                {data.results.map((item, index) => {
                  if (item.media_type === "person") return;
                  return (
                    <MovieCard key={index} data={item} fromSearch={true} />
                  );
                })}
              </InfiniteScroll>
            </>
          ) : (
            <span className="resultNotFound">Not Found</span>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResult;
