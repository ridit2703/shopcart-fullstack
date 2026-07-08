import { useState } from 'react'
import {createBrowserRouter,RouterProvider} from 'react-router';
import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup";
import ProductDetails from "./pages/ProductDetails"
import Login from "./pages/Login"
// import './App.css'

const router=createBrowserRouter([
  {path:"/",element:<Home/>},
  {path:"/login",element:<Login/>},
  {path:"/signup",element:<Signup/>},
  {path:"/product/:id",element:<ProductDetails/>}
]);



export default function App(){
  return <RouterProvider router={router}/>;
}


