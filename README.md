# 🎬 MoviesHub

MoviesHub is a modern movie browsing web application that allows users to explore popular movies, search for specific titles, view detailed movie information, and manage authentication using Firebase. The application is built with **React + Vite** and integrates with the **TMDb API** for real-time movie data.

---

## 🚀 Features

* 🔥 Browse popular movies
* 🔍 Search movies by title
* 🎭 Filter movies by **genre** and **release year**
* 📄 View detailed movie information in a modal
* 🔐 User authentication (Sign up / Login) using **Firebase Auth**
* 💳 Razorpay checkout integration (script included)
* ⚡ Fast performance with Vite
* 🎨 Clean and responsive UI

---

## 🛠️ Tech Stack

### Frontend

* **React** (with Hooks)
* **Vite** (build tool)
* **Axios** (API requests)
* **CSS / JSX Components**

### Backend / Services

* **TMDb API** – Movie data source
* **Firebase**

  * Authentication
  * Firestore Database
* **Razorpay** – Payment gateway integration

---

## 📁 Project Structure

```bash
src/
│── components/
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── MovieCard.jsx
│   ├── MovieModal.jsx
│   ├── MovieRow.jsx
│   ├── Filters.jsx
│   ├── SearchBar.jsx
│   ├── BookingFlowModal.jsx
│
│── pages/
│   ├── Home.jsx
│   ├── AuthPage.jsx
│   ├── BookingPage.jsx
│
│── context/
│   ├── AuthContext.jsx
│   ├── BookingContext.jsx
│
│── hooks/
│   └── useFetchMovies.js
│
│── services/
│   └── api.js
│
│── firebase.js
│── App.jsx
│── main.jsx
```

---

## 🔑 Environment Variables

Create a `.env` file in the root directory and add the following:

```env
# TMDb
VITE_TMDB_API_KEY=your_tmdb_api_key

# Firebase
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

## 📦 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/movieshub.git
   cd movieshub
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:

   ```
   http://localhost:5173
   ```

---

## 🧠 Custom Hook: `useFetchMovies`

* Fetches popular or searched movies from TMDb
* Loads and maps genres
* Applies filters (genre, year)
* Handles loading and error states
* Transforms raw API data into UI-friendly format

---

## 🔐 Authentication

* Firebase Authentication is used for:

  * User Signup
  * User Login
* Firestore is initialized for storing user-related data

---

## 💳 Payments

* Razorpay checkout script is included in `index.html`
* Can be used for movie booking or premium features

---

## ⚠️ Error Handling

* Centralized API error logging using Axios
* Network, API, and unknown errors are handled gracefully
* User-friendly error messages displayed in UI

---

## 📌 Future Enhancements

* 🎟️ Seat selection & booking confirmation
* ❤️ Watchlist / Favorites
* ⭐ User ratings & reviews
* 📱 PWA support
* 🧪 Unit & integration testing

---

## 👨‍💻 Author

**Vimal Kumar**
MCA Student | Full Stack Developer

---

## 📄 License

This project is for educational purposes. You are free to use and modify it.

---

✨ Happy Coding & Movie Browsing! 🍿
