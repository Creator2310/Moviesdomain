import React, { useRef } from "react";
import MovieCard from "./MovieCard";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";

export default function MovieRow({ title, movies, loading, error, onMovieClick }) {
  const scrollRef = useRef(null);

  // Scroll left/right functions
  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollLeft -= 300;
  };
  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollLeft += 300;
  };

  if (loading) {
    return (
      <div className="py-8 text-center text-gray-400">
        <Loader2 className="animate-spin inline-block mr-2" size={24} /> Loading{" "}
        {title.toLowerCase()}...
      </div>
    );
  }

  if (error) {
    return <div className="py-8 text-center text-red-500">Error: {error}</div>;
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">
        No movies found for "{title}".
      </div>
    );
  }

  return (
    <section className="mb-8 relative group">
      {/* ✅ Dynamic text color based on theme */}
      <h2
        className="text-2xl md:text-3xl font-bold mb-4 pl-4 md:pl-8 transition-colors duration-300 text-gray-900 dark:text-white"
      >
        {title}
      </h2>

      {/* Scrollable movie row */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide px-4 md:px-8 pb-4 scroll-smooth"
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onClick={onMovieClick} />
        ))}
      </div>

      {/* Left scroll button */}
      <button
        onClick={scrollLeft}
        className="absolute top-1/2 left-0 md:left-4 transform -translate-y-1/2 bg-black/60 text-white p-2 rounded-r-md z-10 
                   opacity-0 transition-opacity duration-300 hover:bg-black/80 md:group-hover:opacity-100 hidden md:block"
        aria-label="Scroll movies left"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Right scroll button */}
      <button
        onClick={scrollRight}
        className="absolute top-1/2 right-0 md:right-4 transform -translate-y-1/2 bg-black/60 text-white p-2 rounded-l-md z-10 
                   opacity-0 transition-opacity duration-300 hover:bg-black/80 md:group-hover:opacity-100 hidden md:block"
        aria-label="Scroll movies right"
      >
        <ChevronRight size={24} />
      </button>
    </section>
  );
}
