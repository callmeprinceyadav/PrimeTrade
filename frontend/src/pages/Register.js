import { useState } from "react";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await API.post("/auth/register", form);
      alert("Registration successful! Please log in.");
      navigate("/");
    } catch (err) {
      const message =
        err.response?.data?.msg || "Something went wrong. Please try again.";
      setError(message);
      console.error("Signup Error:", err.response || err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-[380px] border border-white/20">
        <h2 className="text-3xl font-bold text-center text-white mb-4">Create Account</h2>
        <p className="text-sm text-gray-200 text-center mb-6">
          Join the platform to manage your tasks efficiently
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            required
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email Address"
            required
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          {error && (
            <div className="bg-red-500/20 text-red-200 p-2 text-center rounded">
              {error}
            </div>
          )}

          <button
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
          >
            {loading ? "Signing up..." : "Register"}
          </button>
        </form>

        <p className="text-gray-200 text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/" className="text-green-300 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
