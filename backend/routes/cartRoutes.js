import express from 'express';
import { updateQuantity,addToCart,removeItem ,getCart} from '../controllers/cartController.js';
import {protect} from "../middlewares/authMiddleware.js"

const router=express.Router();

//add item to cart
router.post("/add",protect,addToCart);

//remove item 
router.delete("/remove",protect,removeItem);

//update quantity
router.put("/update",protect,updateQuantity);

//get user cart
router.get("/",protect,getCart);

export default router;