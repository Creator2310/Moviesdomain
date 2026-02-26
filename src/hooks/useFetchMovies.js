import { useState, useEffect } from "react";
import { fetchPopularMovies, searchMovies, fetchGenres, IMAGE_BASE_URL } from "../services/api";

// Helper: Create genre ID → Name map
const createGenreMap = (genres) => {
  const map = {};
  genres.forEach((g) => (map[g.id] = g.name));
  return map;
};

export default function useFetchMovies(type = "popular", query = "", filters = {}) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [genresMap, setGenresMap] = useState({}); // Keep this state

  useEffect(() => {
    let isMounted = true; // Cancel updates if component unmounts

    const fetchAll = async () => {
      setLoading(true);
      setError(null);

      try {
        // --- 1. Load genres if not already loaded ---
        let map = genresMap;
        if (Object.keys(map).length === 0) {
          const genreData = await fetchGenres();
          if (!genreData || genreData.length === 0) {
            // Throw a more specific error for genre failure
            throw new Error("Failed to load genres from TMDb. Check API key/network.");
          }
          map = createGenreMap(genreData);
          if (!isMounted) return;
          setGenresMap(map);
        }

        // --- 2. Fetch movies ---
        let data = [];
        if (type === "search" && query) {
          data = await searchMovies(query);
        } else {
          data = await fetchPopularMovies();
        }

        if (!Array.isArray(data)) data = [];

        // --- 3. Apply filters ---
        let filtered = data;

        // Ensure we only filter by genre if it's set AND not 'all'
        if (filters.genre && filters.genre !== "all") {
          const genreId = Object.keys(map).find((key) => map[key] === filters.genre);
          if (genreId) {
            filtered = filtered.filter((movie) =>
              movie.genre_ids?.includes(parseInt(genreId))
            );
          }
        }

        // Ensure we only filter by year if it's set AND not 'all'
        if (filters.year && filters.year !== "all") {
          filtered = filtered.filter(
            (movie) =>
              movie.release_date &&
              movie.release_date.startsWith(filters.year)
          );
        }

        // --- 4. Transform for UI ---
        const transformed = filtered.map((movie) => ({
          id: movie.id,
          title: movie.title,
          overview: movie.overview,
          // Use backdrop for the Home hero banner
          backdropUrl: movie.backdrop_path ? `${IMAGE_BASE_URL.replace('w500', 'w1280')}${movie.backdrop_path}` : null,
          posterUrl: movie.poster_path
            ? `${IMAGE_BASE_URL}${movie.poster_path}`
            : "https://via.placeholder.com/500x750?text=No+Image",
          releaseYear: movie.release_date ? movie.release_date.substring(0, 4) : "N/A",
          rating: movie.vote_average?.toFixed(1) || "N/A",
          genresString: movie.genre_ids
            ?.map((id) => map[id])
            .filter(Boolean)
            .join(", ") || "N/A",
        }));

        if (isMounted) setMovies(transformed);
      } catch (err) {
        console.error("useFetchMovies error:", err);
        if (isMounted) setError(err.message || "Failed to fetch movies");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchAll();

    return () => {
      isMounted = false; // cleanup to prevent state update after unmount
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, query, filters]);

  // New: Return the genres map and a list of genre names for the Filters component
  const genreNames = Object.values(genresMap);

  return { movies, loading, error, genreNames };
}