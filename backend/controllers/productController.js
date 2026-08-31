
import Product from "../models/product.js";
import cloudinary from "../config/cloudinary.js";


// Helper function to upload image to Cloudinary
const uploadToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "ecommerce/products",
                resource_type: "image",
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );

        stream.end(buffer);
    });
};


// create product
export const createProduct = async (req, res) => {
    try {

        let imageUrl = "";

        // If image was uploaded
        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer);
            imageUrl = result.secure_url;
        }

        const product = await Product.create({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            stock: req.body.stock,
            image: imageUrl,
        });

        res.json({
            message: "Product Created Successfully",
            product,
        });

    } catch (error) {

        console.log(error);
           console.error("MESSAGE:", error.message);
    console.error("STACK:", error.stack);
    console.error("FULL ERROR:", error);

        res.status(500).json({
            message: "server error",
            error: error.message,
        });
    }
};


// get all products
export const getProducts = async (req, res) => {
    try {

        const { search, category } = req.query;

        let filter = {};

        if (search) {
            filter.title = {
                $regex: search,
                $options: "i"
            };
        }

        if (category) {
            filter.category = category;
        }

        const products = await Product
            .find(filter)
            .sort({ createdAt: -1 });

        res.json(products);

    } catch (error) {

        res.status(500).json({
            message: "server error",
            error: error.message
        });
    }
};


// update product
export const updateProduct = async (req, res) => {
    try {

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }


        // If a new image was uploaded
        if (req.file) {

            const result = await uploadToCloudinary(req.file.buffer);

            product.image = result.secure_url;
        }


        // Update text fields
        product.title = req.body.title;
        product.description = req.body.description;
        product.price = req.body.price;
        product.category = req.body.category;
        product.stock = req.body.stock;


        const updated = await product.save();


        res.json({
            message: "Product Updated Successfully",
            updated
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "server error",
            error: error.message
        });
    }
};


// delete product
export const deleteProduct = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        await Product.findByIdAndDelete(req.params.id);

        res.json({
            message: "Product Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "server error",
            error: error.message
        });
    }
};