import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      // Save JWT token
      localStorage.setItem("token", res.data.token);

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };return (
  <div className="min-h-screen flex items-center justify-center">
    <form
      onSubmit={handleSubmit}
      className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg"
    >
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Welcome Back
      </h2>

      {error && (
        <p className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">
          {error}
        </p>
      )}

      <div className="mb-4">
        <label className="block text-gray-600 mb-1">Email</label>
        <input
          type="email"
          name="email"
          placeholder="you@example.com"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={handleChange}
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-600 mb-1">Password</label>
        <input
          type="password"
          name="password"
          placeholder="••••••••"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Login
      </button>

      <p className="text-center text-sm text-gray-600 mt-4">
        Don’t have an account?{" "}
        <span
          className="text-blue-600 font-medium cursor-pointer hover:underline"
          onClick={() => navigate("/register")}
        >
          Register
        </span>
      </p>
    </form>
  </div>
);


 
}
