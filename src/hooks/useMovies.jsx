import { useState, useEffect } from "react";
import axios from "axios";
import {TMDB_API_KEY} from "../utils/apiKey.js"

const useMovies = () => {
  const [movieList, setMovieList] = useState([]);
  const [upcomingMovie, setUpcomingMovie] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseURL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}&region=IN`;
  const upcomingURL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${TMDB_API_KEY}&region=IN&release_date.gte=2025-01-05`;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const fetchData = await axios.get(baseURL);
        setMovieList(fetchData.data.results);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchUpcomingMovies = async () => {
      try {
        const upcomingMovieData = await axios.get(upcomingURL);
        setUpcomingMovie(upcomingMovieData.data.results);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMovies();
    fetchUpcomingMovies();
  }, []);

  return { movieList, upcomingMovie, loading };
};

export default useMovies;
