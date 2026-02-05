// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { BookingProvider } from "./context/BookingContext";
import { AuthProvider } from "./context/AuthContext"; // ✅ Import Auth Context
import Home from "./pages/Home";
import BookingPage from "./pages/BookingPage";
import AuthPage from "./pages/AuthPage"; // ✅ Import Auth Page
import Header from "./components/Header";
import Footer from "./components/Footer";

function AppContent({ theme, toggleTheme }) {
  const navigate = useNavigate();

  const handleSearch = (query) => {
    navigate("/");
    console.log("Search query:", query);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-black text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Header onSearch={handleSearch} theme={theme} toggleTheme={toggleTheme} />

      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Home theme={theme} onSearch={handleSearch} />} />
          <Route path="/booking" element={<BookingPage theme={theme} />} />
          <Route path="/auth" element={<AuthPage />} /> {/* ✅ Auth route */}
        </Routes>
      </div>

      <Footer theme={theme} />
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <BrowserRouter>
      <AuthProvider>
        <BookingProvider>
          <AppContent theme={theme} toggleTheme={toggleTheme} />
        </BookingProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
