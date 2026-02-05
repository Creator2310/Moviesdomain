import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ onSearch, theme }) {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();

  // 🔁 Go back to home when search bar is cleared
  useEffect(() => {
    if (term.trim() === "") {
      navigate("/"); // redirect to home
      onSearch("");  // clear search results
    }
  }, [term, navigate, onSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (term.trim()) {
      onSearch(term.trim());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex items-center border-2 rounded-full overflow-hidden transition-all duration-300 
        w-full md:w-72 shadow-sm 
        ${theme === "dark"
          ? "bg-gray-900 border-gray-700 focus-within:border-blue-500"
          : "bg-white border-gray-300 focus-within:border-blue-400"
        }`}
    >
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search movies..."
        className={`px-4 py-2 w-full outline-none rounded-l-full 
          text-sm md:text-base transition-colors duration-200
          ${theme === "dark"
            ? "bg-gray-900 text-gray-100 placeholder-gray-400"
            : "bg-white text-gray-900 placeholder-gray-500"
          }`}
      />
      <button
        type="submit"
        className={`px-5 py-2 text-sm md:text-base font-medium transition-all duration-200 rounded-r-full
          ${theme === "dark"
            ? "bg-blue-600 hover:bg-blue-700 text-white"
            : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
      >
        🔍
      </button>
    </form>
  );
}
