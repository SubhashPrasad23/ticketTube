import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Card = ({ movie }) => {
  const [isHover, setIsHover] = useState(false);
  const imageUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

  return (
    <div
      className="relative  overflow-hidden cursor-pointer h-full  w-full" 
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <img
        src={imageUrl}
        alt={movie.title}
        className={`w-full h-full   ${isHover && ""}`}
      />

      <div
        className={`w-full flex items-center justify-center  z-30 absolute bottom-0 transition-all duration-300 ${
          isHover ? "h-full bg-black/20 block" : "h-0 overflow-hidden"
        }`}
      >
        <div className=" place-content-center place-items-center ">
          <p className="text-center text-white font-semibold py-1.5">
            {movie.title}
          </p>
          <NavLink to={`/movie/MovieDetails/${movie.id}`}>
            <button className="bg-[#30A586] shadow-inner shadow-[#96e6d0]  px-3 py-1.5 text-white text-sm">
              View more
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Card;
