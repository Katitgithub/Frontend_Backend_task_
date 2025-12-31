import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}
        {success && <p className="text-green-500 mb-2">{success}</p>}

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full border p-2 mb-3"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-2 mb-3"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-2 mb-4"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
