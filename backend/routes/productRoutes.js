import express from "express";
import { getProducts,updateProduct,createProduct,deleteProduct } from "../controllers/productController.js";
import {protect} from "../middlewares/authMiddleware.js"
import {adminOnly} from "../middlewares/adminMiddleware.js"
import upload from "../middlewares/uploadMiddleware.js"

const router=express.Router();



//get all products
router.get("/",getProducts);

//create product
router.post("/add",protect,adminOnly,upload.single("image"),createProduct);

//update
router.put("/update/:id",protect,adminOnly,upload.single("image"),updateProduct);

//delete product
router.delete("/delete/:id",protect,adminOnly,deleteProduct);

export default router