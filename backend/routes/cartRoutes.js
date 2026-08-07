import express from 'express';
import { updateQuantity,addToCart,removeItem ,getCart} from '../controllers/cartController.js';
import {protect} from "../middlewares/authMiddleware.js"

const router=express.Router();

//add item to cart
router.post("/add",protect,addToCart);

//remove item 
router.post("/remove",protect,removeItem);

//update quantity
router.post("/update",protect,updateQuantity);

//get user cart
router.get("/:userId",protect,getCart);

export default router;