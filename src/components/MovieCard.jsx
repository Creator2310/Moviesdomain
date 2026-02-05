import React from "react";

export default function MovieCard({ movie, onClick, theme = "dark" }) {
  if (!movie) return null;

  return (
    <div
      onClick={() => onClick(movie)}
      className={`relative flex-none w-44 sm:w-48 md:w-56 h-72 md:h-80 mr-4 rounded-2xl overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105 shadow-lg ${
        theme === "dark" ? "bg-gray-800" : "bg-gray-200"
      }`}
    >
      {/* Movie Poster */}
      <img
        src={movie.posterUrl || "https://via.placeholder.com/300x450.png?text=No+Image"}
        alt={movie.title}
        className="w-full h-full object-cover"
      />

      {/* Subtle gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-90"></div>

      {/* Rating badge (top-left corner) */}
      {movie.rating && movie.rating !== "N/A" && (
        <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
          ⭐ {movie.rating}
        </span>
      )}

      {/* Movie Title & Year at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
        <h3 className="font-semibold text-sm md:text-base truncate">{movie.title}</h3>
        {movie.releaseYear && (
          <p className="text-xs md:text-sm text-gray-300">{movie.releaseYear}</p>
        )}
      </div>

      {/* Hover overlay with subtle glow */}
      <div className="absolute inset-0 rounded-2xl bg-black/0 hover:bg-black/20 transition-all duration-300"></div>
    </div>
  );
}
