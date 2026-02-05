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

      alert("Registration successful! Please sign in.");
      setIsSignUp(false); // 🔄 switch to Sign In
      setEmail("");
      setPassword("");
      return;
    } else {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
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
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password (min 6 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white p-2 rounded font-semibold"
          >
            {isSignUp ? "Create Account" : "Login"}
          </button>
        </form>

        <button
          onClick={handleGoogleSignIn}
          className="mt-4 w-full bg-white text-gray-800 p-2 rounded font-semibold hover:bg-gray-200 flex items-center justify-center gap-2"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        <p className="mt-4 text-center text-gray-400 text-sm">
          {isSignUp ? "Already have an account?" : "New user?"}{" "}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-red-400 hover:underline"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}
