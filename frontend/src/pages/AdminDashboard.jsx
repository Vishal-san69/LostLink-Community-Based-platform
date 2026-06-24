import {

  useEffect,

  useState

} from "react";

import axios from "axios";


function AdminDashboard() {

  /*
  ========================================
  STATES
  ========================================
  */

  const [stats, setStats] =
    useState({});

  const [

    communities,

    setCommunities

  ] = useState([]);

  const [items, setItems] =
    useState([]);

  const [users, setUsers] =
    useState([]);


  const [

    communityForm,

    setCommunityForm

  ] = useState({

    name: "",

    type: ""

  });


  /*
  ========================================
  FETCH DATA
  ========================================
  */

  useEffect(() => {

    fetchData();

  }, []);


  const fetchData =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );


        /*
        ========================================
        FETCH STATS
        ========================================
        */

        const statsRes =
          await axios.get(

            "http://localhost:5000/api/admin/stats",

            {

              headers: {

                authorization:
                  token

              }

            }

          );

        setStats(
          statsRes.data
        );


        /*
        ========================================
        FETCH COMMUNITIES
        ========================================
        */

        const communitiesRes =
          await axios.get(

            "http://localhost:5000/api/admin/communities",

            {

              headers: {

                authorization:
                  token

              }

            }

          );

        setCommunities(
          communitiesRes.data
        );


        /*
        ========================================
        FETCH ITEMS
        ========================================
        */

        const itemsRes =
          await axios.get(

            "http://localhost:5000/api/items",

            {

              headers: {

                authorization:
                  token

              }

            }

          );

        setItems(
          itemsRes.data
        );


        /*
        ========================================
        FETCH USERS
        ========================================
        */

        const usersRes =
          await axios.get(

            "http://localhost:5000/api/admin/users",

            {

              headers: {

                authorization:
                  token

              }

            }

          );

        setUsers(
          usersRes.data
        );

      } catch (error) {

        console.log(error);

      }

    };


  /*
  ========================================
  CREATE COMMUNITY
  ========================================
  */

  const createCommunity =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.post(

          "http://localhost:5000/api/admin/community",

          communityForm,

          {

            headers: {

              authorization:
                token

            }

          }

        );

        alert(
          "Community created"
        );

        setCommunityForm({

          name: "",

          type: ""

        });

        fetchData();

      } catch (error) {

        console.log(error);

      }

    };


  /*
  ========================================
  DELETE COMMUNITY
  ========================================
  */

  const deleteCommunity =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete community?"
        );

      if (!confirmDelete)
        return;

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.delete(

          `http://localhost:5000/api/admin/community/${id}`,

          {

            headers: {

              authorization:
                token

            }

          }

        );

        alert(
          "Community deleted"
        );

        fetchData();

      } catch (error) {

        alert(

          error.response.data.message

        );

      }

    };


  /*
  ========================================
  DELETE ITEM
  ========================================
  */

  const deleteItem =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete item?"
        );

      if (!confirmDelete)
        return;

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.delete(

          `http://localhost:5000/api/admin/item/${id}`,

          {

            headers: {

              authorization:
                token

            }

          }

        );

        alert(
          "Item deleted"
        );

        fetchData();

      } catch (error) {

        console.log(error);

      }

    };


  /*
  ========================================
  DELETE USER
  ========================================
  */

  const deleteUser =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete user?"
        );

      if (!confirmDelete)
        return;

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.delete(

          `http://localhost:5000/api/admin/user/${id}`,

          {

            headers: {

              authorization:
                token

            }

          }

        );

        alert(
          "User deleted"
        );

        fetchData();

      } catch (error) {

        console.log(error);

      }

    };


  return (

    <div className="min-h-screen bg-gray-100 p-8">


      {/* HEADER */}

      <div className="bg-gradient-to-r from-gray-900 to-blue-900 text-white rounded-3xl p-10 mb-10 shadow-xl">

        <h1 className="text-5xl font-bold mb-4">

          Admin Control Panel

        </h1>

        <p className="text-xl text-gray-200">

          Manage communities, items, users, and platform analytics

        </p>

      </div>


      {/* STATS */}

      <div className="grid md:grid-cols-4 gap-6 mb-10">


        <div className="bg-white rounded-3xl p-8 shadow-lg">

          <h2 className="text-gray-500 text-lg">

            Total Users

          </h2>

          <p className="text-5xl font-bold text-blue-600 mt-4">

            {stats.totalUsers}

          </p>

        </div>


        <div className="bg-white rounded-3xl p-8 shadow-lg">

          <h2 className="text-gray-500 text-lg">

            Total Items

          </h2>

          <p className="text-5xl font-bold text-green-600 mt-4">

            {stats.totalItems}

          </p>

        </div>


        <div className="bg-white rounded-3xl p-8 shadow-lg">

          <h2 className="text-gray-500 text-lg">

            Recovered

          </h2>

          <p className="text-5xl font-bold text-yellow-500 mt-4">

            {stats.recoveredItems}

          </p>

        </div>


        <div className="bg-white rounded-3xl p-8 shadow-lg">

          <h2 className="text-gray-500 text-lg">

            Communities

          </h2>

          <p className="text-5xl font-bold text-purple-600 mt-4">

            {stats.totalCommunities}

          </p>

        </div>

      </div>


      {/* CREATE COMMUNITY */}

      <div className="bg-white rounded-3xl p-8 shadow-lg mb-10">

        <h2 className="text-3xl font-bold mb-6">

          Create Community

        </h2>


        <div className="grid md:grid-cols-3 gap-4">

          <input

            type="text"

            placeholder="Community Name"

            value={communityForm.name}

            onChange={(e) =>

              setCommunityForm({

                ...communityForm,

                name: e.target.value

              })

            }

            className="border p-4 rounded-2xl"

          />


          <input

            type="text"

            placeholder="Community Type"

            value={communityForm.type}

            onChange={(e) =>

              setCommunityForm({

                ...communityForm,

                type: e.target.value

              })

            }

            className="border p-4 rounded-2xl"

          />


          <button

            onClick={createCommunity}

            className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl"

          >

            Create

          </button>

        </div>

      </div>


      {/* COMMUNITIES */}

      <div className="bg-white rounded-3xl p-8 shadow-lg mb-10">

        <h2 className="text-3xl font-bold mb-6">

          Manage Communities

        </h2>

        <div className="space-y-4">

          {

            communities.map((community) => (

              <div

                key={community.id}

                className="flex justify-between items-center border rounded-2xl p-5"

              >

                <div>

                  <h3 className="font-bold text-xl">

                    {community.name}

                  </h3>

                  <p className="text-gray-500">

                    {community.type}

                  </p>

                </div>

                <button

                  onClick={() =>

                    deleteCommunity(
                      community.id
                    )

                  }

                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-2xl"

                >

                  Delete

                </button>

              </div>

            ))

          }

        </div>

      </div>


      {/* ITEMS */}

      <div className="bg-white rounded-3xl p-8 shadow-lg mb-10">

        <h2 className="text-3xl font-bold mb-6">

          Moderate Items

        </h2>

        <div className="space-y-6">

          {

            items.map((item) => (

              <div

                key={item.id}

                className="border rounded-3xl p-5 flex flex-col md:flex-row gap-6 items-center justify-between"

              >

                {/* IMAGE */}


<img

  src={item.image_url}

  alt={item.title}

  className="w-40 h-40 object-cover rounded-2xl border"

/>

                {/* INFO */}

                <div className="flex-1">

                  <h3 className="text-2xl font-bold">

                    {item.title}

                  </h3>

                  <p className="text-gray-500 mt-2">

                    {item.description}

                  </p>

                  <p className="mt-2 font-semibold">

                    Status: {item.status}

                  </p>

                  <p className="text-sm text-gray-500">

                    Location: {item.location}

                  </p>

                </div>

                {/* DELETE */}

                <button

                  onClick={() =>

                    deleteItem(item.id)

                  }

                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-2xl"

                >

                  Delete

                </button>

              </div>

            ))

          }

        </div>

      </div>


      {/* USERS */}

      <div className="bg-white rounded-3xl p-8 shadow-lg">

        <h2 className="text-3xl font-bold mb-6">

          Manage Users

        </h2>

        <div className="space-y-4">

          {

            users.map((user) => (

              <div

                key={user.id}

                className="flex justify-between items-center border rounded-2xl p-5"

              >

                <div>

                  <h3 className="font-bold text-xl">

                    {user.name}

                  </h3>

                  <p className="text-gray-500">

                    {user.email}

                  </p>

                  <p className="text-sm text-blue-600">

                    Role: {user.role}

                  </p>

                </div>

                <button

                  onClick={() =>

                    deleteUser(user.id)

                  }

                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-2xl"

                >

                  Delete User

                </button>

              </div>

            ))

          }

        </div>

      </div>

    </div>

  );

}

export default AdminDashboard;