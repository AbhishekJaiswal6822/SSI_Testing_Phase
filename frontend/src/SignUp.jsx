// src/SignUp.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

function SignUp() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      await register(name, email, password, phone);
      navigate("/"); // redirect after success
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen lg:h-screen bg-gray-50 flex items-center justify-center px-4 py-12 mt-12">
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-slate-200 relative z-10"
      >
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Create an Account
        </h2>
        <p className="text-slate-500 mb-6">
          Join the Marathon Run community and register for the event.
        </p>

        <label className="block text-sm font-medium text-slate-700 mb-1">
          Full Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-transparent"
          required
        />

        <label className="block text-sm font-medium text-slate-700 mb-1">
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="john@example.com"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-transparent"
          required
        />

        <label className="block text-sm font-medium text-slate-700 mb-1">
          Phone Number (optional)
        </label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="1234567890"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-transparent"
        />

        <label className="block text-sm font-medium text-slate-700 mb-1">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter a password"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-transparent"
          required
        />

        {err && <p className="text-red-500 text-sm mb-3">{err}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg text-white font-semibold cursor-pointer shadow-md hover:opacity-95"
          style={{ background: "linear-gradient(90deg,#05c6d7,#0c9aa3)" }}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <div className="text-center mt-6 text-sm">
          Already have an account?{" "}
          <Link to="/signin" className="text-teal-600 font-medium">
            Sign in here
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

export default SignUp;