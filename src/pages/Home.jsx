// src/pages/Home.jsx (FINAL CLEAN VERSION)
import React, { useState } from "react";
import Header from "../components/Header";
import MovieRow from "../components/MovieRow";
import MovieModal from "../components/MovieModal";
import useFetchMovies from "../hooks/useFetchMovies";

export default function Home({ theme, toggleTheme }) {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Filters are now fixed to default 'all' since the UI controls were removed.
  const fixedFilters = { genre: "all", year: "all" };
  const isSearchActive = !!searchQuery;

  const {
    movies: allMovies,
    loading: allLoading,
    error: allError,
    // Note: genreNames is still returned by the hook but unused here
  } = useFetchMovies(isSearchActive ? "search" : "popular", searchQuery, fixedFilters);

  // --- 2. Filter derived rows ---
  const availableMovies = allMovies || [];

  const heroMovie = availableMovies[0];
  const heroImage = heroMovie?.backdropUrl || 'https://via.placeholder.com/1600x900.png?text=Movie+Banner';
  const heroTitle = heroMovie?.title || 'Featured Movie';

  const thrillerMovies = availableMovies.filter(movie => movie.genresString?.includes('Thriller'));
  const familyMovies = availableMovies.filter(movie => movie.genresString?.includes('Family'));

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // --- 3. Robust Loading/Error Guards ---
  if (allLoading && !availableMovies.length) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <svg className="animate-spin h-8 w-8 text-red-600 mr-3" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Loading the Movie Universe...
      </div>
    );
  }

  if (allError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
        <Header onSearch={handleSearch} theme={theme} toggleTheme={toggleTheme} />
        <p className="mt-20 p-4 text-center text-xl text-red-500">
          Error connecting to TMDb: {allError}
        </p>
        <p className="text-sm text-gray-400 mt-2">Check your network or confirm the API key is valid.</p>
      </div>
    );
  }

  const displayTitle = searchQuery ? `Search Results for "${searchQuery}"` : "Popular Movies";

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-black dark:text-white transition-colors duration-300">
      <Header onSearch={handleSearch} theme={theme} toggleTheme={toggleTheme} />

      {/* Hero Section - Only shown when NOT searching */}
      {!isSearchActive && (
        <section className="relative h-[60vh] md:h-[70vh] flex items-end bg-cover bg-center bg-gray-900"
          style={{ backgroundImage: `url('${heroImage}')` }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
          <div className="relative z-10 p-8 md:p-16 max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4">{heroTitle}</h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              Find the perfect movie for your next booking experience.
            </p>
          </div>
        </section>
      )}

      {/* Spacer for when search is active */}
      {isSearchActive && <div className="pt-24" />}

      <main className="py-8 md:py-12 px-4 md:px-8">
        {/* The content is now flat, without the filters sidebar */}
        {isSearchActive ? (
          <MovieRow
            title={displayTitle}
            movies={availableMovies}
            loading={false}
            error={null}
            onMovieClick={setSelectedMovie}
            theme={theme}
          />
        ) : (
          <>
            <MovieRow
              title="Popular Movies"
              movies={availableMovies}
              loading={false}
              error={null}
              onMovieClick={setSelectedMovie}
              theme={theme}
            />

            <MovieRow
              title="Thriller Films"
              movies={thrillerMovies}
              loading={false}
              error={null}
              onMovieClick={setSelectedMovie}
              theme={theme}
            />

            <MovieRow
              title="Family Favorites"
              movies={familyMovies}
              loading={false}
              error={null}
              onMovieClick={setSelectedMovie}
              theme={theme}
            />
          </>
        )}
      </main>

      {/* Movie Detail Modal */}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
}