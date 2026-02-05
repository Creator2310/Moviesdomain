import React, { useState } from "react";
import BookingFlowModal from "./BookingFlowModal";
import { getAuth } from "firebase/auth";

export default function MovieModal({ movie, onClose }) {
  const [bookingFlowOpen, setBookingFlowOpen] = useState(false);
  const auth = getAuth();

  if (!movie) return null;

  const handleBookingClick = () => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please sign in before booking.");
      return; // 🚫 Prevent booking flow if user not logged in
    }
    setBookingFlowOpen(true);
  };

  // Only closes everything when BookingFlowModal finishes
  const handleFlowClose = () => {
    setBookingFlowOpen(false);
    onClose();
  };

  return (
    <>
      {/* MAIN MOVIE MODAL */}
      {!bookingFlowOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <div
            className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white max-w-3xl w-full rounded-lg p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              ✕
            </button>

            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={movie.posterUrl}
                className="w-48 h-auto rounded"
                alt={`${movie.title} poster`}
              />
              <div>
                <h2 className="text-3xl font-bold">{movie.title}</h2>
                <p className="mt-4">{movie.overview}</p>
                <p className="mt-2 text-sm">
                  <span className="font-semibold">Rating:</span> {movie.rating}
                </p>
                <button
                  onClick={handleBookingClick}
                  className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MULTI-STEP BOOKING FLOW */}
      {bookingFlowOpen && (
        <BookingFlowModal
          isOpen={bookingFlowOpen}
          onClose={handleFlowClose}
          movie={movie}
        />
      )}
    </>
  );
}
