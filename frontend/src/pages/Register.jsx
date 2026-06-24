import { useState } from "react";

import axios from "axios";

import {

  useNavigate,

  Link

} from "react-router-dom";


function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({

      name: "",

      email: "",

      password: ""

    });

  const [error, setError] =
    useState("");


  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    });

  };


  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const response =
          await axios.post(

            "http://localhost:5000/api/auth/register",

            formData

          );

        alert(response.data.message);

        navigate("/login");

      } catch (error) {

        setError(
          "Registration failed"
        );

      }

    };


  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">

        <h1 className="text-4xl font-bold text-center mb-8">

          Register

        </h1>


        {

          error && (

            <p className="text-red-500 mb-4 text-center">

              {error}

            </p>

          )

        }


        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input

            type="text"

            name="name"

            placeholder="Full Name"

            onChange={handleChange}

            className="w-full p-4 border rounded-xl"

            required

          />


          <input

            type="email"

            name="email"

            placeholder="Email"

            onChange={handleChange}

            className="w-full p-4 border rounded-xl"

            required

          />


          <input

            type="password"

            name="password"

            placeholder="Password"

            onChange={handleChange}

            className="w-full p-4 border rounded-xl"

            required

          />


          <button

            type="submit"

            className="w-full bg-green-600 hover:bg-green-700 text-white p-4 rounded-xl transition"

          >

            Register

          </button>

        </form>


        <p className="text-center mt-6">

          Already have an account?

          {" "}

          <Link

            to="/login"

            className="text-blue-600 font-bold"

          >

            Login

          </Link>

        </p>

      </div>

    </div>

  );

}

export default Register;