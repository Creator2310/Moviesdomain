import React, { useState } from "react";
import { X, ArrowLeft, Clock, CheckCircle } from "lucide-react";
import { useBooking } from "../context/BookingContext";
import { getAuth } from "firebase/auth";
import axios from "axios";

export default function BookingFlowModal({ isOpen, onClose, movie }) {
  const { confirmBooking } = useBooking();
  const [step, setStep] = useState(1);
  const [selectedShow, setSelectedShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const auth = getAuth();

  if (!isOpen) return null;

  const showtimes = [
    { time: "10:00 AM", date: "Fri, Oct 25" },
    { time: "02:00 PM", date: "Fri, Oct 25" },
    { time: "06:00 PM", date: "Fri, Oct 25" },
  ];

  const handleSelectShow = (show) => setSelectedShow(show);
  const handleSelectSeat = (seat) =>
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );

  const handleNextToSeats = () => selectedShow && setStep(2);
  const handleNextToPayment = () => selectedSeats.length > 0 && setStep(3);

  // 💳 Razorpay (USD currency)
  const handlePayment = async () => {
    const totalAmount = selectedSeats.length * 20; // $20 per seat
    const user = auth.currentUser;

    if (!user) {
      alert("Please sign in before completing your booking.");
      return;
    }

    try {
      const { data } = await axios.post("http://localhost:5000/create-order", {
        amount: totalAmount,
        currency: "USD",
      });

      if (!data.success) throw new Error("Failed to create order");

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: totalAmount * 100,
        currency: "USD",
        name: "Movie Booking App",
        description: `Booking for ${movie.title}`,
        order_id: data.order.id,
        handler: function (response) {
          confirmBooking(movie, selectedShow, selectedSeats, totalAmount);
          setIsConfirmed(true);
          setTimeout(() => onClose(), 2000);
        },
        prefill: {
          name: user.displayName || "Movie Fan",
          email: user.email || "user@example.com",
          contact: "9999999999",
        },
        theme: { color: "#0d6efd" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      rzp.on("payment.failed", (res) => {
        alert("Payment failed: " + res.error.description);
      });
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment initialization failed.");
    }
  };

  const canGoBack = step > 1 && !isConfirmed;

  const StepIndicator = ({ current, total }) => (
    <p className="text-center text-gray-400 mb-4">
      Step {current} of {total}
    </p>
  );

  const renderStepContent = () => {
    if (isConfirmed) {
      return (
        <div className="flex flex-col items-center gap-4 text-center">
          <CheckCircle className="text-green-500" size={48} />
          <h3 className="text-2xl font-bold">Booking Confirmed!</h3>
          <p>
            Enjoy watching <span className="font-semibold">{movie.title}</span> 🎬
          </p>
        </div>
      );
    }

    switch (step) {
      case 1:
        return (
          <>
            <div className="flex items-center gap-2 mb-4">
              <Clock size={20} />
              <h3 className="text-lg font-semibold">Select Showtime</h3>
            </div>
            <div className="flex gap-4 justify-center">
              {showtimes.map((show, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectShow(show)}
                  className={`px-6 py-3 rounded-lg border transition ${
                    selectedShow === show
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700"
                  }`}
                >
                  <div>{show.time}</div>
                  <div className="text-sm">{show.date}</div>
                </button>
              ))}
            </div>
          </>
        );

      case 2:
        const seats = Array.from({ length: 25 }, (_, i) => `A${i + 1}`);
        return (
          <>
            <h3 className="text-lg font-semibold mb-4">Select Your Seats</h3>
            <div className="grid grid-cols-5 gap-3 justify-items-center">
              {seats.map((seat) => (
                <button
                  key={seat}
                  onClick={() => handleSelectSeat(seat)}
                  className={`px-4 py-2 rounded font-medium transition ${
                    selectedSeats.includes(seat)
                      ? "bg-green-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {seat}
                </button>
              ))}
            </div>
            <p className="mt-4 text-center">
              <span className="font-semibold">Selected:</span>{" "}
              {selectedSeats.length ? selectedSeats.join(", ") : "None"}
            </p>
          </>
        );

      case 3:
        return (
          <>
            <h3 className="text-lg font-semibold mb-4">Payment Summary</h3>
            <div className="bg-gray-800 p-4 rounded-lg space-y-2">
              <p><span className="font-semibold">Movie:</span> {movie.title}</p>
              <p>
                <span className="font-semibold">Showtime:</span>{" "}
                {selectedShow.time}, {selectedShow.date}
              </p>
              <p>
                <span className="font-semibold">Seats:</span>{" "}
                {selectedSeats.join(", ")}
              </p>
              <p>
                <span className="font-semibold">Total:</span> ${selectedSeats.length * 20}
              </p>
            </div>
            <div className="mt-6 text-center">
              <button
                onClick={handlePayment}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded font-semibold"
              >
                Pay ${selectedSeats.length * 20} & Confirm Booking
              </button>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />
      <div
        className="relative bg-gray-900 text-white p-6 rounded-lg max-w-lg w-full shadow-2xl z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-3">
          <div className="flex items-center gap-2">
            {canGoBack && (
              <button
                onClick={() => setStep(step - 1)}
                className="p-2 rounded-full hover:bg-gray-800"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            <h2 className="text-xl font-bold">
              {isConfirmed ? "Booking Status" : `Booking: ${movie.title}`}
            </h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-800">
            <X size={20} />
          </button>
        </div>

        {!isConfirmed && <StepIndicator current={step} total={3} />}
        {renderStepContent()}

        {!isConfirmed && step < 3 && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={step === 1 ? handleNextToSeats : handleNextToPayment}
              disabled={
                (step === 1 && !selectedShow) ||
                (step === 2 && selectedSeats.length === 0)
              }
              className={`px-6 py-3 rounded font-semibold transition ${
                (step === 1 && !selectedShow) ||
                (step === 2 && selectedSeats.length === 0)
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {step === 1 ? "Next: Choose Seats →" : "Next: Payment →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
