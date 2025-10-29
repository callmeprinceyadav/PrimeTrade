import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      const message =
        err.response?.data?.msg || "Invalid credentials. Please try again.";
      setError(message);
      console.error("Login Error:", err.response || err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-[380px] border border-white/20">
        <h2 className="text-3xl font-bold text-center text-white mb-4">Welcome Back</h2>
        <p className="text-sm text-gray-200 text-center mb-6">
          Log in to access your dashboard and manage tasks
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            className="w-full bg-gradient-to-r from-blue-400 to-blue-600 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-gray-200 text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-300 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
