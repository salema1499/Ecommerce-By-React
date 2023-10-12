import React from "react";
import {Toaster} from "react-hot-toast";
// import {RouterProvider }from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Address from "./Components/Address/Address";
import Brands from "./Components/Brands/Brands";
import Cart from "./Components/Cart/Cart";
import Categories from "./Components/Categories/Categories";
import CategoryDetalis from "./Components/CategoriesDetalis/CategoryDetalis";
import AuthProvider from "./Components/Context/authContext";
import CartContextProvider from "./Components/Context/cartContext";
//import { authContext } from './Components/Context/authContext'
import Home from "./Components/Home/Home";
import Layout from "./Components/Layout/Layout";
import Login from "./Components/Login/Login";
import Orders from "./Components/Orders/Orders";
import ProductDetalis from "./Components/ProductDetalis/ProductDetalis";
import Products from "./Components/Products/Products";
import Profile from "./Components/Profile/Profile";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Register from "./Components/Register/Register";

export default function App() {
  let routers = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },{
          path: "categoriesdetalis/:id",
          element: (
            <ProtectedRoute>
              <CategoryDetalis/>
            </ProtectedRoute>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "productdetalis/:id",
          element: (
            <ProtectedRoute>
              <ProductDetalis />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },{
          path: "profile",
          element: (
            <ProtectedRoute>
              <Profile/>
            </ProtectedRoute>
          ),
        },{
          path: "address",
          element: (
            <ProtectedRoute>
              <Address/>
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <CartContextProvider>
        <AuthProvider>
          <RouterProvider router={routers}></RouterProvider>
          <div><Toaster/></div>
        </AuthProvider>
      </CartContextProvider>
    </>
  );
}
