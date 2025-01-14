import React from "react";
import Card from "./Card";


const MovieList = ({ movieList }) => {
  return (
    <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
      {movieList.length > 0 &&
        movieList.map((movie, i) => (
          <Card key={movie.id} movie={movie} />
        ))}
    </div>
  );
};

export default MovieList;
