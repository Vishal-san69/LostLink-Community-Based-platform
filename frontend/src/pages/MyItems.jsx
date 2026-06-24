import {

  useEffect,

  useState

} from "react";

import axios from "axios";


function MyItems() {

  /*
  ========================================
  STATES
  ========================================
  */

  const [items, setItems] =
    useState([]);

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(true);


  /*
  ========================================
  FETCH USER ITEMS
  ========================================
  */

  const fetchMyItems = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await axios.get(

          "http://localhost:5000/api/items/user/my-items",

          {

            headers: {

              authorization: token

            }

          }

        );

      setItems(response.data);

    } catch (error) {

      console.log(error);

      setError(
        "Failed to fetch items"
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    fetchMyItems();

  }, []);


  /*
  ========================================
  DELETE ITEM
  ========================================
  */

  const deleteItem = async (id) => {

    try {

      const token =
        localStorage.getItem("token");

      await axios.delete(

        `http://localhost:5000/api/items/${id}`,

        {

          headers: {

            authorization: token

          }

        }

      );

      fetchMyItems();

    } catch (error) {

      console.log(error);

    }

  };


  /*
  ========================================
  UPDATE STATUS
  ========================================
  */

  const updateStatus = async (

    id,

    status

  ) => {

    try {

      const token =
        localStorage.getItem("token");

      await axios.put(

        `http://localhost:5000/api/items/${id}/status`,

        {

          status

        },

        {

          headers: {

            authorization: token

          }

        }

      );

      fetchMyItems();

    } catch (error) {

      console.log(error);

    }

  };


  /*
  ========================================
  LOADING UI
  ========================================
  */

  if (loading) {

    return (

      <div className="text-center mt-10 text-2xl font-bold">

        Loading...

      </div>

    );

  }


  return (

    <div className="min-h-screen bg-gray-100 p-6">

      {/* TITLE */}

      <h1 className="text-4xl font-bold mb-8 text-center">

        My Items

      </h1>


      {/* ERROR */}

      {

        error && (

          <p className="text-red-500 mb-4">

            {error}

          </p>

        )

      }


      {/* GRID */}

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {

          items.length === 0

            ? (

              <div className="text-xl">

                No items found

              </div>

            )

            : (

              items.map((item) => (

                <div

                  key={item.id}

                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition duration-300"

                >

                  {/* IMAGE */}

                  {

                    item.image_url && (

                      <img

                        src={item.image_url}

                        alt={item.title}

                        className="w-full h-64 object-cover"

                      />

                    )

                  }


                  {/* CARD BODY */}

                  <div className="p-5">

                    {/* TITLE + STATUS */}

                    <div className="flex justify-between items-center">

                      <h2 className="text-2xl font-bold">

                        {item.title}

                      </h2>


                      <span

                        className={`px-3 py-1 rounded-full text-sm text-white

                        ${

                          item.status === "recovered"

                            ? "bg-green-500"

                            : "bg-yellow-500"

                        }

                        `}

                      >

                        {item.status}

                      </span>

                    </div>


                    {/* DESCRIPTION */}

                    <p className="text-gray-600 mt-3">

                      {item.description}

                    </p>


                    {/* DETAILS */}

                    <div className="mt-4 space-y-2 text-sm">

                      <p>

                        <strong>
                          Category:
                        </strong>

                        {" "}

                        {item.category}

                      </p>

                      <p>

                        <strong>
                          Location:
                        </strong>

                        {" "}

                        {item.location}

                      </p>

                      <p>

                        <strong>
                          Type:
                        </strong>

                        {" "}

                        {item.type}

                      </p>

                    </div>


                    {/* ACTION BUTTONS */}

                    <div className="flex gap-3 mt-6">

                      <button

                        onClick={() =>

                          updateStatus(

                            item.id,

                            "recovered"

                          )

                        }

                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition"

                      >

                        Recover

                      </button>


                      <button

                        onClick={() =>

                          deleteItem(item.id)

                        }

                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl transition"

                      >

                        Delete

                      </button>

                    </div>

                  </div>

                </div>

              ))

            )

        }

      </div>

    </div>

  );

}

export default MyItems;