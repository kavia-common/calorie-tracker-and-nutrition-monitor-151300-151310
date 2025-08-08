import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


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
    <div className="w-screen h-screen flex items-center justify-center bg-surface">
      <div className="w-full max-w-sm rounded-2xl shadow-2xl bg-surfacelight p-8 text-white flex flex-col items-center">
        <h2 className="text-xl font-bold text-primary mb-5">Sign In</h2>
        {error && (
          <div className="mb-3 rounded bg-highlight/10 text-highlight px-4 py-2 font-medium">{error}</div>
        )}
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder="Email"
            className="rounded bg-surface px-3 py-2 border border-primary/30 text-white focus:ring-2 focus:ring-accent focus:outline-none"
          />
          <input
            type="password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            required
            autoComplete="on"
            placeholder="Password"
            className="rounded bg-surface px-3 py-2 border border-primary/30 text-white focus:ring-2 focus:ring-accent focus:outline-none"
          />
          <button
            className="rounded-lg bg-primary py-3 font-bold text-white transition hover:bg-accent"
            type="submit"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-secondary text-center text-sm">
          Don't have an account?{" "}
          <Link className="text-accent underline hover:text-primary" to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
