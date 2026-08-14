import { useState,useEffect } from "react";
import api from '../api/axios.js';
import { useNavigate } from 'react-router'

export default function Wishlist(){
    const [wishlist,setWishlist]=useState([]);
    const navigate = useNavigate();

    const loadWishlist=async()=>{
        try{
            const res=await api.get("/wishlist");
            setWishlist(res.data.wishlist);

        }
        catch(error){
            console.log(error.response?.data|| error.message);

        }

    };
    useEffect(()=>{
        loadWishlist();
    },[]);

    const removeFromWishlist=async()=>{
        try{

        }
        catch(error){
            console.log(error.response?.data||error.message)
        }
    };


     return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <h2>No products in wishlist.</h2>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {wishlist.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg shadow p-4"
            >
              <img
                src={product.image}
                alt={product.title}
                className="h-48 w-full object-cover"
              />

              <h2 className="text-xl font-semibold mt-3">
                {product.title}
              </h2>

              <p className="text-gray-600">
                ₹{product.price}
              </p>

              <button
                onClick={() => removeFromWishlist(product._id)}
                className="mt-4 bg-red-500 text-white px-4 py-4 mr-4 rounded hover:bg-red-700"
              >
                Remove
              </button>
              <button
                        onClick={() =>
                            navigate("/checkout-address")
                        }
                        className=" bg-blue-500 text-white px-4 py-4 rounded hover:bg-blue-700"
                    >
                        Proceed to Checkout
                    </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}