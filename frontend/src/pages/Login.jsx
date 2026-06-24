import {
  useState
} from "react";

import axios from "axios";

import {
  useNavigate,
  Link
} from "react-router-dom";


function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      localStorage.setItem(
        "role",
        response.data.user.role
      );

      navigate("/");

    } catch (error) {

      setError("Invalid credentials");

    }

  };


  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-black p-6">

      <div className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-10 w-full max-w-md text-white">

        <h1 className="text-5xl font-bold text-center mb-3">
          Welcome Back
        </h1>

        <p className="text-center text-gray-300 mb-8">
          Login to continue
        </p>

        {
          error && (
            <div className="bg-red-500/20 text-red-300 p-3 rounded-xl mb-5 text-center">
              {error}
            </div>
          )
        }

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-300"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-300"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 transition-all duration-300 py-4 rounded-2xl font-bold hover:scale-105"
          >
            Login
          </button>

        </form>

        <p className="text-center mt-6 text-gray-300">
          Don’t have an account?

          <Link
            to="/register"
            className="text-blue-300 ml-2 hover:underline"
          >
            Register
          </Link>

        </p>

        <div className="text-center mt-5">

          <Link
            to="/admin-login"
            className="text-red-300 hover:underline"
          >
            Admin Login
          </Link>

        </div>

      </div>

    </div>

  );

}

export default Login;