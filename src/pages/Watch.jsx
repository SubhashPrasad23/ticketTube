import axios from "axios";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";


const Watch = () => {
  const [search, setSearch] = useState("");
  const [videos, setVideos] = useState([]);
  const [watchLaterVideos, setWatchLaterVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const apiKey = import.meta.env.VITE_YT_API_KEY;


  const handleSearch = async (e) => {
    e.preventDefault();
    if (search.trim() === "") {
      return;
    }

    setIsLoading(true);
    setHasSearched(true);
    try {
      const res = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${search}&type=video&key=${apiKey}&maxResults=10`
      );
      setVideos(res.data.items);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const handlerWatchLater = (video) => {
    setWatchLaterVideos((prev) => [...prev, video]);
  };

  const handleRemove = (id) => {
    const filter = watchLaterVideos.filter((video) => video.id.videoId !== id);
    setWatchLaterVideos(filter);
  };

  return (
    <div className="w-full py-3 px-5 min-h-screen">
      <div className="flex md:flex-row flex-col h-full w-full gap-5">
        <div className="md:w-3/4 w-full h-fit flex-grow ">
          <div className="w-full mb-5 ">
            <form
              onSubmit={handleSearch}
              className="flex items-center gap-3 w-full"
            >
              <input
                type="text"
                placeholder="Search for videos..."
                className="w-3/4 px-5 py-2 outline-none border-2 focus:border-[#30A586] focus:ring-3"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                type="submit"
                className="text-white px-7 py-2 text-lg tracking-wide bg-[#30A586] shadow-inner shadow-[#96e6d0] rounded-lg"
              >
                Search
              </button>
            </form>
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#30A586]"></div>
            </div>
          ) : (
            <div>
              {hasSearched && videos.length === 0 && (
                <div className="text-center text-gray-500 mt-5">
                  No videos found.
                </div>
              )}

              {videos.length > 0 && (
                <div className="space-y-5">
                  {videos.map((video) => (
                    <div
                      key={video.id.videoId}
                      className="flex gap-5 p-3 border-b border-gray-300 hover:shadow-2xl transition duration-300"
                    >
                      <div className="w-2/5 h-56 bg-black rounded-lg">
                        <iframe
                          width="100%"
                          height="100%"
                          src={`https://www.youtube.com/embed/${video.id.videoId}`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title={video.snippet.title}
                        ></iframe>
                      </div>
                      <div className="w-3/5 space-y-3">
                        <p className="font-semibold text-lg text-gray-300">
                          {video.snippet.title}
                        </p>
                        <button
                          className="bg-[#228e71] shadow-inner shadow-[#99eed5] px-5 py-2 text-white rounded-md  transition duration-300"
                          onClick={() => handlerWatchLater(video)}
                        >
                          Watch later
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="md:w-1/4 w-full h-64 p-5 rounded-lg shadow-xl bg-white">
          <h6 className="font-semibold text-xl mb-4 text-gray-700">
            Watch Later
          </h6>
          <div className="relative w-full py-3 flex-nowrap">
            {watchLaterVideos.length === 0 ? (
              <div className="text-center text-gray-500">
                No videos added yet
              </div>
            ) : (
              <div className="flex w-full overflow-x-auto space-x-4 custom-scrollbar">
                {watchLaterVideos.map((video, index) => (
                  <div
                    key={index}
                    className="relative flex-shrink-0 w-full h-36 rounded-lg overflow-hidden bg-gray-200"
                  >
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${video.id.videoId}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={video.snippet.title}
                    ></iframe>
                    <div
                      className="z-50 absolute p-1 place-content-center place-items-center bg-gray-200 top-0 right-0 rounded-full text-black cursor-pointer"
                      onClick={() => handleRemove(video.id.videoId)}
                    >
                      <RxCross2 size={20} fontWeight={700} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watch;
