// src/SignIn.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

function SignIn() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      setErr(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-slate-200 relative z-10"
      >
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Sign In</h2>
        <p className="text-slate-500 mb-6">Choose your preferred sign-in method</p>

        <div className="flex mb-6">
          {/* <button
            type="button"
            className="flex-1 py-2 border border-slate-200 rounded-l-lg bg-white text-slate-700 font-medium hover:bg-slate-50"
          >
            Email
          </button> */}
          {/* <button
            type="button"
            className="flex-1 py-2 border-t border-b border-r border-slate-200 rounded-r-lg bg-gray-100 text-slate-500 font-medium hover:bg-gray-100"
          >
            Phone
          </button> */}
        </div>

        <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="john@example.com"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-transparent"
          required
        />

        <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter your password"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-transparent"
          required
        />

        {err && <div className="text-red-500 mb-3 text-sm">{err}</div>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg text-white font-semibold cursor-pointer shadow-md hover:opacity-95"
          style={{ background: "linear-gradient(90deg,#05c6d7,#0c9aa3)" }}
        >
          {loading ? "Signing in..." : "Sign In with Email"}
        </button>

        <div className="text-center mt-6 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-teal-600 font-medium">
            Sign up here
          </Link>
        </div>

        <div className="text-center mt-3 text-sm">
          <Link to="/" className="text-teal-500">
            Back to Home
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
