import {

  useEffect,

  useState

} from "react";

import axios from "axios";

import { Link } from "react-router-dom";


function Dashboard() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );


  // stats state
  const [stats, setStats] = useState({

    lost: 0,

    found: 0,

    recovered: 0

  });


  /*
  ========================================
  FETCH DASHBOARD STATS
  ========================================
  */

  useEffect(() => {

    const fetchStats = async () => {

      try {

        const token =
          localStorage.getItem("token");

        const response =
          await axios.get(

            "http://localhost:5000/api/items/stats/summary",

            {

              headers: {

                authorization: token

              }

            }

          );

        setStats(response.data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchStats();

  }, []);


  return (

    <div className="min-h-screen bg-gray-100 p-6">

      {/* HERO SECTION */}

      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-10 shadow-lg">

        <h1 className="text-5xl font-bold mb-4">

          Welcome,

          {" "}

          {user?.name}

          

        </h1>

        <p className="text-lg">

          Smart Lost & Found Management System

        </p>

      </div>


      {/* QUICK ACTIONS */}

      <div className="grid md:grid-cols-3 gap-6 mt-10">

        <Link
          to="/add-item"
          className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition"
        >

          <h2 className="text-2xl font-bold text-blue-600">

            Add Item

          </h2>

          <p className="mt-2 text-gray-600">

            Report lost/found item

          </p>

        </Link>


        <Link
          to="/items"
          className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition"
        >

          <h2 className="text-2xl font-bold text-green-600">

            Browse Items

          </h2>

          <p className="mt-2 text-gray-600">

            Search lost & found items

          </p>

        </Link>


        <Link
          to="/my-items"
          className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition"
        >

          <h2 className="text-2xl font-bold text-purple-600">

            My Items

          </h2>

          <p className="mt-2 text-gray-600">

            Manage your items

          </p>

        </Link>

      </div>


      {/* REAL STATS */}

      <div className="grid md:grid-cols-3 gap-6 mt-10">

        {/* LOST */}

        <div className="bg-white p-6 rounded-2xl shadow-md">

          <h3 className="text-xl font-bold text-gray-700">

            Lost Items

          </h3>

          <p className="text-5xl font-bold text-red-500 mt-4">

            {stats.lost || 0}

          </p>

        </div>


        {/* FOUND */}

        <div className="bg-white p-6 rounded-2xl shadow-md">

          <h3 className="text-xl font-bold text-gray-700">

            Found Items

          </h3>

          <p className="text-5xl font-bold text-green-500 mt-4">

            {stats.found || 0}

          </p>

        </div>


        {/* RECOVERED */}

        <div className="bg-white p-6 rounded-2xl shadow-md">

          <h3 className="text-xl font-bold text-gray-700">

            Recovered

          </h3>

          <p className="text-5xl font-bold text-blue-500 mt-4">

            {stats.recovered || 0}

          </p>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;