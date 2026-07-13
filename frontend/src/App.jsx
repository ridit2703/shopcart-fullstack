//import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router';
import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup";
import ProductDetails from "./pages/ProductDetails"
import Login from "./pages/Login"
import AddProduct from './admin/AddProduct.jsx';
import EditProduct from './admin/EditProduct.jsx';
import ProductList from './admin/ProductList.jsx';
import Navbar from "./components/Navbar.jsx"
import Cart from"./pages/Cart.jsx"
// import './App.css'

function Layout() {

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}




const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/product/:id", element: <ProductDetails /> },

      { path: "/admin/products", element: <ProductList /> },
      { path: "/admin/products/add/", element: <AddProduct /> },
      { path: "/admin/products/edit/:id", element: <EditProduct /> }
    ]
  }



]);



export default function App() {
  return <RouterProvider router={router} />;
}


