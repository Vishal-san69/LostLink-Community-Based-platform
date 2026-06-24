import {

  NavLink,

  useNavigate

} from "react-router-dom";


function Navbar() {

  /*
  ========================================
  NAVIGATION
  ========================================
  */

  const navigate =
    useNavigate();


  /*
  ========================================
  USER
  ========================================
  */

  const user = JSON.parse(

    localStorage.getItem(
      "user"
    )

  );


  /*
  ========================================
  ROLE
  ========================================
  */

  const role =
    localStorage.getItem(
      "role"
    );


  /*
  ========================================
  LOGOUT
  ========================================
  */

  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    localStorage.removeItem(
      "role"
    );

    navigate("/login");

  };


  /*
  ========================================
  ACTIVE LINK STYLE
  ========================================
  */

 const navStyle = ({

  isActive

}) =>

  isActive

    ? "bg-blue-500 text-white px-4 py-2 rounded-xl font-semibold shadow-lg transition"

    : "px-4 py-2 rounded-xl hover:bg-white/10 hover:text-blue-400 transition";

  return (

    <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">


      <div className="max-w-7xl mx-auto px-6 py-4">


        <div className="flex justify-between items-center">


          {/* LOGO */}

          <NavLink

            to="/"

            className="text-3xl font-bold text-blue-400"

          >

           Community-Based Lost & Found 

          </NavLink>


          {/* NAV LINKS */}

          <div className="flex items-center gap-3">


            {/* DASHBOARD */}

            <NavLink

              to="/"

              className={navStyle}

            >

              Dashboard

            </NavLink>


            {/* ITEMS */}

            <NavLink

              to="/items"

              className={navStyle}

            >

              Items

            </NavLink>


            {/* ADD ITEM */}

            <NavLink

              to="/add-item"

              className={navStyle}

            >

              Add Item

            </NavLink>


            {/* MY ITEMS */}

            <NavLink

              to="/my-items"

              className={navStyle}

            >

              My Items

            </NavLink>


            {/* ADMIN */}

            {

              role === "admin" && (

                <NavLink

                  to="/admin"

                  className={({

                    isActive

                  }) =>

                    isActive

                      ? "bg-yellow-400 text-black px-4 py-2 rounded-xl font-semibold"

                      : "bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-xl font-semibold transition"

                  }

                >

                  Admin Panel

                </NavLink>

              )

            }


            {/* LOGIN / LOGOUT */}

            {

              user ? (

                <button

                  onClick={handleLogout}

                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl font-semibold transition"

                >

                  Logout

                </button>

              ) : (

                <NavLink

                  to="/login"

                  className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-xl font-semibold transition"

                >

                  Login

                </NavLink>

              )

            }

          </div>

        </div>

      </div>

    </nav>

  );

}

export default Navbar;