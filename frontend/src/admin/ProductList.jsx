// import { useState,useEffect } from "react";
// import api from"../api/axios"
// import { Link } from "react-router";
// import EditProduct from "./EditProduct";

// export default function ProductList(){
//     const [products,setProducts]=useState([]);

//     const loadProducts=async()=>{
//         const response=await api.get("/products");
//         setProducts(response.data);
//     }

//     const deleteProduct=async(id)=>{
//         try{
//             await api.delete(`/products/delete/${id}`);
//             alert("Product deleted successfully")
//             loadProducts();

//         }
//         catch(err){
//             console.log("Error deleting product",err)
//         }
//     }



//     useEffect(()=>{

//        loadProducts();
       
        
//     },[])
    

//     return (
//         <div className="max-w-4xl mx-auto mt-10">
//             <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-3xl font-bold">Product List</h2>
//                 <Link to="/admin/products/add" className="bg-blue-500 text-white px-4 py-4 rounded " >Add new Product</Link>

//             </div>
//             <table className="w-full table-auto border-collapse border border-gray-400 ">
                
//                 <thead>
//                     <tr className="bg-gray-200">
//                     <th className="border bg-gray-400 px-4 py-4">Title</th>
//                     <th className="border bg-gray-400 px-4 py-4">Price</th>
//                     <th className="border bg-gray-400 px-4 py-4">Stock</th>
//                     <th className="border bg-gray-400 px-4 py-4">Actions</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                     {
//                         products.map((product)=>(
//                             <tr key={product._id} className="text-center">
//                                 <td className="border border-t-gray-200 px-4 py-4">{product.title}</td>
                            
//                                 <td className="border border-t-gray-200 px-4 py-4">{product.price}</td>
//                                 <td className="border border-t-gray-200 px-4 py-4">{product.stock}</td>
//                                 <td className="border border-t-gray-200 px-4 py-4">
//                                    <Link to={`/admin/products/update/${product._id}`} className="text-blue-500 pr-5 hover:underline">Edit</Link>
//                                     <button onClick={ ()=>deleteProduct(product._id)}className="text-red-500 hover:underline">Delete</button> </td>
//                             </tr>
                        
//                         ))
//                     }
//                 </tbody>
//             </table>
//         </div>
//     )
// }
import { useState, useEffect } from "react";
import api from "../api/axios";
import { Link } from "react-router";
import EditProduct from "./EditProduct";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);

    const loadProducts = async () => {
        try {
            const response = await api.get("/products");
            setProducts(response.data);
        } catch (err) {
            console.log("Error loading products", err);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await api.delete(`/products/delete/${id}`);

            alert("Product deleted successfully");

            loadProducts();
        } catch (err) {
            console.log("Error deleting product", err);
        }
    };

    const handleUpdate = (updatedProduct) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product._id === updatedProduct._id
                    ? updatedProduct
                    : product
            )
        );

        setEditingProduct(null);
    };

    useEffect(() => {
        loadProducts();
    }, []);

    // return (
    //     <div className="max-w-4xl mx-auto mt-10">

    //         {/* Edit Form */}
    //         {editingProduct && (
    //             <EditProduct
    //                 product={editingProduct}
    //                 onUpdate={handleUpdate}
    //                 onCancel={() => setEditingProduct(null)}
    //             />
    //         )}

    //         <div className="flex justify-between items-center mb-6">
    //             <h2 className="text-3xl font-bold">
    //                 Product List
    //             </h2>

    //             <Link
    //                 to="/admin/products/add"
    //                 className="bg-blue-500 text-white px-4 py-4 rounded"
    //             >
    //                 Add new Product
    //             </Link>
    //         </div>

    //         <table className="w-full table-auto border-collapse border border-gray-400">

    //             <thead>
    //                 <tr className="bg-gray-200">
    //                     <th className="border bg-gray-400 px-4 py-4">
    //                         Title
    //                     </th>

    //                     <th className="border bg-gray-400 px-4 py-4">
    //                         Price
    //                     </th>

    //                     <th className="border bg-gray-400 px-4 py-4">
    //                         Stock
    //                     </th>

    //                     <th className="border bg-gray-400 px-4 py-4">
    //                         Actions
    //                     </th>
    //                 </tr>
    //             </thead>

    //             <tbody>
    //                 {products.map((product) => (
    //                     <tr
    //                         key={product._id}
    //                         className="text-center"
    //                     >
    //                         <td className="border px-4 py-4">
    //                             {product.title}
    //                         </td>

    //                         <td className="border px-4 py-4">
    //                             {product.price}
    //                         </td>

    //                         <td className="border px-4 py-4">
    //                             {product.stock}
    //                         </td>

    //                         <td className="border px-4 py-4">

    //                             <button
    //                                 onClick={() =>
    //                                     setEditingProduct(product)
    //                                 }
    //                                 className="text-blue-500 pr-5 hover:underline"
    //                             >
    //                                 Edit
    //                             </button>

    //                             <button
    //                                 onClick={() =>
    //                                     deleteProduct(product._id)
    //                                 }
    //                                 className="text-red-500 hover:underline"
    //                             >
    //                                 Delete
    //                             </button>

    //                         </td>
    //                     </tr>
    //                 ))}
    //             </tbody>

    //         </table>
    //     </div>
    // );

    return (
  <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border border-slate-100 transition-all duration-300">
    
    {/* Edit Modal / Form Backdrop Overlay wrapper if active */}
    {editingProduct && (
      <div className="mb-8 p-6 bg-slate-50 border border-slate-200 rounded-xl shadow-inner">
        <EditProduct
          product={editingProduct}
          onUpdate={handleUpdate}
          onCancel={() => setEditingProduct(null)}
        />
      </div>
    )}

    {/* Section Header */}
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div>
        <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
          Product Dashboard
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Manage your catalogue items, track stock quantities, and update global store prices.
        </p>
      </div>

      <Link
        to="/admin/products/add"
        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-lg shadow-sm hover:shadow transition-all duration-200 active:scale-[0.98]"
      >
        <span>➕</span> Add New Product
      </Link>
    </div>

    {/* Modern Responsive Table */}
    <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-slate-50/30">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-100/80 border-b border-slate-200">
            <th className="text-xs font-bold uppercase tracking-wider text-slate-600 px-6 py-4">
              Title
            </th>
            <th className="text-xs font-bold uppercase tracking-wider text-slate-600 px-6 py-4">
              Price
            </th>
            <th className="text-xs font-bold uppercase tracking-wider text-slate-600 px-6 py-4">
              Stock status
            </th>
            <th className="text-xs font-bold uppercase tracking-wider text-slate-600 px-6 py-4 text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100 bg-white">
          {products.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-10 text-slate-400 font-medium">
                No products found in the inventory database.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr
                key={product._id}
                className="hover:bg-slate-50/80 transition-colors group"
              >
                <td className="px-6 py-4 font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                  {product.title}
                </td>

                <td className="px-6 py-4 font-medium text-slate-600">
                  ₹{Number(product.price).toLocaleString()} {/* Formats pricing values automatically */}
                </td>

                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    product.stock > 10 
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : product.stock > 0 
                      ? "bg-amber-50 text-amber-700 border border-amber-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}>
                    {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                  </span>
                </td>

                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center items-center gap-3">
                    <button
                      onClick={() => setEditingProduct(product)}
                      className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 border border-transparent hover:border-blue-200 rounded-md transition-all active:scale-95"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 rounded-md transition-all active:scale-95"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
);



}
