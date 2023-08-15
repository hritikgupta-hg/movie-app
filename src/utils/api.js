import Error from "../components/Error";
const BASE_URL = "https://api.themoviedb.org/3";

const TMDB_TOKEN = process.env.REACT_APP_TMDB_TOKEN;

const headers = { Authorization: "bearer " + TMDB_TOKEN };

const fetchDataFromApi = async (url, params) => {
  url += "?" + new URLSearchParams(params).toString();
  console.log(url);
  try {
    const response = await fetch(BASE_URL + url, {
      headers,
    });

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.log(error.message + " ram ram");
    const obj = { message: error.message, ok: false };
    return obj;
  }
};

export default fetchDataFromApi;
