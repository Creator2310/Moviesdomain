import React from "react";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import { BookingProvider } from "./context/BookingContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BookingProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BookingProvider>
  </StrictMode>
);
