// import { useState,useEffect } from "react";
// import api from "../api/axios"
// import { useNavigate,useParams } from "react-router";

// export default function EditProduct(){
//     const {id}=useParams();
//     const navigate=useNavigate() 
//     const [form,setForm]=useState({
//         title:"",
//         description:"",
//         price:"",
//         category:"",
//         image:"",
//         stock:""
//     })
//     const allowedFields=["title","description","price","category","image","stock"]

//     const loadProduct=async ()=>{
//         const res=await api.get(`/products`);
//         const product =res.data.find((p)=>p.id===parseInt(id))
//         setForm(product);
//     }
//     useEffect(()=>{
//         loadProduct();
//     },[]);
//     const handleChange=(e)=>{
//         setForm({
//             ...form,
//             [e.target.name]:e.target.value,
//         });
//     }

//     const handleSubmit=async(e)=>{
//         e.preventDefault();
//         await api.put(`/products/update/${id}`,form);
//         alert("product updated successfully")
//         navigate("/admin/products")


    
//     }

//     return (
//         <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded">
//             <h2 className="text-2xl font-bold mb-6">Edit Product</h2>
//             <form onSubmit={handleSubmit} className="space-y-3">
//                 {
//                     allowedFields.map((key)=>( allowedFields.includes(key) &&
//                         <input key={key} name={key} value={form[key]} onChange={handleChange} placeholder={key}
//                         className="w-full p-2 border border-gray-300 rounded" />
//                     ))
//                 }
//                  <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded  hover:bg-blue-800" >Edit Product</button>

                
//             </form>

//         </div>
//     )

// }


import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate, useParams } from "react-router";

export default function EditProduct() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        stock: "",
    });

    const [image, setImage] = useState(null);
    const [currentImage, setCurrentImage] = useState("");


    const loadProduct = async () => {

        try {

            const res = await api.get("/products");

            const product = res.data.find(
                (p) => p._id === id
            );

            if (!product) {
                alert("Product not found");
                return;
            }

            setForm({
                title: product.title || "",
                description: product.description || "",
                price: product.price || "",
                category: product.category || "",
                stock: product.stock || "",
            });

            setCurrentImage(product.image || "");

        } catch (error) {

            console.log("Error loading product", error);

        }
    };


    useEffect(() => {
        loadProduct();
    }, [id]);


    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };


    const handleImageChange = (e) => {

        setImage(e.target.files[0]);

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const formData = new FormData();

            formData.append("title", form.title);
            formData.append("description", form.description);
            formData.append("price", form.price);
            formData.append("category", form.category);
            formData.append("stock", form.stock);

            if (image) {
                formData.append("image", image);
            }


            await api.put(
                `/products/update/${id}`,
                formData
            );

            alert("Product updated successfully");

            navigate("/admin/products");

        } catch (error) {

            console.log(
                "Error updating product",
                error.response?.data || error
            );

        }
    };


    return (
        <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded">

            <h2 className="text-2xl font-bold mb-6">
                Edit Product
            </h2>


            <form
                onSubmit={handleSubmit}
                className="space-y-3"
            >

                <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                />


                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="w-full p-2 border border-gray-300 rounded"
                />


                <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="Price"
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                />


                <input
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    placeholder="Category"
                    className="w-full p-2 border border-gray-300 rounded"
                />


                <input
                    type="number"
                    name="stock"
                    value={form.stock}
                    onChange={handleChange}
                    placeholder="Stock"
                    className="w-full p-2 border border-gray-300 rounded"
                />


                {currentImage && (
                    <div>
                        <p className="font-medium mb-2">
                            Current Image
                        </p>

                        <img
                            src={currentImage}
                            alt="Current product"
                            className="w-32 h-32 object-cover rounded border"
                        />
                    </div>
                )}


                <div>
                    <label className="block mb-1 font-medium">
                        Replace Image
                    </label>

                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>


                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-800"
                >
                    Edit Product
                </button>

            </form>

        </div>
    );
}