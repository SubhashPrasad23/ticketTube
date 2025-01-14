import { format } from "date-fns";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

const SeatSelection = ({
  seatData,
  setShowSeat,
  selectedSeats,
  setSelectedSeats,
  numberOfSeat,
  selectedTime,
  details,
  selectedDate,
}) => {
  const navigate = useNavigate();

  const formattedDate = selectedDate
    ? format(new Date(selectedDate), "eeee, dd MMMM yyyy")
    : null;

  const isSeatSelected = (layoutIndex, rowIndex, seatIndex) => {
    return selectedSeats.some(
      (seat) =>
        seat.layoutIndex === layoutIndex &&
        seat.rowIndex === rowIndex &&
        seat.seatIndex === seatIndex
    );
  };

  const calculateTotalAmount = () => {
    let total = 0;
    selectedSeats.forEach((seat) => {
      const layout = seatData[seat.layoutIndex];
      total += layout.price;
    });
    return total;
  };

  const handleSeatSelection = (layoutIndex, rowIndex, seatIndex, layout) => {
    let row = layout.rows[rowIndex];
    let selectedSeatsTemp = [...selectedSeats];

    for (
      let i = seatIndex;
      i < row.seats.length && selectedSeatsTemp.length < numberOfSeat;
      i++
    ) {
      if (!isSeatSelected(layoutIndex, rowIndex, i)) {
        selectedSeatsTemp.push({
          layoutIndex,
          rowIndex,
          seatIndex: i,
          seat: row.seats[i],
          label: layout.rows[0].label,
          layout: layout.tier,
        });
      }
    }

    setSelectedSeats(selectedSeatsTemp);
  };

  const handlePayClick = () => {
    if (!details) {
      toast.error("Movie details are not available.");
      return;
    }

    if (selectedSeats.length === 0) {
      toast.error("Please select seat.");
      return;
    }

    const selectedSeatsDetails = selectedSeats.map((seat) => {
      const layout = seatData[seat.layoutIndex];
      const row = layout.rows[seat.rowIndex];
      const seatNumber = row.seats[seat.seatIndex];
      return {
        layout: layout.tier,
        seat: seatNumber,
        price: row.price,
        label: layout.rows[0].label, 
      };
    });

    console.log("Selected Seats Details:", selectedSeatsDetails); 

    navigate("/payment", {
      state: {
        seats: selectedSeatsDetails,
        totalAmount: calculateTotalAmount(),
        movieName: details?.title,
        showTime: selectedTime,
        showDate: formattedDate,
      },
    });
  };

  return (
    <div className="">
      <button
        onClick={() => {
          setShowSeat(false);
          setSelectedSeats([]);
        }}
        className="block"
      >
        <FaArrowLeft />
      </button>

      <div className="space-y-8 py-3">
        {seatData &&
          seatData.map((layout, layoutIndex) => (
            <div key={layoutIndex}>
              <div className="space-x-4 text-lg font-semibold">
                <span>RS {layout.price}</span>
                <span>{layout.tier}</span>
              </div>
              <div className="flex">
                {layout?.rows?.map((row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="flex md:gap-10 gap-2 items-center"
                  >
                    <span className="text-lg">{row.label}</span>
                    <span className="md:space-x-3 space-x-2 py-5 flex">
                      {row?.seats?.map((seat, seatIndex) => {
                        const isSelected = isSeatSelected(
                          layoutIndex,
                          rowIndex,
                          seatIndex
                        );

                        return (
                          <div
                            key={seatIndex}
                            className={`border text-center place-content-center lg:h-12 lg:w-12 sm:h-10 sm:w-10 px-2 rounded-tr-xl rounded-tl-xl ${
                              isSelected
                                ? "bg-[#17765c] text-white"
                                : "cursor-pointer"
                            }`}
                            onClick={() =>
                              handleSeatSelection(
                                layoutIndex,
                                rowIndex,
                                seatIndex,
                                layout
                              )
                            }
                          >
                            {seat}
                          </div>
                        );
                      })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>

      <button
        onClick={handlePayClick} 
        className="w-full bg-[#30A586]  shadow-inner shadow-[#a1d8ca] px-5 py-2 text-white"
      >
        Pay amount: RS {calculateTotalAmount()}
      </button>
    </div>
  );
};

export default SeatSelection;
