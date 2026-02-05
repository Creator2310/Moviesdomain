// src/services/api.js (IMPROVED ERROR LOGGING)
import axios from "axios";

// Base URL for TMDb API
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
console.log("Is API Key Loaded:", !!API_KEY);
const BASE_URL = "https://api.themoviedb.org/3";
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

// Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

// Helper function to log detailed Axios errors
const logApiError = (err, endpoint) => {
    if (axios.isAxiosError(err)) {
        if (err.response) {
            // Server responded with status code outside of 2xx range
            console.error(`TMDB Error on ${endpoint}: Status ${err.response.status}`, err.response.data);
            // Throw a more informative error that the useFetchMovies can catch
            throw new Error(`TMDB API Error (${err.response.status}): ${err.response.data.status_message || 'Request failed'}`);
        } else if (err.request) {
            // Request was made but no response received (Network/CORS/Timeout)
            console.error(`TMDB Network Error on ${endpoint}: No response received`, err.request);
            throw new Error('Network Error: Could not connect to TMDB API.');
        }
    } else {
        // Other errors (e.g., in request setup)
        console.error(`TMDB Unknown Error on ${endpoint}:`, err.message);
        throw new Error(`Unknown API Error: ${err.message}`);
    }
    // Return original error if it's not an Axios error
    throw err;
};


export const fetchPopularMovies = async (page = 1) => {
  try {
    const response = await api.get("/movie/popular", { params: { page } });
    return response.data.results;
  } catch (err) {
    // Re-throw error after logging for useFetchMovies to catch
    console.error("Failed to fetch popular movies:", err);
    logApiError(err, "/movie/popular"); 
    return []; 
  }
};

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await api.get("/search/movie", {
      params: { query, page },
    });
    return response.data.results;
  } catch (err) {
    console.error("Failed to search movies:", err);
    logApiError(err, "/search/movie"); 
    return [];
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const response = await api.get(`/movie/${id}`);
    return response.data;
  } catch (err) {
    console.error("Failed to fetch movie details:", err);
    logApiError(err, `/movie/${id}`); 
    return null;
  }
};

export const fetchGenres = async () => {
  try {
    const response = await api.get("/genre/movie/list");
    return response.data.genres; 
  } catch (err) {
    console.error("Failed to fetch genres:", err);
    logApiError(err, "/genre/movie/list"); 
    return [];
  }
};