import { useState, useEffect } from 'react'
import api from '../api/axios';
import { useParams } from 'react-router';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setproduct] = useState(null);

  const loadProduct = async () => {
    const res = await api.get("/products/");
    const currentProduct = res.data.find((item) => item._id === id)
    setproduct(currentProduct)
  };



  const handleAddToCart = async () => {
    const userId = localStorage.getItem("userId");

    
    try {

      await api.post("/cart/add", {
        
        productId: product._id,
      })
      alert("item added to cart");

    }
    catch (err) {
      console.log(err.response?.data?.message||"error");

    }
  }
  useEffect(() => {
    loadProduct();
  }, []);

  if (!product) {
    return <div>loading..</div>;
  }
  const handleAddToWishlist = async () => {
    try {
      await api.post(`/wishlist/${product._id}`);
      alert("product added to wishlist")

    }
    catch (error) {
      alert(error.response?.data?.message || "Error")

    }
  }

  return (
    <div className='p-6 max-w-3xl mx-auto'>
      <img src={product.image} alt={product.title} className=" h-40 object-center"

      />
      <h1 className='text-2xl font-bold mt-4'>{product.title}</h1>
      <p className='text-gray-700 mt-2'>{product.description}</p>
      <p className='text-xl font-semibold mt-4'>Rs {product.price}</p>

      <button onClick={handleAddToCart} className="mt-6 px-4 bg-blue-600 text-white rounded hover:bg-blue-900"
      >Add to Cart</button>
      <button
        onClick={handleAddToWishlist}
        className="mt-4 ml-3 px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
      >
        ❤️ Add to Wishlist
      </button>

    </div>

  )
}