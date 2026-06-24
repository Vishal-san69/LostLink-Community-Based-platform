import { useState} from "react";

import axios from "axios";

import { useNavigate} from "react-router-dom";

function AdminLogin() {

  const navigate =
    useNavigate();


  const [formData, setFormData] =
    useState({

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

      setError("");


      try {

        const response =
          await axios.post(

            "http://localhost:5000/api/auth/login",

            formData

          );


        /*
        CHECK ADMIN
        */

        if (

          response.data.user.role !==

          "admin"

        ) {

          setError(

            "Access denied"

          );

          return;

        }


        /*
        SAVE DATA
        */

        localStorage.setItem(

          "token",

          response.data.token

        );


        localStorage.setItem(

          "user",

          JSON.stringify(

            response.data.user

          )

        );


        localStorage.setItem(

          "role",

          response.data.user.role

        );


        /*
        REDIRECT
        */

        navigate("/admin");


      } catch (error) {

        setError(

          "Invalid credentials"

        );

      }

    };


  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-950 p-6">


      <div className="bg-gray-900 text-white p-10 rounded-3xl shadow-2xl w-full max-w-md">


        <h1 className="text-4xl font-bold text-center text-red-500 mb-4">

          Admin Login

        </h1>


        <p className="text-center text-gray-400 mb-8">

          Restricted Access

        </p>
        
         <div className="text-center mb-6">

  <button

    onClick={() =>

      navigate("/login")

    }

    className="text-blue-400 hover:text-blue-300 transition"

  >

    ← Back to User Login

  </button>

</div>

        {

          error && (

            <p className="bg-red-500/20 text-red-400 p-3 rounded-xl mb-4 text-center">

              {error}

            </p>

          )

        }


        <form

          onSubmit={handleSubmit}

          className="space-y-5"

        >


          <input

            type="email"

            name="email"

            placeholder="Admin Email"

            value={formData.email}

            onChange={handleChange}

            className="w-full p-4 rounded-2xl bg-gray-800 border border-gray-700"

            required

          />


          <input

            type="password"

            name="password"

            placeholder="Password"

            value={formData.password}

            onChange={handleChange}

            className="w-full p-4 rounded-2xl bg-gray-800 border border-gray-700"

            required

          />


          <button

            type="submit"

            className="w-full bg-red-600 hover:bg-red-700 p-4 rounded-2xl font-bold"

          >

            Login as Admin

          </button>

        </form>

      </div>

    </div>

  );

}

export default AdminLogin;