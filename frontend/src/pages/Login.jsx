import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );
      localStorage.setItem(
        "role",
        response.data.user.role
      );

      navigate("/dashboard");
    } catch (error) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-8">

        {/* Logo */}

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold">
            <span className="text-indigo-600">
              Lost
            </span>
            <span className="text-slate-800">
              Link
            </span>
          </h1>

          <p className="text-slate-500 mt-2">
            Community Based Lost & Found Platform
          </p>

        </div>

        {/* Heading */}

        <div className="mb-6">

          <h2 className="text-2xl font-semibold text-slate-800">
            Welcome Back
          </h2>

          <p className="text-slate-500 mt-1">
            Sign in to continue
          </p>

        </div>

        {/* Error */}

        {error && (
          <div className="mb-5 rounded-lg bg-red-50 border border-red-200 text-red-600 px-4 py-3">
            {error}
          </div>
        )}

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>

            <label className="block mb-2 text-sm font-medium text-slate-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />

          </div>

          <div>

            <label className="block mb-2 text-sm font-medium text-slate-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />

          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition-all duration-300"
          >
            Login
          </button>

        </form>

        {/* Register */}

        <div className="text-center mt-6 text-slate-600">

          Don't have an account?

          <Link
            to="/register"
            className="ml-2 text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            Register
          </Link>

        </div>

        {/* Divider */}

        <div className="flex items-center my-6">

          <div className="flex-1 border-t border-slate-200"></div>

          <span className="px-3 text-sm text-slate-400">
            OR
          </span>

          <div className="flex-1 border-t border-slate-200"></div>

        </div>

        {/* Admin */}

        <Link
          to="/admin-login"
          className="block text-center border border-slate-300 rounded-xl py-3 font-medium text-slate-700 hover:bg-slate-100 transition"
        >
          Admin Login
        </Link>

      </div>

    </div>
  );
}

export default Login;