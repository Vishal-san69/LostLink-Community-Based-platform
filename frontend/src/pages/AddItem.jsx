import { useState, useEffect } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";


function AddItem() {

  /*
  ========================================
  FORM STATE
  ========================================
  */

  const [formData, setFormData] = useState({

    title: "",

    description: "",

    category: "",

    location: "",

    type: "lost",

    email: "",

    phone: "",

    color: "",

    incident_date: "",

    tags: "",

    community_id: ""

  });


  /*
  ========================================
  IMAGE STATE
  ========================================
  */

  const [image, setImage] =
    useState(null);


  /*
  ========================================
  ERROR STATE
  ========================================
  */

  const [error, setError] =
    useState("");


  /*
  ========================================
  COMMUNITIES STATE
  ========================================
  */

  const [

    communities,

    setCommunities

  ] = useState([]);


  /*
  ========================================
  NAVIGATION
  ========================================
  */

  const navigate = useNavigate();


  /*
  ========================================
  HANDLE INPUT CHANGE
  ========================================
  */

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    });

  };


  /*
  ========================================
  FETCH COMMUNITIES
  ========================================
  */

  useEffect(() => {

    const fetchCommunities =
      async () => {

        try {

          const token =
            localStorage.getItem(
              "token"
            );


          const response =
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
            response.data
          );

        } catch (error) {

          console.log(error);

        }

      };


    fetchCommunities();

  }, []);


  /*
  ========================================
  HANDLE SUBMIT
  ========================================
  */
const handleSubmit =
  async (e) => {

    e.preventDefault();


    /*
    ========================================
    PHONE VALIDATION
    ========================================
    */

    if (

      formData.phone.length !== 10

    ) {

      setError(

        "Phone number must be exactly 10 digits"

      );

      return;

    }


    try {

      const token =
        localStorage.getItem(
          "token"
        );
        /*
        CREATE FORM DATA
        */

        const itemData =
          new FormData();


        itemData.append(
          "title",
          formData.title
        );

        itemData.append(
          "description",
          formData.description
        );

        itemData.append(
          "category",
          formData.category
        );

        itemData.append(
          "location",
          formData.location
        );

        itemData.append(
          "type",
          formData.type
        );


        /*
        EMAIL + PHONE
        */

        itemData.append(
          "email",
          formData.email
        );

        itemData.append(
          "phone",
          formData.phone
        );


        itemData.append(
          "color",
          formData.color
        );

        itemData.append(
          "incident_date",
          formData.incident_date
        );

        itemData.append(
          "tags",
          formData.tags
        );


        /*
        COMMUNITY ID
        */

        itemData.append(

          "community_id",

          formData.community_id

        );


        /*
        IMAGE
        */

        if (image) {

          itemData.append(
            "image",
            image
          );

        }


        /*
        API REQUEST
        */

        const response =
          await axios.post(

            "http://localhost:5000/api/items",

            itemData,

            {

              headers: {

                authorization:
                  token,

                "Content-Type":

                  "multipart/form-data"

              }

            }

          );


        alert(
          response.data.message
        );


        navigate("/items");

      } catch (error) {

        console.log(error);

        setError(
          "Failed to add item"
        );

      }

    };


  return (

    <div className="min-h-screen bg-gray-100 flex justify-center p-6">

      <div className="bg-white w-full max-w-2xl p-10 rounded-2xl shadow-xl">

        <h1 className="text-4xl font-bold mb-8 text-center">

          Add Lost / Found Item

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

            name="title"

            placeholder="Title"

            onChange={handleChange}

            className="w-full p-4 border rounded-xl"

            required

          />


          <textarea

            name="description"

            placeholder="Description"

            onChange={handleChange}

            className="w-full p-4 border rounded-xl"

            required

          />


          <input

            type="text"

            name="category"

            placeholder="Category"

            onChange={handleChange}

            className="w-full p-4 border rounded-xl"

            required

          />


          <input

            type="text"

            name="location"

            placeholder="Location"

            onChange={handleChange}

            className="w-full p-4 border rounded-xl"

            required

          />


          <select

            name="type"

            onChange={handleChange}

            className="w-full p-4 border rounded-xl"

          >

            <option value="lost">

              Lost

            </option>

            <option value="found">

              Found

            </option>

          </select>


          <input

            type="file"

            accept="image/*"

            onChange={(e) =>

              setImage(
                e.target.files[0]
              )

            }

            className="w-full p-4 border rounded-xl bg-white"

          />


          {/* EMAIL */}

          <input

            type="email"

            name="email"

            placeholder="Email"

            onChange={handleChange}

            className="w-full p-4 border rounded-xl"

          />


          {/* PHONE */}

          <input

  type="tel"

  name="phone"

  placeholder="Phone Number"

  value={formData.phone}

  onChange={(e) => {

    /*
    ONLY ALLOW NUMBERS
    */

    const value =

      e.target.value.replace(

        /\D/g,

        ""

      );

    /*
    LIMIT TO 10 DIGITS
    */

    if (value.length <= 10) {

      setFormData({

        ...formData,

        phone: value

      });

    }

  }}

  className="w-full p-4 border rounded-xl"

  required

/>


          <input

            type="text"

            name="color"

            placeholder="Color"

            onChange={handleChange}

            className="w-full p-4 border rounded-xl"

          />


         <input

  type="date"

  name="incident_date"

  onChange={handleChange}

  max={new Date().toISOString().split("T")[0]}

  className="w-full p-4 border rounded-xl"

/>


          <input

            type="text"

            name="tags"

            placeholder="Tags"

            onChange={handleChange}

            className="w-full p-4 border rounded-xl"

          />


          {/* COMMUNITY DROPDOWN */}

          <select

            name="community_id"

            onChange={handleChange}

            required

            className="w-full p-4 border rounded-xl"

          >

            <option value="">

              Select Community

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


          <button

            type="submit"

            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl transition"

          >

            Submit Item

          </button>

        </form>

      </div>

    </div>

  );

}

export default AddItem;