import { useState,useEffect } from "react";
import api from"../api/axios"
import { Link } from "react-router";
import EditProduct from "./EditProduct";

export default function ProductList(){
    const [products,setProducts]=useState([]);

    const loadProducts=async()=>{
        const response=await api.get("/products");
        setProducts(response.data);
    }

    const deleteProduct=async(id)=>{
        try{
            await api.delete(`/products/delete/${id}`);
            alert("Product deleted successfully")
            loadProducts();

        }
        catch(err){
            console.log("Error deleting product",err)
        }
    }



    useEffect(()=>{

       loadProducts();
       
        
    },[])
    

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Product List</h2>
                <Link to="/admin/products/add" className="bg-blue-500 text-white px-4 py-4 rounded " >Add new Product</Link>

            </div>
            <table className="w-full table-auto border-collapse border border-gray-400 ">
                
                <thead>
                    <tr className="bg-gray-200">
                    <th className="border bg-gray-400 px-4 py-4">Title</th>
                    <th className="border bg-gray-400 px-4 py-4">Price</th>
                    <th className="border bg-gray-400 px-4 py-4">Stock</th>
                    <th className="border bg-gray-400 px-4 py-4">Actions</th>
                </tr>
                </thead>
                <tbody>
                    {
                        products.map((product)=>(
                            <tr key={product._id} className="text-center">
                                <td className="border border-t-gray-200 px-4 py-4">{product.title}</td>
                            
                                <td className="border border-t-gray-200 px-4 py-4">{product.price}</td>
                                <td className="border border-t-gray-200 px-4 py-4">{product.stock}</td>
                                <td className="border border-t-gray-200 px-4 py-4">
                                   <Link to={`/admin/products/update/${product._id}`} className="text-blue-500 pr-5 hover:underline">Edit</Link>
                                    <button onClick={ ()=>deleteProduct(product._id)}className="text-red-500 hover:underline">Delete</button> </td>
                            </tr>
                        
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}