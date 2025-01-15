import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MovieOverview from "./MovieOverview";
import ShowtimeSelector from "./ShowtimeSelector";
import SeatSelection from "./SeatSelection";
import { seatData } from "../mockData/SeatingData";

const MovieDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [isModal, setIsModal] = useState(false);
  const [showSeat, setShowSeat] = useState(false);
  const [dateIndex, setDateIndex] = useState(-1);
  const [numberOfSeat, setNumberOfSeat] = useState(0);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const ref = useRef(null);
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

console.log("details",details)

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
        );
        setDetails(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const closeModal = () => setIsModal(false);

  const isUpcoming = new Date(details.release_date) > new Date();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        closeModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative h-full w-full flex flex-col place-content-center place-items-center">
      <div
        className="w-3/4 flex  h-full md:flex-row flex-col gap-5 shadow-inner shadow-gray-200 rounded-2xl p-5 m-5"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 2), rgba(0, 0, 0, 0.2)), url(https://image.tmdb.org/t/p/w500/${details.poster_path})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right",
        }}
      >
        <MovieOverview
          details={details}
          setIsModal={setIsModal}
          isUpcoming={isUpcoming}
        />
        {isModal && (
          <div className="fixed shadow-lg shadow-red-800 inset-0 flex items-center justify-center backdrop-blur-md z-50">
            <div
              className="bg-white space-y-5 p-5 rounded-xl shadow-lg shadow-gray-300"
              ref={ref}
            >
              {showSeat ? (
                <SeatSelection
                  seatData={seatData}
                  setShowSeat={setShowSeat}
                  selectedSeats={selectedSeats}
                  setSelectedSeats={setSelectedSeats}
                  numberOfSeat={numberOfSeat}
                  details={details}
                  selectedTime={selectedTime}
                  selectedDate={selectedDate}
                />
              ) : (
                <ShowtimeSelector
                  details={details}
                  setDateIndex={setDateIndex}
                  dateIndex={dateIndex}
                  setSelectedTime={setSelectedTime}
                  selectedTime={selectedTime}
                  setNumberOfSeat={setNumberOfSeat}
                  setShowSeat={setShowSeat}
                  numberOfSeat={numberOfSeat}
                  setSelectedDate={setSelectedDate}
                  selectedDate={selectedDate}
                />
              )}
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default MovieDetails;
