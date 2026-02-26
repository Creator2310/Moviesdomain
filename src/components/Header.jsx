// src/components/Header.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Sun, Moon, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Header({ onSearch, theme, toggleTheme }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate("/");
    onSearch(searchQuery.trim());
  };

  const handleHomeClick = () => {
    setSearchQuery("");
    onSearch("");
    navigate("/");
  };

  const handleLogout = async () => {
    await signOut(auth);
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-b from-black to-transparent p-4 flex flex-col md:flex-row items-center justify-between transition-colors duration-300">
      {/* Left Section */}
      <div className="flex items-center w-full md:w-auto justify-between md:justify-start mb-4 md:mb-0">
        <button onClick={handleHomeClick} className="text-red-600 font-bold text-3xl mr-8">
          MoviesDomain
        </button>

        <nav className="hidden md:flex space-x-6 text-white text-sm">
          <button onClick={handleHomeClick} className="hover:text-gray-300">
            Home
          </button>
          <Link to="/booking" className="hover:text-gray-300">
            My Bookings
          </Link>
        </nav>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full md:w-1/3 mx-auto mb-4 md:mb-0">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for movies..."
          className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-100 text-gray-900 placeholder-gray-500 focus:ring-blue-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:ring-red-600 focus:outline-none focus:ring-2"
        />
        <button type="submit" className="absolute left-3 text-gray-400 hover:text-white">
          <Search size={20} />
        </button>
      </form>

      {/* Right Section - Theme Toggle & User Menu */}
      <div className="hidden md:flex items-center space-x-4 text-white relative">
        <button onClick={toggleTheme} className="hover:text-gray-300">
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* User Icon Dropdown */}
        <div className="relative" onMouseLeave={() => setMenuOpen(false)}>
          <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none flex items-center justify-center">
            {user ? (
              <div className="w-8 h-8 flex items-center justify-center bg-red-600 rounded-full font-bold text-white uppercase">
                {user.email ? user.email.charAt(0) : "U"}
              </div>
            ) : (
              <User size={24} className="text-gray-400" />
            )}
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-3 w-40 bg-gray-800 rounded-md shadow-lg text-sm overflow-hidden">
              {!user ? (
                <>
                  <Link
                    to="/auth"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-3 hover:bg-gray-700"
                  >
                    Sign In / Register
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 hover:bg-gray-700 text-red-400 font-semibold"
                >
                  Logout
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
