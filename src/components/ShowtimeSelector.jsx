import { format, addDays } from "date-fns";
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

const ShowtimeSelector = ({
  details,
  setDateIndex,
  dateIndex,
  setSelectedTime,
  selectedTime,
  setNumberOfSeat,
  setShowSeat,
  numberOfSeat,
  selectedDate,
  setSelectedDate,
}) => {
  const today = new Date();
  const nextFiveDays = Array.from({ length: 5 }, (_, i) => addDays(today, i));
  const numberOfSeats = Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  const handleBookSeats = () => {
    if (!selectedDate || !selectedTime || !numberOfSeat) {
      toast.error(
        "Please select a date, time, and number of seats before proceeding."
      );
      return;
    }

    setShowSeat(true);
  };

  return (
    <div className="space-y-10 px-5">
      <h3 className="text-xl font-bold">{details.original_title}</h3>

      <div className="flex md:space-x-4 space-x-2">
        {nextFiveDays.map((date, index) => (
          <div
            onClick={() => {
              setDateIndex(index);
              setSelectedDate(date);
            }}
            key={index}
            className={`flex cursor-pointer flex-col items-center ${
              dateIndex === index ? "bg-[#17765c]" : "bg-[#30A586]"
            } text-white rounded-lg w-14 p-2 shadow-inner shadow-[#a2edd9]`}
          >
            <span className="uppercase text-sm">{format(date, "EEE")}</span>
            <span className="text-xl font-bold">{format(date, "dd")}</span>
            <span className="uppercase text-sm">{format(date, "MMM")}</span>
          </div>
        ))}
      </div>

      <div className="md:space-x-3 space-x-2">
        {["10:00 AM", "3:00 PM", "9:00 PM"].map((time) => (
          <span
            key={time}
            className={`border p-2 cursor-pointer tracking-wide rounded-md ${
              selectedTime === time
                ? "bg-[#17765c] text-white"
                : "border-[#30A586]"
            }`}
            onClick={() => setSelectedTime(time)}
          >
            {time}
          </span>
        ))}
      </div>

      <div className="space-y-2">
        <p className="text-xl">How many seats ?</p>
        <div className=" flex flex-wrap items-center gap-3">
          {numberOfSeats.map((number) => (
            <p
              key={number}
              className={`border p-3 text-center rounded-md cursor-pointer border-[#30A586] ${
                numberOfSeat === number ? "bg-[#17765c] text-white" : ""
              }`}
              onClick={() => setNumberOfSeat(number)}
            >
              {number}
            </p>
          ))}
        </div>
      </div>

      <button
        onClick={handleBookSeats} 
        className="w-full text-white md:p- p-2 bg-[#31be98] shadow-inner shadow-[#96e6d0]"
      >
        Book seats
      </button>
    </div>
  );
};

export default ShowtimeSelector;
