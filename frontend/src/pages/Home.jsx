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



    return(
      <div className='p-6'>

        {/* searching */}

        <div className="mb-4 flex gap-4">
          <input type="text" name="" placeholder='search products...' value={search} onChange={(e)=>setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-1/2" />

          <select value={category} onChange={(e)=>setCategory(e.target.value)}
          className="border px-3 py-2 rounded" >
            <option value="">All Categories</option>
            <option value="smart TV">Smart TV</option>
            <option value="phones">Phones</option>
            <option value="tablets">Tablets</option>
          </select>



        </div>

        {/* product grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {product.map((product)=>(
            <Link
            key={product._id}
            to={`/product/${product._id}`}
            className="border p-3 rounded shadow hover:shadow-lg transition">
              <img src={product.image} alt={product.title}
              className="w-full h-40 object-contain bg-white rounded" />
              <h2 className='mt-2 font-semibold text-lg'>{product.title}</h2>
              <p className='text-gray-600'>Rs {product.price}</p>
            </Link>

           
          ))}
          {/* <button 
          onClick={()=>addToCart(product._id)}
          className="mt-2 w-full bg-blue-500 text-white px-3 py-2 rounded hover:">Add to Cart</button> */}
     
        </div>



        

      </div>
    )
}


