// import { useState } from "react";
// import api from "../api/axios";
// import {useNavigate} from "react-router"

// export default function AddProduct(){
//     const [form ,setForm]=useState({
//         title:"",
//         description:"",
//         price:"",
//         category:"",
//         image:"",
//         stock:"",

//     });
//     const navigate=useNavigate();
//     const handleChange=(e)=>{
//         setForm({
//             ...form,
//             [e.target.name]:e.target.value
//         })
//     }

//     const handleSubmit =async(e)=>{
//         e.preventDefault();
//         try{
//             await api.post("/products/add",form);
//             alert("Product added successfully!")
//             navigate("/admin/products")

//         }
//         catch(err){
//             console.log("error adding product ",err)

//         }

//     }

//     return (
//         <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded">
//             <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
//             <form onSubmit={handleSubmit} className="space-y-3">
//                 {
//                     Object.keys(form).map((key)=>(
//                         <input key={key} name={key} value={form[key]} onChange={handleChange} placeholder={key}
//                         className="w-full p-2 border border-gray-300 rounded" />
//                     ))
//                 }
//                  <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded  hover:bg-blue-800" >Add Product</button>

                
//             </form>

//         </div>
//     )
// }


import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";

export default function AddProduct() {

    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        stock: "",
    });

    const [image, setImage] = useState(null);

    const navigate = useNavigate();


    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
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


            await api.post("/products/add", formData);

            alert("Product added successfully!");

            navigate("/admin/products");

        } catch (err) {

            console.log(
                "error adding product",
                err.response?.data || err
            );

        }
    };


    return (
        <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded">

            <h2 className="text-2xl font-bold mb-6">
                Add New Product
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


                <div>
                    <label className="block mb-1 font-medium">
                        Product Image
                    </label>

                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>


                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-800"
                >
                    Add Product
                </button>

            </form>

        </div>
    );
}