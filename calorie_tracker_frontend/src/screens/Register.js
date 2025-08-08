import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Auth.css";

// PUBLIC_INTERFACE
function Register() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!email || !name || !pw) {
      setError("All fields required.");
      return;
    }
    const result = await register(email, name, pw);
    if (result.success) {
      navigate("/");
    } else {
      setError(result.error || "Registration failed.");
    }
  }

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <h2>Create Account</h2>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Email" />
          <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Name" />
          <input type="password" value={pw} onChange={e => setPw(e.target.value)} required autoComplete="on" placeholder="Password" />
          <button className="btn btn-large" type="submit">Register</button>
        </form>
        <p className="auth-meta">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
