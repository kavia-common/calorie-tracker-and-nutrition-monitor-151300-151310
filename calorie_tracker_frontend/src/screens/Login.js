import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Auth.css";

// PUBLIC_INTERFACE
function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const result = await login(email, pw);
    if (result.success) {
      navigate("/");
    } else {
      setError(result.error || "Login failed.");
    }
  }

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <h2>Sign In</h2>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Email" />
          <input type="password" value={pw} onChange={e => setPw(e.target.value)} required autoComplete="on" placeholder="Password" />
          <button className="btn btn-large" type="submit">Login</button>
        </form>
        <p className="auth-meta">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
