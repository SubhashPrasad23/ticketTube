const MovieOverview = ({ details, setIsModal, isUpcoming }) => {
  const convertRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} hour${hours !== 1 ? "s" : ""} ${remainingMinutes} minute${
      remainingMinutes !== 1 ? "s" : ""
    }`;
  };
  const releaseDate = (date) => {
    const releaseDt = new Date(date);
    return releaseDt.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="h-full w-full  flex lg:flex-row flex-col md:gap-5  items-center justify-center">
      <div className="xl:w-72 md:w-80 w-full h-full rounded-lg  shadow-md shadow-white">
        <img
          src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`}
          className="w-full h-full flex-shrink-0 rounded-lg"
          alt={details.original_title}
        />
      </div>
      <div className="lg:w-4/5 w-full space-y-5">
        <div className="text-gray-400">
          <h6 className="font-bold md:text-3xl text-2xl tracking-wide my-4 text-[#30A586]">
            {details.original_title}
          </h6>
          <div className="pb-1">
            <strong className="md:text-xl text-lg font-semibold text-white">
              About the movie
            </strong>
            <p className="xl:text-lg text-md">{details.overview}</p>
          </div>
          <div>
            {details.genres && details.genres.length > 0 ? (
              <span className="font-semibold md:text-lg text-md">
                {details.genres.map((genre) => genre.name).join(", ")}
              </span>
            ) : (
              <p>No genres found</p>
            )}
          </div>
          <p>{convertRuntime(details.runtime)}</p>
          <p>{`${details.vote_average?.toFixed(1)}/10`}</p>
          <p>{releaseDate(details.release_date)}</p>
        </div>
        {!isUpcoming && (
          <button
            className="xl:w-1/5 lg:w-2/4 w-full px-7 py-2 text-white bg-[#30A586] shadow-inner shadow-[#96e6d0]"
            onClick={() => setIsModal(true)}
          >
            Get Ticket
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieOverview;
