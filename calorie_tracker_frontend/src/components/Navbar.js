import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


// PUBLIC_INTERFACE
function Navbar({ onAddEntry }) {
  const location = useLocation();
  const { logout } = useAuth();

  // Highlight logic for dashboard ("/" can also be e.g., "/dashboard")
  const activeDashboard = location.pathname === "/" || location.pathname.startsWith("/dashboard");
  return (
    <nav
      className="
        fixed top-0 left-0 h-full min-w-[200px] z-40
        bg-surface dark:bg-surface text-white flex flex-col items-start
        px-6 py-8 gap-2 border-r border-slate-800 shadow-lg
        md:static md:h-auto md:w-full md:flex-row md:items-center md:px-4 md:py-3 md:gap-2
      "
    >
      <div className="mb-6 text-2xl font-bold text-primary tracking-tight select-none md:mr-6 md:mb-0 hidden md:block">
        Calorie Tracker
      </div>
      <NavLink to="/" className={({ isActive }) => 
        (activeDashboard || isActive ? "font-semibold text-secondary bg-secondary/20" : "hover:bg-primary/20 hover:text-primary") + " rounded px-4 py-2 flex items-center w-full transition"} end>
        <span role="img" aria-label="Dashboard" className="mr-2">🏠</span> Dashboard
      </NavLink>
      <NavLink to="/log" className={({ isActive }) =>
        (isActive ? "font-semibold text-secondary bg-secondary/20" : "hover:bg-primary/20 hover:text-primary") + " rounded px-4 py-2 flex items-center w-full transition"}>
        <span role="img" aria-label="Log" className="mr-2">📝</span> Daily Log
      </NavLink>
      <button
        className="rounded px-4 py-2 bg-accent text-white font-bold hover:bg-primary transition flex items-center w-full"
        onClick={onAddEntry}
        aria-label="Add Food Entry"
      >
        <span role="img" aria-label="Add" className="mr-2">➕</span> Add Entry
      </button>
      <NavLink to="/goals" className={({ isActive }) =>
        (isActive ? "font-semibold text-secondary bg-secondary/20" : "hover:bg-primary/20 hover:text-primary") + " rounded px-4 py-2 flex items-center w-full transition"}>
        <span role="img" aria-label="Goals" className="mr-2">🎯</span> Goals
      </NavLink>
      <NavLink to="/history" className={({ isActive }) =>
        (isActive ? "font-semibold text-secondary bg-secondary/20" : "hover:bg-primary/20 hover:text-primary") + " rounded px-4 py-2 flex items-center w-full transition"}>
        <span role="img" aria-label="History" className="mr-2">📆</span> History
      </NavLink>
      <NavLink to="/nutrition" className={({ isActive }) =>
        (isActive ? "font-semibold text-secondary bg-secondary/20" : "hover:bg-primary/20 hover:text-primary") + " rounded px-4 py-2 flex items-center w-full transition"}>
        <span role="img" aria-label="Nutrition" className="mr-2">📊</span> Nutrition
      </NavLink>
      <NavLink to="/settings" className={({ isActive }) =>
        (isActive ? "font-semibold text-secondary bg-secondary/20" : "hover:bg-primary/20 hover:text-primary") + " rounded px-4 py-2 flex items-center w-full transition"}>
        <span role="img" aria-label="Settings" className="mr-2">⚙️</span> Settings
      </NavLink>
      <button
        className="mt-auto mb-2 rounded px-4 py-2 bg-highlight text-white font-bold hover:bg-amber-600 transition flex items-center w-full"
        onClick={logout}
      >
        <span role="img" aria-label="Logout" className="mr-2">🚪</span> Logout
      </button>
    </nav>
  );
}

export default Navbar;
