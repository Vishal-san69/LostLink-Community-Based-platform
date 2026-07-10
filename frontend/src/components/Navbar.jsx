import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    navigate("/login");
  };

  const navStyle = ({ isActive }) =>
    isActive
      ? "px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium shadow-md transition-all duration-300"
      : "px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-300";

  return (
    <nav className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}

        <NavLink
          to="/"
          className="flex items-center gap-2 text-2xl font-bold tracking-wide"
        >
          <span className="text-indigo-500">Lost</span>
          <span className="text-white">Link</span>
        </NavLink>

        {/* Navigation */}

        <div className="flex items-center gap-2">

          <NavLink
            to="/dashboard"
            className={navStyle}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/items"
            className={navStyle}
          >
            Items
          </NavLink>

          <NavLink
            to="/add-item"
            className={navStyle}
          >
            Add Item
          </NavLink>

          <NavLink
            to="/my-items"
            className={navStyle}
          >
            My Items
          </NavLink>

          {role === "admin" && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive
                  ? "px-4 py-2 rounded-lg bg-emerald-600 text-white font-medium shadow-md transition-all duration-300"
                  : "px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition-all duration-300"
              }
            >
              Admin
            </NavLink>
          )}

          {user ? (
            <button
              onClick={handleLogout}
              className="ml-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-all duration-300"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className="ml-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-all duration-300"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;