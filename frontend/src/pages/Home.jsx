import {useState,useEffect} from 'react'
import api from '../api/axios'
import {Link} from  'react-router'

export default function Home(){
  const[product ,setProduct]=useState([]);
   const[search ,setSearch]=useState("");
    const[category ,setCategory]=useState("");

    const loadProduct =async()=>{
      const res=await api.get(`/products?search=${search}&category=${category}`);
      setProduct(res.data)
    }
  
    useEffect(()=>{
      loadProduct();
    },[search,category]);

    const addToCart=async(productId)=>{
      const userId=localStorage.getItem("userId");
      if(!userId) {
        alert("Please log in to add items to cart");
        return;
      }
      const res=await api.post(`/cart/add`,{userId,productId})

      const total=res.data.cart.items.reduce(
        (sum,item)=> sum+item.productId.price*item.quantity,0
      );
      localStorage.setitem("cartCount",total);
      window.dispatchEvent(new Event("cartUpdated"))


    }



    // return(
    //   <div className='p-6'>

    //     {/* searching */}

    //     <div className="mb-4 flex gap-4">
    //       <input type="text" name="" placeholder='search products...' value={search} onChange={(e)=>setSearch(e.target.value)}
    //       className="border px-3 py-2 rounded w-1/2" />

    //       <select value={category} onChange={(e)=>setCategory(e.target.value)}
    //       className="border px-3 py-2 rounded" >
    //         <option value="">All Categories</option>
    //         <option value="smart TV">Smart TV</option>
    //         <option value="phones">Phones</option>
    //         <option value="tablets">Tablets</option>
    //       </select>



    //     </div>

    //     {/* product grid */}
    //     <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
    //       {product.map((product)=>(
    //         <Link
    //         key={product._id}
    //         to={`/product/${product._id}`}
    //         className="border p-3 rounded shadow hover:shadow-lg transition">
    //           <img src={product.image} alt={product.title}
    //           className="w-full h-40 object-contain bg-white rounded" />
    //           <h2 className='mt-2 font-semibold text-lg'>{product.title}</h2>
    //           <p className='text-gray-600'>Rs {product.price}</p>
    //         </Link>

           
    //       ))}
    //       {/* <button 
    //       onClick={()=>addToCart(product._id)}
    //       className="mt-2 w-full bg-blue-500 text-white px-3 py-2 rounded hover:">Add to Cart</button> */}
     
    //     </div>



        

    //   </div>
    // )
  
  return (
  <div className="min-h-screen bg-[#f7f8fc]">

    {/* Hero / Header */}
    <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-12 md:py-16">

        <div className="max-w-2xl">
          <span className="
            inline-flex items-center gap-2
            px-4 py-2
            rounded-full
            bg-white/10
            border border-white/10
            backdrop-blur-md
            text-blue-200
            text-sm font-medium
          ">
            ✨ Premium Collection
          </span>

          <h1 className="
            text-4xl sm:text-5xl md:text-6xl
            font-extrabold
            tracking-tight
            mt-5
          ">
            Find what you
            <span className="text-blue-400"> love.</span>
          </h1>

          <p className="
            mt-4
            text-slate-300
            text-base sm:text-lg
            max-w-xl
            leading-relaxed
          ">
            Explore our collection of phones, tablets, smart TVs
            and more — all in one place.
          </p>
        </div>

      </div>
    </section>


    {/* Search & Filters */}
    <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 -mt-7 relative z-10">

      <div className="
        bg-white
        rounded-2xl
        shadow-[0_10px_40px_rgba(0,0,0,0.08)]
        border border-gray-100
        p-3
      ">

        <div className="flex flex-col md:flex-row gap-3">

          {/* Search */}
          <div className="relative flex-1">

            <span className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-gray-400
            ">
              🔍
            </span>

            <input
              type="text"
              placeholder="Search for products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full
                h-14
                pl-12 pr-5
                rounded-xl
                bg-gray-50
                border border-transparent
                text-gray-800
                placeholder:text-gray-400
                outline-none
                transition-all
                duration-200
                focus:bg-white
                focus:border-blue-500
                focus:ring-4
                focus:ring-blue-500/10
              "
            />

          </div>


          {/* Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="
              md:w-60
              h-14
              px-5
              rounded-xl
              bg-gray-50
              border border-transparent
              text-gray-700
              font-medium
              outline-none
              cursor-pointer
              transition-all
              focus:bg-white
              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-500/10
            "
          >
            <option value="">All Categories</option>
            <option value="smart TV">Smart TV</option>
            <option value="phones">Phones</option>
            <option value="tablets">Tablets</option>
          </select>

        </div>
      </div>
    </div>


    {/* Products Section */}
    <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-12">

      {/* Section heading */}
      <div className="flex items-end justify-between mb-7">

        <div>
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
            Our Products
          </p>

          <h2 className="
            text-2xl sm:text-3xl
            font-bold
            text-slate-900
            mt-1
          ">
            Latest Products
          </h2>
        </div>

        <span className="
          hidden sm:block
          text-sm
          text-gray-500
          bg-white
          px-4 py-2
          rounded-full
          border border-gray-200
        ">
          {product.length} products
        </span>

      </div>


      {/* Empty state */}
      {product.length === 0 ? (

        <div className="
          bg-white
          rounded-3xl
          border border-gray-100
          shadow-sm
          py-20
          px-6
          text-center
        ">

          <div className="
            w-20 h-20
            mx-auto
            rounded-full
            bg-blue-50
            flex items-center justify-center
            text-3xl
          ">
            🔍
          </div>

          <h3 className="text-xl font-bold text-gray-900 mt-5">
            No products found
          </h3>

          <p className="text-gray-500 mt-2">
            Try searching for something else or change the category.
          </p>

        </div>

      ) : (

        /* Product Grid */
        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-6
        ">

          {product.map((product) => (

            <Link
              key={product._id}
              to={`/product/${product._id}`}
              className="
                group
                bg-white
                rounded-3xl
                overflow-hidden
                border border-gray-100
                shadow-sm
                hover:shadow-[0_20px_50px_rgba(15,23,42,0.12)]
                hover:-translate-y-1.5
                transition-all
                duration-300
              "
            >

              {/* Image container */}
              <div className="
                relative
                h-64
                bg-gradient-to-br
                from-gray-50
                to-gray-100
                overflow-hidden
              ">

                <img
                  src={product.image}
                  alt={product.title}
                  className="
                    w-full
                    h-full
                    object-contain
                    p-7
                    group-hover:scale-110
                    transition-transform
                    duration-500
                    ease-out
                  "
                />

                {/* Category */}
                {product.category && (
                  <span className="
                    absolute
                    top-4 left-4
                    px-3 py-1.5
                    rounded-full
                    bg-white/90
                    backdrop-blur-md
                    shadow-sm
                    text-xs
                    font-semibold
                    text-gray-700
                  ">
                    {product.category}
                  </span>
                )}

                {/* Wishlist icon */}
                <button
                  onClick={(e) => e.preventDefault()}
                  className="
                    absolute
                    top-4 right-4
                    w-10 h-10
                    rounded-full
                    bg-white/90
                    backdrop-blur
                    shadow-sm
                    flex items-center justify-center
                    text-gray-500
                    hover:text-red-500
                    hover:bg-white
                    transition
                  "
                >
                  ♡
                </button>

              </div>


              {/* Product info */}
              <div className="p-5">

                <h3 className="
                  text-lg
                  font-bold
                  text-slate-900
                  line-clamp-1
                  group-hover:text-blue-600
                  transition-colors
                ">
                  {product.title}
                </h3>

                <p className="
                  text-sm
                  text-gray-500
                  mt-1
                  line-clamp-2
                  min-h-[40px]
                ">
                  {product.description || "Premium quality product"}
                </p>


                {/* Price */}
                <div className="
                  flex
                  items-center
                  justify-between
                  mt-5
                ">

                  <div>
                    <p className="text-xs text-gray-400 uppercase">
                      Price
                    </p>

                    <p className="
                      text-2xl
                      font-extrabold
                      text-slate-900
                      mt-0.5
                    ">
                      ₹{product.price}
                    </p>
                  </div>

                  <span className="
                    text-xs
                    font-semibold
                    text-green-600
                    bg-green-50
                    px-3 py-1.5
                    rounded-full
                  ">
                    In Stock
                  </span>

                </div>


                {/* View button */}
                <div className="
                  mt-5
                  w-full
                  py-3
                  rounded-xl
                  bg-slate-900
                  text-white
                  text-center
                  font-semibold
                  group-hover:bg-blue-600
                  transition-colors
                  duration-300
                ">
                  View Product
                  <span className="ml-2 group-hover:ml-3 transition-all">
                    →
                  </span>
                </div>

              </div>

            </Link>

          ))}

        </div>

      )}

    </section>

  </div>
);
}


