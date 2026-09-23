

// import { useState } from "react";
// import api from "../api/axios";

// export default function EditProduct({
//     product,
//     onUpdate,
//     onCancel
// }) {
//     const [form, setForm] = useState({
//         title: product.title || "",
//         description: product.description || "",
//         price: product.price || "",
//         category: product.category || "",
//         stock: product.stock || "",
//     });

//     const [image, setImage] = useState(null);

//     const [currentImage, setCurrentImage] = useState(
//         product.image || ""
//     );

//     const handleChange = (e) => {
//         setForm({
//             ...form,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleImageChange = (e) => {
//         setImage(e.target.files[0]);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const formData = new FormData();

//             formData.append("title", form.title);
//             formData.append("description", form.description);
//             formData.append("price", form.price);
//             formData.append("category", form.category);
//             formData.append("stock", form.stock);

//             if (image) {
//                 formData.append("image", image);
//             }

//             const response = await api.put(
//                 `/products/update/${product._id}`,
//                 formData
//             );

//             alert("Product updated successfully");

//             onUpdate(response.data);

//         } catch (error) {
//             console.log(
//                 "Error updating product:",
//                 error.response?.data || error
//             );
//         }
//     };

//     return (
//         <div className="max-w-lg mx-auto mb-8 bg-white p-6 shadow rounded">

//             <div className="flex justify-between items-center mb-6">

//                 <h2 className="text-2xl font-bold">
//                     Edit Product
//                 </h2>

//                 <button
//                     type="button"
//                     onClick={onCancel}
//                     className="text-gray-500 text-xl"
//                 >
//                     ✕
//                 </button>

//             </div>

//             <form
//                 onSubmit={handleSubmit}
//                 className="space-y-3"
//             >

//                 <input
//                     name="title"
//                     value={form.title}
//                     onChange={handleChange}
//                     placeholder="Title"
//                     className="w-full p-2 border border-gray-300 rounded"
//                     required
//                 />

//                 <textarea
//                     name="description"
//                     value={form.description}
//                     onChange={handleChange}
//                     placeholder="Description"
//                     className="w-full p-2 border border-gray-300 rounded"
//                 />

//                 <input
//                     type="number"
//                     name="price"
//                     value={form.price}
//                     onChange={handleChange}
//                     placeholder="Price"
//                     className="w-full p-2 border border-gray-300 rounded"
//                     required
//                 />

//                 <input
//                     name="category"
//                     value={form.category}
//                     onChange={handleChange}
//                     placeholder="Category"
//                     className="w-full p-2 border border-gray-300 rounded"
//                 />

//                 <input
//                     type="number"
//                     name="stock"
//                     value={form.stock}
//                     onChange={handleChange}
//                     placeholder="Stock"
//                     className="w-full p-2 border border-gray-300 rounded"
//                 />

//                 {currentImage && (
//                     <div>
//                         <p className="font-medium mb-2">
//                             Current Image
//                         </p>

//                         <img
//                             src={currentImage}
//                             alt="Current product"
//                             className="w-32 h-32 object-cover rounded border"
//                         />
//                     </div>
//                 )}

//                 <div>
//                     <label className="block mb-1 font-medium">
//                         Replace Image
//                     </label>

//                     <input
//                         type="file"
//                         name="image"
//                         accept="image/*"
//                         onChange={handleImageChange}
//                         className="w-full p-2 border border-gray-300 rounded"
//                     />
//                 </div>

//                 <div className="flex gap-3">

//                     <button
//                         type="submit"
//                         className="flex-1 bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
//                     >
//                         Update Product
//                     </button>

//                     <button
//                         type="button"
//                         onClick={onCancel}
//                         className="flex-1 bg-gray-500 text-white p-2 rounded hover:bg-gray-700"
//                     >
//                         Cancel
//                     </button>

//                 </div>

//             </form>

//         </div>
//     );
// }

import { useState, useEffect } from "react";
import api from "../api/axios";

export default function EditProduct({
    product,
    onUpdate,
    onCancel
}) {
    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        stock: "",
    });

    const [image, setImage] = useState(null);
    const [currentImage, setCurrentImage] = useState("");

    // Fill form with selected product information
    useEffect(() => {
        if (product) {
            setForm({
                title: product.title || "",
                description: product.description || "",
                price: product.price || "",
                category: product.category || "",
                stock: product.stock || "",
            });

            setCurrentImage(product.image || "");
            setImage(null);
        }
    }, [product]);

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

            const response = await api.put(
                `/products/update/${product._id}`,
                formData
            );

            alert("Product updated successfully");

            onUpdate(response.data);

        } catch (error) {
            console.log(
                "Error updating product:",
                error.response?.data || error
            );
        }
    };

    return (
        <div className="max-w-lg mx-auto mb-8 bg-white p-6 shadow rounded">

            <h2 className="text-2xl font-bold mb-6">
                Update Product
            </h2>

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >

                {/* Title */}
                <div>
                    <label className="block font-semibold mb-1">
                        Title
                    </label>

                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block font-semibold mb-1">
                        Description
                    </label>

                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                {/* Price */}
                <div>
                    <label className="block font-semibold mb-1">
                        Price
                    </label>

                    <input
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="block font-semibold mb-1">
                        Category
                    </label>

                    <input
                        type="text"
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                {/* Stock */}
                <div>
                    <label className="block font-semibold mb-1">
                        Stock
                    </label>

                    <input
                        type="number"
                        name="stock"
                        value={form.stock}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                {/* Current Image */}
                {currentImage && (
                    <div>
                        <p className="font-semibold mb-2">
                            Current Image
                        </p>

                        <img
                            src={currentImage}
                            alt={product.title}
                            className="w-32 h-32 object-cover rounded border"
                        />
                    </div>
                )}

                {/* New Image */}
                <div>
                    <label className="block font-semibold mb-1">
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

                {/* Buttons */}
                <div className="flex gap-3">

                    <button
                        type="submit"
                        className="flex-1 bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
                    >
                        Update Product
                    </button>

                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 bg-gray-500 text-white p-2 rounded hover:bg-gray-700"
                    >
                        Cancel
                    </button>

                </div>

            </form>
        </div>
    );
}
