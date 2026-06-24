import { Link } from "react-router-dom";

import {

  useEffect,

  useState

} from "react";

import axios from "axios";


function ItemList() {

  /*
  ========================================
  STATES
  ========================================
  */

  const [items, setItems] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  /*
  ========================================
  FILTER STATES
  ========================================
  */

  const [search, setSearch] =
    useState("");

  const [typeFilter,
    setTypeFilter] =
    useState("");

  const [categoryFilter,
    setCategoryFilter] =
    useState("");


  /*
  ========================================
  COMMUNITY STATES
  ========================================
  */

  const [

    communities,

    setCommunities

  ] = useState([]);


  const [

    selectedCommunity,

    setSelectedCommunity

  ] = useState("");


  /*
  ========================================
  FETCH ITEMS + COMMUNITIES
  ========================================
  */

  useEffect(() => {

    const fetchData = async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );


        /*
        FETCH ITEMS
        */

        const itemResponse =
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
          itemResponse.data
        );


        /*
        FETCH COMMUNITIES
        */

        const communityResponse =
          await axios.get(

            "http://localhost:5000/api/communities",

            {

              headers: {

                authorization:
                  token

              }

            }

          );


        setCommunities(

          communityResponse.data

        );

      } catch (error) {

        console.log(error);

        setError(

          "Failed to fetch data"

        );

      } finally {

        setLoading(false);

      }

    };


    fetchData();

  }, []);


  /*
  ========================================
  FILTER LOGIC
  ========================================
  */

  const filteredItems =

    items.filter((item) => {

      /*
      SEARCH FILTER
      */

      const matchesSearch =

        item.title

          .toLowerCase()

          .includes(

            search.toLowerCase()

          );


      /*
      TYPE FILTER
      */

      const matchesType =

        typeFilter

          ? item.type ===
            typeFilter

          : true;


      /*
      CATEGORY FILTER
      */

      const matchesCategory =

        categoryFilter

          ? item.category

              .toLowerCase()

              .includes(

                categoryFilter

                  .toLowerCase()

              )

          : true;


      /*
      COMMUNITY FILTER
      */

      const matchesCommunity =

        selectedCommunity

          ? String(
              item.community_id
            ) ===

            selectedCommunity

          : true;


      return (

        matchesSearch &&

        matchesType &&

        matchesCategory &&

        matchesCommunity

      );

    });


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

      {/* PAGE TITLE */}

      <h1 className="text-4xl font-bold mb-8 text-center">

        Lost & Found Items

      </h1>


      {/* FILTER SECTION */}

      <div className="grid md:grid-cols-4 gap-4 mb-10">

        {/* SEARCH */}

        <input

          type="text"

          placeholder="Search title"

          value={search}

          onChange={(e) =>

            setSearch(
              e.target.value
            )

          }

          className="p-4 border rounded-xl"

        />


        {/* TYPE FILTER */}

        <select

          value={typeFilter}

          onChange={(e) =>

            setTypeFilter(
              e.target.value
            )

          }

          className="p-4 border rounded-xl"

        >

          <option value="">

            All Types

          </option>

          <option value="lost">

            Lost

          </option>

          <option value="found">

            Found

          </option>

        </select>


        {/* CATEGORY FILTER */}

        <input

          type="text"

          placeholder="Category"

          value={categoryFilter}

          onChange={(e) =>

            setCategoryFilter(
              e.target.value
            )

          }

          className="p-4 border rounded-xl"

        />


        {/* COMMUNITY FILTER */}

        <select

          value={selectedCommunity}

          onChange={(e) =>

            setSelectedCommunity(

              e.target.value

            )

          }

          className="p-4 border rounded-xl"

        >

          <option value="">

            All Communities

          </option>


          {

            communities.map(

              (community) => (

                <option

                  key={community.id}

                  value={community.id}

                >

                  {community.name}

                </option>

              )

            )

          }

        </select>

      </div>


      {/* ERROR */}

      {

        error && (

          <p className="text-red-500 mb-6">

            {error}

          </p>

        )

      }


      {/* ITEMS GRID */}

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {

          filteredItems.length === 0

            ? (

              <div className="text-xl">

                No items found

              </div>

            )

            : (

              filteredItems.map(

                (item) => (

                  <div

                    key={item.id}

                    className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition duration-300"

                  >

                    {/* IMAGE */}

                   {
  item.image_url && (

    <div className="w-full h-72 bg-gray-100 flex items-center justify-center overflow-hidden">

      <img

        src={item.image_url}

        alt={item.title}

        className="w-full h-full object-contain p-2"

      />

    </div>

  )

}


                    {/* CARD BODY */}

                    <div className="p-5">

                      {/* TITLE */}

                      <div className="flex justify-between items-center">

                        <h2 className="text-2xl font-bold">

                          {item.title}

                        </h2>


                        {/* STATUS */}

                        <span

                          className={`px-3 py-1 rounded-full text-sm text-white

                          ${

                            item.status ===
                            "recovered"

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


                        <p>

                          <strong>

                            Posted By:

                          </strong>

                          {" "}

                          {item.posted_by}

                        </p>

                      </div>


                      {/* VIEW DETAILS */}

                     <div className="mt-4 flex gap-3">

  {/* EMAIL */}

  {

    item.email && (

      <a

        href={`mailto:${item.email}`}

        className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition"

      >

        Email

      </a>

    )

  }


  {/* WHATSAPP */}

  {

    item.phone && (

      <a

        href={`https://wa.me/${item.phone}`}

        target="_blank"

        rel="noreferrer"

        className="flex-1 text-center bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition"

      >

        WhatsApp

      </a>

    )

  }


  {/* CALL */}

  {

    item.phone && (

      <a

        href={`tel:${item.phone}`}

        className="flex-1 text-center bg-gray-900 hover:bg-black text-white py-3 rounded-xl transition"

      >

        Call

      </a>

    )

  }

</div>

                    </div>

                  </div>

                )

              )

            )

        }

      </div>

    </div>

  );

}

export default ItemList;