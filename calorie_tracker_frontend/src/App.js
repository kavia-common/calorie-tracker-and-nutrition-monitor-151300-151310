import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./screens/Dashboard";
import Login from "./screens/Login";
import Register from "./screens/Register";
import FoodLog from "./screens/FoodLog";
import AddEntryModal from "./components/AddEntryModal";
import Goals from "./screens/Goals";
import History from "./screens/History";
import Nutrition from "./screens/Nutrition";
import Settings from "./screens/Settings";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { AppDataProvider } from "./contexts/AppDataContext";

// PUBLIC_INTERFACE
function PrivateRoute({ children }) {
  // PUBLIC_INTERFACE
  // Restricts access unless authenticated
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div className="center-page"><div className="spinner" /> Loading...</div>;
  return isAuthenticated ? children : <Navigate to="/login" />;
}

// PUBLIC_INTERFACE
function AppLayout() {
  // Handles modal rendering and navbar
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="App">
      <Navbar onAddEntry={() => setModalOpen(true)} />
      {modalOpen && <AddEntryModal closeModal={() => setModalOpen(false)} />}
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Dashboard openAddEntry={() => setModalOpen(true)} />} />
          <Route path="/log" element={<FoodLog />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/history" element={<History />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  // Global theme toggle state, saved to localStorage for persistence
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  useEffect(() => {
    // Tailwind's dark mode is toggled via "dark" class on <html>
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <AuthProvider>
      <AppDataProvider>
        <Router>
          <button
            className="fixed right-5 top-3 z-50 py-2 px-4 rounded-lg font-semibold shadow transition bg-primary text-white hover:bg-accent dark:bg-primary dark:text-white dark:hover:bg-accent"
            onClick={() => setTheme(t => (t === "light" ? "dark" : "light"))}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            data-testid="theme-toggle"
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/*"
              element={
                <PrivateRoute>
                  <AppLayout />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </AppDataProvider>
    </AuthProvider>
  );
}

export default App;
