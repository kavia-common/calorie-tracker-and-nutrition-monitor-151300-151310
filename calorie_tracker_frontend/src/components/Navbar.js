import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Navbar.css";

// PUBLIC_INTERFACE
function Navbar({ onAddEntry }) {
  const location = useLocation();
  const { logout } = useAuth();

  // Highlight logic for dashboard ("/" can also be e.g., "/dashboard")
  const activeDashboard = location.pathname === "/" || location.pathname.startsWith("/dashboard");
  return (
    <nav className="navbar">
      <div className="navbar-title">Calorie Tracker</div>
      <NavLink to="/" className={activeDashboard ? "active" : ""} end>
        <span role="img" aria-label="Dashboard">🏠</span> Dashboard
      </NavLink>
      <NavLink to="/log">
        <span role="img" aria-label="Log">📝</span> Daily Log
      </NavLink>
      <button className="navbar-add" onClick={onAddEntry} aria-label="Add Food Entry">
        <span role="img" aria-label="Add">➕</span> Add Entry
      </button>
      <NavLink to="/goals">
        <span role="img" aria-label="Goals">🎯</span> Goals
      </NavLink>
      <NavLink to="/history">
        <span role="img" aria-label="History">📆</span> History
      </NavLink>
      <NavLink to="/nutrition">
        <span role="img" aria-label="Nutrition">📊</span> Nutrition
      </NavLink>
      <NavLink to="/settings">
        <span role="img" aria-label="Settings">⚙️</span> Settings
      </NavLink>
      <button className="navbar-logout" onClick={logout}>
        <span role="img" aria-label="Logout">🚪</span> Logout
      </button>
    </nav>
  );
}

export default Navbar;
