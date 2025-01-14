import React, { useState, useRef, useEffect } from "react";
import img from "../assets/cinema.jpg";
import Card from "../components/Card";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import "../index.css";
import useMovies from "../hooks/useMovies";

const Home = () => {
  const { movieList, upcomingMovie, loading } = useMovies();
  const [searchMovie, setSearchMovie] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    setFilteredMovies(movieList);
  }, [movieList]); 

  const handlerSearch = () => {
    if (searchMovie.trim() === "") {
      setFilteredMovies(movieList);
    } else {
      const results = movieList.filter((movie) =>
        movie.title.toLowerCase().includes(searchMovie.toLowerCase())
      );
      setFilteredMovies(results);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -400,
        behavior: "smooth",
      });
      setScrollPosition((prev) => prev - 1);
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 400,
        behavior: "smooth",
      });
      setScrollPosition((prev) => prev + 1);
    }
  };

  const isLeftDisabled = scrollPosition === 0;
  const isRightDisabled = scrollPosition >= upcomingMovie.length - 1;

  return (
    <div className="w-full h-full">
      <div className="relative ">
        <img src={img} className="w-full h-96 object-cover " />
        <div className="flex md:flex-row flex-col items-center justify-center w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-3 p-3">
          <input
            type="text"
            value={searchMovie}
            onChange={(e) => setSearchMovie(e.target.value)}
            placeholder="Search Movie"
            className="px-5 md:w-4/12 w-full py-2 outline-none border-2 focus:border-[#30A586] focus:ring-3"
          />
          <button
            onClick={handlerSearch}
            className="text-white lg:w-1/12 md:w-2/12 w-full px-5 py-2 text-lg tracking-wide bg-[#30A586] shadow-inner shadow-[#8adac5]"
          >
            Search
          </button>
        </div>
      </div>
      <div className="w-full h-full place-items-center place-content-center my-10 space-y-8">
        <div className="h-full w-3/4">
          <div className="relative inline-block bg-[#30A586] text-white font-semibold px-9 py-3 md:my-14 my-8 text-xl">
            <span>Movies Playing Now</span>
            <div className="absolute top-0 right-0 h-full -mr-4 w-4 bg-[#30A586] clip-right-arrow"></div>
          </div>
          {loading ? (
            <div className="min-h-screen w-full p-5 text-white text-lg tracking-wider font-semibold place-content-center place-items-center">
              <p>Loading movies...</p>
            </div>
          ) : (
            <div className="w-full grid 2xl:grid-cols-4 xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-5">
              {filteredMovies.length > 0 ? (
                filteredMovies.map((movie, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 h-96 transition-all duration-300 ease-in-out md:hover:scale-125 hover:scale-110 hover:z-50"
                  >
                    <Card key={movie.id} movie={movie} />
                  </div>
                ))
              ) : (
                <div className="p-5 text-white text-lg tracking-wider font-semibold place-content-center place-items-center">
                  <span>NOT FOUND</span>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="w-3/4 h-full relative">
          <div className="relative inline-block bg-[#30A586] text-white font-semibold px-9 py-3 my-5 text-xl">
            <span>Upcoming Movies</span>
            <div className="absolute top-0 right-0 h-full -mr-4 w-4 bg-[#30A586]  clip-right-arrow"></div>
          </div>
          <button
            onClick={scrollLeft}
            disabled={isLeftDisabled}
            className={`absolute left-0 top-1/2 transform translate-y-1/2 -translate-x-1/2 bg-[#30A586] text-white p-2 rounded-full z-50 ${
              isLeftDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <FaArrowLeft />
          </button>
          <div className="relative bg-full">
            <div
              ref={scrollContainerRef}
              className="w-full flex gap-5 overflow-x-auto custom-scrollbar"
            >
              {upcomingMovie.map((movie) => (
                <div
                  className="flex-shrink-0 w-full sm:w-2/5 md:w-4/12 lg:w-2/5 xl:w-1/5 h-96 shadow-inner shadow-gray-600 bg-gray-300"
                  key={movie.id}
                >
                  <Card movie={movie} />
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={scrollRight}
            disabled={isRightDisabled}
            className={`absolute right-0 top-1/2 transform translate-y-1/2 translate-x-1/2 bg-[#30A586] text-white p-2 rounded-full z-50 ${
              isRightDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
