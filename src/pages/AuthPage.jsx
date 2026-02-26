import React, { useState } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isSignUp) {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);

        await setDoc(doc(db, "users", user.uid), { email });

        navigate("/");
        return;
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/");
      }
    } catch (err) {
      // 🔥 Clean Firebase error handling
      if (err.code === "auth/email-already-in-use") {
        alert("User already exists. Please sign in.");
        setIsSignUp(false); // 🔄 switch to Sign In
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password.");
      } else if (err.code === "auth/user-not-found") {
        setError("No account found with this email.");
      } else if (err.code === "auth/weak-password") {
        setError("Password must be at least 6 characters.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email address.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };


  // ✅ Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      await setDoc(doc(db, "users", user.uid), { email: user.email }, { merge: true });
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300">
      <div className="bg-white dark:bg-gray-900/80 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 w-full max-w-md transition-all">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-500 mb-2">
            MoviesDomain
          </h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium tracking-wide">
            {isSignUp ? "Join the cinematic universe" : "Welcome back, cinephile"}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100/50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="email"
              id="email"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="peer w-full p-4 pt-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
              required
            />
            <label
              htmlFor="email"
              className="absolute left-4 top-4 text-gray-400 dark:text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs peer-valid:top-2 peer-valid:text-xs pointer-events-none"
            >
              Email address
            </label>
          </div>

          <div className="relative">
            <input
              type="password"
              id="password"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="peer w-full p-4 pt-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
              required
            />
            <label
              htmlFor="password"
              className="absolute left-4 top-4 text-gray-400 dark:text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs peer-valid:top-2 peer-valid:text-xs pointer-events-none"
            >
              Password (min 6 chars)
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white p-4 rounded-2xl font-bold text-lg shadow-lg shadow-red-500/30 transform hover:-translate-y-1 transition-all duration-200"
          >
            {isSignUp ? "Create Account" : "Sign In"}
          </button>
        </form>

        <div className="mt-8 relative flex items-center justify-center">
          <div className="absolute inset-x-0 h-px bg-gray-200 dark:bg-gray-800"></div>
          <span className="relative bg-white dark:bg-gray-900/100 px-4 text-sm text-gray-400 font-medium">
            or continue with
          </span>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="mt-8 w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-4 rounded-2xl font-semibold border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-md transition-all duration-200 flex items-center justify-center gap-3"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-6 h-6"
          />
          Google
        </button>

        <p className="mt-8 text-center text-gray-500 dark:text-gray-400 font-medium">
          {isSignUp ? "Already have an account?" : "New to MoviesDomain?"}{" "}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-red-500 hover:text-red-400 font-bold hover:underline transition-colors"
          >
            {isSignUp ? "Sign In" : "Sign Up now"}
          </button>
        </p>
      </div>
    </div>
  );
}
