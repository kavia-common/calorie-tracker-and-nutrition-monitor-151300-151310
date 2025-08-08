import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // user object or null
  const [loading, setLoading] = useState(true);

  // Simulate restoring authentication from localStorage
  useEffect(() => {
    const authData = localStorage.getItem("auth");
    if (authData) {
      try {
        const userObj = JSON.parse(authData);
        setUser(userObj);
      } catch (e) {
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  // PUBLIC_INTERFACE
  async function login(email, password) {
    setLoading(true);
    try {
      // TODO: Replace with real API call to backend /login
      // let resp = await fetch('/api/login', { ... })
      // let data = await resp.json()
      // if (resp.ok) ... etc
      if (email === "test@example.com" && password === "password") {
        const fakeUser = { email, name: "Jane Doe", token: "demo-token" };
        setUser(fakeUser);
        localStorage.setItem("auth", JSON.stringify(fakeUser));
        setLoading(false);
        return { success: true };
      }
      setLoading(false);
      return { success: false, error: "Invalid email/password (demo mode)." };
    } catch (err) {
      setLoading(false);
      return { success: false, error: "Network error" };
    }
  }

  // PUBLIC_INTERFACE
  async function register(email, name, password) {
    setLoading(true);
    try {
      // TODO: Replace with real backend call
      setTimeout(() => {
        setUser({ email, name, token: "demo-token" });
        localStorage.setItem("auth", JSON.stringify({ email, name, token: "demo-token" }));
        setLoading(false);
      }, 400);
      return { success: true };
    } catch (err) {
      setLoading(false);
      return { success: false, error: "Registration failed (demo)." };
    }
  }

  // PUBLIC_INTERFACE
  // Remove the user and their token on logout
  function logout() {
    setUser(null);
    localStorage.removeItem("auth");
  }

  const value = {
    isAuthenticated: !!user,
    user,
    loading,
    login,
    logout,
    register
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// PUBLIC_INTERFACE
export function useAuth() {
  return useContext(AuthContext);
}
