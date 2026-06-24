import {

  useEffect,

  useState

} from "react";

import axios from "axios";

import {

  useParams

} from "react-router-dom";


function ItemDetails() {

  /*
  ========================================
  GET ITEM ID
  ========================================
  */

  const { id } = useParams();


  /*
  ========================================
  STATES
  ========================================
  */

  const [item, setItem] =
    useState(null);

  const [matches, setMatches] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  /*
  ========================================
  FETCH ITEM + MATCHES
  ========================================
  */

  useEffect(() => {

    const fetchData = async () => {

      try {

        const token =
          localStorage.getItem("token");


        /*
        FETCH ITEM
        */

        const itemResponse =
          await axios.get(

            `http://localhost:5000/api/items/${id}`,

            {

              headers: {

                authorization: token

              }

            }

          );

        setItem(
          itemResponse.data
        );


        /*
        FETCH MATCHES
        */

        const matchResponse =
          await axios.get(

            `http://localhost:5000/api/items/matches/${id}`,

            {

              headers: {

                authorization: token

              }

            }

          );

        setMatches(
          matchResponse.data
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    fetchData();

  }, [id]);


  /*
  ========================================
  LOADING
  ========================================
  */

  if (loading) {

    return (

      <div className="text-center mt-10 text-2xl font-bold">

        Loading...

      </div>

    );

  }


  /*
  ========================================
  NO ITEM
  ========================================
  */

  if (!item) {

    return (

      <div className="text-center mt-10">

        Item not found

      </div>

    );

  }


  return (

    <div className="min-h-screen bg-gray-100 p-6">

      {/* ITEM DETAILS */}

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl mx-auto">

        {

          item.image_url && (

            <img

              src={item.image_url}

              alt={item.title}

              className="w-full h-96 object-cover"

            />

          )

        }


        <div className="p-8">

          <h1 className="text-4xl font-bold">

            {item.title}

          </h1>


          <p className="text-gray-600 mt-4">

            {item.description}

          </p>


          <div className="mt-6 space-y-2">

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
                Color:
              </strong>

              {" "}

              {item.color}

            </p>


            <p>

              <strong>
                Tags:
              </strong>

              {" "}

              {item.tags}

            </p>

          </div>

        </div>

        {/* CONTACT BUTTONS */}

<div className="mt-8 flex flex-wrap gap-4">

  {/* EMAIL */}

  {

    item.contact_info &&

    item.contact_info.includes("@") && (

      <a

        href={`mailto:${item.contact_info.split(",")[0]}`}

        className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition"

      >

        Email Owner

      </a>

    )

  }


  {/* WHATSAPP */}

  {

    item.contact_info &&

    item.contact_info.includes(",") && (

      <a

        href={`https://wa.me/${item.contact_info.split(",")[1]}`}

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

    item.contact_info &&

    item.contact_info.includes(",") && (

      <a

        href={`tel:${item.contact_info.split(",")[1]}`}

        className="flex-1 text-center bg-gray-900 hover:bg-black text-white py-3 rounded-xl transition"

      >

        Call

      </a>

    )

  }

</div>

      </div>


      {/* MATCHES */}

      <div className="max-w-6xl mx-auto mt-12">

        <h2 className="text-3xl font-bold mb-8">

          Possible Matches

        </h2>


        {

          matches.length === 0

            ? (

              <p className="text-gray-600">

                No matches found

              </p>

            )

            : (

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                {

                  matches.map((match) => (

                    <div

                      key={match.id}

                      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"

                    >

                      {

                        match.image_url && (

                          <img

                            src={match.image_url}

                            alt={match.title}

                            className="w-full h-56 object-cover"

                          />

                        )

                      }


                      <div className="p-5">

                        <h3 className="text-2xl font-bold">

                          {match.title}

                        </h3>


                        <p className="text-gray-600 mt-2">

                          {match.description}

                        </p>


                        {/* MATCH SCORE */}

                        <div className="mt-4">

                          <span className="bg-green-500 text-white px-4 py-2 rounded-full">

                            Match Score:

                            {" "}

                            {match.score}

                          </span>

                        </div>


                        {/* MATCH PERCENT */}

                        <div className="mt-4">

                          <div className="w-full bg-gray-200 rounded-full h-4">

                            <div

                              className="bg-blue-600 h-4 rounded-full"

                              style={{

                                width: `${Math.min(

                                  match.score * 25,

                                  100

                                )}%`

                              }}

                            />

                          </div>


                          <p className="mt-2 text-sm">

                            {

                              Math.min(

                                match.score * 25,

                                100

                              )

                            }

                            % Match

                          </p>

                        </div>


                        {/* CONTACT */}

                        <div className="mt-6">

  {

    match.contact_info?.includes("@")

      ? (

        <a

          href={`mailto:${match.contact_info}`}

          className="block text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition"

        >

          Contact via Email

        </a>

      )

      : (

        <a

          href={`https://wa.me/${match.contact_info}`}

          target="_blank"

          rel="noreferrer"

          className="block text-center bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition"

        >

          Contact via WhatsApp

        </a>

      )

  }

</div>

                      </div>

                    </div>

                  ))

                }

              </div>

            )

        }

      </div>

    </div>

  );

}

export default ItemDetails;