import express from "express";
import { getProducts,updateProduct,createProduct,deleteProduct } from "../controllers/productController.js";

const router=express.Router();

router.post("/add",createProduct)

//get all products
router.get("/",getProducts)

//update
router.put("/update/:id",updateProduct)

//delete product
router.delete("/delete/:id",deleteProduct)

export default router