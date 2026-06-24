import { BrowserRouter,Routes,Route } from "react-router-dom";


import Navbar from "./components/Navbar";

import ProtectedRoute from "./components/ProtectedRoute";

import AdminLogin from "./pages/AdminLogin";

import Login from "./pages/Login";

import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";

import ItemList from "./pages/ItemList";

import AddItem from "./pages/AddItem";

import MyItems from "./pages/MyItems";

import ItemDetails from "./pages/ItemDetails";

import AdminDashboard from "./pages/AdminDashboard";


function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route

          path="/"

          element={

            <ProtectedRoute>

              <Dashboard />

            </ProtectedRoute>

          }

        />


        <Route

          path="/items"

          element={

            <ProtectedRoute>

              <ItemList />

            </ProtectedRoute>

          }

        />


        <Route

          path="/item/:id"

          element={

            <ProtectedRoute>

              <ItemDetails />

            </ProtectedRoute>

          }

        />


        <Route

          path="/add-item"

          element={

            <ProtectedRoute>

              <AddItem />

            </ProtectedRoute>

          }

        />


        <Route

          path="/my-items"

          element={

            <ProtectedRoute>

              <MyItems />

            </ProtectedRoute>

          }

        />
         
         <Route

  path="/admin-login"

  element={<AdminLogin />}

/>

        <Route

          path="/admin"

          element={

            <ProtectedRoute>

              <AdminDashboard />

            </ProtectedRoute>

          }

        />


        <Route

          path="/login"

          element={<Login />}

        />


        <Route

          path="/register"

          element={<Register />}

        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;