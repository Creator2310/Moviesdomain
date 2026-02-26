import { useState } from 'react';
import { useBooking } from "../context/BookingContext";
import { Clock, Archive, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const BookingCard = ({ booking, onAction }) => {
  const isHistory = booking.status !== 'active';
  const showDate = `${booking.show.date} at ${booking.show.time}`;
  const totalSeats = booking.seats.length;

  return (
    <li
      key={booking.id}
      className="flex items-start p-4 border rounded-lg shadow-md transition-shadow hover:shadow-lg bg-white border-gray-300 text-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
    >
      <img
        src={booking.posterUrl}
        alt={booking.title}
        className="w-16 h-24 object-cover rounded mr-4"
      />
      <div className="flex-1">
        <p className="font-bold text-lg line-clamp-1">{booking.title}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {isHistory ? 'Completed' : 'Upcoming'}: {showDate}
        </p>
        <p className="text-sm mt-1">
          Seats: <span className="font-semibold">{totalSeats}</span> | Total:{" "}
          <span className="font-semibold">${booking.totalAmount.toFixed(2)}</span>
        </p>
        <p
          className={`text-xs mt-1 font-medium ${booking.status === 'cancelled'
            ? 'text-red-500'
            : isHistory
              ? 'text-green-500'
              : 'text-blue-500'
            }`}
        >
          Status: {booking.status.toUpperCase()}
        </p>
      </div>

      {!isHistory && (
        <button
          onClick={() => onAction(booking.id)}
          className="ml-4 p-2 text-red-500 hover:text-red-700 transition flex items-center gap-1 text-sm"
        >
          <XCircle size={16} /> Cancel
        </button>
      )}
    </li>
  );
};

export default function BookingPage() {
  const {
    activeBookings,
    historyBookings,
    cancelBooking,
    clearAllBookings,
  } = useBooking();
  const [activeTab, setActiveTab] = useState("active");

  const bookingsToShow =
    activeTab === "active" ? activeBookings : historyBookings;

  const handleCancel = (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      cancelBooking(id);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-b pb-3 border-gray-300 dark:border-gray-700">
        <h2 className="text-3xl font-bold">My Bookings</h2>
        <div className="space-x-2">
          <button
            onClick={() => clearAllBookings()}
            className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded-md transition"
          >
            Clear All
          </button>
          <Link
            to="/"
            className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
          >
            Book New Movie →
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex mb-6">
        <button
          onClick={() => setActiveTab("active")}
          className={`px-4 py-2 flex items-center gap-2 font-medium transition-colors border-b-2 ${activeTab === "active"
            ? "border-blue-600 text-blue-600 dark:text-blue-400"
            : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
        >
          <Clock size={18} /> Active ({activeBookings.length})
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`px-4 py-2 flex items-center gap-2 font-medium transition-colors border-b-2 ${activeTab === "history"
            ? "border-blue-600 text-blue-600 dark:text-blue-400"
            : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
        >
          <Archive size={18} /> History ({historyBookings.length})
        </button>
      </div>

      {/* Bookings List */}
      {bookingsToShow.length === 0 ? (
        <p className="p-4 text-center text-lg text-gray-500 dark:text-gray-400">
          No {activeTab} bookings yet 🎟️
        </p>
      ) : (
        <ul className="space-y-4">
          {bookingsToShow.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onAction={handleCancel}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
