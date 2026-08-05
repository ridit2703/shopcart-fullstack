import express from "express";
import { getProducts,updateProduct,createProduct,deleteProduct } from "../controllers/productController.js";
import {protect} from "../middlewares/authMiddleware.js"
import {adminOnly} from "../middlewares/adminMiddleware.js"

const router=express.Router();



//get all products
router.get("/",getProducts);

//create product
router.post("/add",protect,adminOnly,createProduct);

//update
router.put("/update/:id",protect,adminOnly,updateProduct);

//delete product
router.delete("/delete/:id",protect,adminOnly,deleteProduct);

export default router