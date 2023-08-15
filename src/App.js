import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";

import HomePage from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";
import RootLayout from "./pages/rootLayout/Root";
import { homeActions } from "./store/homeSlice";
import fetchDataFromApi from "./utils/api";
import Error from "./components/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: ":mediaType/:id",
        element: <Details />,
      },
      {
        path: "search/:query",
        element: <SearchResult />,
      },
      {
        path: "explore/:mediaType",
        element: <Explore />,
      },
    ],
  },
]);

function App() {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const fetchApiConfig = async () => {
    const responseData = await fetchDataFromApi("/configuration", setError);
    // if (!response.ok) {
    //   console.log(response.ok);
    //   setError(response.message);
    //   return;
    // }

    const url = {
      backdrop: responseData?.images?.secure_base_url + "original",
      poster: responseData?.images?.secure_base_url + "original",
      profile: responseData?.images?.secure_base_url + "original",
    };

    dispatch(homeActions.getApiConfiguration(url));
  };

  const genresCall = async () => {
    let promises = [];
    let endpoints = ["tv", "movie"];
    let allGenres = {};

    endpoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`, setError));
    });

    const responsesData = await Promise.all(promises);

    // console.log(responses);
    // console.log(responsesData);

    responsesData?.forEach((resData) => {
      resData?.genres?.forEach((genre) => (allGenres[genre.id] = genre));
    });

    dispatch(homeActions.getGenres(allGenres));
  };

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);

  return (
    <>
      {error && <Error message={error} />}
      {!error && <RouterProvider router={router} />}
    </>
  );
}

export default App;
