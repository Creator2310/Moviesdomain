/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const BookingContext = createContext();

const createBookingRecord = (movie, show, seats, totalAmount) => ({
  id: uuidv4(),
  movieId: movie.id,
  title: movie.title,
  posterUrl: movie.posterUrl,
  rating: movie.rating,
  show,
  seats,
  totalAmount,
  bookingDate: new Date().toISOString(),
  status: "active", // active | completed | cancelled
});

export function BookingProvider({ children }) {
  const [activeBookings, setActiveBookings] = useState([]);
  const [historyBookings, setHistoryBookings] = useState([]);

  // Confirm a new booking
  const confirmBooking = (movie, show, seats, totalAmount) => {
    const newBooking = createBookingRecord(movie, show, seats, totalAmount);
    setActiveBookings((prev) => [...prev, newBooking]);
    return newBooking;
  };

  // Cancel a booking → move it once to history as 'cancelled'
  const cancelBooking = (id) => {
    setActiveBookings((prev) => {
      const bookingToCancel = prev.find((b) => b.id === id);
      if (!bookingToCancel) return prev;

      // Prevent duplicates in history
      setHistoryBookings((hist) => {
        const alreadyInHistory = hist.some((b) => b.id === id);
        if (!alreadyInHistory) {
          return [...hist, { ...bookingToCancel, status: "cancelled" }];
        }
        return hist;
      });

      // Remove from active
      return prev.filter((b) => b.id !== id);
    });
  };

  // Move booking to history manually (for completed shows)
  const moveBookingToHistory = (id) => {
    setActiveBookings((prev) => {
      const finishedBooking = prev.find((b) => b.id === id);
      if (!finishedBooking) return prev;

      setHistoryBookings((hist) => {
        const alreadyInHistory = hist.some((b) => b.id === id);
        if (!alreadyInHistory) {
          return [...hist, { ...finishedBooking, status: "completed" }];
        }
        return hist;
      });

      return prev.filter((b) => b.id !== id);
    });
  };

  const clearAllBookings = () => {
    setActiveBookings([]);
    setHistoryBookings([]);
  };

  return (
    <BookingContext.Provider
      value={{
        activeBookings,
        historyBookings,
        confirmBooking,
        cancelBooking,
        clearAllBookings,
        moveBookingToHistory,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export const useBooking = () => useContext(BookingContext);
