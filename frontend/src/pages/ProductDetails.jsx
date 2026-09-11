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

  // return (
  //   <div className='p-6 max-w-3xl mx-auto'>
  //     <img src={product.image} alt={product.title} className=" h-40 object-center"

  //     />
  //     <h1 className='text-2xl font-bold mt-4'>{product.title}</h1>
  //     <p className='text-gray-700 mt-2'>{product.description}</p>
  //     <p className='text-xl font-semibold mt-4'>Rs {product.price}</p>

  //     <button onClick={handleAddToCart} className="mt-6 px-4 bg-blue-600 text-white rounded hover:bg-blue-900"
  //     >Add to Cart</button>
  //     <button
  //       onClick={handleAddToWishlist}
  //       className="mt-4 ml-3 px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
  //     >
  //       ❤️ Add to Wishlist
  //     </button>

  //   </div>

  // )
 

  return (
  <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">

          {/* Product Image */}
          <div className="bg-gray-100 flex items-center justify-center p-8 md:p-12">
            <div className="w-full max-w-lg aspect-square rounded-2xl overflow-hidden bg-white shadow-sm">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain p-6 hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="p-8 md:p-12 flex flex-col justify-center">

            {/* Badge */}
            <span className="inline-block w-fit bg-pink-100 text-pink-600 text-sm font-semibold px-4 py-2 rounded-full mb-5">
              ✨ Featured Product
            </span>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-4">
              <div className="flex text-yellow-400 text-lg">
                ★★★★★
              </div>
              <span className="text-sm text-gray-500">
                4.8 (120 reviews)
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed mt-6 text-base md:text-lg">
              {product.description}
            </p>

            {/* Price */}
            <div className="mt-7">
              <p className="text-sm text-gray-500 mb-1">
                Price
              </p>

              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-gray-900">
                  ₹{product.price}
                </span>

                <span className="text-sm text-green-600 font-semibold bg-green-50 px-3 py-1 rounded-full">
                  In Stock
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-7"></div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2
                px-6 py-3.5
                bg-blue-600 text-white
                font-semibold rounded-xl
                shadow-md shadow-blue-200
                hover:bg-blue-700
                hover:-translate-y-0.5
                active:translate-y-0
                transition-all duration-200"
              >
                🛒 Add to Cart
              </button>

              {/* Wishlist */}
              <button
                onClick={handleAddToWishlist}
                className="flex-1 flex items-center justify-center gap-2
                px-6 py-3.5
                bg-pink-50 text-pink-600
                border border-pink-200
                font-semibold rounded-xl
                hover:bg-pink-100
                hover:-translate-y-0.5
                active:translate-y-0
                transition-all duration-200"
              >
                ❤️ Wishlist
              </button>

            </div>

            

          </div>
        </div>
      </div>
    </div>
  </div>
);

}