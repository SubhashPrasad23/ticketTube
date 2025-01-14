import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { seats, totalAmount, movieName, showTime, showDate } =
    location.state || {};

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!seats || !totalAmount || !movieName || !showTime || !showDate) {
    return <div>Loading...</div>;
  }

  const groupSeatsByTier = (seats) => {
    const groupedSeats = {};
    seats.forEach((seat) => {
      if (!groupedSeats[seat.layout]) {
        groupedSeats[seat.layout] = [];
      }
      groupedSeats[seat.layout].push(seat); 
    });
    return groupedSeats;
  };

  const groupedSeats = groupSeatsByTier(seats);

  const handleProceedToPayment = () => {
    setIsModalOpen(true); 

    setTimeout(() => {
      setIsModalOpen(false); 
      navigate("/"); 
    }, 5000); 
  };

  return (
    <div className="w-full flex items-center justify-center p-5">
      <div className="md:w-2/4 w-full md:p-6 p-3 space-y-8 bg-white md:rounded-lg ">
        <h2 className="xl:text-3xl lg:text-2xl text-xl font-bold text-center">
          Payment Details
        </h2>
        <div className="border p-6 rounded-lg shadow-lg space-y-3">
          <div className="space-y-2">
            <h3 className="md:text-2xl text-xl font-semibold">{movieName}</h3>
            <p className="md:text-lg text-gray-700">{showDate}</p>
            <p className="md:text-lg text-gray-700">Time: {showTime}</p>
          </div>
          <div>
            <ul>
              {Object.keys(groupedSeats).map((tier, index) => (
                <li key={index} className="flex items-center gap-4">
                  <div className="w-20">
                    <span className="font-medium md:text-lg">{tier}</span>
                  </div>
                  <ul className="flex gap-5 my-2">
                    {groupedSeats[tier].map((seat, idx) => (
                      <li
                        key={idx}
                        className="text-sm flex bg-[#17765c] md:px-2 px-1 py-1 text-white shadow-inner shadow-[#326156]"
                      >
                        <span> {seat.label}</span> - <span>{seat.seat}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg border">
          <div className="flex justify-between items-center md:text-lg font-semibold">
            <span>Total Amount:</span>
            <span className="md:text-2xl text-lg text-[#30A586]">
              RS {totalAmount}
            </span>
          </div>
        </div>

        <button
          onClick={handleProceedToPayment}
          className="w-full bg-[#30A586]  shadow-inner shadow-[#a1d8ca] px-5 py-2 text-white text-lg  focus:outline-none"
        >
          Proceed to Payment
        </button>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-all duration-200 ease-in">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center space-y-4 w-80">
            <h3 className="text-2xl font-semibold">Payment Successful</h3>
            <p className="text-lg">Your payment is processed successfully.</p>
            <p className="text-sm text-gray-600">
              You will be redirected shortly...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
